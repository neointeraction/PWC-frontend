import React from 'react';
import { RiUser3Line, RiAwardLine, RiBrainLine, RiCheckLine, RiErrorWarningLine } from 'react-icons/ri';
import { StudentCareerIkigaiReportData } from '@/mocks/studentIkigaiReport.mock';
import { Badge } from '@/components/Badge';
import {
  ReportSectionBlock,
  SectionHeaderGroup,
  SectionTitle,
  SectionSubtitle,
  TextCard,
  TextCardTitle,
  TextCardBody,
  ReportGrid,
  BulletList,
} from '../StudentCareerIkigaiReportPage.styles';

interface StudentProfileSectionProps {
  data: StudentCareerIkigaiReportData['studentProfile'];
}

export const StudentProfileSection: React.FC<StudentProfileSectionProps> = ({ data }) => {
  return (
    <ReportSectionBlock id="student-profile">
      <SectionHeaderGroup>
        <SectionTitle>
          <RiUser3Line size={24} />
          2. Student Profile — Personality & Observations
        </SectionTitle>
        <SectionSubtitle>
          Comprehensive analysis of student career archetype, academic/non-academic trends, and core strength clusters.
        </SectionSubtitle>
      </SectionHeaderGroup>

      {/* Career Personality Snapshot */}
      <TextCard style={{ backgroundColor: 'rgba(79, 70, 229, 0.04)', border: '1px solid rgba(79, 70, 229, 0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <TextCardTitle style={{ fontSize: '1.05rem' }}>
            <RiAwardLine size={20} />
            Career Personality Snapshot
          </TextCardTitle>
          <Badge variant="primary">
            {data.archetype}
          </Badge>
        </div>
        <TextCardBody style={{ marginTop: '8px' }}>{data.snapshotSummary}</TextCardBody>
      </TextCard>

      {/* Observations - Academics & Non-Academics */}
      <ReportGrid $cols={2}>
        <TextCard>
          <TextCardTitle>
            <RiBrainLine size={18} />
            Academic Performance Observations
          </TextCardTitle>
          <TextCardBody>{data.academicObservations}</TextCardBody>
        </TextCard>

        <TextCard>
          <TextCardTitle>
            <RiBrainLine size={18} />
            Non-Academic & Hobby Observations
          </TextCardTitle>
          <TextCardBody>{data.nonAcademicObservations}</TextCardBody>
        </TextCard>
      </ReportGrid>

      {/* Strengths & Personality Clusters */}
      <ReportGrid $cols={3}>
        <TextCard>
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

        <TextCard>
          <TextCardTitle style={{ color: '#4F46E5' }}>
            <RiBrainLine size={18} />
            Personality Traits
          </TextCardTitle>
          <BulletList>
            {data.personalityTraits.map((trait, idx) => (
              <li key={idx}>{trait}</li>
            ))}
          </BulletList>
        </TextCard>

        <TextCard>
          <TextCardTitle style={{ color: '#F59E0B' }}>
            <RiErrorWarningLine size={18} />
            Areas for Growth
          </TextCardTitle>
          <BulletList>
            {data.growthAreas.map((area, idx) => (
              <li key={idx}>{area}</li>
            ))}
          </BulletList>
        </TextCard>
      </ReportGrid>
    </ReportSectionBlock>
  );
};
