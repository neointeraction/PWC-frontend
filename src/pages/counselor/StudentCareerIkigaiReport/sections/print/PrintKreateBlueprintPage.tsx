import React from 'react';
import { RoadmapGridJson, AcademicTrend, AlignmentRating } from '@/types/counsellorChart.types';
import {
  PrintSectionTitle,
  PrintSectionSubtitle,
  PrintSectionRule,
  PrintTable,
  PrintKeyValueTable,
  PrintPlaceholderNote,
} from '../../StudentCareerIkigaiReportPage.print.styles';
import { PrintPageChrome } from './PrintPageChrome';
import { PrintInsightsSection, NoteEntry } from './PrintInsightsSection';

interface Scri {
  total: number | null;
  band: number | null;
  bandLabel: string | null;
}

const ACADEMIC_TREND_LABEL: Record<AcademicTrend, string> = {
  IMPROVING: 'Improving',
  STABLE: 'Stable',
  DECLINING: 'Declining',
  NOT_ASSESSED: 'Not Yet Assessed',
};

const ACADEMIC_TREND_MEANING: Record<AcademicTrend, string> = {
  IMPROVING: "The student's academic performance has been trending upward.",
  STABLE: "The student's academic performance has stayed consistent.",
  DECLINING: "The student's academic performance has been trending downward.",
  NOT_ASSESSED: 'Not enough academic history has been reviewed yet to gauge a trend.',
};

const ALIGNMENT_LABEL: Record<AlignmentRating, string> = {
  STRONGLY_ALIGNED: 'Strongly Aligned',
  PARTIALLY_ALIGNED: 'Partially Aligned',
  MISALIGNED: 'Misaligned',
  NOT_YET_ASSESSED: 'Not Yet Assessed',
};

const ALIGNMENT_MEANING: Record<AlignmentRating, string> = {
  STRONGLY_ALIGNED: 'Academic strengths and career interests point in the same direction.',
  PARTIALLY_ALIGNED: 'Academic strengths and career interests overlap in some areas but not others.',
  MISALIGNED: 'Academic strengths and career interests currently point in different directions.',
  NOT_YET_ASSESSED: 'Alignment has not been assessed yet.',
};

interface PrintKreateBlueprintPageProps {
  gradeClass: string;
  roadmapGrid: RoadmapGridJson | null | undefined;
  scri: Scri | undefined;
  academicTrend: AcademicTrend | null | undefined;
  alignmentRating: AlignmentRating | null | undefined;
  notesG: NoteEntry[] | undefined;
}

export const PrintKreateBlueprintPage: React.FC<PrintKreateBlueprintPageProps> = ({
  gradeClass,
  roadmapGrid,
  scri,
  academicTrend,
  alignmentRating,
  notesG,
}) => (
  <PrintPageChrome gradeClass={gradeClass}>
    <PrintSectionTitle>My kREATE Blueprint</PrintSectionTitle>
    <PrintSectionSubtitle>Now · Class 11–12 · After Class 12</PrintSectionSubtitle>
    <PrintSectionRule />

    {roadmapGrid ? (
      <PrintTable>
        <thead>
          <tr>
            <th>NOW (Class 9–10)</th>
            <th>CLASS 11–12</th>
            <th>AFTER CLASS 12</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ fontWeight: 700 }}>Skills to Build</td>
            <td style={{ fontWeight: 700 }}>Stream to Choose</td>
            <td style={{ fontWeight: 700 }}>Degrees to Target</td>
          </tr>
          <tr>
            <td>{roadmapGrid.nowSkills}</td>
            <td>{roadmapGrid.c11Stream}</td>
            <td>{roadmapGrid.afterDegrees}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 700 }}>Activities to Join</td>
            <td style={{ fontWeight: 700 }}>Exams to Watch</td>
            <td style={{ fontWeight: 700 }}>Certifications</td>
          </tr>
          <tr>
            <td>{roadmapGrid.nowActivities}</td>
            <td>{roadmapGrid.c11Exams}</td>
            <td>{roadmapGrid.afterCertifications}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 700 }}>Habits to Develop</td>
            <td style={{ fontWeight: 700 }}>Electives to Pick</td>
            <td style={{ fontWeight: 700 }}>Study Abroad</td>
          </tr>
          <tr>
            <td>{roadmapGrid.nowHabits}</td>
            <td>{roadmapGrid.c11Electives}</td>
            <td>{roadmapGrid.afterAbroad}</td>
          </tr>
        </tbody>
      </PrintTable>
    ) : (
      <PrintPlaceholderNote>
        The counsellor hasn&apos;t filled in this student&apos;s kREATE Blueprint yet.
      </PrintPlaceholderNote>
    )}

    <PrintSectionTitle as="h3" style={{ fontSize: '14px', marginTop: '10px' }}>
      My Career Confidence Meter
    </PrintSectionTitle>
    {scri?.bandLabel ? (
      <PrintKeyValueTable>
        <tbody>
          <tr>
            <td>Label</td>
            <td>{scri.bandLabel}</td>
          </tr>
          <tr>
            <td>Score</td>
            <td>{scri.total ?? '—'}</td>
          </tr>
        </tbody>
      </PrintKeyValueTable>
    ) : (
      <PrintPlaceholderNote>
        The counsellor hasn&apos;t recorded a career confidence reading for this student yet.
      </PrintPlaceholderNote>
    )}

    <PrintSectionTitle as="h3" style={{ fontSize: '14px', marginTop: '10px' }}>
      My Overall Academic Orientation
    </PrintSectionTitle>
    <PrintKeyValueTable>
      <tbody>
        <tr>
          <td>Academic Trend</td>
          <td>
            {ACADEMIC_TREND_LABEL[academicTrend ?? 'NOT_ASSESSED']} —{' '}
            {ACADEMIC_TREND_MEANING[academicTrend ?? 'NOT_ASSESSED']}
          </td>
        </tr>
        <tr>
          <td>Interest Alignment</td>
          <td>
            {ALIGNMENT_LABEL[alignmentRating ?? 'NOT_YET_ASSESSED']} —{' '}
            {ALIGNMENT_MEANING[alignmentRating ?? 'NOT_YET_ASSESSED']}
          </td>
        </tr>
      </tbody>
    </PrintKeyValueTable>

    <PrintInsightsSection groups={[{ heading: 'Parting Notes', notes: notesG }]} />
  </PrintPageChrome>
);
