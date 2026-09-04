import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RiInformationLine } from 'react-icons/ri';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Checkbox } from '@/components/Checkbox';
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

const EmailNoticeCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  border: 1px solid ${({ theme }) => theme.colors.primary}33;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1.4;
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
  const [originalEmail, setOriginalEmail] = useState<string>('');
  const [sendWelcomeEmail, setSendWelcomeEmail] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (student) {
      const copy = JSON.parse(JSON.stringify(student)) as ProjectStudentDetail;
      setFormData(copy);
      setOriginalEmail(copy.email || '');
      setSendWelcomeEmail(true);
      setErrors({});
    }
  }, [student]);

  if (!formData) return null;

  const isEmailChanged =
    originalEmail.trim() !== '' && formData.email.trim() !== originalEmail.trim();

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

    if (isEmailChanged && sendWelcomeEmail) {
      toast.info(
        'Welcome Email Sent',
        `A new welcome email with login credentials has been sent to ${formData.email}.`
      );
    }

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
              label="Student ID"
              value={formData.studentId || ''}
              onChange={e => setFormData({ ...formData, studentId: e.target.value })}
              error={errors.studentId}
            />
            <Input
              label="Student Full Name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
            />
            <div>
              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                error={errors.email}
              />
              {isEmailChanged && (
                <div style={{ marginTop: '6px' }}>
                  <Checkbox
                    id="send-welcome-email-checkbox"
                    checked={sendWelcomeEmail}
                    onChange={e => setSendWelcomeEmail(e.target.checked)}
                    label="Send new welcome email to updated address"
                  />
                </div>
              )}
            </div>

            <Input
              label="Mobile Number"
              value={formData.mobile}
              onChange={e => setFormData({ ...formData, mobile: e.target.value })}
              error={errors.mobile}
            />
            <Input
              label="Parent Phone Number"
              value={formData.parentMobile || ''}
              onChange={e => setFormData({ ...formData, parentMobile: e.target.value })}
              error={errors.parentMobile}
            />
            <Input
              label="WhatsApp Number (if different)"
              value={formData.whatsappNumber || ''}
              onChange={e => setFormData({ ...formData, whatsappNumber: e.target.value })}
              error={errors.whatsappNumber}
            />

            <Input
              label="Class"
              value={formData.className || ''}
              onChange={e => setFormData({ ...formData, className: e.target.value })}
              error={errors.className}
            />

            <Input
              label="Division"
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
          </FormGrid>

          {isEmailChanged && (
            <EmailNoticeCard>
              <RiInformationLine size={18} style={{ flexShrink: 0, marginTop: 1 }} />
              <div>
                <strong>Email Address Modified:</strong> If the email is changed, a new welcome
                email with updated login instructions will automatically be dispatched to{' '}
                <em>{formData.email}</em>.
              </div>
            </EmailNoticeCard>
          )}
        </SectionBox>
      </FormContainer>
    </Modal>
  );
};

export default EditStudentModal;
