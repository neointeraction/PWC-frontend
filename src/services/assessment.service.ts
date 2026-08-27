import { apiClient } from './api';

export type AssessmentSection = 'RIASEC' | 'BIG_FIVE' | 'APTITUDE' | 'COGNITIVE';

export interface AssessmentOption {
  value: string;
  label: string;
}

// A question from the authoritative backend bank. `correctOption` is never included in
// responses (it's the aptitude answer key). Likert questions use `format: "LIKERT_5"`
// (answer = the numeric 1–5), MCQ use `format: "MCQ_SINGLE"` (answer = the option value).
export interface AssessmentQuestion {
  id: string;
  fieldKey: string;
  section: AssessmentSection;
  order: number;
  format: string;
  questionText: string;
  options?: AssessmentOption[];
}

export interface AssessmentAnswer {
  fieldKey: string;
  selectedOption: number | string | null;
}

export interface AssessmentAttempt {
  id: string;
  status: 'IN_PROGRESS' | 'SUBMITTED';
  cohort: string;
  answers: AssessmentAnswer[];
}

export interface SaveAnswerInput {
  fieldKey: string;
  selectedOption: number | string;
  timeTakenMs?: number;
}

interface ApiAttempt {
  id: string;
  status: 'IN_PROGRESS' | 'SUBMITTED';
  cohort: string;
  answers?: Array<{
    selectedOption: number | string | null;
    fieldKey?: string;
    question?: { fieldKey: string };
  }>;
}

const mapAttempt = (a: ApiAttempt): AssessmentAttempt => ({
  id: a.id,
  status: a.status,
  cohort: a.cohort,
  answers: (a.answers || []).map(ans => ({
    fieldKey: ans.fieldKey ?? ans.question?.fieldKey ?? '',
    selectedOption: ans.selectedOption ?? null,
  })),
});

export const assessmentService = {
  // GET /api/v1/assessment/questions?cohort=&section= — the full authoritative bank,
  // in presentation order (correctOption excluded). Source for rendering the form.
  getQuestions: async (cohort: string, section?: AssessmentSection): Promise<AssessmentQuestion[]> => {
    const { data } = await apiClient.get<AssessmentQuestion[] | { data: AssessmentQuestion[] }>(
      '/assessment/questions',
      { params: { cohort, section } }
    );
    return Array.isArray(data) ? data : data.data ?? [];
  },

  // POST /api/v1/assessment/attempts { studentId, cohort } — start a new attempt or resume
  // the existing IN_PROGRESS one. 409 if the student already has a SUBMITTED attempt.
  startAttempt: async (studentId: string, cohort: string): Promise<AssessmentAttempt> => {
    const { data } = await apiClient.post<ApiAttempt>('/assessment/attempts', { studentId, cohort });
    return mapAttempt(data);
  },

  // GET /api/v1/assessment/attempts/{id} — the attempt with its saved answers (used to
  // prefill selections). Only answered questions are included.
  getAttempt: async (attemptId: string): Promise<AssessmentAttempt> => {
    const { data } = await apiClient.get<ApiAttempt>(`/assessment/attempts/${attemptId}`);
    return mapAttempt(data);
  },

  // PUT /api/v1/assessment/attempts/{id}/answers — "Save Progress" (idempotent upsert).
  saveAnswers: async (attemptId: string, answers: SaveAnswerInput[]): Promise<AssessmentAttempt> => {
    const { data } = await apiClient.put<ApiAttempt>(`/assessment/attempts/${attemptId}/answers`, {
      answers,
    });
    return mapAttempt(data);
  },

  // POST /api/v1/assessment/attempts/{id}/submit — finalize; 400 { missingFieldKeys } if a
  // question is unanswered, then runs the scoring engine.
  submitAttempt: async (attemptId: string): Promise<AssessmentAttempt> => {
    const { data } = await apiClient.post<ApiAttempt>(`/assessment/attempts/${attemptId}/submit`);
    return mapAttempt(data);
  },

  // GET /api/v1/assessment/attempts/{id}/result — the computed report (404 until submitted).
  getResult: async (attemptId: string): Promise<unknown> => {
    const { data } = await apiClient.get(`/assessment/attempts/${attemptId}/result`);
    return data;
  },
};
