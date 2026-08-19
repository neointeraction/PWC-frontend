/**
 * Parses a CSV or text-based file into an array of row objects.
 * Header row is used as keys; values are trimmed strings.
 *
 * For production xlsx support, integrate the `xlsx` (SheetJS) library
 * and extend this utility accordingly.
 */
export const parseExcelFile = (file: File): Promise<Record<string, string>[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (!text || !text.trim()) {
          resolve([]);
          return;
        }

        const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
        if (lines.length < 2) {
          resolve([]);
          return;
        }

        const headers = lines[0].split(',').map(h => h.trim());
        const rows: Record<string, string>[] = [];

        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.trim());
          const row: Record<string, string> = {};

          headers.forEach((header, index) => {
            row[header] = values[index] || '';
          });

          // Skip completely empty rows
          const hasValues = Object.values(row).some(v => v.length > 0);
          if (hasValues) {
            rows.push(row);
          }
        }

        resolve(rows);
      } catch (error) {
        reject(new Error('Failed to parse the file. Please ensure it is a valid CSV format.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read the file.'));
    };

    reader.readAsText(file);
  });
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
