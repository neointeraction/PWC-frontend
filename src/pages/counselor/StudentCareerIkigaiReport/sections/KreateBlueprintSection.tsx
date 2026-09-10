import React from 'react';
import { RiRocketLine } from 'react-icons/ri';
import { RoadmapGridJson, AcademicTrend, AlignmentRating } from '@/types/counsellorChart.types';
import { EmptyState } from '@/components/EmptyState';
import { CounsellorInsightsCard } from './CounsellorInsightsCard';
import {
  ReportSectionBlock,
  SectionHeaderGroup,
  SectionTitle,
  SectionSubtitle,
  ReportGrid,
  RoadmapPhaseCard,
  PhaseBadge,
  TextCard,
  TextCardTitle,
  CareerDetailRow,
  CareerDetailLabel,
  CareerDetailValue,
} from '../StudentCareerIkigaiReportPage.styles';

interface Scri {
  total: number | null;
  band: number | null;
  bandLabel: string | null;
}

interface KreateBlueprintSectionProps {
  roadmapGrid?: RoadmapGridJson | null;
  scri?: Scri;
  academicTrend?: AcademicTrend | null;
  alignmentRating?: AlignmentRating | null;
  notes?: Record<string, string>;
}

const ACADEMIC_TREND_LABEL: Record<AcademicTrend, string> = {
  IMPROVING: 'Improving',
  STABLE: 'Stable',
  DECLINING: 'Declining',
  NOT_ASSESSED: 'Not Yet Assessed',
};

const ACADEMIC_TREND_MEANING: Record<AcademicTrend, string> = {
  IMPROVING: "Your academic performance has been trending upward.",
  STABLE: 'Your academic performance has stayed consistent.',
  DECLINING: 'Your academic performance has been trending downward.',
  NOT_ASSESSED: 'Not enough academic history has been reviewed yet to gauge a trend.',
};

const ALIGNMENT_LABEL: Record<AlignmentRating, string> = {
  STRONGLY_ALIGNED: 'Strongly Aligned',
  PARTIALLY_ALIGNED: 'Partially Aligned',
  MISALIGNED: 'Misaligned',
  NOT_YET_ASSESSED: 'Not Yet Assessed',
};

const ALIGNMENT_MEANING: Record<AlignmentRating, string> = {
  STRONGLY_ALIGNED: 'Your academic strengths and career interests point in the same direction.',
  PARTIALLY_ALIGNED: 'Your academic strengths and career interests overlap in some areas but not others.',
  MISALIGNED: 'Your academic strengths and career interests currently point in different directions.',
  NOT_YET_ASSESSED: 'Alignment has not been assessed yet.',
};

// "Parting Notes" — G1 onwards, per the Design Destiny template's kREATE Blueprint page.
const INSIGHT_GROUPS = [{ prefix: 'G', title: 'Parting Notes' }] as const;

