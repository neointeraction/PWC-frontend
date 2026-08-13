import React from 'react';
import { RiGitBranchLine } from 'react-icons/ri';
import { StudentCareerIkigaiReportData } from '@/mocks/studentIkigaiReport.mock';
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
  TextCardBody,
} from '../StudentCareerIkigaiReportPage.styles';

interface MyStreamFitSectionProps {
  data: StudentCareerIkigaiReportData['streamFit'];
}

export const MyStreamFitSection: React.FC<MyStreamFitSectionProps> = ({ data }) => {
  return (
    <ReportSectionBlock id="stream-fit">
      <SectionHeaderGroup>
        <SectionTitle>
          <RiGitBranchLine size={24} />
          5. My Stream Fit — Class 11 & 12 Recommendation
        </SectionTitle>
        <SectionSubtitle>
          Optimal academic stream alignment and subject combinations tailored to student aptitude benchmarks and career target domains.
        </SectionSubtitle>
      </SectionHeaderGroup>

      {/* Stream Fit Table */}
      <TraitMapTableContainer>
        <TraitMapHeaderRow style={{ gridTemplateColumns: '180px 220px 1fr 220px' }}>
          <TraitCell>Main Stream</TraitCell>
          <TraitCell>Sub-Stream</TraitCell>
          <TraitCell>Core Subjects</TraitCell>
          <TraitCell>Recommended Electives</TraitCell>
        </TraitMapHeaderRow>

        {data.table.map(row => (
          <TraitMapDataRow key={row.id} style={{ gridTemplateColumns: '180px 220px 1fr 220px' }}>
            <TraitCell style={{ fontWeight: 800, color: '#4F46E5' }}>{row.mainStream}</TraitCell>
            <TraitCell style={{ fontWeight: 700 }}>{row.subStream}</TraitCell>
            <TraitCell style={{ fontWeight: 500 }}>{row.coreSubjects}</TraitCell>
            <TraitCell style={{ fontWeight: 600 }}>{row.electives}</TraitCell>
          </TraitMapDataRow>
        ))}
      </TraitMapTableContainer>

      {/* Why These Streams Text Block */}
      <TextCard style={{ backgroundColor: 'rgba(79, 70, 229, 0.04)', borderLeft: '4px solid #4F46E5' }}>
        <TextCardTitle style={{ color: '#4F46E5', fontSize: '1.05rem' }}>
          Why These Streams? — Detailed Rationale
        </TextCardTitle>
        <TextCardBody>{data.whyTheseStreams}</TextCardBody>
      </TextCard>
    </ReportSectionBlock>
  );
};
