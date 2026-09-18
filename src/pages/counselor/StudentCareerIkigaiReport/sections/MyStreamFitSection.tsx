import React from 'react';
import { RiGitBranchLine } from 'react-icons/ri';
import { StudentCareerIkigaiReportData } from '@/types/studentIkigaiReport.types';
import { getStreamFitGrading } from '@/utils/careerFitGrading';
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

interface MyStreamFitSectionProps {
  data: StudentCareerIkigaiReportData['streamFit'];
}

export const MyStreamFitSection: React.FC<MyStreamFitSectionProps> = ({ data }) => {
  return (
    <ReportSectionBlock id="stream-fit">
      <SectionHeaderGroup>
        <SectionTitle>
          <RiGitBranchLine size={24} />
          My Stream Fit — Class 11 & 12 Recommendation
        </SectionTitle>
        <SectionSubtitle>
          Optimal academic stream alignment and subject combinations tailored to student aptitude benchmarks and career target domains.
        </SectionSubtitle>
      </SectionHeaderGroup>

      {/* Stream Fit Table — same columns as the counsellor chart's Stream Fit table */}
      <TraitMapTableContainer>
        <TraitMapHeaderRow
          style={{
            gridTemplateColumns: '150px 180px 220px 180px 1fr 130px 1fr',
            minWidth: '1300px',
          }}
        >
          <TraitCell>Main Stream</TraitCell>
          <TraitCell>Sub-Stream</TraitCell>
          <TraitCell>Core Subjects</TraitCell>
          <TraitCell>Electives</TraitCell>
          <TraitCell>Reasoning</TraitCell>
          <TraitCell>Grading Level</TraitCell>
          <TraitCell>Explanation</TraitCell>
        </TraitMapHeaderRow>

        {data.table.map(row => (
          <TraitMapDataRow
            key={row.id}
            style={{
              gridTemplateColumns: '150px 180px 220px 180px 1fr 130px 1fr',
              minWidth: '1300px',
            }}
          >
            <TraitCell style={{ fontWeight: 800, color: '#4F46E5' }}>{row.mainStream}</TraitCell>
            <TraitCell style={{ fontWeight: 700 }}>{row.subStream}</TraitCell>
            <TraitCell style={{ fontWeight: 500 }}>{row.coreSubjects}</TraitCell>
            <TraitCell style={{ fontWeight: 600 }}>{row.electives}</TraitCell>
            <TraitCell style={{ fontWeight: 400 }}>{row.reasoning}</TraitCell>
            <TraitCell style={{ fontWeight: 700 }}>
              {getStreamFitGrading(row.fitScore ?? undefined)?.level ?? '—'}
            </TraitCell>
            <TraitCell style={{ fontWeight: 500 }}>
              {getStreamFitGrading(row.fitScore ?? undefined)?.explanation ?? '—'}
            </TraitCell>
          </TraitMapDataRow>
        ))}
      </TraitMapTableContainer>
    </ReportSectionBlock>
  );
};
