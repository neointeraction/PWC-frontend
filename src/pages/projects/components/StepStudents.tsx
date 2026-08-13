import React, { useState, useCallback } from 'react';
import { RiAddLine, RiDeleteBinLine } from 'react-icons/ri';
import { FileUpload } from '@/components/FileUpload';
import { Table, Column } from '@/components/Table';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Tooltip } from '@/components/Tooltip';
import { useProjectStore } from '@/store/project.store';
import { parseExcelFile } from '@/utils/excelParser';
import { ProjectStudent } from '@/types/project.types';
import { useToast } from '@/hooks';
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
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStudent, setNewStudent] = useState<ProjectStudent>({
    name: '',
    email: '',
    mobile: '',
    grade: 'Grade 11',
  });
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

        setStudents([...students, ...validStudents]);
        toast.success(
          'Students Loaded',
          `${validStudents.length} student(s) added successfully.`
        );
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

  const handleAddManualStudent = () => {
    if (!newStudent.name.trim() || !newStudent.email.trim()) {
      toast.error('Validation Error', 'Student Name and Email are required.');
      return;
    }
    setStudents([...students, { ...newStudent }]);
    setNewStudent({ name: '', email: '', mobile: '', grade: 'Grade 11' });
    setShowAddForm(false);
    toast.success('Student Added', `${newStudent.name} added to project list.`);
  };

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
        Upload a CSV/Excel file or add individual students to onboard them into this project.
      </StepSubtitle>

      <FileUpload
        label="Student List"
        hint="CSV with columns: Name, Email, Mobile, Grade"
        onFileSelect={handleFileSelect}
        onFileRemove={handleFileRemove}
        selectedFile={selectedFile}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
        <SummaryText>
          <SummaryCount>{students.length}</SummaryCount> students onboarded
        </SummaryText>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          leftIcon={<RiAddLine size={16} />}
          onClick={() => setShowAddForm(prev => !prev)}
        >
          {showAddForm ? 'Cancel Manual Add' : 'Add Student Manually'}
        </Button>
      </div>

      {showAddForm && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 120px auto',
            gap: '12px',
            alignItems: 'end',
            padding: '16px',
            backgroundColor: '#F9FAFB',
            borderRadius: '4px',
            border: '1px solid #E5E7EB',
            marginTop: '12px',
          }}
        >
          <Input
            label="Name"
            placeholder="e.g. Aarav Sharma"
            value={newStudent.name}
            onChange={e => setNewStudent({ ...newStudent, name: e.target.value })}
          />
          <Input
            label="Email"
            placeholder="aarav@example.com"
            value={newStudent.email}
            onChange={e => setNewStudent({ ...newStudent, email: e.target.value })}
          />
          <Input
            label="Mobile"
            placeholder="+91 98765 43210"
            value={newStudent.mobile}
            onChange={e => setNewStudent({ ...newStudent, mobile: e.target.value })}
          />
          <Input
            label="Grade"
            placeholder="Grade 11"
            value={newStudent.grade}
            onChange={e => setNewStudent({ ...newStudent, grade: e.target.value })}
          />
          <Button type="button" size="sm" onClick={handleAddManualStudent}>
            Add
          </Button>
        </div>
      )}

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
