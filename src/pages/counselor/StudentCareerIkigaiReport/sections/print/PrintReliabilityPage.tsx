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

// Same student-facing guiding question per code as ReliabilityDashboardSection.tsx (the
// live report) — the template deliberately hides the underlying percentage/score.
const METRIC_QUESTION: Record<string, string> = {
  EIM: 'How consistent were your personality answers?',
  ACI: 'How logically did aptitude answers progress?',
  AAI: "How many questions were marked 'Not Sure'?",
  HRS: 'Whether you moved through the assessment at a comfortable, thoughtful pace?',
};

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

    {metrics.map(item => (
      <div key={item.code}>
        <PrintSectionTitle as="h3" style={{ fontSize: '13px', marginTop: '10px' }}>
          {item.name}
        </PrintSectionTitle>
        <PrintTable>
          <thead>
            <tr>
              <th style={{ width: '46%' }}>Measure</th>
              <th style={{ width: '18%' }}>Status</th>
              <th>Explanation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{METRIC_QUESTION[item.code] ?? item.name}</td>
              <td>{item.status}</td>
              <td>{item.guidance}</td>
            </tr>
          </tbody>
        </PrintTable>
      </div>
    ))}

    <PrintInsightsSection groups={[{ heading: 'What this Tells Us', notes: notesF }]} />
  </PrintPageChrome>
);
