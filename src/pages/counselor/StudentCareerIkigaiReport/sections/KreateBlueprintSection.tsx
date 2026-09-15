import React from 'react';
import { RiRocketLine } from 'react-icons/ri';
import { RoadmapGridJson, AlignmentRating } from '@/types/counsellorChart.types';
import { ScriBandGuidance } from '@/types';
import { ALIGNMENT_MEANING } from '@/utils/academicAlignmentGuidance';
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
  TraitMapTableContainer,
  TraitMapHeaderRow,
  TraitMapDataRow,
  TraitCell,
} from '../StudentCareerIkigaiReportPage.styles';

interface Scri {
  total: number | null;
  band: number | null;
  bandLabel: string | null;
}

interface KreateBlueprintSectionProps {
  roadmapGrid?: RoadmapGridJson | null;
  scri?: Scri;
  bandGuidance?: ScriBandGuidance[];
  alignmentRating?: AlignmentRating | null;
  notes?: Record<string, string>;
}

const ALIGNMENT_LABEL: Record<AlignmentRating, string> = {
  STRONGLY_ALIGNED: 'Strongly Aligned',
  PARTIALLY_ALIGNED: 'Partially Aligned',
  MISALIGNED: 'Misaligned',
  NOT_YET_ASSESSED: 'Not Yet Assessed',
};

// "Parting Notes" — G1 onwards, per the Design Destiny template's kREATE Blueprint page.
const INSIGHT_GROUPS = [{ prefix: 'G', title: 'Parting Notes' }] as const;

export const KreateBlueprintSection: React.FC<KreateBlueprintSectionProps> = ({
  roadmapGrid,
  scri,
  bandGuidance,
  alignmentRating,
  notes = {},
}) => {
  const currentBandDetail = bandGuidance?.find(b => b.band === scri?.band);

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
          <>
            <div style={{ marginTop: '6px' }}>
              <CareerDetailRow>
                <CareerDetailLabel>Label</CareerDetailLabel>
                <CareerDetailValue>{scri.bandLabel}</CareerDetailValue>
              </CareerDetailRow>
            </div>
            {currentBandDetail && (
              <>
                <CareerDetailValue style={{ marginTop: '10px' }}>
                  {currentBandDetail.labelMeaning}
                </CareerDetailValue>
                <TraitMapTableContainer style={{ marginTop: '12px' }}>
                  <TraitMapHeaderRow style={{ gridTemplateColumns: '1fr 1fr 1fr', minWidth: '600px' }}>
                    <TraitCell>For Students</TraitCell>
                    <TraitCell>Tips for Students</TraitCell>
                    <TraitCell>Tips for Parent</TraitCell>
                  </TraitMapHeaderRow>
                  <TraitMapDataRow style={{ gridTemplateColumns: '1fr 1fr 1fr', minWidth: '600px' }}>
                    <TraitCell>{currentBandDetail.forStudents}</TraitCell>
                    <TraitCell>{currentBandDetail.tipsForStudents}</TraitCell>
                    <TraitCell>{currentBandDetail.tipsForParent}</TraitCell>
                  </TraitMapDataRow>
                </TraitMapTableContainer>
              </>
            )}
          </>
        ) : (
          <EmptyState
            title="Not recorded yet"
            description="Your counsellor hasn't recorded a career confidence reading for you yet."
          />
        )}
      </TextCard>

      <TextCard style={{ borderLeft: '3px solid #10B981', backgroundColor: 'rgba(16, 185, 129, 0.03)' }}>
        <TextCardTitle style={{ color: '#10B981' }}>My Overall Academic Orientation</TextCardTitle>
        <div style={{ marginTop: '6px' }}>
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
