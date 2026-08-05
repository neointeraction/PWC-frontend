import React from 'react';
import styled from 'styled-components';
import { EntranceExam } from '@/types';
import { RiStarLine, RiStarFill } from 'react-icons/ri';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const HeaderNoteText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-style: italic;
  margin: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ExamCard = styled.div`
  background-color: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: ${({ theme }) => theme.colors.shadow};
`;

const ExamHeader = styled.div`
  background-color: #ece8f6;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const ExamTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;

  span {
    font-weight: 500;
    font-size: ${({ theme }) => theme.fontSize.xs};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const ExamBody = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.text};
`;

const DetailRow = styled.div`
  line-height: 1.4;

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 700;
  }
`;

const LinkText = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  word-break: break-all;

  &:hover {
    text-decoration: underline;
  }
`;

const ExamFooter = styled.div`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background-color: #faf9fd;
`;

const WindowText = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-style: italic;
`;

const ShortlistBtn = styled.button<{ $shortlisted?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 20px;
  border: none;
  background-color: ${({ $shortlisted }) => ($shortlisted ? '#C49419' : '#D99F26')};
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all ${({ theme }) => theme.transition.fast};

  &:hover {
    background-color: #b38510;
  }
`;



interface EntranceExamsTabProps {
  exams: EntranceExam[];
  onToggleShortlist: (id: string) => void;
}

export const EntranceExamsTab: React.FC<EntranceExamsTabProps> = ({
  exams,
  onToggleShortlist,
}) => {
  return (
    <Container>
      <HeaderNoteText>
        Graduation-level: CUET (National) / University-specific UG entrance tests (DUET, IPU CET etc.)
      </HeaderNoteText>

      <Grid>
        {exams.map(exam => (
          <ExamCard key={exam.id}>
            <div>
              <ExamHeader>
                <ExamTitle>
                  {exam.name} <span>- {exam.fullTitle}</span>
                </ExamTitle>
              </ExamHeader>

              <ExamBody>
                <DetailRow>
                  <strong>Conducted by:</strong> {exam.conductedBy}
                </DetailRow>
                <DetailRow>
                  <strong>Mode:</strong> {exam.mode}
                </DetailRow>
                <DetailRow>
                  <strong>Frequency:</strong> {exam.frequency}
                </DetailRow>
                <DetailRow>
                  <strong>Applicable For:</strong> {exam.applicableFor}
                </DetailRow>
                <DetailRow>
                  <strong>12th Requirement:</strong> {exam.requirement12th}
                </DetailRow>
                <DetailRow>
                  <strong>Website:</strong>{' '}
                  <LinkText href={exam.website} target="_blank" rel="noopener noreferrer">
                    {exam.website}
                  </LinkText>
                </DetailRow>
              </ExamBody>
            </div>

            <ExamFooter>
              <WindowText>{exam.datesText || 'Standard Exam Window'}</WindowText>
              <ShortlistBtn
                $shortlisted={exam.isShortlisted}
                onClick={() => onToggleShortlist(exam.id)}
              >
                {exam.isShortlisted ? <RiStarFill size={14} /> : <RiStarLine size={14} />}
                {exam.isShortlisted ? 'Shortlisted' : 'Save to shortlist'}
              </ShortlistBtn>
            </ExamFooter>
          </ExamCard>
        ))}
      </Grid>

      <HeaderNoteText>
        PG-level: CEED, NID M.Des, UID/University PG Entrances
      </HeaderNoteText>
    </Container>
  );
};
