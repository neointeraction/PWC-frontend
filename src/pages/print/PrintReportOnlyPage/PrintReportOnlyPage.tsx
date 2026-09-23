import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { apiClient } from '@/services/api';
import { reportsService } from '@/services/reports.service';
import { counsellorChartService } from '@/services/counsellorChart.service';
import { scriBandGuidanceService } from '@/services/scriBandGuidance.service';
import { StudentCareerIkigaiReportData } from '@/types/studentIkigaiReport.types';
import { CounsellorChartResponse } from '@/types/counsellorChart.types';
import { ScriBandGuidance } from '@/types';
import { PrintReportContent } from '@/pages/counselor/StudentCareerIkigaiReport/sections/print/PrintReportContent';

// Headless-only render target for the backend's report-PDF service — Puppeteer navigates
// here with a report-pdf token (?token=...) instead of a login, since parents have none
// and this render happens server-to-server. No dashboard chrome, just the print tree:
// PrintReportContent is already display:none outside @media print, and Puppeteer's
// page.pdf() applies print CSS on its own, so nothing here needs to trigger that.
//
// Sets `document.body.dataset.pdfReady = 'true'` once pagination measurement finishes —
// the PDF service waits for that (page.waitForSelector('body[data-pdf-ready]')) before
// calling page.pdf(), since Puppeteer's printToPDF never fires beforeprint (see
// PrintReportContent's autoMeasureOnMount).
export const PrintReportOnlyPage: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [reportData, setReportData] = useState<StudentCareerIkigaiReportData | null>(null);
  const [counsellorChart, setCounsellorChart] = useState<CounsellorChartResponse | undefined>();
  const [scriBandGuidance, setScriBandGuidance] = useState<ScriBandGuidance[] | undefined>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!studentId || !token) {
      setError('Missing studentId or token');
      return;
    }

    // apiClient's request interceptor only injects the logged-in user's token when one
    // exists in authStore (see services/api.ts) — there's none here, so this default
    // header survives untouched through to the request. Restored on unmount so this
    // page can never leak its token into some later, unrelated request on the same
    // client (this route is only ever opened as its own fresh navigation, never linked
    // to from elsewhere in the app, but the restore costs nothing).
    const previousAuthHeader = apiClient.defaults.headers.common.Authorization;
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;

    let cancelled = false;
    Promise.all([
      reportsService.getStudentAssessmentReport(studentId, ''),
      counsellorChartService.getChart(studentId),
      scriBandGuidanceService.list(),
    ])
      .then(([report, chart, bandGuidance]) => {
        if (cancelled) return;
        setReportData(report);
        setCounsellorChart(chart);
        setScriBandGuidance(bandGuidance);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Failed to load report');
      });

    return () => {
      cancelled = true;
      if (previousAuthHeader === undefined) {
        delete apiClient.defaults.headers.common.Authorization;
      } else {
        apiClient.defaults.headers.common.Authorization = previousAuthHeader;
      }
    };
  }, [studentId, token]);

  // Surfaced directly in the page body, not a toast/EmptyState — the PDF service reads
  // this page's DOM/logs on failure, there's no user watching a UI here.
  if (error) {
    return <div data-pdf-error={error}>{error}</div>;
  }

  if (!reportData) {
    return null;
  }

  return (
    <PrintReportContent
      reportData={reportData}
      counsellorChart={counsellorChart}
      scriBandGuidance={scriBandGuidance}
      autoMeasureOnMount
      onMeasured={() => {
        document.body.dataset.pdfReady = 'true';
      }}
    />
  );
};
