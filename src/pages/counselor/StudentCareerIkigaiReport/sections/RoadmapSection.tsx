import React from 'react';
import { RiRoadMapLine, RiAwardLine } from 'react-icons/ri';
import { StudentCareerIkigaiReportData, RoadmapPhase } from '@/mocks/studentIkigaiReport.mock';
import { Badge } from '@/components/Badge';
import {
  ReportSectionBlock,
  SectionHeaderGroup,
  SectionTitle,
  SectionSubtitle,
  ReportGrid,
  RoadmapPhaseCard,
  PhaseBadge,
  TextCardTitle,
  BulletList,
  TextCard,
} from '../StudentCareerIkigaiReportPage.styles';

interface RoadmapSectionProps {
  roadmapData: StudentCareerIkigaiReportData['roadmap'];
}

export const RoadmapSection: React.FC<RoadmapSectionProps> = ({ roadmapData }) => {
  const { nowPhase, c11Phase, afterC12Phase, readinessSnapshot } = roadmapData;

  const renderPhaseCard = (phase: RoadmapPhase) => (
    <RoadmapPhaseCard>
      <PhaseBadge>{phase.title}</PhaseBadge>
      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#4B5563' }}>{phase.subtitle}</div>

      <div>
        <TextCardTitle style={{ fontSize: '0.8rem', color: '#6B7280', textTransform: 'uppercase' }}>
          Skills to Build
        </TextCardTitle>
        <BulletList>
          {phase.skillsToBuild.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </BulletList>
      </div>

      <div>
        <TextCardTitle style={{ fontSize: '0.8rem', color: '#6B7280', textTransform: 'uppercase' }}>
          Activities & Competitions
        </TextCardTitle>
        <BulletList>
          {phase.activitiesToJoin.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </BulletList>
      </div>

      <div>
        <TextCardTitle style={{ fontSize: '0.8rem', color: '#6B7280', textTransform: 'uppercase' }}>
          Key Milestones
        </TextCardTitle>
        <BulletList>
          {phase.keyMilestones.map((item, idx) => (
            <li key={idx} style={{ fontWeight: 600, color: '#4F46E5' }}>{item}</li>
          ))}
        </BulletList>
      </div>
    </RoadmapPhaseCard>
  );

  return (
    <ReportSectionBlock id="roadmap">
      <SectionHeaderGroup>
        <SectionTitle>
          <RiRoadMapLine size={24} />
          8. My Roadmap — Next Steps & Readiness Snapshot
        </SectionTitle>
        <SectionSubtitle>
          Strategic 3-phase execution timeline from Class 9 to post-graduation alongside the Student Career Readiness Index (SCRI) snapshot.
        </SectionSubtitle>
      </SectionHeaderGroup>

      {/* 3-Phase Roadmap Grid */}
      <ReportGrid $cols={3}>
        {renderPhaseCard(nowPhase)}
        {renderPhaseCard(c11Phase)}
        {renderPhaseCard(afterC12Phase)}
      </ReportGrid>

      {/* Career Readiness Snapshot at Bottom */}
      <TextCard style={{ backgroundColor: 'rgba(16, 185, 129, 0.04)', border: '1px solid rgba(16, 185, 129, 0.2)', marginTop: '8px' }}>
        <TextCardTitle style={{ color: '#10B981', fontSize: '1.05rem' }}>
          <RiAwardLine size={20} />
          Career Readiness Snapshot (SCRI Benchmark)
        </TextCardTitle>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '12px' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#6B7280' }}>
              SCRI Total Score
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10B981' }}>
              {readinessSnapshot.scriScore}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#6B7280' }}>
              SCRI Readiness Band
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>
              <Badge variant="success">{readinessSnapshot.scriBand}</Badge>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#6B7280' }}>
              Readiness Label
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#111827' }}>
              {readinessSnapshot.readinessLabel}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#6B7280' }}>
              Academic x Career Alignment
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#4F46E5' }}>
              <Badge variant="info">{readinessSnapshot.academicCareerAlignment}</Badge>
            </div>
          </div>
        </div>
      </TextCard>
    </ReportSectionBlock>
  );
};
