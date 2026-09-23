import React from 'react';
import { RiCompassLine } from 'react-icons/ri';
import { CareerRecommendationCard as CardType } from '@/types/studentIkigaiReport.types';
import { getCareerFitGrading } from '@/utils/careerFitGrading';
import { CounsellorInsightsCard } from './CounsellorInsightsCard';
import { orCompilingData } from './CompilingData';
import {
  ReportSectionBlock,
  SectionHeaderGroup,
  SectionTitle,
  SectionSubtitle,
  TraitMapTableContainer,
  TraitMapHeaderRow,
  TraitMapDataRow,
  TraitCell,
} from '../StudentCareerIkigaiReportPage.styles';

interface CareerCompassSectionProps {
  cards: CardType[];
  notes?: Record<string, string>;
}

// "Where we see You Thriving" — D1 onwards, per the Design Destiny template's Career
// Compass / Job Roles page.
const INSIGHT_GROUPS = [{ prefix: 'D', title: 'Where we see You Thriving' }] as const;

// Same column set as the counsellor chart's "Career Compass (Target Roles & Compensation)"
// table (Step3SectionC) — Fit Score shows only the grading level (no raw percentage) for
// this student-facing view.
const CAREER_COMPASS_GRID_COLUMNS = '150px 150px 180px 200px 1fr 180px 120px 120px 130px 1fr';

export const CareerCompassSection: React.FC<CareerCompassSectionProps> = ({ cards, notes = {} }) => {
  return (
    <ReportSectionBlock id="career-compass">
      <SectionHeaderGroup>
        <SectionTitle>
          <RiCompassLine size={24} />
          My Career Compass
        </SectionTitle>
        <SectionSubtitle>
          Curated career roles matched to student aptitude, interest, industry demand, AI resilience, and global salary potential.
        </SectionSubtitle>
      </SectionHeaderGroup>

      <TraitMapTableContainer>
        <TraitMapHeaderRow style={{ gridTemplateColumns: CAREER_COMPASS_GRID_COLUMNS, minWidth: '1440px' }}>
          <TraitCell>Cluster</TraitCell>
          <TraitCell>Industry</TraitCell>
          <TraitCell>Domain</TraitCell>
          <TraitCell>Target Role</TraitCell>
          <TraitCell>Why It Fits</TraitCell>
          <TraitCell>Top Employers</TraitCell>
          <TraitCell>Salary (India)</TraitCell>
          <TraitCell>Salary (Abroad)</TraitCell>
          <TraitCell>Grading Level</TraitCell>
          <TraitCell>Student-Friendly Explanation</TraitCell>
        </TraitMapHeaderRow>

        {cards.map(card => (
          <TraitMapDataRow key={card.id} style={{ gridTemplateColumns: CAREER_COMPASS_GRID_COLUMNS, minWidth: '1440px' }}>
            <TraitCell style={{ fontWeight: 800, color: '#4F46E5' }}>{card.cluster}</TraitCell>
            <TraitCell>{orCompilingData(card.industry)}</TraitCell>
            <TraitCell>{orCompilingData(card.domain)}</TraitCell>
            <TraitCell style={{ fontWeight: 700 }}>{orCompilingData(card.role)}</TraitCell>
            <TraitCell>{card.whyItFits}</TraitCell>
            <TraitCell>{orCompilingData(card.topEmployers)}</TraitCell>
            <TraitCell style={{ fontWeight: 700 }}>{orCompilingData(card.salaryIndia)}</TraitCell>
            <TraitCell style={{ fontWeight: 700 }}>{orCompilingData(card.salaryAbroad)}</TraitCell>
            <TraitCell style={{ fontWeight: 700 }}>
              {getCareerFitGrading(card.fitScore ?? undefined)?.level || '—'}
            </TraitCell>
            <TraitCell>{getCareerFitGrading(card.fitScore ?? undefined)?.explanation || '—'}</TraitCell>
          </TraitMapDataRow>
        ))}
      </TraitMapTableContainer>

      <CounsellorInsightsCard notes={notes} groups={INSIGHT_GROUPS} />
    </ReportSectionBlock>
  );
};
