import React from 'react';
import {
  PrintPage,
  PrintRunningHeader,
  PrintFooter,
  PrintPageNumber,
} from '../../StudentCareerIkigaiReportPage.print.styles';

interface PrintPageChromeProps {
  gradeClass: string;
  children: React.ReactNode;
  // Fixed one-sheet page with the footer pinned to the bottom edge — only for pages that
  // can never overflow (the cover); see PrintPage.
  singleSheet?: boolean;
}

// The purple/grey running header + footer repeated on every content page of the reference
// PDF ("DESIGN DESTINY | Career kREATE Report | Class 9&10 | Confidential" ... "Page N").
export const PrintPageChrome: React.FC<PrintPageChromeProps> = ({ gradeClass, children, singleSheet }) => (
  <PrintPage $singleSheet={singleSheet}>
    <PrintRunningHeader>
      <span>Design Destiny</span>
      <span>Career kREATE Report</span>
      <span>{gradeClass}</span>
      <span>Confidential</span>
    </PrintRunningHeader>
    {children}
    <PrintFooter $pinToBottom={singleSheet}>
      <span>kREATE Compass Report</span>
      <PrintPageNumber />
    </PrintFooter>
  </PrintPage>
);
