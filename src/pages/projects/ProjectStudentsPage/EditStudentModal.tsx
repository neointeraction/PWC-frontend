import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RiInformationLine } from 'react-icons/ri';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Checkbox } from '@/components/Checkbox';
import { ProjectStudentDetail } from '@/types/project.types';
import { useToast } from '@/hooks';

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

  useEffect(() => {
    if (student) {
      const copy = JSON.parse(JSON.stringify(student)) as ProjectStudentDetail;
      if (!copy.parentMobile) {
        copy.parentMobile = '+91 9820011223';
      }
      if (!copy.className) {
        const gradeDigits = copy.grade?.replace(/\D/g, '') || '9';
        copy.className = gradeDigits;
      }
      if (!copy.division) {
        copy.division = `${copy.className || '9'}A`;
      }
      setFormData(copy);
      setOriginalEmail(copy.email || '');
      setSendWelcomeEmail(true);
    }
  }, [student]);

  if (!formData) return null;

  const isEmailChanged =
    originalEmail.trim() !== '' && formData.email.trim() !== originalEmail.trim();

  const handleSave = () => {
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
              label="Student Full Name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
            <div>
              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
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
            />
            <Input
              label="Parent Phone Number"
              placeholder="+91 9820011223"
              value={formData.parentMobile || ''}
              onChange={e => setFormData({ ...formData, parentMobile: e.target.value })}
            />

            <Input
              label="Class"
              placeholder="e.g. 11"
              value={formData.className || ''}
              onChange={e => setFormData({ ...formData, className: e.target.value })}
            />

            <Input
              label="Division"
              placeholder="e.g. 11A"
              value={formData.division || ''}
              onChange={e => setFormData({ ...formData, division: e.target.value })}
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
