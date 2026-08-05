import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { Modal } from '@/components/Modal';
import { studentService } from '@/services/student.service';
import { Loader } from '@/components/Loader';

interface PreCounsellingAnswersModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: string | null;
  studentName: string;
}

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md} 0;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
`;

const AnswerText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

const List = styled.ul`
  margin: 0;
  padding-left: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const PreCounsellingAnswersModal: React.FC<PreCounsellingAnswersModalProps> = ({
  isOpen,
  onClose,
  studentId,
  studentName,
}) => {
  const { data: answers, isLoading } = useQuery({
    queryKey: ['pre-counselling-form', studentId],
    queryFn: () => (studentId ? studentService.getPreCounsellingForm(studentId) : null),
    enabled: !!studentId && isOpen,
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Pre-Counselling Answers: ${studentName}`}
      size="md"
    >
      {isLoading ? (
        <ContentWrapper>
          <Loader />
        </ContentWrapper>
      ) : answers ? (
        <ContentWrapper>
          <Section>
            <SectionTitle>Career Interests</SectionTitle>
            {answers.careerInterests.length > 0 ? (
              <List>
                {answers.careerInterests.map((interest, i) => (
                  <li key={i}>{interest}</li>
                ))}
              </List>
            ) : (
              <AnswerText>None specified</AnswerText>
            )}
          </Section>

          <Section>
            <SectionTitle>Strengths</SectionTitle>
            {answers.strengths.length > 0 ? (
              <List>
                {answers.strengths.map((strength, i) => (
                  <li key={i}>{strength}</li>
                ))}
              </List>
            ) : (
              <AnswerText>None specified</AnswerText>
            )}
          </Section>

          <Section>
            <SectionTitle>Preferred Subjects</SectionTitle>
            {answers.preferredSubjects.length > 0 ? (
              <List>
                {answers.preferredSubjects.map((subject, i) => (
                  <li key={i}>{subject}</li>
                ))}
              </List>
            ) : (
              <AnswerText>None specified</AnswerText>
            )}
          </Section>

          <Section>
            <SectionTitle>Additional Notes</SectionTitle>
            <AnswerText>{answers.additionalNotes || 'None specified'}</AnswerText>
          </Section>
        </ContentWrapper>
      ) : (
        <EmptyState>No pre-counselling form answers found for this student.</EmptyState>
      )}
    </Modal>
  );
};
