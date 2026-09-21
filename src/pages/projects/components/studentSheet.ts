import { ProjectStudent } from '@/types/project.types';
import { isValidEmail, isValidPhone } from '@/utils';

type SheetRow = Record<string, string>;

// Column order/names follow the institute's standard roster template:
// Student Id, Student Name, Class, Division, Student Mobile No.,
// WhatsApp Number (if different), Student Email ID, Father Name,
// Father Mobile No., Father Email ID. Older sheet variants (Student ID,
// Parent Name/Mobile/Email, etc.) are still accepted as fallbacks.
// Shared by the project wizard's student step and the Project Dashboard bulk upload.
export const mapStudentSheetRows = (rows: SheetRow[]): ProjectStudent[] =>
  rows.map(row => ({
    studentId: row['Student Id'] || row['Student ID'] || row['studentId'] || row['StudentID'] || '',
    name: row['Student Name'] || row['Name'] || row['name'] || '',
    email: row['Student Email ID'] || row['Email'] || row['email'] || '',
    mobile: row['Student Mobile No.'] || row['Mobile'] || row['mobile'] || row['Phone'] || '',
    grade: row['Class'] || row['Grade'] || row['grade'] || row['class'] || '',
    division: row['Division'] || row['division'] || '',
    parentName: row['Father Name'] || row['Parent Name'] || row['parentName'] || '',
    parentMobile:
      row['Father Mobile No.'] ||
      row['Parent Mobile No.'] ||
      row['Parent Mobile'] ||
      row['parentMobile'] ||
      '',
    parentEmail:
      row['Father Email ID'] ||
      row['Parent Email ID'] ||
      row['Parent Email'] ||
      row['parentEmail'] ||
      '',
    whatsappNumber:
      row['WhatsApp Number (if different)'] ||
      row['WhatsApp Number'] ||
      row['whatsappNumber'] ||
      '',
    password: row['Password'] || row['password'] || row['Temp Password'] || row['PWD'] || '',
  }));

export interface InvalidStudentRow {
  row: ProjectStudent;
  index: number;
  reason: string;
}

// Student ID, Name, Email, Mobile, Class and Division are mandatory —
// everything else (parent details, password) is optional.
export const validateStudentRows = (
  rawStudents: ProjectStudent[]
): { validStudents: ProjectStudent[]; invalid: InvalidStudentRow[] } => {
  const invalid: InvalidStudentRow[] = [];
  const validStudents = rawStudents.filter((s, i) => {
    if (!s.studentId) {
      invalid.push({ row: s, index: i, reason: 'missing Student ID' });
      return false;
    }
    if (!s.name) {
      invalid.push({ row: s, index: i, reason: 'missing Name' });
      return false;
    }
    if (!s.email || !isValidEmail(s.email)) {
      invalid.push({ row: s, index: i, reason: 'missing/invalid Email' });
      return false;
    }
    if (!s.mobile || !isValidPhone(s.mobile)) {
      invalid.push({ row: s, index: i, reason: 'missing/invalid Mobile' });
      return false;
    }
    if (!s.grade) {
      invalid.push({ row: s, index: i, reason: 'missing Class' });
      return false;
    }
    if (!s.division) {
      invalid.push({ row: s, index: i, reason: 'missing Division' });
      return false;
    }
    return true;
  });
  return { validStudents, invalid };
};

export const studentRowLabel = (s: ProjectStudent, i: number): string =>
  s.name || s.email || `Row ${i + 2}`;
