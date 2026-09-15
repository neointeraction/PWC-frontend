import * as XLSX from 'xlsx';

// A two-row header: `groups[i]` spans every column whose `header[i]` falls under it (null =
// no group, continues the previous cell's merge, or leaves the cell blank at that column).
export interface XlsxHeaderColumn {
  group: string | null;
  header: string;
}

// Builds a worksheet with an optional merged group-header row on top of a plain header row,
// then downloads the workbook. Mirrors the layout of the "Class 910" report templates this
// backs (grouped section headers over per-field columns).
export const downloadXlsx = (
  filename: string,
  sheetName: string,
  columns: XlsxHeaderColumn[],
  rows: (string | number | null | undefined)[][]
): void => {
  const hasGroups = columns.some(c => c.group);
  const groupRow = columns.map(c => c.group ?? '');
  const headerRow = columns.map(c => c.header);
  const aoa: (string | number | null | undefined)[][] = hasGroups
    ? [groupRow, headerRow, ...rows]
    : [headerRow, ...rows];

  const ws = XLSX.utils.aoa_to_sheet(aoa);

  if (hasGroups) {
    const merges: XLSX.Range[] = [];
    let start = 0;
    for (let i = 1; i <= columns.length; i += 1) {
      const sameGroup = i < columns.length && columns[i].group === columns[start].group;
      if (!sameGroup) {
        if (columns[start].group && i - start > 1) {
          merges.push({ s: { r: 0, c: start }, e: { r: 0, c: i - 1 } });
        }
        start = i;
      }
    }
    ws['!merges'] = merges;
  }

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, `${filename}.xlsx`);
};

// Renders a single form answer (free-form JSON on the backend) as a flat, human-readable
// cell value — never raw JSON, so counsellors see labelled text instead of `{"a":1}`.
export const formatAnswerValue = (answer: unknown): string | number => {
  if (answer === null || answer === undefined || answer === '') return '—';
  if (typeof answer === 'string' || typeof answer === 'number') return answer;
  if (typeof answer === 'boolean') return answer ? 'Yes' : 'No';
  if (Array.isArray(answer)) return answer.map(formatAnswerValue).join('; ');
  if (typeof answer === 'object') {
    const obj = answer as Record<string, unknown>;
    if ('label' in obj) return String(obj.label);
    if ('value' in obj) return String(obj.value);
    // The column header already names the field (e.g. "Favourite Subject - Student"), so
    // don't repeat that as a per-value label here — just the answer, then its reason.
    return Object.values(obj)
      .filter(v => v !== null && v !== undefined && v !== '')
      .map(v => formatAnswerValue(v))
      .join(', ');
  }
  return String(answer);
};
