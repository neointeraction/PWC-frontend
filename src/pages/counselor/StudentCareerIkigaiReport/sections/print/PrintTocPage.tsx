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
}

// Page 1 is the cover, page 2 is this TOC page itself, so the first row below (rendered
// in the same order PrintReportContent.tsx composes the pages) starts at page 3.
const FIRST_CONTENT_PAGE = 3;

export const PrintTocPage: React.FC<PrintTocPageProps> = ({ gradeClass }) => (
  <PrintPageChrome gradeClass={gradeClass}>
    <PrintSectionTitle>Table of Contents</PrintSectionTitle>
    <PrintSectionRule />
    <PrintTocList>
      {TOC_ROWS.map((row, index) => (
        <PrintTocRow key={row}>
          <span>{row}</span>
          <span>{FIRST_CONTENT_PAGE + index}</span>
        </PrintTocRow>
      ))}
    </PrintTocList>
  </PrintPageChrome>
);
