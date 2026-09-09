import React from 'react';
import { StudentCareerIkigaiReportData } from '@/types/studentIkigaiReport.types';
import {
  PrintSectionTitle,
  PrintSectionSubtitle,
  PrintSectionRule,
  PrintTable,
  PrintBanner,
  PrintKeyValueTable,
  PrintBody,
} from '../../StudentCareerIkigaiReportPage.print.styles';
import { PrintPageChrome } from './PrintPageChrome';
import { PrintInsightsSection, NoteEntry } from './PrintInsightsSection';

interface PrintCareerCompassPageProps {
  gradeClass: string;
  industryChoice: StudentCareerIkigaiReportData['industryChoice'];
  cards: StudentCareerIkigaiReportData['careerCompass'];
  notesD: NoteEntry[] | undefined;
}

export const PrintCareerCompassPage: React.FC<PrintCareerCompassPageProps> = ({
  gradeClass,
  industryChoice,
  cards,
  notesD,
}) => (
  <PrintPageChrome gradeClass={gradeClass}>
    <PrintSectionTitle>My Career Compass — Careers Worth Exploring</PrintSectionTitle>
    <PrintSectionSubtitle>Top Careers &amp; Domains</PrintSectionSubtitle>
    <PrintSectionRule />

    <PrintSectionTitle as="h3" style={{ fontSize: '14px' }}>
      Industry Choice
    </PrintSectionTitle>
    <PrintTable>
      <thead>
        <tr>
          <th>Cluster</th>
          <th>Industry</th>
          <th>Domain</th>
          <th>Fit Score</th>
          <th>Grading Level</th>
          <th>Meaning</th>
        </tr>
      </thead>
      <tbody>
        {industryChoice.map(row => (
          <tr key={row.id}>
            <td>{row.cluster}</td>
            <td>{row.industry}</td>
            <td>{row.domain}</td>
            <td>{row.requirement}</td>
            <td>{row.gradingLevel}</td>
            <td>{row.meaning}</td>
          </tr>
        ))}
      </tbody>
    </PrintTable>

    <PrintSectionTitle as="h3" style={{ fontSize: '14px', marginTop: '14px' }}>
      Job Roles to Explore
    </PrintSectionTitle>
    {cards.length === 0 && <PrintBody>No career recommendations available yet.</PrintBody>}
    {cards.map((card, idx) => (
      <React.Fragment key={card.id}>
        <PrintBanner>
          Job Role – Option {idx + 1}: {card.role}
          {card.addedByCounsellor ? ' (Added by your counsellor)' : ''}
        </PrintBanner>
        <PrintKeyValueTable>
          <tbody>
            <tr>
              <td>Cluster</td>
              <td>{card.cluster}</td>
            </tr>
            <tr>
              <td>Industry</td>
              <td>{card.industry}</td>
            </tr>
            <tr>
              <td>Domain</td>
              <td>{card.domain}</td>
            </tr>
            <tr>
              <td>Fit Level</td>
              <td>{card.fitScore !== null ? `${card.level} — ${card.fitScore}%` : card.level}</td>
            </tr>
            <tr>
              <td>Why It Fits</td>
              <td>{card.whyItFits}</td>
            </tr>
            <tr>
              <td>Top Employers</td>
              <td>{card.topEmployers}</td>
            </tr>
            <tr>
              <td>AI Resilience</td>
              <td>{card.aiResilience}</td>
            </tr>
            <tr>
              <td>Salary — India</td>
              <td>{card.salaryIndia}</td>
            </tr>
            <tr>
              <td>Salary — Abroad</td>
              <td>{card.salaryAbroad}</td>
            </tr>
          </tbody>
        </PrintKeyValueTable>
      </React.Fragment>
    ))}

    <PrintInsightsSection groups={[{ heading: 'Where we see You Thriving', notes: notesD }]} />
  </PrintPageChrome>
);
