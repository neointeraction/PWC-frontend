import React from 'react';
import styled from 'styled-components';
import { RiRoadMapLine } from 'react-icons/ri';
import { CollegesAfterItemJson, EntranceExamItemJson } from '@/types/counsellorChart.types';
import { EmptyState } from '@/components/EmptyState';
import { CounsellorInsightsCard } from './CounsellorInsightsCard';
import {
  ReportSectionBlock,
  SectionHeaderGroup,
  SectionTitle,
  SectionSubtitle,
  TraitMapTableContainer,
  TraitMapHeaderRow,
  TraitMapDataRow,
  TraitCell,
  TextCardTitle,
} from '../StudentCareerIkigaiReportPage.styles';

interface EducationPathwaysSectionProps {
  colleges?: CollegesAfterItemJson[] | null;
  exams?: EntranceExamItemJson[] | null;
  notes?: Record<string, string>;
}

// "What to Keep in Mind" — E1 onwards, per the Design Destiny template's Education
// Pathways page (colleges shortlist / entrance exams to prepare).
const INSIGHT_GROUPS = [{ prefix: 'E', title: 'What to Keep in Mind' }] as const;

const COLLEGE_COLUMNS = '180px 150px minmax(180px, 1fr) 180px 110px 140px 160px';

// Entrance exam cards — mirrors the career library's EntranceExamsTab.tsx ExamCard, minus
// the "Standard Exam Window" footer, since exam.examMonth isn't always populated here.
const ExamGrid = styled.div`
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

const CompilingDataText = styled.span`
  font-style: italic;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const renderDetailValue = (value: string) =>
  value ? value : <CompilingDataText>compiling data</CompilingDataText>;

export const EducationPathwaysSection: React.FC<EducationPathwaysSectionProps> = ({
  colleges,
  exams,
  notes = {},
}) => {
  return (
    <ReportSectionBlock id="education-pathways">
      <SectionHeaderGroup>
        <SectionTitle>
          <RiRoadMapLine size={24} />
          Education Pathways
        </SectionTitle>
        <SectionSubtitle>Indicative · Based on Graduation Stream Chosen</SectionSubtitle>
      </SectionHeaderGroup>

      <TextCardTitle style={{ fontSize: '1rem' }}>Colleges Shortlisted after Class 11 &amp; 12</TextCardTitle>
      {colleges && colleges.length > 0 ? (
        <TraitMapTableContainer>
          <TraitMapHeaderRow style={{ gridTemplateColumns: COLLEGE_COLUMNS, minWidth: '1100px' }}>
            <TraitCell>College Name</TraitCell>
            <TraitCell>Location</TraitCell>
            <TraitCell>Course</TraitCell>
            <TraitCell>Entrance Exam</TraitCell>
            <TraitCell>Ranking</TraitCell>
            <TraitCell>Placement Salary</TraitCell>
            <TraitCell>Website</TraitCell>
          </TraitMapHeaderRow>

          {colleges.map(college => (
            <TraitMapDataRow
              key={college.id}
              style={{ gridTemplateColumns: COLLEGE_COLUMNS, minWidth: '1100px' }}
            >
              <TraitCell style={{ fontWeight: 700, color: '#4F46E5' }}>{college.collegeName}</TraitCell>
              <TraitCell>{college.location}</TraitCell>
              <TraitCell>{college.course}</TraitCell>
              <TraitCell>{college.entranceExam}</TraitCell>
              <TraitCell>{college.ranking}</TraitCell>
              <TraitCell>{college.placementSalary}</TraitCell>
              <TraitCell>{college.website}</TraitCell>
            </TraitMapDataRow>
          ))}
        </TraitMapTableContainer>
      ) : (
        <EmptyState
          title="No colleges shortlisted yet"
          description="Your counsellor hasn't shortlisted colleges for you yet."
        />
      )}

      <TextCardTitle style={{ fontSize: '1rem', marginTop: '8px' }}>Entrance Exams to Prepare</TextCardTitle>
      {exams && exams.length > 0 ? (
        <ExamGrid>
          {exams.map(exam => (
            <ExamCard key={exam.id}>
              <ExamHeader>
                <ExamTitle>{exam.fullName}</ExamTitle>
              </ExamHeader>
              <ExamBody>
                <DetailRow>
                  <strong>Conducted by:</strong> {renderDetailValue(exam.conductingBody)}
                </DetailRow>
                <DetailRow>
                  <strong>Level:</strong> {renderDetailValue(exam.level)}
                </DetailRow>
                <DetailRow>
                  <strong>Applicable For:</strong> {renderDetailValue(exam.applicableFor)}
                </DetailRow>
                <DetailRow>
                  <strong>Subject Requirements:</strong> {renderDetailValue(exam.subjectRequirements)}
                </DetailRow>
                <DetailRow>
                  <strong>Exam Month:</strong> {renderDetailValue(exam.examMonth)}
                </DetailRow>
                <DetailRow>
                  <strong>Website:</strong>{' '}
                  {exam.urlLink ? (
                    <LinkText href={exam.urlLink} target="_blank" rel="noopener noreferrer">
                      {exam.urlLink}
                    </LinkText>
                  ) : (
                    <CompilingDataText>compiling data</CompilingDataText>
                  )}
                </DetailRow>
              </ExamBody>
            </ExamCard>
          ))}
        </ExamGrid>
      ) : (
        <EmptyState
          title="No entrance exams listed yet"
          description="Your counsellor hasn't listed entrance exams for you yet."
        />
      )}

      <CounsellorInsightsCard notes={notes} groups={INSIGHT_GROUPS} />
    </ReportSectionBlock>
  );
};
