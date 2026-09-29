import { AxiosError } from 'axios';
import { apiClient } from './api';

// Server-side PDF renders run headless Chrome on demand, so they take well past
// apiClient's default 15s timeout on a cold start.
const PDF_TIMEOUT_MS = 90_000;

// Filename from the backend's Content-Disposition (filename* first, it carries UTF-8).
const filenameFromHeader = (header: string | undefined, fallback: string): string => {
  if (!header) return fallback;
  const encoded = /filename\*=UTF-8''([^;]+)/i.exec(header);
  if (encoded) return decodeURIComponent(encoded[1]);
  const plain = /filename="([^"]+)"/i.exec(header);
  return plain ? plain[1] : fallback;
};

const saveBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const downloadPdf = async (path: string, fallbackFilename: string): Promise<void> => {
  try {
    const response = await apiClient.get<Blob>(path, {
      responseType: 'blob',
      timeout: PDF_TIMEOUT_MS,
    });
    saveBlob(
      response.data,
      filenameFromHeader(response.headers['content-disposition'] as string | undefined, fallbackFilename)
    );
  } catch (err) {
    // With responseType 'blob' an error body arrives as a Blob too — parse it back into
    // the usual JSON so getApiErrorMessage can surface the server's message (e.g. 404
    // "no assessment result yet").
    const data = (err as AxiosError).response?.data;
    if (data instanceof Blob) {
      try {
        (err as AxiosError).response!.data = JSON.parse(await data.text());
      } catch {
        // Not JSON — leave it; the caller falls back to its own message.
      }
    }
    throw err;
  }
};

export const pdfDownloadService = {
  // GET /counsellor-chart/students/{studentId}/pdf
  downloadCounsellorChart: (studentId: string) =>
    downloadPdf(`/counsellor-chart/students/${studentId}/pdf`, 'Counsellor Chart.pdf'),

  // GET /reports/students/{studentId}/pdf
  downloadCompassReport: (studentId: string) =>
    downloadPdf(`/reports/students/${studentId}/pdf`, 'kREATE Compass Report.pdf'),
};
