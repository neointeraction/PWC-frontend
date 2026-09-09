import React from 'react';
import { StudentCareerIkigaiReportData } from '@/types/studentIkigaiReport.types';
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
          <th style={{ width: '16%' }}>Cluster</th>
          <th style={{ width: '16%' }}>Degree</th>
          <th style={{ width: '18%' }}>Specialisations</th>
          <th>Reasoning</th>
          <th style={{ width: '16%' }}>Key Exams</th>
        </tr>
      </thead>
      <tbody>
        {data.pathways.map(row => (
          <tr key={row.id}>
            <td>{row.cluster}</td>
            <td>{row.degree}</td>
            <td>{row.specialisations}</td>
            <td>{row.reasoning}</td>
            <td>{row.keyExams}</td>
          </tr>
        ))}
      </tbody>
    </PrintTable>
  </PrintPageChrome>
);
