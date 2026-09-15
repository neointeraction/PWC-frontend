import React from 'react';
import { RiGraduationCapLine } from 'react-icons/ri';
import { StudentCareerIkigaiReportData } from '@/types/studentIkigaiReport.types';
import { getCareerFitGrading } from '@/utils/careerFitGrading';
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

interface GraduationPathwaysSectionProps {
  data: StudentCareerIkigaiReportData['graduation'];
}

export const GraduationPathwaysSection: React.FC<GraduationPathwaysSectionProps> = ({ data }) => {
  return (
    <ReportSectionBlock id="graduation-pathways">
      <SectionHeaderGroup>
        <SectionTitle>
          <RiGraduationCapLine size={24} />
          Graduation Pathways
        </SectionTitle>
        <SectionSubtitle>
          Higher education degrees and specialisations matched to student aptitude, with the
          reasoning behind each recommended pathway.
        </SectionSubtitle>
      </SectionHeaderGroup>

      <TraitMapTableContainer>
        <TraitMapHeaderRow
          style={{
            gridTemplateColumns: '150px 180px 180px 180px 1fr 200px 130px 1fr',
            minWidth: '1620px',
          }}
        >
          <TraitCell>Cluster</TraitCell>
          <TraitCell>Main Stream</TraitCell>
          <TraitCell>Sub-Stream</TraitCell>
          <TraitCell>Specialisation</TraitCell>
          <TraitCell>Reasoning</TraitCell>
          <TraitCell>Key Exams</TraitCell>
          <TraitCell>Grading Level</TraitCell>
          <TraitCell>Explanation</TraitCell>
        </TraitMapHeaderRow>

        {data.pathways.map(row => (
          <TraitMapDataRow
            key={row.id}
            style={{
              gridTemplateColumns: '150px 180px 180px 180px 1fr 200px 130px 1fr',
              minWidth: '1620px',
            }}
          >
            <TraitCell style={{ fontWeight: 700, color: '#4F46E5' }}>{row.cluster}</TraitCell>
            <TraitCell style={{ fontWeight: 600 }}>{row.mainStream}</TraitCell>
            <TraitCell style={{ fontWeight: 700 }}>{row.subStream}</TraitCell>
            <TraitCell style={{ fontWeight: 500 }}>{row.specialisations}</TraitCell>
            <TraitCell style={{ fontWeight: 400 }}>{row.reasoning}</TraitCell>
            <TraitCell style={{ fontWeight: 600 }}>{row.keyExams}</TraitCell>
            <TraitCell style={{ fontWeight: 700 }}>
              {getCareerFitGrading(row.fitScore ?? undefined)?.level ?? '—'}
            </TraitCell>
            <TraitCell>{getCareerFitGrading(row.fitScore ?? undefined)?.explanation ?? '—'}</TraitCell>
          </TraitMapDataRow>
        ))}
      </TraitMapTableContainer>
    </ReportSectionBlock>
  );
};
