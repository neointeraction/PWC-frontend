import React from 'react';
import styled from 'styled-components';
import {
  PrintPage,
  PrintFooter,
  PrintPageNumber,
} from '../../StudentCareerIkigaiReportPage.print.styles';

interface PrintPageChromeProps {
  gradeClass: string;
  children: React.ReactNode;
}

// Every content page of the report. The running header (Design Destiny logo + rule) and
// footer (rule + kREATE Career Compass logo) come from the client's page artwork, which
// PrintPage paints as its background on every sheet — only the page number is live text
// here; the student name / class line is PrintRunningHeader below.
export const PrintPageChrome: React.FC<PrintPageChromeProps> = ({ children }) => (
  <PrintPage>
    {children}
    <PrintFooter>
      <PrintPageNumber />
    </PrintFooter>
  </PrintPage>
);

// position: fixed prints on every physical sheet in Chrome — including the continuation
// sheets of a section that spills over, which a per-section absolute header can't reach.
// Sits top-left, level with the artwork's Design Destiny logo on the right. z-index 1 keeps
// it above the content pages; the cover sheet sits at z-index 2 so it stays hidden there.
const PrintRunningHeaderRoot = styled.div`
  position: fixed;
  top: 12mm;
  left: 68px;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #6b6b6b;
`;

const PrintRunningHeaderDivider = styled.span`
  color: #5d2384;
`;

export const PrintRunningHeader: React.FC<{ studentName: string; gradeClass: string }> = ({
  studentName,
  gradeClass,
}) => (
  <PrintRunningHeaderRoot>
    <span>{studentName}</span>
    <PrintRunningHeaderDivider>|</PrintRunningHeaderDivider>
    <span>{gradeClass}</span>
  </PrintRunningHeaderRoot>
);
