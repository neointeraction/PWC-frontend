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
}

// The purple/grey running header + footer repeated on every content page of the reference
// PDF ("DESIGN DESTINY | Career kREATE Report | Class 9&10 | Confidential" ... "Page N").
export const PrintPageChrome: React.FC<PrintPageChromeProps> = ({ gradeClass, children }) => (
  <PrintPage>
    <PrintRunningHeader>
      <span>Design Destiny</span>
      <span>Career kREATE Report</span>
      <span>{gradeClass}</span>
      <span>Confidential</span>
    </PrintRunningHeader>
    {children}
    <PrintFooter>
      <span>kREATE Compass Report</span>
      <PrintPageNumber />
    </PrintFooter>
  </PrintPage>
);
