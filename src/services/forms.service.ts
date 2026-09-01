import { AxiosError } from 'axios';
import { apiClient } from './api';

// The four seeded form templates. STUDENT_PROFILE is intentionally excluded — that data
// is captured as Student columns, not via the forms API.
export type FormType =
  | 'PRE_COUNSELLING_STUDENT'
  | 'PRE_COUNSELLING_PARENT'
  | 'FEEDBACK_STUDENT'
  | 'FEEDBACK_PARENT';

// ---- Backend shapes: GET /forms/{formType} and /forms/{formType}/students/{id} ----
// Field names mirror the Prisma FormQuestion model exactly (see docs/db-design.md).
export type QuestionType =
  | 'MCQ_SINGLE'
  | 'MCQ_MULTI'
  | 'SHORT_TEXT'
  | 'OPEN_TEXT'
  | 'NUMBER'
  | 'SCALE'
  | 'MATRIX';

export interface McqOption {
  value: string;
  label: string;
}

// MATRIX options: a table/grid question kept as one row rather than exploded per cell.
// `rows` is omitted for a "virtual single row" (e.g. a block of a few standalone fields).
export interface MatrixField {
  key: string;
  label: string;
  type: 'SHORT_TEXT' | 'NUMBER' | 'MCQ_SINGLE' | 'MCQ_MULTI';
  // MCQ sub-field options may be plain strings (["Y","N"]) or {value,label} pairs.
  options?: Array<string | McqOption>;
  allowOtherText?: boolean;
  otherTextFieldKey?: string;
}

export interface MatrixRow {
  key: string;
  label: string;
  labelEditable?: boolean;
}

export interface MatrixOptions {
  rows?: MatrixRow[];
  fields: MatrixField[];
}

export interface FormQuestion {
  id: string;
  order: number;
  questionCode: string;
  fieldKey: string;
  sectionLabel: string | null;
  questionText: string;
  helpText?: string | null;
  questionType: QuestionType;
  // MCQ_SINGLE/MCQ_MULTI: McqOption[] (or string[] for a bare-value list).
  // MATRIX: MatrixOptions. Everything else: usually absent.
  options?: McqOption[] | string[] | MatrixOptions | null;
  allowOtherText?: boolean;
  otherTextFieldKey?: string | null;
  isRequired: boolean;
}

export interface FormTemplate {
  id: string;
  formType: FormType;
  cohort: string;
  version: number;
  questions: FormQuestion[];
}

// Every answer value is stored as free JSON on the backend — the shape is whatever the
// question's UI produces (string, string[], nested table object, rating map, …).
export interface FormAnswerItem {
  fieldKey: string;
  answer: unknown;
}

export interface FormSubmission {
  id: string;
  submittedAt: string | null;
  answers: FormAnswerItem[];
}

interface ApiFormSubmission {
  id: string;
  submittedAt: string | null;
  answers: Array<{ fieldKey?: string; question?: { fieldKey: string }; answer: unknown }>;
}

interface SaveFormInput {
  cohort: string;
  version?: number;
  answers: FormAnswerItem[];
}

const mapSubmission = (data: ApiFormSubmission): FormSubmission => ({
  id: data.id,
  submittedAt: data.submittedAt,
  answers: (data.answers || []).map(a => ({
    fieldKey: a.fieldKey ?? a.question?.fieldKey ?? '',
    answer: a.answer,
  })),
});

export const formsService = {
  // GET /api/v1/forms/{formType}?cohort=&version= — the template with ordered questions.
  getTemplate: async (formType: FormType, cohort: string, version?: number): Promise<FormTemplate> => {
    const { data } = await apiClient.get<FormTemplate>(`/forms/${formType}`, {
      params: { cohort, version },
    });
    return data;
  },

  // GET /api/v1/forms/{formType}/students/{studentId}?cohort= — the student's submission
  // (draft or finalized). 404 before anything is saved → null.
  getSubmission: async (
    formType: FormType,
    studentId: string,
    cohort: string,
    version?: number
  ): Promise<FormSubmission | null> => {
    try {
      const { data } = await apiClient.get<ApiFormSubmission>(
        `/forms/${formType}/students/${studentId}`,
        { params: { cohort, version } }
      );
      return mapSubmission(data);
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 404) return null;
      throw err;
    }
  },

  // PUT /api/v1/forms/{formType}/students/{studentId} — "Save as Draft" (idempotent upsert).
  saveDraft: async (
    formType: FormType,
    studentId: string,
    input: SaveFormInput
  ): Promise<FormSubmission> => {
    const { data } = await apiClient.put<ApiFormSubmission>(
      `/forms/${formType}/students/${studentId}`,
      input
    );
    return mapSubmission(data);
  },

  // POST /api/v1/forms/{formType}/students/{studentId}/submit — finalize (locks the form).
  // 400 with { missingFieldKeys } if a required question is empty.
  submitForm: async (
    formType: FormType,
    studentId: string,
    input: SaveFormInput
  ): Promise<FormSubmission> => {
    const { data } = await apiClient.post<ApiFormSubmission>(
      `/forms/${formType}/students/${studentId}/submit`,
      input
    );
    return mapSubmission(data);
  },
};
