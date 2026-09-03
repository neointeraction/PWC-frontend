import React, { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
import { Table, Column } from '@/components/Table';
import { Badge } from '@/components/Badge';
import { counselorService } from '@/services/counselor.service';
import { parseExcelFile } from '@/utils/excelParser';
import { isValidPhone } from '@/utils';
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

interface ParsedRow extends CreateCounselorInput {
  isValid: boolean;
  validationError?: string;
}

export const BulkUploadCounselorsModal: React.FC = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isBulkUploadModalOpen, closeBulkUploadModal } = useCounselorStore();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [parsedRows, setParsedRows] = useState<ParsedRow[]>([]);

  const bulkMutation = useMutation({
    mutationFn: counselorService.bulkCreate,
    onSuccess: ({ created, failures }) => {
      queryClient.invalidateQueries({ queryKey: ['counselors'] });
      queryClient.invalidateQueries({ queryKey: ['counselors-stats'] });
      // Rows are created one at a time and a rejected row is skipped, so report what was
      // actually written rather than calling a zero-row import a success.
      if (failures.length > 0) {
        const examples = failures.slice(0, 3).map(f => `${f.name}: ${f.reason}`).join(' · ');
        toast.error(
          created.length > 0 ? 'Partially Imported' : 'Nothing Imported',
          `${created.length} of ${created.length + failures.length} counselors imported. ` +
            `${failures.length} skipped — ${examples}` +
            (failures.length > 3 ? ` (and ${failures.length - 3} more)` : '')
        );
      } else {
        toast.success(
          'Bulk Upload Complete',
          `Successfully imported ${created.length} counselor records.`
        );
      }
      if (created.length > 0) {
        handleReset();
        closeBulkUploadModal();
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
      'Counsellor ID,PWD,Counsellor Name,Mobile No.,Email ID,Meeting Link\n' +
      'C014,,Anil Sharma,9876543210,anil.sharma@example.com,https://meet.google.com/abc-defg-hij\n' +
      'C015,,Sunita Roy,9812345678,sunita.roy@example.com,\n';

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'counselors_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Header-based mapping — reads the directory sheet columns (incl. the PWD password).
  const parseRows = (data: Record<string, string>[]) => {
    if (data.length === 0) {
      toast.error('Invalid File', 'The file appears to be empty or missing headers.');
      return;
    }
    const rows: ParsedRow[] = data.map((row, i) => {
      const counselorId = (
        row['Counsellor ID'] || row['Counselor ID'] || row['counsellorCode'] || `C${String(i + 1).padStart(3, '0')}`
      ).trim();
      const pwd = (row['PWD'] || row['Password'] || row['pwd'] || '').trim();
      const name = (row['Counsellor Name'] || row['Counselor Name'] || row['Name'] || '').trim();
      const mobile = (row['Mobile No.'] || row['Mobile'] || row['mobile'] || row['Phone'] || '').trim();
      const email = (row['Email ID'] || row['Email'] || row['email'] || '').trim();
      const meetingLink = (row['Meeting Link'] || row['GMeet / Zoom Link'] || row['meetingLink'] || '').trim();
      const hasName = Boolean(name);
      const hasEmail = Boolean(email && email.includes('@'));
      const hasMobile = isValidPhone(mobile);
      const isValid = hasName && hasEmail && hasMobile;
      const problems = [
        !hasName && 'name',
        !hasEmail && 'valid email',
        !hasMobile && (mobile ? 'valid mobile (E.164, e.g. 919876543210)' : 'mobile'),
      ].filter(Boolean);
      return {
        counselorId,
        name: name || 'Unknown Counselor',
        mobile,
        email: email || 'invalid@example.com',
        meetingLink: meetingLink || undefined,
        pwd: pwd || undefined,
        status: 'active',
        isValid,
        validationError: isValid ? undefined : `Missing or invalid: ${problems.join(', ')}`,
      };
    });
    setParsedRows(rows);
  };

  const handleFileSelect = async (file: File) => {
    if (!/\.(xlsx|xls|csv|txt)$/i.test(file.name)) {
      toast.error('Unsupported File', 'Please upload an Excel (.xlsx) or CSV file.');
      return;
    }
    setSelectedFile(file);
    try {
      const rows = await parseExcelFile(file);
      parseRows(rows);
    } catch {
      toast.error('Parse Error', 'Failed to parse the uploaded file.');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleUploadSubmit = () => {
    const validInputs = parsedRows.filter(r => r.isValid).map(({ isValid, validationError, ...rest }) => rest);
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
      key: 'meetingLink',
      header: 'Meeting Link',
      render: row => row.meetingLink || '—',
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
        <TemplateSection>
          <TemplateInfo>
            <h4>CSV Template Format</h4>
            <p>Headers required: Counsellor ID, PWD, Counsellor Name, Mobile No., Email ID, Meeting Link</p>
          </TemplateInfo>
          <Button variant="secondary" size="sm" leftIcon={<RiDownloadLine size={16} />} onClick={handleDownloadTemplate}>
            Download Sample CSV
          </Button>
        </TemplateSection>

        <input
          type="file"
          ref={fileInputRef}
          accept=".csv,.txt,.xlsx,.xls"
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
