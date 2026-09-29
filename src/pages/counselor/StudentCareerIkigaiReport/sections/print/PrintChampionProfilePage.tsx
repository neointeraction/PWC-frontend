import React from 'react';
import { ChampionTrait, StudentCareerIkigaiReportData } from '@/types/studentIkigaiReport.types';
import {
  PrintSectionTitle,
  PrintSectionSubtitle,
  PrintSectionRule,
  PrintTraitCard,
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

// One accent-bordered card per lens (Career Style / Personal Signature / Thinking Mode),
// styled after the client's "Champions Profile" reference.
const ChampionTraitCard: React.FC<{ nameLabel: string; trait: ChampionTrait }> = ({
  nameLabel,
  trait,
}) => (
  <PrintTraitCard>
    <h3>
      <span>{nameLabel}</span>
      {trait.name}
    </h3>
    <PrintBody style={{ margin: 0 }}>{trait.explanation}</PrintBody>
  </PrintTraitCard>
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

    <ChampionTraitCard nameLabel="Career Style" trait={studentProfile.careerStyle} />
    <ChampionTraitCard nameLabel="Personal Signature" trait={studentProfile.personalSignature} />
    <ChampionTraitCard nameLabel="Thinking Mode" trait={studentProfile.thinkingMode} />

    <PrintInsightsSection
      groups={[
        { heading: 'How you Learn and Engage', notes: notesA },
        { heading: 'Your Strengths in Action', notes: notesB },
        { heading: 'What Stood Out about You', notes: notesC },
      ]}
    />
  </PrintPageChrome>
);
