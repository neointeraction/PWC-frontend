import React, { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { projectService } from '@/services/project.service';
import { CounselorSession, ProjectSlot } from '@/types/project.types';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.textSecondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const InfoBox = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryLight};
  border: 1px solid ${({ theme }) => theme.colors.primaryMuted};
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: 4px;

  span:first-child {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.primary};
  }

  span:last-child {
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const FooterActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

interface AssignStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: CounselorSession | null;
  slot: ProjectSlot | null;
  projectId?: string;
  onSave: (input: { studentId: string; sessionType: 'S1' | 'S2' }) => void;
  isSaving?: boolean;
}


export const AssignStudentModal: React.FC<AssignStudentModalProps> = ({
  isOpen,
  onClose,
  session,
  slot,
  projectId,
  onSave,
  isSaving,
}) => {
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [sessionType, setSessionType] = useState<'S1' | 'S2'>('S1');
  const [mobile, setMobile] = useState<string>('');

  // The dropdown is the project's own roster; the value is the student id the booking
  // endpoint needs, not a display name.
  const { data: students = [] } = useQuery({
    queryKey: ['projectStudents', projectId],
    queryFn: () => projectService.getProjectStudents(projectId as string),
    enabled: Boolean(projectId) && isOpen,
  });

  const studentOptions = useMemo(
    () =>
      students.map(student => ({
        value: student.id,
        label: `${student.name} (${student.grade || 'Class —'} • ${student.mobile || '—'})`,
      })),
    [students]
  );

  useEffect(() => {
    if (!slot) return;
    const booked = slot.isBooked ? students.find(student => student.id === slot.studentId) : undefined;
    const initial = booked ?? students[0];
    setSelectedStudent(initial?.id ?? '');
    setSessionType(slot.sessionType || 'S1');
    setMobile(booked?.mobile ?? slot.mobile ?? initial?.mobile ?? '');
  }, [slot, students]);

  const handleStudentChange = (e: { target: { value: string } }) => {
    const id = e.target.value;
    setSelectedStudent(id);
    setMobile(students.find(student => student.id === id)?.mobile ?? '');
  };

  const handleSave = () => {
    if (!slot || !selectedStudent) return;
    onSave({ studentId: selectedStudent, sessionType });
  };

  if (!session || !slot) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Assign Student to Counselor Schedule"
      size="md"
    >
      <FormContainer>
        <InfoBox>
          <span>Counselor &amp; Available Session Slot</span>
          <span>
            {session.counselorName} • {slot.date} @ {slot.time}
          </span>
        </InfoBox>

        <FieldGroup>
          <label>Select Student</label>
          <Select
            options={studentOptions}
            value={selectedStudent}
            onChange={handleStudentChange}
          />
        </FieldGroup>

        <FieldGroup>
          <label>Session Type</label>
          <Select
            options={[
              { value: 'S1', label: 'Session 1 (S1) - Initial Counseling' },
              { value: 'S2', label: 'Session 2 (S2) - Roadmap Review' },
            ]}
            value={sessionType}
            onChange={e => setSessionType(e.target.value as 'S1' | 'S2')}
          />
        </FieldGroup>

        <FieldGroup>
          <label>Student Contact Phone</label>
          <Input
            value={mobile}
            onChange={e => setMobile(e.target.value)}
            placeholder="+91 Mobile number"
          />
        </FieldGroup>

        <FooterActions>
          <Button variant="secondary" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            isLoading={isSaving}
            disabled={!selectedStudent}
          >
            Save Schedule
          </Button>
        </FooterActions>
      </FormContainer>
    </Modal>
  );
};
