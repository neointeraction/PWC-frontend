import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { ProjectStudentDetail } from '@/types/project.types';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const SectionBox = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceHover};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SectionTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

interface EditStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: ProjectStudentDetail | null;
  onSave: (updated: ProjectStudentDetail) => void;
  isSaving?: boolean;
}

export const EditStudentModal: React.FC<EditStudentModalProps> = ({
  isOpen,
  onClose,
  student,
  onSave,
  isSaving,
}) => {
  const [formData, setFormData] = useState<ProjectStudentDetail | null>(null);

  useEffect(() => {
    if (student) {
      const copy = JSON.parse(JSON.stringify(student));
      if (!copy.parentMobile) {
        copy.parentMobile = '+91 9820011223';
      }
      setFormData(copy);
    }
  }, [student]);

  if (!formData) return null;

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={student?.id ? 'Edit Student' : 'Add Student'}
      size="md"
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', width: '100%' }}>
          <Button variant="secondary" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSave} isLoading={isSaving}>
            Save Changes
          </Button>
        </div>
      }
    >
      <FormContainer>
        {/* Student Information Section */}
        <SectionBox>
          <SectionTitle>Student Information</SectionTitle>
          <FormGrid>
            <Input
              label="Student Full Name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
              label="Mobile Number"
              value={formData.mobile}
              onChange={e => setFormData({ ...formData, mobile: e.target.value })}
            />
            <Input
              label="Parent Phone Number"
              placeholder="+91 9820011223"
              value={formData.parentMobile || ''}
              onChange={e => setFormData({ ...formData, parentMobile: e.target.value })}
            />
            <Select
              label="Grade / Class"
              value={formData.grade}
              onChange={e => setFormData({ ...formData, grade: e.target.value })}
              options={[
                { value: '10th', label: '10th Grade' },
                { value: '11th', label: '11th Grade' },
                { value: '12th', label: '12th Grade' },
              ]}
            />
          </FormGrid>
        </SectionBox>
      </FormContainer>
    </Modal>
  );
};

export default EditStudentModal;
