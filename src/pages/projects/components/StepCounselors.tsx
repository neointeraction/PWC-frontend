import React, { useState, useCallback } from 'react';
import { Badge } from '@/components/Badge';
import { FileUpload } from '@/components/FileUpload';
import { Table, Column } from '@/components/Table';
import { useProjectStore } from '@/store/project.store';
import { projectService } from '@/services/project.service';
import { parseExcelFile } from '@/utils/excelParser';
import { ProjectCounselor } from '@/types/project.types';
import { useToast } from '@/hooks';
import {
  StepFormContainer,
  StepSubtitle,
  PreviewTableWrapper,
  SummaryRow,
  SummaryText,
  SummaryCount,
} from './AddProjectWizard.styles';

export const StepCounselors: React.FC = () => {
  const { counselors, setCounselors } = useProjectStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const toast = useToast();

  const handleFileSelect = useCallback(
    async (file: File) => {
      setSelectedFile(file);
      setIsProcessing(true);

      try {
        const rows = await parseExcelFile(file);

        if (rows.length === 0) {
          toast.error('Empty File', 'The uploaded file contains no data rows.');
          setIsProcessing(false);
          return;
        }

        const rawCounselors = rows.map(row => ({
          name: row['Name'] || row['name'] || '',
          email: row['Email'] || row['email'] || '',
          mobile: row['Mobile'] || row['mobile'] || row['Phone'] || row['phone'] || '',
        }));

        const validCounselors = rawCounselors.filter(c => c.name && c.email);

        if (validCounselors.length === 0) {
          toast.error(
            'Invalid Format',
            'No valid counselor records found. Ensure columns: Name, Email, Mobile.'
          );
          setIsProcessing(false);
          return;
        }

        const validated = await projectService.validateCounselors(validCounselors);
        setCounselors(validated);
        toast.success(
          'Counselors Loaded',
          `${validated.length} counselor(s) processed successfully.`
        );
      } catch {
        toast.error('Parse Error', 'Failed to parse the uploaded file.');
      } finally {
        setIsProcessing(false);
      }
    },
    [setCounselors, toast]
  );

  const handleFileRemove = useCallback(() => {
    setSelectedFile(null);
    setCounselors([]);
  }, [setCounselors]);

  const matchedCount = counselors.filter(c => c.matchStatus === 'matched').length;
  const newCount = counselors.filter(c => c.matchStatus === 'new').length;

  const columns: Column<ProjectCounselor>[] = [
    {
      key: 'name',
      header: 'Name',
    },
    {
      key: 'email',
      header: 'Email',
    },
    {
      key: 'mobile',
      header: 'Mobile',
    },
    {
      key: 'matchStatus',
      header: 'Status',
      render: row => (
        <Badge variant={row.matchStatus === 'matched' ? 'success' : 'warning'}>
          {row.matchStatus === 'matched' ? 'Matched' : 'New'}
        </Badge>
      ),
    },
  ];

  return (
    <StepFormContainer>
      <StepSubtitle>
        Upload a CSV/Excel file with counselor details. The system will validate against existing
        counselor records.
      </StepSubtitle>

      <FileUpload
        label="Counselor List"
        hint="CSV with columns: Name, Email, Mobile"
        onFileSelect={handleFileSelect}
        onFileRemove={handleFileRemove}
        selectedFile={selectedFile}
      />

      {counselors.length > 0 && (
        <PreviewTableWrapper>
          <SummaryRow>
            <SummaryText>
              <SummaryCount>{matchedCount}</SummaryCount> matched
            </SummaryText>
            <SummaryText>•</SummaryText>
            <SummaryText>
              <SummaryCount>{newCount}</SummaryCount> new counselors
            </SummaryText>
            <SummaryText>•</SummaryText>
            <SummaryText>
              <SummaryCount>{counselors.length}</SummaryCount> total
            </SummaryText>
          </SummaryRow>

          <Table
            columns={columns}
            data={counselors}
            isLoading={isProcessing}
            keyExtractor={row => row.email}
            emptyMessage="No counselors uploaded yet."
          />
        </PreviewTableWrapper>
      )}
    </StepFormContainer>
  );
};
