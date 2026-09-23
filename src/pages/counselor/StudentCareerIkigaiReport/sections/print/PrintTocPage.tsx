import React from 'react';
import {
  PrintSectionTitle,
  PrintSectionRule,
  PrintTocList,
  PrintTocRow,
} from '../../StudentCareerIkigaiReportPage.print.styles';
import { PrintPageChrome } from './PrintPageChrome';

const TOC_ROWS = [
  'What is Career kREATE Report',
  "Champion's Profile",
  'My 4 Dimensional Strength Meter',
  'How Is My Assessment Reliability',
  'My Stream Fit — Class 11 & 12',
  'Graduation Pathways',
  'Education Pathways',
  'My Career Compass — Careers Worth Exploring',
  'My kREATE Blueprint',
];

interface PrintTocPageProps {
  gradeClass: string;
  // Physical start page of every section, in PrintReportContent.tsx's render order
  // (measured just before printing, since long sections span several pages).
  sectionStartPages: number[] | null;
}

// Section 0 is the cover and section 1 is this TOC page itself, so TOC_ROWS[i] (listed in
// the same order PrintReportContent.tsx composes the pages) is section i + 2.
const FIRST_CONTENT_SECTION = 2;

export const PrintTocPage: React.FC<PrintTocPageProps> = ({ gradeClass, sectionStartPages }) => (
  <PrintPageChrome gradeClass={gradeClass}>
    <PrintSectionTitle>Table of Contents</PrintSectionTitle>
    <PrintSectionRule />
    <PrintTocList>
      {TOC_ROWS.map((row, index) => (
        <PrintTocRow key={row}>
          <span>{row}</span>
          <span>
            {sectionStartPages?.[FIRST_CONTENT_SECTION + index] ?? FIRST_CONTENT_SECTION + index + 1}
          </span>
        </PrintTocRow>
      ))}
    </PrintTocList>
  </PrintPageChrome>
);
