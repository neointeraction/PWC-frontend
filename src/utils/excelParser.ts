/**
 * Parses a spreadsheet (.xlsx / .xls) or CSV/TSV file into an array of row objects.
 * The first row is treated as the header and supplies the keys; values come back as
 * trimmed strings, and fully empty rows are dropped.
 *
 * Only the first worksheet is read — every import sheet in this app is single-sheet.
 */

// Row objects keyed by header text, exactly as the bulk-import screens expect.
export type SheetRow = Record<string, string>;

const CSV_LIKE = /\.(csv|txt|tsv)$/i;

// SheetJS names an unlabelled header cell `__EMPTY`, `__EMPTY_1`, … — those columns carry
// no header text, so there is nothing for a call site to match on.
const isPlaceholderKey = (key: string): boolean => /^__EMPTY(_\d+)?$/.test(key);

const readAsText = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = event => resolve((event.target?.result as string) ?? '');
    reader.onerror = () => reject(new Error('Failed to read the file.'));
    reader.readAsText(file);
  });

const readAsArrayBuffer = (file: File): Promise<ArrayBuffer> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = event => resolve(event.target?.result as ArrayBuffer);
    reader.onerror = () => reject(new Error('Failed to read the file.'));
    reader.readAsArrayBuffer(file);
  });

export const parseExcelFile = async (file: File): Promise<SheetRow[]> => {
  // Loaded on demand: SheetJS is large, and only the bulk-import screens ever need it.
  const XLSX = await import('xlsx');

  let workbook;
  try {
    if (CSV_LIKE.test(file.name)) {
      // Decode text ourselves so the browser applies the file's encoding rather than
      // letting SheetJS sniff bytes.
      const text = await readAsText(file);
      if (!text.trim()) return [];
      workbook = XLSX.read(text, { type: 'string', raw: false });
    } else {
      const buffer = await readAsArrayBuffer(file);
      workbook = XLSX.read(buffer, { type: 'array', cellDates: false });
    }
  } catch {
    throw new Error(
      'Could not read the file. Please upload a valid .xlsx, .xls or .csv file.'
    );
  }

  const sheetName = workbook.SheetNames[0];
  if (!sheetName) return [];

  const sheet = workbook.Sheets[sheetName];
  if (!sheet) return [];

  // `raw: false` yields each cell as its displayed text, so dates and times arrive in the
  // form the sheet shows rather than as serial numbers. The call sites that care
  // (counsellor slot dates/times) accept either, and formatted text is far easier to
  // debug when an import goes wrong.
  const rawRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: '',
    raw: false,
    blankrows: false,
  });

  return rawRows
    .map(rawRow => {
      const row: SheetRow = {};
      Object.entries(rawRow).forEach(([key, value]) => {
        const header = key.trim();
        if (!header || isPlaceholderKey(header)) return;
        row[header] = value == null ? '' : String(value).trim();
      });
      return row;
    })
    .filter(row => Object.values(row).some(value => value.length > 0));
};

const MONTH_ABBR: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

/**
 * Normalizes an Excel serial date or a text date (ISO, or "17-Sep-2026" / "17 Sep 2026")
 * to YYYY-MM-DD. Returns '' if the value can't be recognized as a date.
 */
export const toISODate = (v: string): string => {
  const s = String(v ?? '').trim();
  if (!s) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  if (/^\d+(\.\d+)?$/.test(s)) {
    const serial = Math.floor(parseFloat(s));
    return new Date((serial - 25569) * 86400000).toISOString().slice(0, 10);
  }
  const monthNameMatch = s.match(/^(\d{1,2})[-/\s]([A-Za-z]{3,})[-/\s](\d{4})$/);
  if (monthNameMatch) {
    const day = parseInt(monthNameMatch[1], 10);
    const month = MONTH_ABBR[monthNameMatch[2].slice(0, 3).toLowerCase()];
    if (month !== undefined) {
      return `${monthNameMatch[3]}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }
  }
  return '';
};

/**
 * Normalizes a time string ("9:00", "09:00") or Excel time fraction to HH:mm (24h).
 * Returns '' if the value can't be recognized as a time.
 */
export const toHHMM = (v: string): string => {
  const s = String(v ?? '').trim();
  if (!s) return '';
  if (s.includes(':')) {
    const [h, m] = s.split(':');
    return `${h.padStart(2, '0')}:${(m || '0').slice(0, 2).padStart(2, '0')}`;
  }
  const num = parseFloat(s);
  if (!isNaN(num) && num >= 0 && num < 1) {
    const total = Math.round(num * 24 * 60);
    return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
  }
  return '';
};

/**
 * Normalizes a counsellor code for matching against the directory: uppercases and strips
 * leading zeros from the numeric part, so a sheet code like "C0001" matches a directory
 * code stored as "C001" (or any other zero-padding width).
 */
export const normalizeCounsellorCode = (code: string): string => {
  const trimmed = String(code ?? '').trim().toUpperCase();
  const match = trimmed.match(/^([A-Za-z]*)0*(\d+)$/);
  return match ? `${match[1]}${match[2]}` : trimmed;
};

/**
 * Formats a file size in bytes to a human-readable string.
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};
