import React, { useState, useCallback } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { Table, Column } from '@/components/Table';
import { useProjectStore } from '@/store/project.store';
import { parseExcelFile } from '@/utils/excelParser';
import { ProjectStudent } from '@/types/project.types';
import { useToast } from '@/hooks';
import {
  StepFormContainer,
  StepSubtitle,
  PreviewTableWrapper,
  SummaryRow,
  SummaryText,
  SummaryCount,
} from './AddProjectWizard.styles';

export const StepStudents: React.FC = () => {
  const { students, setStudents } = useProjectStore();
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

        const rawStudents: ProjectStudent[] = rows.map(row => ({
          name: row['Name'] || row['name'] || '',
          email: row['Email'] || row['email'] || '',
          mobile: row['Mobile'] || row['mobile'] || row['Phone'] || row['phone'] || '',
          grade: row['Grade'] || row['grade'] || row['Class'] || row['class'] || '',
        }));

        const validStudents = rawStudents.filter(s => s.name && s.email);

        if (validStudents.length === 0) {
          toast.error(
            'Invalid Format',
            'No valid student records found. Ensure columns: Name, Email, Mobile, Grade.'
          );
          setIsProcessing(false);
          return;
        }

        setStudents(validStudents);
        toast.success(
          'Students Loaded',
          `${validStudents.length} student(s) loaded successfully.`
        );
      } catch {
        toast.error('Parse Error', 'Failed to parse the uploaded file.');
      } finally {
        setIsProcessing(false);
      }
    },
    [setStudents, toast]
  );

  const handleFileRemove = useCallback(() => {
    setSelectedFile(null);
    setStudents([]);
  }, [setStudents]);

  const columns: Column<ProjectStudent>[] = [
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
      key: 'grade',
      header: 'Grade',
    },
  ];

  return (
    <StepFormContainer>
      <StepSubtitle>
        Upload a CSV/Excel file with student details to onboard them into this project.
      </StepSubtitle>

      <FileUpload
        label="Student List"
        hint="CSV with columns: Name, Email, Mobile, Grade"
        onFileSelect={handleFileSelect}
        onFileRemove={handleFileRemove}
        selectedFile={selectedFile}
      />

      {students.length > 0 && (
        <PreviewTableWrapper>
          <SummaryRow>
            <SummaryText>
              <SummaryCount>{students.length}</SummaryCount> students ready to onboard
            </SummaryText>
          </SummaryRow>

          <Table
            columns={columns}
            data={students}
            isLoading={isProcessing}
            keyExtractor={row => row.email}
            emptyMessage="No students uploaded yet."
          />
        </PreviewTableWrapper>
      )}
    </StepFormContainer>
  );
};
