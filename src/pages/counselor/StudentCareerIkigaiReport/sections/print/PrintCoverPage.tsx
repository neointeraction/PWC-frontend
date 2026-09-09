import React from 'react';
import { StudentCareerIkigaiReportData } from '@/types/studentIkigaiReport.types';
import {
  PrintCoverBody,
  PrintCoverTitle,
  PrintCoverSubtitle,
  PrintCoverTable,
  PrintDisclaimer,
} from '../../StudentCareerIkigaiReportPage.print.styles';
import { PrintPageChrome } from './PrintPageChrome';

interface PrintCoverPageProps {
  studentInfo: StudentCareerIkigaiReportData['studentInfo'];
}

export const PrintCoverPage: React.FC<PrintCoverPageProps> = ({ studentInfo }) => (
  <PrintPageChrome gradeClass={studentInfo.gradeClass}>
    <PrintCoverBody>
      <PrintCoverTitle>Design Destiny</PrintCoverTitle>
      <PrintCoverSubtitle>kREATE Compass</PrintCoverSubtitle>

      <PrintCoverTable>
        <tbody>
          <tr>
            <td>STUDENT NAME</td>
            <td>{studentInfo.studentName}</td>
          </tr>
          <tr>
            <td>CLASS</td>
            <td>{studentInfo.gradeClass}</td>
          </tr>
          <tr>
            <td>SCHOOL NAME</td>
            <td>{studentInfo.schoolName}</td>
          </tr>
          <tr>
            <td>REPORT DATE</td>
            <td>{studentInfo.reportDate}</td>
          </tr>
        </tbody>
      </PrintCoverTable>

      <PrintDisclaimer>
        Confidential · For Student &amp; Parent Use Only
        <br />
        <br />
        DISCLAIMER: The results in this report reflect the student&apos;s responses at the time
        of assessment. Factors such as social influences, peer or parental expectations,
        exam-day nerves, or simply a moment of uncertainty can affect how one responds and
        therefore what the results show. This report is best used as a starting point for a
        meaningful conversation with the child, not as a final verdict on their abilities or
        personality. It is also worth noting that traits, if underdeveloped, can be strengthened
        through the right guidance, exposure, and training over time.
      </PrintDisclaimer>
    </PrintCoverBody>
  </PrintPageChrome>
);
