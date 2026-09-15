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
import { PrintInsightsSection, NoteEntry } from './PrintInsightsSection';

interface PrintCareerCompassPageProps {
  gradeClass: string;
  cards: StudentCareerIkigaiReportData['careerCompass'];
  notesD: NoteEntry[] | undefined;
}

export const PrintCareerCompassPage: React.FC<PrintCareerCompassPageProps> = ({
  gradeClass,
  cards,
  notesD,
}) => (
  <PrintPageChrome gradeClass={gradeClass}>
    <PrintSectionTitle>My Career Compass — Careers Worth Exploring</PrintSectionTitle>
    <PrintSectionSubtitle>Top Careers &amp; Domains</PrintSectionSubtitle>
    <PrintSectionRule />

    <PrintSectionTitle as="h3" style={{ fontSize: '14px' }}>
      Job Roles to Explore
    </PrintSectionTitle>
    {cards.length === 0 && <PrintBody>No career recommendations available yet.</PrintBody>}
    {cards.length > 0 && (
      <PrintTable>
        <thead>
          <tr>
            <th>Cluster</th>
            <th>Industry</th>
            <th>Domain</th>
            <th>Target Role</th>
            <th>Why It Fits</th>
            <th>Top Employers</th>
            <th>Salary (India)</th>
            <th>Salary (Abroad)</th>
            <th>Grading Level</th>
            <th>Student-Friendly Explanation</th>
          </tr>
        </thead>
        <tbody>
          {cards.map(card => (
            <tr key={card.id}>
              <td>{card.cluster}</td>
              <td>{card.industry}</td>
              <td>{card.domain}</td>
              <td>{card.role}</td>
              <td>{card.whyItFits}</td>
              <td>{card.topEmployers}</td>
              <td>{card.salaryIndia}</td>
              <td>{card.salaryAbroad}</td>
              <td>{getCareerFitGrading(card.fitScore ?? undefined)?.level || '—'}</td>
              <td>{getCareerFitGrading(card.fitScore ?? undefined)?.explanation || '—'}</td>
            </tr>
          ))}
        </tbody>
      </PrintTable>
    )}

    <PrintInsightsSection groups={[{ heading: 'Where we see You Thriving', notes: notesD }]} />
  </PrintPageChrome>
);
