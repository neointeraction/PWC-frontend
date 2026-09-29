import React from 'react';
import {
  PrintTocTitle,
  PrintTocList,
  PrintTocRow,
  PrintTocIndex,
  PrintTocLeader,
  PrintTocPageBadge,
  PrintPillars,
  PrintPillar,
  PrintDisclaimer,
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

const pad2 = (n: number) => String(n).padStart(2, '0');

// Discover / Decide / Design — the report's three stages, from the client's TOC reference.
const PILLARS = [
  {
    title: 'Discover',
    caption: 'your direction',
    color: '#5D2384',
    icon: (
      <g fill="none" stroke="#fff" strokeWidth="2">
        <circle cx="29" cy="29" r="14" />
        <path d="M29 11v5M29 42v5M11 29h5M42 29h5" />
        <path d="m36 22-4.5 10.5L22 36l4.5-10.5z" fill="#fff" fillOpacity="0.35" />
      </g>
    ),
  },
  {
    title: 'Decide',
    caption: 'your path',
    color: '#C2185B',
    icon: (
      <g fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round">
        <path d="M29 13v33M24 46h10" />
        <path d="M19 17h19l4 4-4 4H19zM39 28H20l-4 4 4 4h19z" />
      </g>
    ),
  },
  {
    title: 'Design',
    caption: 'your career',
    color: '#1B7A3E',
    icon: (
      <g fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round">
        <path d="M16 43h26M18 43v-6h4v6M25 43V33h4v10M32 43V28h4v15" />
        <path d="m17 30 8-7 5 4 10-10M34 17h6v6" />
      </g>
    ),
  },
];

export const PrintTocPage: React.FC<PrintTocPageProps> = ({ gradeClass, sectionStartPages }) => (
  <PrintPageChrome gradeClass={gradeClass}>
    <PrintTocTitle>Table of Contents</PrintTocTitle>
    <PrintTocList>
      {TOC_ROWS.map((row, index) => (
        <PrintTocRow key={row}>
          <PrintTocIndex>{pad2(index + 1)}</PrintTocIndex>
          <span>{row}</span>
          <PrintTocLeader />
          <PrintTocPageBadge>
            {pad2(
              sectionStartPages?.[FIRST_CONTENT_SECTION + index] ??
                FIRST_CONTENT_SECTION + index + 1,
            )}
          </PrintTocPageBadge>
        </PrintTocRow>
      ))}
    </PrintTocList>

    <PrintPillars>
      {PILLARS.map(pillar => (
        <PrintPillar key={pillar.title} $color={pillar.color}>
          <svg viewBox="0 0 58 58" aria-hidden="true">
            <circle cx="29" cy="29" r="29" fill={pillar.color} />
            {pillar.icon}
          </svg>
          <strong>{pillar.title.toUpperCase()}</strong>
          {pillar.caption}
        </PrintPillar>
      ))}
    </PrintPillars>

    <PrintDisclaimer>
      DISCLAIMER: The results in this report reflect the student&apos;s responses at the time of
      assessment. Factors such as social influences, peer or parental expectations, exam-day
      nerves, or simply a moment of uncertainty can affect how one responds and therefore what
      the results show. This report is best used as a starting point for a meaningful
      conversation with the child, not as a final verdict on their abilities or personality. It
      is also worth noting that traits, if underdeveloped, can be strengthened through the right
      guidance, exposure, and training over time.
    </PrintDisclaimer>
  </PrintPageChrome>
);
