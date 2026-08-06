import React from 'react';
import { RiGraduationCapLine, RiFileEditLine, RiGovernmentLine } from 'react-icons/ri';
import { StudentCareerIkigaiReportData } from '@/mocks/studentIkigaiReport.mock';
import { Badge } from '@/components/Badge';
import {
  ReportSectionBlock,
  SectionHeaderGroup,
  SectionTitle,
  SectionSubtitle,
  TraitMapTableContainer,
  TraitMapHeaderRow,
  TraitMapDataRow,
  TraitCell,
  TextCardTitle,
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
          6. Graduation & Education Pathways
        </SectionTitle>
        <SectionSubtitle>
          Higher education degrees, key competitive entrance exams, and premier college benchmarks shortlisted after Class 11 & 12.
        </SectionSubtitle>
      </SectionHeaderGroup>

      {/* 1. Graduation Pathways Table */}
      <div>
        <TextCardTitle style={{ marginBottom: '10px' }}>
          <RiGraduationCapLine size={18} />
          Graduation Pathways & Degree Clusters
        </TextCardTitle>
        <TraitMapTableContainer>
          <TraitMapHeaderRow style={{ gridTemplateColumns: '220px 160px 1fr 220px' }}>
            <TraitCell>Cluster</TraitCell>
            <TraitCell>Degree</TraitCell>
            <TraitCell>Specialisations</TraitCell>
            <TraitCell>Additional Pathway</TraitCell>
          </TraitMapHeaderRow>

          {data.pathways.map(row => (
            <TraitMapDataRow key={row.id} style={{ gridTemplateColumns: '220px 160px 1fr 220px' }}>
              <TraitCell style={{ fontWeight: 700, color: '#4F46E5' }}>{row.cluster}</TraitCell>
              <TraitCell style={{ fontWeight: 700 }}>{row.degree}</TraitCell>
              <TraitCell style={{ fontWeight: 500 }}>{row.specialisations}</TraitCell>
              <TraitCell style={{ fontWeight: 600 }}>{row.additionalPath}</TraitCell>
            </TraitMapDataRow>
          ))}
        </TraitMapTableContainer>
      </div>

      {/* 2. Entrance Exams to Prepare Table */}
      <div>
        <TextCardTitle style={{ marginBottom: '10px' }}>
          <RiFileEditLine size={18} />
          Entrance Exams to Prepare
        </TextCardTitle>
        <TraitMapTableContainer>
          <TraitMapHeaderRow style={{ gridTemplateColumns: '220px 180px 160px 140px 1fr' }}>
            <TraitCell>Exam Name</TraitCell>
            <TraitCell>Target Stream</TraitCell>
            <TraitCell>Tentative Date</TraitCell>
            <TraitCell>Level</TraitCell>
            <TraitCell>Syllabus Focus</TraitCell>
          </TraitMapHeaderRow>

          {data.entranceExams.map(row => (
            <TraitMapDataRow key={row.id} style={{ gridTemplateColumns: '220px 180px 160px 140px 1fr' }}>
              <TraitCell style={{ fontWeight: 800, color: '#4F46E5' }}>{row.examName}</TraitCell>
              <TraitCell style={{ fontWeight: 600 }}>{row.targetStream}</TraitCell>
              <TraitCell style={{ fontWeight: 600 }}>{row.tentativeDate}</TraitCell>
              <TraitCell>
                <Badge variant="info">{row.level}</Badge>
              </TraitCell>
              <TraitCell style={{ fontWeight: 500 }}>{row.syllabusFocus}</TraitCell>
            </TraitMapDataRow>
          ))}
        </TraitMapTableContainer>
      </div>

      {/* 3. Colleges Shortlisted after Class 11 & 12 Table */}
      <div>
        <TextCardTitle style={{ marginBottom: '10px' }}>
          <RiGovernmentLine size={18} />
          Colleges Shortlisted after Class 11 & 12
        </TextCardTitle>
        <TraitMapTableContainer>
          <TraitMapHeaderRow style={{ gridTemplateColumns: '1fr 180px 220px 200px' }}>
            <TraitCell>College / Institute Name</TraitCell>
            <TraitCell>Location</TraitCell>
            <TraitCell>Target Degree Program</TraitCell>
            <TraitCell>Cutoff Benchmark</TraitCell>
          </TraitMapHeaderRow>

          {data.shortlistedColleges.map(row => (
            <TraitMapDataRow key={row.id} style={{ gridTemplateColumns: '1fr 180px 220px 200px' }}>
              <TraitCell style={{ fontWeight: 700, color: '#4F46E5' }}>{row.collegeName}</TraitCell>
              <TraitCell style={{ fontWeight: 500 }}>{row.location}</TraitCell>
              <TraitCell style={{ fontWeight: 600 }}>{row.targetDegree}</TraitCell>
              <TraitCell style={{ fontWeight: 700, color: '#10B981' }}>{row.cutoffBenchmark}</TraitCell>
            </TraitMapDataRow>
          ))}
        </TraitMapTableContainer>
      </div>
    </ReportSectionBlock>
  );
};
