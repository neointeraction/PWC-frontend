import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useIsFetching } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { counsellorChartService, mapChartToFormData } from '@/services/counsellorChart.service';
import { scriBandGuidanceService } from '@/services/scriBandGuidance.service';
import { CounsellorFormChartData } from '@/mocks/studentFormChart.mock';
import { ScriBandGuidance } from '@/types';
import { ChartPrintContent } from '@/pages/counselor/StudentFormChart/components/ChartPrintContent';

// How long react-query must stay idle before the chart counts as fully rendered — the
// Section C step fires its own career-library / stream-weight queries after mounting.
const SETTLE_MS = 500;

// Headless-only render target for the backend's "Download Chart" PDF (see
// counsellor-chart-pdf in PWC-backend's report-pdf.service.ts). Puppeteer navigates here
// with the requesting staff member's own access token in the URL fragment (#token=...),
// so every API the chart steps call runs with exactly that user's permissions, and a
// fragment never reaches any server's access logs.
//
// Sets `document.body.dataset.pdfReady = 'true'` once the chart and every query its steps
// fire have settled, or renders a [data-pdf-error] element on failure — the PDF service
// waits for one or the other before calling page.pdf().
export const PrintChartOnlyPage: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const token = new URLSearchParams(window.location.hash.slice(1)).get('token');

  const [formData, setFormData] = useState<CounsellorFormChartData | null>(null);
  const [scriBandGuidance, setScriBandGuidance] = useState<ScriBandGuidance[] | undefined>();
  const [error, setError] = useState<string | null>(null);
  const activeQueries = useIsFetching();

  useEffect(() => {
    if (!studentId || !token) {
      setError('Missing studentId or token');
      return;
    }

    // Same approach as PrintReportOnlyPage: there's no logged-in user in authStore here,
    // so apiClient's interceptor leaves this default header alone. Restored on unmount.
    const previousAuthHeader = apiClient.defaults.headers.common.Authorization;
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;

    let cancelled = false;
    Promise.all([counsellorChartService.getChart(studentId), scriBandGuidanceService.list()])
      .then(([chart, bandGuidance]) => {
        if (cancelled) return;
        setFormData(mapChartToFormData(chart, studentId));
        setScriBandGuidance(bandGuidance);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Failed to load counsellor chart');
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

  useEffect(() => {
    if (!formData || activeQueries > 0) return undefined;
    const timer = setTimeout(() => {
      document.body.dataset.pdfReady = 'true';
    }, SETTLE_MS);
    return () => clearTimeout(timer);
  }, [formData, activeQueries]);

  if (error) {
    return <div data-pdf-error={error}>{error}</div>;
  }

  if (!formData || !studentId) {
    return null;
  }

  return (
    <ChartPrintContent studentId={studentId} data={formData} scriBandGuidance={scriBandGuidance} />
  );
};
