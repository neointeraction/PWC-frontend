import React from 'react';
import { RiUser3Line, RiAwardLine, RiCheckLine, RiHeartsLine } from 'react-icons/ri';
import { StudentCareerIkigaiReportData } from '@/types/studentIkigaiReport.types';
import { Badge } from '@/components/Badge';
import {
  ReportSectionBlock,
  SectionHeaderGroup,
  SectionTitle,
  SectionSubtitle,
  TextCard,
  TextCardTitle,
  TextCardBody,
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
          Champion’s Profile
        </SectionTitle>
        <SectionSubtitle>Career · Personality</SectionSubtitle>
      </SectionHeaderGroup>

      {/* Career Personality Snapshot */}
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
    </ReportSectionBlock>
  );
};
