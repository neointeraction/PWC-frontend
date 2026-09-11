import React from 'react';
import { StudentCareerIkigaiReportData } from '@/types/studentIkigaiReport.types';
import { CounsellorChartResponse } from '@/types/counsellorChart.types';
import { ScriBandGuidance } from '@/types';
import { PrintRoot } from '../../StudentCareerIkigaiReportPage.print.styles';
import { PrintCoverPage } from './PrintCoverPage';
import { PrintTocPage } from './PrintTocPage';
import { PrintAboutPage } from './PrintAboutPage';
import { PrintChampionProfilePage } from './PrintChampionProfilePage';
import { PrintTraitMapPage } from './PrintTraitMapPage';
import { PrintReliabilityPage } from './PrintReliabilityPage';
import { PrintStreamFitPage } from './PrintStreamFitPage';
import { PrintGraduationPathwaysPage } from './PrintGraduationPathwaysPage';
import { PrintEducationPathwaysPage } from './PrintEducationPathwaysPage';
import { PrintCareerCompassPage } from './PrintCareerCompassPage';
import { PrintKreateBlueprintPage } from './PrintKreateBlueprintPage';
import { NoteEntry } from './PrintInsightsSection';

interface PrintReportContentProps {
  reportData: StudentCareerIkigaiReportData;
  counsellorChart: CounsellorChartResponse | undefined;
  scriBandGuidance: ScriBandGuidance[] | undefined;
}

const groupNotesByPrefix = (notes: Record<string, string> | undefined) => {
  const groups: Record<string, NoteEntry[]> = {};
  Object.entries(notes ?? {}).forEach(([code, body]) => {
    if (!body || !body.trim()) return;
    const prefix = code[0];
    (groups[prefix] ??= []).push({ code, body });
  });
  Object.values(groups).forEach(list => list.sort((a, b) => a.code.localeCompare(b.code)));
  return groups;
};

// Renders the print/PDF-only view of the kREATE Compass Report, matching the reference
// "Design Destiny" PDF page-for-page. Stays display:none on screen (see PrintRoot) — the
// on-screen dashboard in StudentCareerIkigaiReportPage.tsx is a completely separate tree and
// is unaffected by anything in here.
export const PrintReportContent: React.FC<PrintReportContentProps> = ({
  reportData,
  counsellorChart,
  scriBandGuidance,
}) => {
  const gradeClass = reportData.studentInfo.gradeClass;
  const notesByPrefix = groupNotesByPrefix(counsellorChart?.counsellor.notes);

  return (
    <PrintRoot>
      <PrintCoverPage studentInfo={reportData.studentInfo} />
      <PrintTocPage gradeClass={gradeClass} />
      <PrintAboutPage gradeClass={gradeClass} />
      <PrintChampionProfilePage
        studentInfo={reportData.studentInfo}
        studentProfile={reportData.studentProfile}
        notesA={notesByPrefix.A}
        notesB={notesByPrefix.B}
        notesC={notesByPrefix.C}
      />
      <PrintTraitMapPage gradeClass={gradeClass} traits={reportData.traitMap} />
      <PrintReliabilityPage
        gradeClass={gradeClass}
        metrics={reportData.reliability}
        notesF={notesByPrefix.F}
      />
      <PrintStreamFitPage gradeClass={gradeClass} data={reportData.streamFit} />
      <PrintGraduationPathwaysPage gradeClass={gradeClass} data={reportData.graduation} />
      <PrintEducationPathwaysPage
        gradeClass={gradeClass}
        colleges={counsellorChart?.counsellor.collegesTable}
        exams={counsellorChart?.counsellor.entranceExamsTable}
        notesE={notesByPrefix.E}
      />
      <PrintCareerCompassPage
        gradeClass={gradeClass}
        cards={reportData.careerCompass}
        notesD={notesByPrefix.D}
      />
      <PrintKreateBlueprintPage
        gradeClass={gradeClass}
        roadmapGrid={counsellorChart?.counsellor.roadmapGrid}
        scri={counsellorChart?.counsellor.scri}
        bandGuidance={scriBandGuidance}
        alignmentRating={counsellorChart?.counsellor.alignmentRating}
        notesG={notesByPrefix.G}
      />
    </PrintRoot>
  );
};
