import React from 'react';
import { StudentCareerIkigaiReportData } from '@/types/studentIkigaiReport.types';
import { getStreamFitGrading } from '@/utils/careerFitGrading';
import {
  PrintSectionTitle,
  PrintSectionSubtitle,
  PrintSectionRule,
  PrintTable,
  PrintBody,
} from '../../StudentCareerIkigaiReportPage.print.styles';
import { PrintPageChrome } from './PrintPageChrome';

interface PrintStreamFitPageProps {
  gradeClass: string;
  data: StudentCareerIkigaiReportData['streamFit'];
}

export const PrintStreamFitPage: React.FC<PrintStreamFitPageProps> = ({ gradeClass, data }) => (
  <PrintPageChrome gradeClass={gradeClass}>
    <PrintSectionTitle>My Stream Fit — Class 11 &amp; 12</PrintSectionTitle>
    <PrintSectionSubtitle>Based on Complete Trait Profile</PrintSectionSubtitle>
    <PrintSectionRule />

    <PrintBody>
      All trait scores were matched against every possible Class 11 &amp; 12 sub-stream. Here
      are your top matches.
    </PrintBody>

    <PrintTable>
      <thead>
        <tr>
          <th>Main Stream</th>
          <th>Sub-Stream</th>
          <th>Core Subjects</th>
          <th>Electives</th>
          <th>Grading Level</th>
          <th>Explanation</th>
        </tr>
      </thead>
      <tbody>
        {data.table.map(row => (
          <tr key={row.id}>
            <td>{row.mainStream}</td>
            <td>{row.subStream}</td>
            <td>{row.coreSubjects}</td>
            <td>{row.electives}</td>
            <td>{getStreamFitGrading(row.fitScore ?? undefined)?.level ?? '—'}</td>
            <td>{getStreamFitGrading(row.fitScore ?? undefined)?.explanation ?? '—'}</td>
          </tr>
        ))}
      </tbody>
    </PrintTable>
  </PrintPageChrome>
);
