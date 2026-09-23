import React, { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { StudentCareerIkigaiReportData } from '@/types/studentIkigaiReport.types';
import { CounsellorChartResponse } from '@/types/counsellorChart.types';
import { ScriBandGuidance } from '@/types';
import {
  PrintRoot,
  PrintPageSetup,
  PRINT_PAGE_HEIGHT_MM,
  PRINT_PAGE_WIDTH_MM,
  PRINT_PAGE_VERTICAL_PADDING_PX,
} from '../../StudentCareerIkigaiReportPage.print.styles';
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
  // Runs the pagination measurement immediately on mount instead of waiting for the
  // browser's `beforeprint` event, and calls onMeasured once done. Needed for the headless
  // report-PDF render (see PrintReportOnlyPage): Puppeteer's page.pdf() applies print CSS
  // but — unlike a real "Download as PDF"/Ctrl+P — never fires beforeprint/afterprint, a
  // long-standing Chromium limitation (those events are tied to the print-UI flow, not the
  // printToPDF command), so this render needs its own trigger.
  autoMeasureOnMount?: boolean;
  onMeasured?: () => void;
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

const MM_TO_PX = 96 / 25.4;
// PRINT_PAGE_VERTICAL_PADDING_PX: PrintPage's top + bottom padding, repeated on every
// physical page a section spills onto (box-decoration-break: clone) — so it eats into each
// continuation page's usable height.

// Every PrintPage starts on a fresh sheet (break-after: page), but a long one (e.g. a big
// colleges table or insights list) spills onto more than one — so a fixed "one section =
// one page" numbering drifts. Lays the print tree out off-screen at A4 width, and turns
// each section's height into how many physical pages it will occupy.
const measureSectionPageCounts = (root: HTMLElement): number[] => {
  const pageHeight = PRINT_PAGE_HEIGHT_MM * MM_TO_PX;
  const usable = pageHeight - PRINT_PAGE_VERTICAL_PADDING_PX;
  const prevStyle = root.getAttribute('style');
  root.setAttribute(
    'style',
    `display:block;position:absolute;left:-100000px;top:0;width:${PRINT_PAGE_WIDTH_MM}mm;visibility:hidden;`,
  );
  root.dataset.measuring = 'true';
  const counts = Array.from(root.children)
    .filter((el): el is HTMLElement => el.tagName === 'SECTION')
    .map(section => {
      const content = section.getBoundingClientRect().height - PRINT_PAGE_VERTICAL_PADDING_PX;
      // Small tolerance so sub-pixel rounding doesn't add a phantom page.
      return Math.max(1, Math.ceil((content - 2) / usable));
    });
  delete root.dataset.measuring;
  if (prevStyle === null) root.removeAttribute('style');
  else root.setAttribute('style', prevStyle);
  return counts;
};

// Renders the print/PDF-only view of the kREATE Compass Report, matching the reference
// "Design Destiny" PDF page-for-page. Stays display:none on screen (see PrintRoot) — the
// on-screen dashboard in StudentCareerIkigaiReportPage.tsx is a completely separate tree and
// is unaffected by anything in here.
export const PrintReportContent: React.FC<PrintReportContentProps> = ({
  reportData,
  counsellorChart,
  scriBandGuidance,
  autoMeasureOnMount,
  onMeasured,
}) => {
  const gradeClass = reportData.studentInfo.gradeClass;
  const notesByPrefix = groupNotesByPrefix(counsellorChart?.counsellor.notes);
  const rootRef = useRef<HTMLDivElement>(null);
  // Physical page each section starts on (index-aligned with the sections below) — null
  // until the first print, when PrintTocPage falls back to one page per section.
  const [sectionStartPages, setSectionStartPages] = useState<number[] | null>(null);

  // `sync`: use flushSync so the DOM reflects sectionStartPages before this call returns —
  // needed for the beforeprint case, where the browser takes its print snapshot immediately
  // after the event handler returns. The auto-measure-on-mount case doesn't need that: it
  // just does a normal setState and waits for the commit via the effect below, since
  // flushSync called synchronously from inside a mount effect trips React's "flushSync was
  // called from inside a lifecycle method" warning (there's no next paint to force yet).
  const runMeasurement = (opts?: { sync?: boolean }) => {
    const root = rootRef.current;
    if (!root) return;
    const counts = measureSectionPageCounts(root);
    const sections = Array.from(root.children).filter(
      (el): el is HTMLElement => el.tagName === 'SECTION',
    );
    // Advance the footer's CSS page counter by each section's full page span, so the
    // footer (printed at the end of the section) shows the page it actually lands on.
    sections.forEach((section, index) => {
      section.style.counterIncrement = `printPage ${counts[index] ?? 1}`;
    });
    const starts: number[] = [];
    counts.reduce((page, count) => {
      starts.push(page);
      return page + count;
    }, 1);
    if (opts?.sync) {
      flushSync(() => setSectionStartPages(starts));
    } else {
      setSectionStartPages(starts);
    }
  };

  // beforeprint fires for both the "Download as PDF" button and Ctrl/Cmd+P, and runs before
  // the print layout is taken — flushSync makes sure the TOC re-renders in time.
  useEffect(() => {
    const handler = () => runMeasurement({ sync: true });
    window.addEventListener('beforeprint', handler);
    return () => window.removeEventListener('beforeprint', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (autoMeasureOnMount) runMeasurement();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoMeasureOnMount]);

  // Fires onMeasured only once sectionStartPages has actually committed and re-rendered
  // (not right after calling setState, which merely schedules it) — that's the real
  // signal the print output is final and safe for the PDF service to snapshot.
  useEffect(() => {
    if (autoMeasureOnMount && sectionStartPages) onMeasured?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoMeasureOnMount, sectionStartPages]);

  return (
    <PrintRoot ref={rootRef}>
      <PrintPageSetup />
      <PrintCoverPage studentInfo={reportData.studentInfo} />
      <PrintTocPage gradeClass={gradeClass} sectionStartPages={sectionStartPages} />
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
