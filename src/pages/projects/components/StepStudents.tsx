import React, { useState, useCallback } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FileUpload } from '@/components/FileUpload';
import { Table, Column } from '@/components/Table';
import { Tooltip } from '@/components/Tooltip';
import { useProjectStore } from '@/store/project.store';
import { parseExcelFile } from '@/utils/excelParser';
import { ProjectStudent } from '@/types/project.types';
import { useToast } from '@/hooks';
import { isValidEmail, isValidPhone } from '@/utils';
import { ActionIconButton } from '../Projects.styles';
import {
  StepFormContainer,
  StepSubtitle,
  PreviewTableWrapper,
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
          studentId:
            row['Student ID'] || row['Student Id'] || row['studentId'] || row['StudentID'] || '',
          name: row['Student Name'] || row['Name'] || row['name'] || '',
          email: row['Student Email ID'] || row['Email'] || row['email'] || '',
          mobile:
            row['Student Mobile No.'] || row['Mobile'] || row['mobile'] || row['Phone'] || '',
          grade: row['Class'] || row['Grade'] || row['grade'] || row['class'] || '',
          division: row['Division'] || row['division'] || '',
          parentName: row['Parent Name'] || row['parentName'] || '',
          parentMobile:
            row['Parent Mobile No.'] || row['Parent Mobile'] || row['parentMobile'] || '',
          parentEmail: row['Parent Email ID'] || row['Parent Email'] || row['parentEmail'] || '',
          password:
            row['Password'] || row['password'] || row['Temp Password'] || row['PWD'] || '',
        }));

        // Student ID, Name, Email, Mobile, Class and Division are mandatory —
        // everything else (parent details, password) is optional.
        const rowLabel = (s: ProjectStudent, i: number) => s.name || s.email || `Row ${i + 2}`;
        const invalid: { row: ProjectStudent; index: number; reason: string }[] = [];
        const validStudents = rawStudents.filter((s, i) => {
          if (!s.studentId) {
            invalid.push({ row: s, index: i, reason: 'missing Student ID' });
            return false;
          }
          if (!s.name) {
            invalid.push({ row: s, index: i, reason: 'missing Name' });
            return false;
          }
          if (!s.email || !isValidEmail(s.email)) {
            invalid.push({ row: s, index: i, reason: 'missing/invalid Email' });
            return false;
          }
          if (!s.mobile || !isValidPhone(s.mobile)) {
            invalid.push({ row: s, index: i, reason: 'missing/invalid Mobile' });
            return false;
          }
          if (!s.grade) {
            invalid.push({ row: s, index: i, reason: 'missing Class' });
            return false;
          }
          if (!s.division) {
            invalid.push({ row: s, index: i, reason: 'missing Division' });
            return false;
          }
          return true;
        });

        if (validStudents.length === 0) {
          toast.error(
            'Invalid Format',
            'No valid student records found. Required columns: Student ID, Name, Email, Mobile, Class, Division.'
          );
          setIsProcessing(false);
          return;
        }

        setStudents([...students, ...validStudents]);
        if (invalid.length > 0) {
          toast.warning(
            'Some Rows Skipped',
            `${validStudents.length} student(s) added. ${invalid.length} skipped — ` +
              invalid
                .slice(0, 3)
                .map(f => `${rowLabel(f.row, f.index)}: ${f.reason}`)
                .join(' · ') +
              (invalid.length > 3 ? ` (and ${invalid.length - 3} more)` : '')
          );
        } else {
          toast.success(
            'Students Loaded',
            `${validStudents.length} student(s) added successfully.`
          );
        }
      } catch {
        toast.error('Parse Error', 'Failed to parse the uploaded file.');
      } finally {
        setIsProcessing(false);
      }
    },
    [students, setStudents, toast]
  );

  const handleFileRemove = useCallback(() => {
    setSelectedFile(null);
  }, []);

  const handleRemoveStudent = (row: ProjectStudent) => {
    const updated = students.filter(s => s.email !== row.email);
    setStudents(updated);
    toast.success('Student Removed', 'Student removed from project.');
  };

  const columns: Column<ProjectStudent>[] = [
    {
      key: 'studentId',
      header: 'Student ID',
    },
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
    {
      key: 'actions',
      header: 'Action',
      render: row => (
        <Tooltip content="Remove Student">
          <ActionIconButton
            type="button"
            aria-label="Remove Student"
            onClick={() => handleRemoveStudent(row)}
          >
            <RiDeleteBinLine size={16} />
          </ActionIconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <StepFormContainer>
      <StepSubtitle>
        Upload a CSV/Excel file to onboard students into this project.
      </StepSubtitle>

      <FileUpload
        label="Student List"
        hint="CSV with columns: Student ID, Name, Email, Mobile, Class, Division (required) — Parent Name/Mobile/Email, Password (optional)"
        onFileSelect={handleFileSelect}
        onFileRemove={handleFileRemove}
        selectedFile={selectedFile}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
        <SummaryText>
          <SummaryCount>{students.length}</SummaryCount> students onboarded
        </SummaryText>
      </div>

      {students.length > 0 && (
        <PreviewTableWrapper style={{ marginTop: '12px' }}>
          <Table
            columns={columns}
            data={students}
            isLoading={isProcessing}
            keyExtractor={row => row.email || row.name}
            emptyMessage="No students added yet."
          />
        </PreviewTableWrapper>
      )}
    </StepFormContainer>
  );
};
