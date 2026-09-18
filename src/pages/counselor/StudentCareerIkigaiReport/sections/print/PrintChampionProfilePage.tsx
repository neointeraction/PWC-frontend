import React from 'react';
import { ChampionTrait, StudentCareerIkigaiReportData } from '@/types/studentIkigaiReport.types';
import {
  PrintSectionTitle,
  PrintSectionSubtitle,
  PrintSectionRule,
  PrintTable,
  PrintBody,
} from '../../StudentCareerIkigaiReportPage.print.styles';
import { PrintPageChrome } from './PrintPageChrome';
import { PrintInsightsSection, NoteEntry } from './PrintInsightsSection';

interface PrintChampionProfilePageProps {
  studentInfo: StudentCareerIkigaiReportData['studentInfo'];
  studentProfile: StudentCareerIkigaiReportData['studentProfile'];
  notesA: NoteEntry[] | undefined;
  notesB: NoteEntry[] | undefined;
  notesC: NoteEntry[] | undefined;
}

// One linear name/description/explanation table per lens — mirrors the Dominant
// Career Style / Personal Signature / Thinking Mode tables on the counsellor chart
// (Step2SectionB), rather than the 3-up card grid used before.
const ChampionTraitTable: React.FC<{ nameLabel: string; trait: ChampionTrait }> = ({
  nameLabel,
  trait,
}) => (
  <PrintTable>
    <thead>
      <tr>
        <th style={{ width: '18%' }}>{nameLabel}</th>
        <th>Explanation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{ fontWeight: 700 }}>{trait.name}</td>
        <td>{trait.explanation}</td>
      </tr>
    </tbody>
  </PrintTable>
);

export const PrintChampionProfilePage: React.FC<PrintChampionProfilePageProps> = ({
  studentInfo,
  studentProfile,
  notesA,
  notesB,
  notesC,
}) => (
  <PrintPageChrome gradeClass={studentInfo.gradeClass}>
    <PrintSectionTitle>Champion&apos;s Profile</PrintSectionTitle>
    <PrintSectionSubtitle>Career · Personality · Thinking</PrintSectionSubtitle>
    <PrintSectionRule />

    <PrintBody>
      Three quick lenses into what makes you, you. How you&apos;re drawn to work, how you
      naturally show up with others and how you think things through.
    </PrintBody>

    <ChampionTraitTable nameLabel="Career Style" trait={studentProfile.careerStyle} />
    <ChampionTraitTable nameLabel="Personal Signature" trait={studentProfile.personalSignature} />
    <ChampionTraitTable nameLabel="Thinking Mode" trait={studentProfile.thinkingMode} />

    <PrintInsightsSection
      groups={[
        { heading: 'How you Learn and Engage', notes: notesA },
        { heading: 'Your Strengths in Action', notes: notesB },
        { heading: 'What Stood Out about You', notes: notesC },
      ]}
    />
  </PrintPageChrome>
);
