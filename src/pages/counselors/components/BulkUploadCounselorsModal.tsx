import React, { useState, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  RiUploadCloud2Line,
  RiDownloadLine,
  RiFileTextLine,
  RiCheckboxCircleLine,
  RiErrorWarningLine,
} from 'react-icons/ri';
import styled from 'styled-components';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { Select } from '@/components/Select';
import { Table, Column } from '@/components/Table';
import { Badge } from '@/components/Badge';
import { counselorService, splitName } from '@/services/counselor.service';
import { instituteService } from '@/services/institute.service';
import { useCounselorStore } from '@/store/counselor.store';
import { useToast } from '@/hooks';
import { CreateCounselorInput } from '@/types/counselor.types';
import {
  DropzoneSubtext,
  DropzoneHintText,
  PreviewHeaderTitle,
  TablePreviewScroll,
  BadgeIconContainer,
} from '../CounselorsList.styles';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const TemplateSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surfaceHover};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const TemplateInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  h4 {
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    font-size: ${({ theme }) => theme.fontSize.xs};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const DropZone = styled.div<{ $isDragging?: boolean; $hasFile?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xl};
  border: 2px dashed
    ${({ theme, $isDragging, $hasFile }) =>
      $isDragging
        ? theme.colors.primary
        : $hasFile
        ? theme.colors.success
        : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme, $isDragging }) =>
    $isDragging ? theme.colors.primaryLight : theme.colors.surface};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};
  text-align: center;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

const DropIcon = styled.div`
  font-size: 32px;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
`;

const PreviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const InstituteSelectWrapper = styled.div`
  max-width: 320px;
`;

interface ParsedRow extends CreateCounselorInput {
  name: string;
  isValid: boolean;
  validationError?: string;
}

const MOBILE_RE = /^\+\d{10,15}$/;

