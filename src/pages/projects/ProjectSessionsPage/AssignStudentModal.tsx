import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { CounselorSession } from '@/types/project.types';

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

export interface SlotData {
  id: string;
  date: string;
  time: string;
  studentName?: string;
  sessionType?: 'S1' | 'S2';
  mobile?: string;
  isBooked: boolean;
}

interface AssignStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: CounselorSession | null;
  slot: SlotData | null;
  onSave: (slotId: string, updatedSlot: Partial<SlotData>) => void;
}

const mockStudentOptions = [
  { value: 'Ananya Roy', label: 'Ananya Roy (Grade 11 • +91 9810012345)' },
  { value: 'Rohan Menon', label: 'Rohan Menon (Grade 12 • +91 9810024690)' },
  { value: 'Priya Rao', label: 'Priya Rao (Grade 10 • +91 9810037035)' },
  { value: 'Siddharth Pillai', label: 'Siddharth Pillai (Grade 11 • +91 9810049380)' },
  { value: 'Diya Nair', label: 'Diya Nair (Grade 11 • +91 9810055441)' },
  { value: 'Aarav Sharma', label: 'Aarav Sharma (Grade 12 • +91 9810066772)' },
  { value: 'Vihaan Iyer', label: 'Vihaan Iyer (Grade 12 • +91 9810077883)' },
  { value: 'Kavya Patel', label: 'Kavya Patel (Grade 10 • +91 9810088994)' },
];

export const AssignStudentModal: React.FC<AssignStudentModalProps> = ({
  isOpen,
  onClose,
  session,
  slot,
  onSave,
}) => {
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [sessionType, setSessionType] = useState<'S1' | 'S2'>('S1');
  const [mobile, setMobile] = useState<string>('');

  useEffect(() => {
    if (slot && slot.isBooked) {
      setSelectedStudent(slot.studentName || 'Ananya Roy');
      setSessionType(slot.sessionType || 'S1');
      setMobile(slot.mobile || '+91 9810012345');
    } else {
      setSelectedStudent('Ananya Roy');
      setSessionType('S1');
      setMobile('+91 9810012345');
    }
  }, [slot]);

  const handleStudentChange = (e: { target: { value: string } }) => {
    const name = e.target.value;
    setSelectedStudent(name);
    if (name === 'Ananya Roy') setMobile('+91 9810012345');
    else if (name === 'Rohan Menon') setMobile('+91 9810024690');
    else if (name === 'Priya Rao') setMobile('+91 9810037035');
    else if (name === 'Siddharth Pillai') setMobile('+91 9810049380');
    else setMobile('+91 9810055441');
  };

  const handleSave = () => {
    if (!slot) return;
    onSave(slot.id, {
      studentName: selectedStudent,
      sessionType,
      mobile,
      isBooked: true,
    });
    onClose();
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
            options={mockStudentOptions}
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
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Schedule
          </Button>
        </FooterActions>
      </FormContainer>
    </Modal>
  );
};
