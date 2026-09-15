import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ProjectStudentDetail } from '@/types/project.types';
import { useToast } from '@/hooks';
import { isValidEmail, isValidPhone } from '@/utils';

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
  const toast = useToast();
  const [formData, setFormData] = useState<ProjectStudentDetail | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isEditing = Boolean(student?.id);

  useEffect(() => {
    if (student) {
      const copy = JSON.parse(JSON.stringify(student)) as ProjectStudentDetail;
      setFormData(copy);
      setErrors({});
    }
  }, [student]);

  if (!formData) return null;

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};
    if (!formData.id && !formData.studentId?.trim()) {
      nextErrors.studentId = 'Student ID is required.';
    }
    if (!formData.name.trim()) nextErrors.name = 'Student name is required.';
    if (!formData.email.trim()) nextErrors.email = 'Email address is required.';
    else if (!isValidEmail(formData.email)) nextErrors.email = 'Enter a valid email address.';
    if (!isValidPhone(formData.mobile)) nextErrors.mobile = 'Enter a valid mobile number.';
    if (formData.parentMobile && !isValidPhone(formData.parentMobile)) {
      nextErrors.parentMobile = 'Enter a valid parent phone number.';
    }
    if (formData.whatsappNumber && !isValidPhone(formData.whatsappNumber)) {
      nextErrors.whatsappNumber = 'Enter a valid WhatsApp number.';
    }
    if (formData.parentEmail && !isValidEmail(formData.parentEmail)) {
      nextErrors.parentEmail = 'Enter a valid parent email address.';
    }
    if (!formData.className?.trim()) nextErrors.className = 'Class is required.';
    if (!formData.division?.trim()) nextErrors.division = 'Division is required.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
      toast.error('Missing Information', 'Please fix the highlighted fields and try again.');
      return;
    }

    // Keep grade in sync with className & division
    const updated: ProjectStudentDetail = {
      ...formData,
      grade: formData.className
        ? `Grade ${formData.className} (${formData.division || 'A'})`
        : formData.grade,
    };

    onSave(updated);
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
              label="Student ID *"
              value={formData.studentId || ''}
              onChange={e => setFormData({ ...formData, studentId: e.target.value })}
              error={errors.studentId}
            />
            <Input
              label="Student Full Name *"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
            />
            <Input
              label="Email Address *"
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
              readOnly={isEditing}
              disabled={isEditing}
              hint={isEditing ? 'Login email cannot be changed here.' : undefined}
            />

            <Input
              label="Mobile Number *"
              value={formData.mobile}
              onChange={e => setFormData({ ...formData, mobile: e.target.value })}
              error={errors.mobile}
            />
            <Input
              label="WhatsApp Number (if different)"
              value={formData.whatsappNumber || ''}
              onChange={e => setFormData({ ...formData, whatsappNumber: e.target.value })}
              error={errors.whatsappNumber}
            />

            <Input
              label="Class *"
              value={formData.className || ''}
              onChange={e => setFormData({ ...formData, className: e.target.value })}
              error={errors.className}
            />

            <Input
              label="Division *"
              value={formData.division || ''}
              onChange={e => setFormData({ ...formData, division: e.target.value })}
              error={errors.division}
            />

            <Input
              label="Parent Name"
              value={formData.parentName || ''}
              onChange={e => setFormData({ ...formData, parentName: e.target.value })}
              error={errors.parentName}
            />

            <Input
              label="Parent Email Address"
              type="email"
              value={formData.parentEmail || ''}
              onChange={e => setFormData({ ...formData, parentEmail: e.target.value })}
              error={errors.parentEmail}
            />

            <Input
              label="Parent Phone Number"
              value={formData.parentMobile || ''}
              onChange={e => setFormData({ ...formData, parentMobile: e.target.value })}
              error={errors.parentMobile}
            />
          </FormGrid>
        </SectionBox>
      </FormContainer>
    </Modal>
  );
};

export default EditStudentModal;
