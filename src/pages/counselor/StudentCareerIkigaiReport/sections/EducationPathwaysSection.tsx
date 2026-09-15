import React from 'react';
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
  TextCard,
  TextCardTitle,
  CareerDetailRow,
  CareerDetailLabel,
  CareerDetailValue,
} from '../StudentCareerIkigaiReportPage.styles';

interface EducationPathwaysSectionProps {
  colleges?: CollegesAfterItemJson[] | null;
  exams?: EntranceExamItemJson[] | null;
  notes?: Record<string, string>;
}

// "What to Keep in Mind" — E1 onwards, per the Design Destiny template's Education
// Pathways page (colleges shortlist / entrance exams to prepare).
const INSIGHT_GROUPS = [{ prefix: 'E', title: 'What to Keep in Mind' }] as const;

const COLLEGE_COLUMNS = '180px 150px 120px 180px 180px 90px 160px';

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
          <TraitMapHeaderRow style={{ gridTemplateColumns: COLLEGE_COLUMNS, minWidth: '1060px' }}>
            <TraitCell>College Name</TraitCell>
            <TraitCell>Location</TraitCell>
            <TraitCell>Type</TraitCell>
            <TraitCell>Course</TraitCell>
            <TraitCell>Entrance Exam</TraitCell>
            <TraitCell>Ranking</TraitCell>
            <TraitCell>Website</TraitCell>
          </TraitMapHeaderRow>

          {colleges.map(college => (
            <TraitMapDataRow
              key={college.id}
              style={{ gridTemplateColumns: COLLEGE_COLUMNS, minWidth: '1060px' }}
            >
              <TraitCell style={{ fontWeight: 700, color: '#4F46E5' }}>{college.collegeName}</TraitCell>
              <TraitCell>{college.location}</TraitCell>
              <TraitCell>{college.type}</TraitCell>
              <TraitCell>{college.course}</TraitCell>
              <TraitCell>{college.entranceExam}</TraitCell>
              <TraitCell>{college.ranking}</TraitCell>
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
        exams.map((exam, idx) => (
          <TextCard key={exam.id}>
            <TextCardTitle style={{ fontSize: '0.95rem', color: '#4F46E5' }}>
              Exam {idx + 1} · {exam.fullName}
            </TextCardTitle>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '6px' }}>
              <CareerDetailRow>
                <CareerDetailLabel>Conducting Body</CareerDetailLabel>
                <CareerDetailValue>{exam.conductingBody}</CareerDetailValue>
              </CareerDetailRow>
              <CareerDetailRow>
                <CareerDetailLabel>Level</CareerDetailLabel>
                <CareerDetailValue>{exam.level}</CareerDetailValue>
              </CareerDetailRow>
              <CareerDetailRow>
                <CareerDetailLabel>Applicable For</CareerDetailLabel>
                <CareerDetailValue>{exam.applicableFor}</CareerDetailValue>
              </CareerDetailRow>
              <CareerDetailRow>
                <CareerDetailLabel>Subject Requirements</CareerDetailLabel>
                <CareerDetailValue>{exam.subjectRequirements}</CareerDetailValue>
              </CareerDetailRow>
              <CareerDetailRow>
                <CareerDetailLabel>Exam Month</CareerDetailLabel>
                <CareerDetailValue>{exam.examMonth}</CareerDetailValue>
              </CareerDetailRow>
              <CareerDetailRow>
                <CareerDetailLabel>URL Link</CareerDetailLabel>
                <CareerDetailValue>{exam.urlLink}</CareerDetailValue>
              </CareerDetailRow>
            </div>
          </TextCard>
        ))
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
