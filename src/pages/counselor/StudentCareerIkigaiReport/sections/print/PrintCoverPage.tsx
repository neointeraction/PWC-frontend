import React from 'react';
import { StudentCareerIkigaiReportData } from '@/types/studentIkigaiReport.types';
import {
  PrintCoverSheet,
  PrintCoverCard,
  PrintCoverRow,
  PrintCoverConfidential,
} from '../../StudentCareerIkigaiReportPage.print.styles';

interface PrintCoverPageProps {
  studentInfo: StudentCareerIkigaiReportData['studentInfo'];
}

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="7.5" r="4.5" />
    <path d="M3 21c0-4.4 4-7.5 9-7.5s9 3.1 9 7.5z" />
  </svg>
);

const ClassIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="6" r="3.2" />
    <circle cx="4.8" cy="8.5" r="2.4" />
    <circle cx="19.2" cy="8.5" r="2.4" />
    <path d="M6 19c0-3.4 2.7-6 6-6s6 2.6 6 6zM0.5 18c0-2.6 1.8-4.5 4.3-4.5 1 0 1.9.3 2.6.8A7.6 7.6 0 0 0 5 18zM23.5 18c0-2.6-1.8-4.5-4.3-4.5-1 0-1.9.3-2.6.8A7.6 7.6 0 0 1 19 18z" />
  </svg>
);

const SchoolIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 1.5 9 3.3v3.2L2 10v12h7.5v-5h5v5H22V10l-7-3.5V3.3zm0 6.2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM4.5 13h3v2.5h-3zm12 0h3v2.5h-3zm-12 4.5h3V20h-3zm12 0h3V20h-3z" />
  </svg>
);

// Full-bleed client artwork (logos, landscape and wave are part of the image) with the
// champion details card laid over its blank left side — no running header/footer here.
export const PrintCoverPage: React.FC<PrintCoverPageProps> = ({ studentInfo }) => (
  // z-index 2: above the fixed running header (see PrintRunningHeader), which prints on
  // every sheet but mustn't show on the cover.
  <PrintCoverSheet $singleSheet style={{ zIndex: 2 }}>
    <PrintCoverCard>
      <PrintCoverRow>
        <PersonIcon />
        <span>Champion Name</span>
        <span>{studentInfo.studentName}</span>
      </PrintCoverRow>
      <PrintCoverRow>
        <ClassIcon />
        <span>Class</span>
        <span>{studentInfo.gradeClass}</span>
      </PrintCoverRow>
      <PrintCoverRow>
        <SchoolIcon />
        <span>School Name</span>
        <span>{studentInfo.schoolName}</span>
      </PrintCoverRow>
    </PrintCoverCard>
    <PrintCoverConfidential>
      Confidential &middot; For Student &amp; Parent Use Only
    </PrintCoverConfidential>
  </PrintCoverSheet>
);