export const KreateBlueprintSection: React.FC<KreateBlueprintSectionProps> = ({
  roadmapGrid,
  scri,
  academicTrend,
  alignmentRating,
  notes = {},
}) => {
  return (
    <ReportSectionBlock id="kreate-blueprint">
      <SectionHeaderGroup>
        <SectionTitle>
          <RiRocketLine size={24} />
          My kREATE Blueprint
        </SectionTitle>
        <SectionSubtitle>Now · Class 11–12 · After Class 12</SectionSubtitle>
      </SectionHeaderGroup>

      {roadmapGrid ? (
        <ReportGrid $cols={3}>
          <RoadmapPhaseCard>
            <PhaseBadge>Now (Class 9–10)</PhaseBadge>
            <CareerDetailRow>
              <CareerDetailLabel>Skills to Build</CareerDetailLabel>
              <CareerDetailValue>{roadmapGrid.nowSkills}</CareerDetailValue>
            </CareerDetailRow>
            <CareerDetailRow>
              <CareerDetailLabel>Activities to Join</CareerDetailLabel>
              <CareerDetailValue>{roadmapGrid.nowActivities}</CareerDetailValue>
            </CareerDetailRow>
            <CareerDetailRow>
              <CareerDetailLabel>Habits to Develop</CareerDetailLabel>
              <CareerDetailValue>{roadmapGrid.nowHabits}</CareerDetailValue>
            </CareerDetailRow>
          </RoadmapPhaseCard>

          <RoadmapPhaseCard>
            <PhaseBadge>Class 11–12</PhaseBadge>
            <CareerDetailRow>
              <CareerDetailLabel>Stream to Choose</CareerDetailLabel>
              <CareerDetailValue>{roadmapGrid.c11Stream}</CareerDetailValue>
            </CareerDetailRow>
            <CareerDetailRow>
              <CareerDetailLabel>Exams to Watch</CareerDetailLabel>
              <CareerDetailValue>{roadmapGrid.c11Exams}</CareerDetailValue>
            </CareerDetailRow>
            <CareerDetailRow>
              <CareerDetailLabel>Electives to Pick</CareerDetailLabel>
              <CareerDetailValue>{roadmapGrid.c11Electives}</CareerDetailValue>
            </CareerDetailRow>
          </RoadmapPhaseCard>

          <RoadmapPhaseCard>
            <PhaseBadge>After Class 12</PhaseBadge>
            <CareerDetailRow>
              <CareerDetailLabel>Degrees to Target</CareerDetailLabel>
              <CareerDetailValue>{roadmapGrid.afterDegrees}</CareerDetailValue>
            </CareerDetailRow>
            <CareerDetailRow>
              <CareerDetailLabel>Certifications</CareerDetailLabel>
              <CareerDetailValue>{roadmapGrid.afterCertifications}</CareerDetailValue>
            </CareerDetailRow>
            <CareerDetailRow>
              <CareerDetailLabel>Study Abroad</CareerDetailLabel>
              <CareerDetailValue>{roadmapGrid.afterAbroad}</CareerDetailValue>
            </CareerDetailRow>
          </RoadmapPhaseCard>
        </ReportGrid>
      ) : (
        <EmptyState
          title="Blueprint not filled in yet"
          description="Your counsellor hasn't filled in your kREATE Blueprint yet."
        />
      )}

      <TextCard style={{ borderLeft: '3px solid #4F46E5', backgroundColor: 'rgba(79, 70, 229, 0.03)' }}>
        <TextCardTitle style={{ color: '#4F46E5' }}>My Career Confidence Meter</TextCardTitle>
        {scri?.bandLabel ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '6px' }}>
            <CareerDetailRow>
              <CareerDetailLabel>Label</CareerDetailLabel>
              <CareerDetailValue>{scri.bandLabel}</CareerDetailValue>
            </CareerDetailRow>
            <CareerDetailRow>
              <CareerDetailLabel>Score</CareerDetailLabel>
              <CareerDetailValue>{scri.total ?? '—'}</CareerDetailValue>
            </CareerDetailRow>
          </div>
        ) : (
          <EmptyState
            title="Not recorded yet"
            description="Your counsellor hasn't recorded a career confidence reading for you yet."
          />
        )}
      </TextCard>

      <TextCard style={{ borderLeft: '3px solid #10B981', backgroundColor: 'rgba(16, 185, 129, 0.03)' }}>
        <TextCardTitle style={{ color: '#10B981' }}>My Overall Academic Orientation</TextCardTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '6px' }}>
          <CareerDetailRow>
            <CareerDetailLabel>Academic Trend</CareerDetailLabel>
            <CareerDetailValue>
              {ACADEMIC_TREND_LABEL[academicTrend ?? 'NOT_ASSESSED']} —{' '}
              {ACADEMIC_TREND_MEANING[academicTrend ?? 'NOT_ASSESSED']}
            </CareerDetailValue>
          </CareerDetailRow>
          <CareerDetailRow>
            <CareerDetailLabel>Interest Alignment</CareerDetailLabel>
            <CareerDetailValue>
              {ALIGNMENT_LABEL[alignmentRating ?? 'NOT_YET_ASSESSED']} —{' '}
              {ALIGNMENT_MEANING[alignmentRating ?? 'NOT_YET_ASSESSED']}
            </CareerDetailValue>
          </CareerDetailRow>
        </div>
      </TextCard>

      <CounsellorInsightsCard notes={notes} groups={INSIGHT_GROUPS} />
    </ReportSectionBlock>
  );
};
