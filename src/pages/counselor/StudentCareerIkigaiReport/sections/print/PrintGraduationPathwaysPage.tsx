import React from 'react';
import { StudentCareerIkigaiReportData } from '@/types/studentIkigaiReport.types';
import { getCareerFitGrading } from '@/utils/careerFitGrading';
import {
  PrintSectionTitle,
  PrintSectionSubtitle,
  PrintSectionRule,
  PrintTable,
  PrintBody,
} from '../../StudentCareerIkigaiReportPage.print.styles';
import { PrintPageChrome } from './PrintPageChrome';

interface PrintGraduationPathwaysPageProps {
  gradeClass: string;
  data: StudentCareerIkigaiReportData['graduation'];
}

export const PrintGraduationPathwaysPage: React.FC<PrintGraduationPathwaysPageProps> = ({
  gradeClass,
  data,
}) => (
  <PrintPageChrome gradeClass={gradeClass}>
    <PrintSectionTitle>Graduation Pathways</PrintSectionTitle>
    <PrintSectionSubtitle>Indicative · Based on Current Profile</PrintSectionSubtitle>
    <PrintSectionRule />

    <PrintBody>
      This is an early, indicative view of graduation options aligned with the current profile.
      These will be refined in Class 11 &amp; 12 based on actual academic performance and
      evolved interests.
    </PrintBody>

    <PrintTable>
      <thead>
        <tr>
          <th style={{ width: '12%' }}>Cluster</th>
          <th style={{ width: '14%' }}>Main Stream</th>
          <th style={{ width: '14%' }}>Sub-Stream</th>
          <th style={{ width: '14%' }}>Specialisation</th>
          <th>Reasoning</th>
          <th style={{ width: '14%' }}>Key Exams</th>
          <th style={{ width: '12%' }}>Grading Level</th>
          <th>Explanation</th>
        </tr>
      </thead>
      <tbody>
        {data.pathways.map(row => (
          <tr key={row.id}>
            <td>{row.cluster}</td>
            <td>{row.mainStream}</td>
            <td>{row.subStream}</td>
            <td>{row.specialisations}</td>
            <td>{row.reasoning}</td>
            <td>{row.keyExams}</td>
            <td>{getCareerFitGrading(row.fitScore ?? undefined)?.level ?? '—'}</td>
            <td>{getCareerFitGrading(row.fitScore ?? undefined)?.explanation ?? '—'}</td>
          </tr>
        ))}
      </tbody>
    </PrintTable>
  </PrintPageChrome>
);
