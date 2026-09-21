import React, { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RiDeleteBinLine, RiUserAddLine } from 'react-icons/ri';
import styled from 'styled-components';
import { Modal } from '@/components/Modal';
import { FileUpload } from '@/components/FileUpload';
import { Table, Column } from '@/components/Table';
import { Button } from '@/components/Button';
import { Tooltip } from '@/components/Tooltip';
import { projectService } from '@/services/project.service';
import { parseExcelFile } from '@/utils/excelParser';
import { ProjectStudent } from '@/types/project.types';
import { useToast } from '@/hooks';
import { getApiErrorMessage } from '@/utils';
import { mapStudentSheetRows, validateStudentRows, studentRowLabel } from './studentSheet';

const ModalBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SummaryRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const RemoveButton = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.danger};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.danger};
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

interface BulkUploadStudentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

// Bulk-add students to an existing project from the standard roster sheet — same columns and
// validation as the create-project wizard's student step (see ./studentSheet).
export const BulkUploadStudentsModal: React.FC<BulkUploadStudentsModalProps> = ({
  isOpen,
  onClose,
  projectId,
}) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [studentList, setStudentList] = useState<ProjectStudent[]>([]);
  const [skippedCount, setSkippedCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const reset = () => {
    setSelectedFile(null);
    setStudentList([]);
    setSkippedCount(0);
  };

  const handleClose = () => {
    if (addMutation.isPending) return;
    reset();
    onClose();
  };

  const handleFileSelect = useCallback(
    async (file: File) => {
      setSelectedFile(file);
      setIsProcessing(true);
      try {
        const rows = await parseExcelFile(file);
        if (rows.length === 0) {
          toast.error('Empty File', 'The uploaded file contains no data rows.');
          return;
        }

        const { validStudents, invalid } = validateStudentRows(mapStudentSheetRows(rows));
        if (validStudents.length === 0) {
          toast.error(
            'Invalid Format',
            'No valid student records found. Required columns: Student ID, Name, Email, Mobile, Class, Division.'
          );
          return;
        }

        // Email, Student ID and mobile are each globally unique on the backend, so reject rows
        // that already exist in ANY project before trying to create them.
        let duplicateCheck;
        try {
          duplicateCheck = await projectService.checkDuplicateStudents(validStudents);
        } catch {
          toast.error(
            'Duplicate Check Failed',
            'Could not verify students against existing records. Please try again.'
          );
          return;
        }
        const duplicateIndexes = new Set(duplicateCheck.filter(r => r.isDuplicate).map(r => r.index));
        const newStudents = validStudents.filter((_, i) => !duplicateIndexes.has(i));
        const duplicates = validStudents
          .map((s, i) => ({ row: s, index: i }))
          .filter(({ index }) => duplicateIndexes.has(index));

        if (newStudents.length === 0) {
          toast.error(
            'Duplicate Students',
            `All ${duplicates.length} student(s) already exist in the system — none can be added.`
          );
          return;
        }

        // Merge with anything already staged from an earlier file, skipping repeats.
        setStudentList(prev => {
          const seen = new Set(prev.map(s => s.email.toLowerCase()));
          return [...prev, ...newStudents.filter(s => !seen.has(s.email.toLowerCase()))];
        });

        const skipped = invalid.length + duplicates.length;
        setSkippedCount(prev => prev + skipped);
        if (skipped > 0) {
          const duplicateReasons = duplicates.map(({ row, index }) => {
            const match = duplicateCheck.find(r => r.index === index)?.matches[0];
            return {
              row,
              index,
              reason: match
                ? `already exists in "${match.projectName}" (${match.field})`
                : 'already exists',
            };
          });
          toast.warning(
            'Some Rows Skipped',
            `${newStudents.length} student(s) ready to add. ${skipped} skipped — ` +
              [...invalid, ...duplicateReasons]
                .slice(0, 3)
                .map(f => `${studentRowLabel(f.row, f.index)}: ${f.reason}`)
                .join(' · ') +
              (skipped > 3 ? ` (and ${skipped - 3} more)` : '')
          );
        }
      } catch {
        toast.error('Parse Error', 'Failed to parse the uploaded file.');
      } finally {
        setIsProcessing(false);
      }
    },
    [toast]
  );

  const handleFileRemove = useCallback(() => {
    reset();
  }, []);

  const handleRemoveStudent = (row: ProjectStudent) => {
    setStudentList(prev => prev.filter(s => s.email !== row.email));
  };

  const addMutation = useMutation({
    mutationFn: () => projectService.addStudentsToProject(projectId, studentList),
    onSuccess: ({ created, failed }) => {
      queryClient.invalidateQueries({ queryKey: ['projectStudents', projectId] });
      // The Total Students card reads the project's `_count`, not the student list.
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });

      if (failed.length === 0) {
        toast.success('Students Added', `${created} student(s) added to this project.`);
        reset();
        onClose();
        return;
      }

      const detail =
        failed
          .slice(0, 3)
          .map(f => `${f.student.name || f.student.email}: ${f.reason}`)
          .join(' · ') + (failed.length > 3 ? ` (and ${failed.length - 3} more)` : '');
      toast.warning(
        created > 0 ? 'Some Students Not Added' : 'No Students Added',
        `${created} added, ${failed.length} failed — ${detail}`
      );
      // Keep only the failures staged so the admin can see what's left.
      const failedEmails = new Set(failed.map(f => f.student.email));
      setStudentList(prev => prev.filter(s => failedEmails.has(s.email)));
    },
    onError: err => {
      toast.error('Upload Failed', getApiErrorMessage(err, 'Could not add students to this project.'));
    },
  });

  const columns: Column<ProjectStudent>[] = [
    { key: 'studentId', header: 'Student ID' },
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'mobile', header: 'Mobile' },
    {
      key: 'grade',
      header: 'Class',
      render: row => [row.grade, row.division].filter(Boolean).join(' - ') || '—',
    },
    {
      key: 'actions',
      header: 'Action',
      width: '60px',
      render: row => (
        <Tooltip content="Remove Student">
          <RemoveButton
            type="button"
            aria-label="Remove Student"
            disabled={addMutation.isPending}
            onClick={() => handleRemoveStudent(row)}
          >
            <RiDeleteBinLine size={16} />
          </RemoveButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Bulk Upload Students"
      subtitle="Upload a student roster to add students to this project"
      size="lg"
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', width: '100%' }}>
          <Button variant="secondary" onClick={handleClose} disabled={addMutation.isPending}>
            Cancel
          </Button>
          <Button
            onClick={() => addMutation.mutate()}
            disabled={studentList.length === 0}
            isLoading={addMutation.isPending}
            leftIcon={<RiUserAddLine size={16} />}
          >
            Add {studentList.length > 0 ? `(${studentList.length})` : ''} Students
          </Button>
        </div>
      }
    >
      <ModalBodyWrapper>
        <FileUpload
          label="Student List"
          hint="CSV/Excel with columns: Student ID, Name, Email, Mobile, Class, Division (required) — Father Name/Mobile/Email, WhatsApp Number, Password (optional)"
          onFileSelect={handleFileSelect}
          onFileRemove={handleFileRemove}
          selectedFile={selectedFile}
        />

        <SummaryRow>
          <span>
            <strong>{studentList.length}</strong> ready to add
          </span>
          <span>•</span>
          <span>
            <strong>{skippedCount}</strong> skipped
          </span>
        </SummaryRow>

        {studentList.length > 0 && (
          <div style={{ marginTop: '12px' }}>
            <Table
              columns={columns}
              data={studentList}
              isLoading={isProcessing}
              keyExtractor={row => row.email || row.name}
              emptyMessage="No students added yet."
            />
          </div>
        )}
      </ModalBodyWrapper>
    </Modal>
  );
};

export default BulkUploadStudentsModal;
