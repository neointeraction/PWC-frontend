import React from 'react';
import { RiUser3Line, RiCheckLine, RiHeartsLine } from 'react-icons/ri';
import { ChampionTrait, StudentCareerIkigaiReportData } from '@/types/studentIkigaiReport.types';
import { CounsellorInsightsCard } from './CounsellorInsightsCard';
import {
  ReportSectionBlock,
  SectionHeaderGroup,
  SectionTitle,
  SectionSubtitle,
  TextCard,
  TextCardTitle,
  BulletList,
  TraitMapTableContainer,
  TraitMapHeaderRow,
  TraitMapDataRow,
  TraitCell,
} from '../StudentCareerIkigaiReportPage.styles';

interface StudentProfileSectionProps {
  data: StudentCareerIkigaiReportData['studentProfile'];
  notes?: Record<string, string>;
}

const LENS_GRID_COLUMNS = '180px 1fr';

// One linear name/description/explanation table per lens — mirrors the Dominant Career
// Style / Personal Signature / Thinking Mode tables on the counsellor chart (Step2SectionB)
// and the print report's Champion's Profile page, instead of the old 3-up card grid.
const LensTraitTable: React.FC<{ label: string; trait: ChampionTrait }> = ({ label, trait }) => (
  <TraitMapTableContainer style={{ marginBottom: '12px' }}>
    <TraitMapHeaderRow style={{ gridTemplateColumns: LENS_GRID_COLUMNS, minWidth: 0 }}>
      <TraitCell>{label}</TraitCell>
      <TraitCell>Explanation</TraitCell>
    </TraitMapHeaderRow>
    <TraitMapDataRow style={{ gridTemplateColumns: LENS_GRID_COLUMNS, minWidth: 0 }}>
      <TraitCell style={{ fontWeight: 800, color: '#4F46E5', alignItems: 'flex-start' }}>
        {trait.name}
      </TraitCell>
      <TraitCell style={{ alignItems: 'flex-start' }}>{trait.explanation}</TraitCell>
    </TraitMapDataRow>
  </TraitMapTableContainer>
);

// Counsellor's Insights groups the same synthesis notes shown in "Counsellor's Comments"
// (see CounselorCommentsSection.tsx), filtered down to the three codes the Champion's
// Profile template calls out — A (learning/engagement), B (strengths), C (standout notes).
const INSIGHT_GROUPS = [
  { prefix: 'A', title: 'How You Learn and Engage' },
  { prefix: 'B', title: 'Your Strengths in Action' },
  { prefix: 'C', title: 'What Stood Out About You' },
] as const;

export const StudentProfileSection: React.FC<StudentProfileSectionProps> = ({ data, notes = {} }) => {
  return (
    <ReportSectionBlock id="student-profile">
      <SectionHeaderGroup>
        <SectionTitle>
          <RiUser3Line size={24} />
          Champion’s Profile
        </SectionTitle>
        <SectionSubtitle>Career · Personality</SectionSubtitle>
      </SectionHeaderGroup>

      {/* Three quick lenses: Career Style / Personal Signature / Thinking Mode */}
      <LensTraitTable label="Career Style" trait={data.careerStyle} />
      <LensTraitTable label="Personal Signature" trait={data.personalSignature} />
      <LensTraitTable label="Thinking Mode" trait={data.thinkingMode} />

      {/* Career Personality Snapshot — commented out for now, per request
      <TextCard
        style={{ backgroundColor: 'rgba(79, 70, 229, 0.04)', borderLeft: '4px solid #4F46E5' }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <TextCardTitle style={{ fontSize: '1.05rem', color: '#4F46E5' }}>
            <RiAwardLine size={20} />
            Career Personality Snapshot
          </TextCardTitle>
          <Badge variant="primary">{data.archetype}</Badge>
        </div>
        <TextCardBody style={{ marginTop: '8px' }}>{data.snapshotSummary}</TextCardBody>
      </TextCard>
      */}

      {/* Core Strengths — from the counsellor-authored chart, if finalized */}
      {data.coreStrengths.length > 0 && (
        <TextCard
          style={{ borderLeft: '3px solid #10B981', backgroundColor: 'rgba(16, 185, 129, 0.03)' }}
        >
          <TextCardTitle style={{ color: '#10B981' }}>
            <RiCheckLine size={18} />
            Core Strengths
          </TextCardTitle>
          <BulletList>
            {data.coreStrengths.map((str, idx) => (
              <li key={idx}>{str}</li>
            ))}
          </BulletList>
        </TextCard>
      )}

      {/* Hobbies & Interests — from the counsellor-authored chart, if finalized */}
      {data.hobbies.length > 0 && (
        <TextCard
          style={{ borderLeft: '3px solid #6366F1', backgroundColor: 'rgba(99, 102, 241, 0.03)' }}
        >
          <TextCardTitle style={{ color: '#6366F1' }}>
            <RiHeartsLine size={18} />
            Hobbies &amp; Interests
          </TextCardTitle>
          <BulletList>
            {data.hobbies.map((hobby, idx) => (
              <li key={idx}>{hobby}</li>
            ))}
          </BulletList>
        </TextCard>
      )}

      <CounsellorInsightsCard notes={notes} groups={INSIGHT_GROUPS} />
    </ReportSectionBlock>
  );
};
