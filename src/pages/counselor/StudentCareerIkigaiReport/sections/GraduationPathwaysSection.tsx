import React from 'react';
import { RiGraduationCapLine } from 'react-icons/ri';
import { StudentCareerIkigaiReportData } from '@/types/studentIkigaiReport.types';
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
          Graduation & Education Pathways
        </SectionTitle>
        <SectionSubtitle>
          Higher education degrees and specialisations matched to student aptitude, with the
          key entrance exams for each pathway.
        </SectionSubtitle>
      </SectionHeaderGroup>

      <TraitMapTableContainer>
        <TraitMapHeaderRow style={{ gridTemplateColumns: '220px 160px 1fr 220px' }}>
          <TraitCell>Cluster</TraitCell>
          <TraitCell>Degree</TraitCell>
          <TraitCell>Specialisations</TraitCell>
          <TraitCell>Key Entrance Exams</TraitCell>
        </TraitMapHeaderRow>

        {data.pathways.map(row => (
          <TraitMapDataRow key={row.id} style={{ gridTemplateColumns: '220px 160px 1fr 220px' }}>
            <TraitCell style={{ fontWeight: 700, color: '#4F46E5' }}>{row.cluster}</TraitCell>
            <TraitCell style={{ fontWeight: 700 }}>{row.degree}</TraitCell>
            <TraitCell style={{ fontWeight: 500 }}>{row.specialisations}</TraitCell>
            <TraitCell style={{ fontWeight: 600 }}>{row.keyExams}</TraitCell>
          </TraitMapDataRow>
        ))}
      </TraitMapTableContainer>
    </ReportSectionBlock>
  );
};
