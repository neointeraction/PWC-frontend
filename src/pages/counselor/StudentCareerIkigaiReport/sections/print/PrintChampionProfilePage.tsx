import React from 'react';
import { StudentCareerIkigaiReportData } from '@/types/studentIkigaiReport.types';
import {
  PrintSectionTitle,
  PrintSectionSubtitle,
  PrintSectionRule,
  PrintChampionTable,
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

    <PrintChampionTable>
      <thead>
        <tr>
          <th>Career Style</th>
          <th>Personal Signature</th>
          <th>Thinking Mode</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="trait-name">{studentProfile.careerStyle.name}</td>
          <td className="trait-name">{studentProfile.personalSignature.name}</td>
          <td className="trait-name">{studentProfile.thinkingMode.name}</td>
        </tr>
        <tr>
          <td>{studentProfile.careerStyle.description}</td>
          <td>{studentProfile.personalSignature.description}</td>
          <td>{studentProfile.thinkingMode.description}</td>
        </tr>
      </tbody>
    </PrintChampionTable>

    <PrintInsightsSection
      groups={[
        { heading: 'How you Learn and Engage', notes: notesA },
        { heading: 'Your Strengths in Action', notes: notesB },
        { heading: 'What Stood Out about You', notes: notesC },
      ]}
    />
  </PrintPageChrome>
);