export const BulkUploadCounselorsModal: React.FC = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isBulkUploadModalOpen, closeBulkUploadModal } = useCounselorStore();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [parsedRows, setParsedRows] = useState<ParsedRow[]>([]);
  const [instituteId, setInstituteId] = useState('');

  const { data: institutes = [] } = useQuery({
    queryKey: ['institutes'],
    queryFn: instituteService.getAll,
    enabled: isBulkUploadModalOpen,
  });

  const bulkMutation = useMutation({
    mutationFn: counselorService.bulkCreate,
    onSuccess: result => {
      queryClient.invalidateQueries({ queryKey: ['counselors'] });
      if (result.failed.length === 0) {
        toast.success('Bulk Upload Complete', `Successfully imported ${result.succeeded.length} counselor records.`);
        handleReset();
        closeBulkUploadModal();
      } else {
        toast.error(
          'Partial Import',
          `${result.succeeded.length} imported, ${result.failed.length} failed: ${result.failed[0].message}`
        );
        queryClient.invalidateQueries({ queryKey: ['counselors'] });
      }
    },
    onError: () => {
      toast.error('Error', 'Failed to bulk upload counselor records.');
    },
  });

  const handleReset = () => {
    setSelectedFile(null);
    setParsedRows([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDownloadTemplate = () => {
    const csvContent =
      'Counsellor ID,Counsellor Name,Mobile No.,Email ID\n' +
      'CN014,Anil Sharma,+919876543210,anil.sharma@example.com\n' +
      'CN015,Sunita Roy,+919812345678,sunita.roy@example.com\n';

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'counselors_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const parseFileContent = (content: string) => {
    const lines = content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    if (lines.length <= 1) {
      toast.error('Invalid File', 'The CSV file appears to be empty or missing headers.');
      return;
    }

    const rows: ParsedRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',').map(p => p.trim());
      const counselorId = parts[0] || '';
      const name = parts[1] || '';
      const mobile = parts[2] || '';
      const email = parts[3] || '';
      const { firstName, lastName } = splitName(name);

      const isValid = Boolean(
        counselorId && firstName && lastName && email.includes('@') && MOBILE_RE.test(mobile)
      );
      rows.push({
        counselorId,
        name: name || 'Unknown Counselor',
        firstName,
        lastName,
        mobile,
        email: email || 'invalid@example.com',
        instituteId: '',
        isValid,
        validationError: !isValid
          ? 'Missing ID/name, invalid email, or mobile isn\'t E.164 (+countrycode…)'
          : undefined,
      });
    }

    setParsedRows(rows);
  };

  const handleFileSelect = (file: File) => {
    if (!file.name.endsWith('.csv') && !file.name.endsWith('.txt')) {
      toast.error('Unsupported File', 'Please upload a CSV or TXT file.');
      return;
    }
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = e => {
      const text = e.target?.result as string;
      parseFileContent(text);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleUploadSubmit = () => {
    if (!instituteId) {
      toast.error('Institute Required', 'Select the institute these counselors belong to.');
      return;
    }
    const validInputs = parsedRows
      .filter(r => r.isValid)
      .map(({ isValid, validationError, name, ...rest }) => ({ ...rest, instituteId }));
    if (validInputs.length === 0) {
      toast.error('No Valid Rows', 'Please ensure your CSV contains valid counselor records.');
      return;
    }
    bulkMutation.mutate(validInputs);
  };

  const columns: Column<ParsedRow>[] = [
    {
      key: 'counselorId',
      header: 'ID',
      width: '90px',
      render: row => <strong>{row.counselorId}</strong>,
    },
    {
      key: 'name',
      header: 'Counselor Name',
      render: row => row.name,
    },
    {
      key: 'mobile',
      header: 'Mobile No.',
      render: row => row.mobile,
    },
    {
      key: 'email',
      header: 'Email ID',
      render: row => row.email,
    },
    {
      key: 'isValid',
      header: 'Validation',
      width: '110px',
      render: row => (
        <Badge variant={row.isValid ? 'success' : 'danger'}>
          {row.isValid ? (
            <BadgeIconContainer>
              <RiCheckboxCircleLine size={14} />
            </BadgeIconContainer>
          ) : (
            <BadgeIconContainer>
              <RiErrorWarningLine size={14} />
            </BadgeIconContainer>
          )}
          {row.isValid ? 'Valid' : 'Invalid'}
        </Badge>
      ),
    },
  ];

  const validCount = parsedRows.filter(r => r.isValid).length;

  return (
    <Modal
      isOpen={isBulkUploadModalOpen}
      onClose={() => {
        handleReset();
        closeBulkUploadModal();
      }}
      title="Bulk Upload Counselors"
      subtitle="Upload a CSV file containing counselor records to import in bulk"
      size="lg"
      footer={
        <>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              handleReset();
              closeBulkUploadModal();
            }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            disabled={parsedRows.length === 0 || validCount === 0}
            isLoading={bulkMutation.isPending}
            onClick={handleUploadSubmit}
          >
            Import {validCount} Counselor{validCount !== 1 ? 's' : ''}
          </Button>
        </>
      }
    >
      <Container>
        <InstituteSelectWrapper>
          <Select
            label="Institute (applies to every row in this file)"
            options={institutes.map(i => ({ value: i.id, label: i.name }))}
            value={instituteId}
            onChange={e => setInstituteId(e.target.value)}
            placeholder="Select institute"
          />
        </InstituteSelectWrapper>

        <TemplateSection>
          <TemplateInfo>
            <h4>CSV Template Format</h4>
            <p>Headers required: Counsellor ID, Counsellor Name, Mobile No. (E.164), Email ID</p>
          </TemplateInfo>
          <Button variant="secondary" size="sm" leftIcon={<RiDownloadLine size={16} />} onClick={handleDownloadTemplate}>
            Download Sample CSV
          </Button>
        </TemplateSection>

        <input
          type="file"
          ref={fileInputRef}
          accept=".csv,.txt"
          style={{ display: 'none' }}
          onChange={e => {
            if (e.target.files && e.target.files[0]) {
              handleFileSelect(e.target.files[0]);
            }
          }}
        />

        <DropZone
          $isDragging={isDragging}
          $hasFile={Boolean(selectedFile)}
          onDragOver={e => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <DropIcon>
            <RiUploadCloud2Line size={32} />
          </DropIcon>

          {selectedFile ? (
            <FileInfo>
              <RiFileTextLine size={18} />
              {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
            </FileInfo>
          ) : (
            <div>
              <DropzoneSubtext>
                Click to browse or drag & drop CSV file here
              </DropzoneSubtext>
              <DropzoneHintText>Supports CSV format up to 5MB</DropzoneHintText>
            </div>
          )}
        </DropZone>

        {parsedRows.length > 0 && (
          <div>
            <PreviewHeader>
              <PreviewHeaderTitle>Parsed Rows Preview ({parsedRows.length} total)</PreviewHeaderTitle>
              <Badge variant="info">{validCount} Ready for import</Badge>
            </PreviewHeader>
            <TablePreviewScroll>
              <Table columns={columns} data={parsedRows} keyExtractor={row => row.counselorId || row.email} />
            </TablePreviewScroll>
          </div>
        )}
      </Container>
    </Modal>
  );
};
