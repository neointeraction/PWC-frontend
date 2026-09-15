import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { Modal } from '@/components/Modal';
import { formsService } from '@/services/forms.service';
import { formatAnswerValue } from '@/utils/exportXlsx';
import { Loader } from '@/components/Loader';

interface PreCounsellingAnswersModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: string | null;
  studentName: string;
}

// The org runs a single cohort today — same constant used by the student-facing form
// pages (PreCounsellingFormPage, ParentPreCounsellingFormPage) and project reports.
const COHORT = 'CLASS_9_10';

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
  const { data: template, isLoading: isTemplateLoading } = useQuery({
    queryKey: ['form-template', 'PRE_COUNSELLING_STUDENT', COHORT],
    queryFn: () => formsService.getTemplate('PRE_COUNSELLING_STUDENT', COHORT),
    enabled: isOpen,
  });

  const { data: submission, isLoading: isSubmissionLoading } = useQuery({
    queryKey: ['form-submission', 'PRE_COUNSELLING_STUDENT', studentId, COHORT],
    queryFn: () => formsService.getSubmission('PRE_COUNSELLING_STUDENT', studentId!, COHORT),
    enabled: !!studentId && isOpen,
  });

  const isLoading = isTemplateLoading || isSubmissionLoading;

  // Questions grouped by their section label, in template order, each paired with the
  // student's formatted answer (dynamic per-cohort template — not a fixed field set).
  const sections = useMemo(() => {
    if (!template || !submission) return [];
    const answerByFieldKey = new Map(submission.answers.map(a => [a.fieldKey, a.answer]));
    const grouped = new Map<string, { questionText: string; answer: string | number }[]>();
    template.questions
      .slice()
      .sort((a, b) => a.order - b.order)
      .forEach(q => {
        const label = q.sectionLabel || 'General';
        const entry = {
          questionText: q.questionText,
          answer: answerByFieldKey.has(q.fieldKey)
            ? formatAnswerValue(answerByFieldKey.get(q.fieldKey))
            : '—',
        };
        grouped.set(label, [...(grouped.get(label) || []), entry]);
      });
    return Array.from(grouped.entries());
  }, [template, submission]);

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
      ) : submission && sections.length > 0 ? (
        <ContentWrapper>
          {sections.map(([sectionLabel, questions]) => (
            <Section key={sectionLabel}>
              <SectionTitle>{sectionLabel}</SectionTitle>
              <List>
                {questions.map((q, i) => (
                  <li key={i}>
                    {q.questionText}: {q.answer}
                  </li>
                ))}
              </List>
            </Section>
          ))}
        </ContentWrapper>
      ) : (
        <EmptyState>No pre-counselling form answers found for this student.</EmptyState>
      )}
    </Modal>
  );
};
