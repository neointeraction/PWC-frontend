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
import { PrintInsightsSection, NoteEntry } from './PrintInsightsSection';

interface PrintReliabilityPageProps {
  gradeClass: string;
  metrics: StudentCareerIkigaiReportData['reliability'];
  notesF: NoteEntry[] | undefined;
}

export const PrintReliabilityPage: React.FC<PrintReliabilityPageProps> = ({
  gradeClass,
  metrics,
  notesF,
}) => (
  <PrintPageChrome gradeClass={gradeClass}>
    <PrintSectionTitle>How Is My Assessment Reliability</PrintSectionTitle>
    <PrintSectionSubtitle>Assessment Integrity Check</PrintSectionSubtitle>
    <PrintSectionRule />

    <PrintBody>
      This isn&apos;t a score on you. It&apos;s a check on how steady, confident and natural your
      responses were.
    </PrintBody>

    <PrintTable>
      <thead>
        <tr>
          <th style={{ width: '20%' }}>Measure</th>
          <th style={{ width: '14%' }}>Score</th>
          <th style={{ width: '16%' }}>Grading Label</th>
          <th>Grading Meaning</th>
        </tr>
      </thead>
      <tbody>
        {metrics.map(item => (
          <tr key={item.code}>
            <td>{item.name}</td>
            <td>{item.score}</td>
            <td>{item.status}</td>
            <td>{item.guidance}</td>
          </tr>
        ))}
      </tbody>
    </PrintTable>

    <PrintInsightsSection groups={[{ heading: 'What this Tells Us', notes: notesF }]} />
  </PrintPageChrome>
);
