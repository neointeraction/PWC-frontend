import { apiClient } from './api';
import { toTitleCase } from '@/utils';
import { sessionsService } from './sessions.service';
import { StudentWorkflowStatus } from '@/types/student.types';
import {
  CounsellorChartResponse,
  PutCounsellorChartBody,
  AmendMirrorPairBody,
  AssessmentResultRow,
  VALID_SYNTHESIS_NOTE_CODES,
  ChartSection,
  EnrichedTraitScore,
  AssessmentLayer,
  ManualEntryRow,
  TraitKey,
} from '@/types/counsellorChart.types';
import {
  CounsellorFormChartData,
  AcademicRecord,
  ComparisonSubGroup,
  ComparisonItem,
  TraitAssessmentItem,
  StreamFitItem,
  GraduationItem,
  CareerCompassClusterItem,
  CareerCompassItem,
  ReliabilityCardData,
  SCRIItemData,
  MirrorPairSummaryItem,
  RankedTraitScore,
} from '@/mocks/studentFormChart.mock';

// Normalizes natural-key parts so a row still matches its report row across incidental
// casing/whitespace differences (e.g. a counsellor-typed label). Shared between the
// re-hydration matching below and the live fit-score lookup counsellors trigger by
// picking a career-library option in AddRowModal (see Step3SectionC).
export const fitKey = (...parts: (string | null | undefined)[]): string =>
  parts.map(p => (p ?? '').trim().toLowerCase()).join('|');

export const counsellorChartService = {
  // GET /counsellor-chart/students/{studentId} — lazily creates an empty chart row
  // server-side if none exists yet, so this never 404s except for an unknown student.
  getChart: async (studentId: string): Promise<CounsellorChartResponse> => {
    const { data } = await apiClient.get<CounsellorChartResponse>(
      `/counsellor-chart/students/${studentId}`
    );
    return data;
  },

  // GET /counsellor-chart/manual-entries — aggregates every counsellor-typed "Manual
  // Entry" row (not picked from the career library) across all students' charts, for
  // Super Admin review. Backend endpoint not live yet — see
  // docs/compass-tables-manual-entry-backend-prompt.md.
  listManualEntries: async (): Promise<ManualEntryRow[]> => {
    const { data } = await apiClient.get<ManualEntryRow[] | { data: ManualEntryRow[] }>(
      '/counsellor-chart/manual-entries'
    );
    return Array.isArray(data) ? data : data.data;
  },

  // DELETE /counsellor-chart/manual-entries/{id} — removes one flagged row from its
  // source table on the student's chart (Super Admin's "Close" action, after confirm).
  // Backend endpoint not live yet — see docs/compass-tables-manual-entry-backend-prompt.md.
  deleteManualEntry: async (id: string): Promise<void> => {
    await apiClient.delete(`/counsellor-chart/manual-entries/${id}`);
  },

  // Fills in the fields GET /counsellor-chart/manual-entries doesn't return yet
  // (sessionId, counsellorCode, studentCode, projectName, workflowStatus — see the
  // backend prompt doc) from already-live endpoints, so Super Admin's "View" button,
  // code columns, and the Session 2 visibility gate (see SuperAdminDashboard) work
  // today instead of waiting on that backend change. Picks the student's most recently
  // scheduled session as "the" session/counsellor for this chart.
  resolveStudentChartContext: async (
    studentId: string
  ): Promise<{
    sessionId: string | null;
    studentCode: string | null;
    counsellorCode: string | null;
    projectName: string | null;
    workflowStatus: StudentWorkflowStatus | null;
  }> => {
    const [studentRes, sessions] = await Promise.all([
      apiClient.get<{
        studentCode?: string;
        project?: { id: string };
        workflowStatus?: StudentWorkflowStatus;
      }>(`/students/${studentId}`),
      sessionsService.getStudentSessions(studentId).catch(() => []),
    ]);

    const projectId = studentRes.data.project?.id;
    const projectName = projectId
      ? await apiClient
          .get<{ name: string }>(`/projects/${projectId}`)
          .then(res => res.data.name)
          .catch(() => null)
      : null;

    const latestSession = [...sessions].sort((a, b) =>
      a.scheduledDate < b.scheduledDate ? 1 : -1
    )[0];

    return {
      sessionId: latestSession?.id ?? null,
      studentCode: studentRes.data.studentCode ?? latestSession?.student.studentCode ?? null,
      counsellorCode: latestSession?.counsellor.counsellorCode ?? null,
      projectName,
      workflowStatus: studentRes.data.workflowStatus ?? null,
    };
  },

  // PUT — partial save of counsellor-authored content. Returns the full chart again.
  saveChart: async (
    studentId: string,
    body: PutCounsellorChartBody
  ): Promise<CounsellorChartResponse> => {
    const { data } = await apiClient.put<CounsellorChartResponse>(
      `/counsellor-chart/students/${studentId}`,
      body
    );
    return data;
  },

  amendMirrorPair: async (
    studentId: string,
    body: AmendMirrorPairBody
  ): Promise<AssessmentResultRow> => {
    const { data } = await apiClient.post<AssessmentResultRow>(
      `/counsellor-chart/students/${studentId}/mirror-pair-amendments`,
      body
    );
    return data;
  },

  revertMirrorPairAmendment: async (
    studentId: string,
    questionCode: string
  ): Promise<AssessmentResultRow> => {
    const { data } = await apiClient.delete<AssessmentResultRow>(
      `/counsellor-chart/students/${studentId}/mirror-pair-amendments/${questionCode}`
    );
    return data;
  },
};

// ---------------------------------------------------------------------------
// Mapping: real API response -> the CounsellorFormChartData shape every Step
// component already renders. Keeps the UI untouched; only the data source
// changes. See counsellorChart.types.ts for why each field is shaped this way.
// ---------------------------------------------------------------------------

// Backend rating/enum answers come through as snake_case codes (e.g. "not_really") —
// title-case them for display. Leave free-text strings (spaces, punctuation, digits
// like "1 & 2") untouched since they're already human-written, not codes.
const SNAKE_CASE_TOKEN = /^[a-zA-Z]+(_[a-zA-Z]+)+$/;
const humanizeStringValue = (value: string): string =>
  SNAKE_CASE_TOKEN.test(value) ? toTitleCase(value) : value;

// Raw pre-counselling answers are `unknown` JSON on the backend (shape varies per
// fieldKey — block/table/plain string) — render something readable rather than
// requiring per-fieldKey narrowing for every one of the ~30 question types.
const formatChartAnswer = (value: unknown): string => {
  if (value === null || value === undefined || value === '') return '';
  if (typeof value === 'string') return humanizeStringValue(value);
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return '';
    if (value.every(v => typeof v === 'string' || typeof v === 'number')) {
      return value.map(v => (typeof v === 'string' ? humanizeStringValue(v) : String(v))).join(', ');
    }
    return value.map(formatChartAnswer).join('; ');
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>).filter(
      ([, v]) => v !== null && v !== undefined && v !== ''
    );
    if (entries.length === 0) return '';
    // A single-key wrapper (e.g. { rating: "not_really" }) carries no extra meaning
    // beyond its value — the outer key (e.g. the trait name) already labels it.
    if (entries.length === 1) return formatChartAnswer(entries[0][1]);
    return entries.map(([k, v]) => `${toTitleCase(k)}: ${formatChartAnswer(v)}`).join(', ');
  }
  return String(value);
};

// Pre-counselling MCQ answers are stored as the option *code* (e.g. "b"), not its
// label — the raw code has no meaning to a counsellor reading the chart. These mirror
// the option lists seeded in PWC-backend prisma/seed-data/forms/preCounselling{Student,
// Parent}.ts, so a code can be resolved to its label without the question template.
const OPTION_LABELS: Record<string, Record<string, string>> = {
  fav_subject_reason: {
    a: 'I love solving problems and puzzles in this subject',
    b: 'It allows me to be creative and come up with new ideas',
    c: 'It connects to real life — I can see how it is actually used',
    d: 'It just feels easy and natural to me — I simply enjoy it',
  },
  hard_subject_reason: {
    a: "I don't understand the concepts — it feels like just memorising",
    b: 'I get anxious during exams or tests for this subject',
    c: 'The way it is taught is too theoretical and boring',
    d: 'I am simply not interested in this topic',
  },
  strong_subject_reason: {
    a: 'My child love solving problems and puzzles in this subject',
    b: 'It allows my child to be creative and come up with new ideas',
    c: 'It connects to real life, my child can see how it is actually used',
    d: 'It just feels easy and natural to my child who simply enjoys it',
  },
  struggle_subject_reason: {
    a: "My child doesn't understand the concepts, it feels like just memorising",
    b: 'My child gets anxious during exams or tests for this subject',
    c: 'The way it is taught is too theoretical and boring',
    d: 'My child is simply not interested in this topic',
  },
  free_time_activities: {
    sports: 'Sports or physical activities (cricket, football, gym, dance, etc.)',
    gaming: 'Gaming — mobile, PC or console',
    creative_hobbies: 'Creative hobbies — drawing, painting, music, writing, etc.',
    socialising: 'Socialising — meeting friends or social media',
    skill_building: 'Skill-building — coding, video editing, public speaking, etc.',
    reading: 'Reading — books, articles, news, comics',
    other: 'Other',
  },
  p_free_time_activities: {
    a: 'Sports or physical activities',
    b: 'Gaming — mobile, PC or console',
    c: 'Creative hobbies — drawing, music, writing, crafts',
    d: 'Socialising with friends or on social media',
    e: 'Skill-building — coding, video editing, public speaking',
    f: 'Reading — books, articles, news',
    g: 'Any Other',
    h: 'Not Sure',
  },
  interest_consistency: {
    a: 'Very consistent — same interests have continued for a long time',
    b: 'Mostly consistent — mostly interested but at times bored',
    c: 'Frequently changing — new interests appear often, old ones fade',
  },
  p_interest_consistency: {
    a: 'Very consistent — same interests have continued for a long time',
    b: 'Mostly consistent — with some natural variation',
    c: 'Frequently changing — new interests appear often and old ones fade',
    d: 'Not Sure',
  },
  school_activities: {
    assembly: 'Morning assembly — speeches, prayer, thought for the day',
    sports_pe: 'Sports and physical education periods',
    art_music: 'Art, music and creative periods',
    clubs: 'Club activities — science club, quiz club, coding club, eco club, etc.',
    competitions: 'Competitions — debates, elocutions, quizzes, house events',
    field_trips: 'Field trips — company visits, factory visits, nature outings',
    other: 'Any Other',
  },
  learning_style: {
    a: 'Reading and understanding concepts from books or notes',
    b: 'Doing experiments, projects or hands-on activities',
    c: 'Drawing, designing or expressing ideas through creative work',
    d: 'Solving exercises, case studies and working through problems',
    e: 'Watching videos, listening to podcasts or visual content',
  },
  study_challenges: {
    a: 'Too many distractions — phone, TV, noise',
    b: "I don't have a good study method or plan",
    c: 'I get very anxious before exams or fear of failing',
    d: 'Pressure from parents or peers makes it stressful',
    e: 'I keep postponing studying — procrastination',
    f: 'Concepts are hard to understand — feels like memorising',
    g: 'Any Other',
  },
  child_study_obstacle: {
    a: 'Distraction — phone, TV, other activities pull attention away',
    b: 'No clear study strategy or method',
    c: 'Exam anxiety or fear of failure',
    d: 'Pressure from peers or from us as parents',
    e: 'Procrastination — putting off studying',
    f: 'Difficulty understanding concepts — relies on memorisation',
    g: 'Any Other',
    h: 'Not Sure',
  },
  energy_type: {
    a: 'Introvert — I prefer working alone and feel recharged after time by myself',
    b: 'Extrovert — I love being around people and feel energised in groups',
    c: 'Ambivert — I am a mix of both depending on the situation',
  },
  child_personality: {
    a: 'Confident and a natural leader — takes charge in situations',
    b: 'Reserved and reflective — prefers to observe before acting',
    c: 'Social and outgoing — energised by people and interactions',
    d: 'Independent — prefers working alone and self-directed',
    e: 'Practical and hands-on — prefers doing over discussing',
    f: 'Creative and imaginative — always thinking of new things',
    g: 'Not Sure',
  },
  child_interaction_style: {
    a: 'Collaborative and friendly — gets along with most people easily',
    b: 'Reserved or formal — keeps appropriate distance with teachers and seniors',
    c: 'Easily influenced by peer pressure — tends to follow the group',
    d: 'More confident online than in person',
    e: 'Any Other',
    f: 'Not Sure',
  },
  decision_style: {
    a: 'I list out the pros and cons and weigh them carefully',
    b: 'I go with what feels right and is also practical',
    c: 'I ask someone I trust — a parent, teacher or friend',
    d: 'I think about how this choice will affect my future',
    e: 'I just try it and see what happens — I learn by doing',
    f: 'Any Other',
  },
  child_decision_style: {
    a: 'Thinks carefully about pros and cons before deciding',
    b: 'Goes with what feels right and is practical',
    c: 'Seeks guidance from a trusted person',
    d: 'Thinks about long-term consequences',
    e: 'Just tries it out and learns from what happens',
    f: 'Any Other',
    g: 'Not Sure',
  },
  failure_response: {
    a: 'I explain or justify why it happened',
    b: 'I lose confidence and feel demotivated for a while',
    c: 'I ignore the feedback and move on',
    d: 'I compare myself with others and feel bad',
    e: 'I accept it, think about what went wrong and try to improve',
    f: 'Any Other',
  },
  child_failure_response: {
    a: 'Gives justifications or reasons — deflects responsibility',
    b: 'Becomes visibly demotivated or loses confidence for some time',
    c: 'Brushes it off and moves on without reflecting',
    d: 'Compares with others — becomes competitive or envious',
    e: 'Accepts it, reflects, and genuinely tries to improve',
    f: 'Any Other',
    g: 'Not Sure',
  },
  career_interest_reason: {
    a: 'I genuinely love and am passionate about this field',
    b: 'It pays well — I want financial security',
    c: 'It is a safe, stable and respected career',
    d: 'I want recognition or fame in this field',
    e: 'It gives me freedom and flexibility in how I work',
    f: 'I want to help people or make a difference in society',
    g: 'Any Other',
    h: 'Not Applicable',
  },
  career_pref_reason: {
    a: 'I believe my child is genuinely passionate about this field',
    b: 'It offers strong earning potential',
    c: 'It is a stable and respected career path',
    d: 'It brings recognition or social prestige',
    e: 'It offers independence and flexibility in work',
    f: 'It allows my child to contribute to society',
    g: 'Any Other',
    h: 'I have no specific preference',
  },
  career_influence: {
    a: 'My parent(s)',
    b: 'A teacher or mentor',
    c: 'Friends or classmates',
    d: 'A relative or family friend',
    e: 'A book, movie or documentary I watched',
    f: 'Social media or the internet',
    g: 'My own thinking and self-discovery',
    h: 'Any Other',
  },
  parent_understanding: {
    a: 'Very well — they fully understand and support my direction',
    b: 'Fairly well — they get it but have some concerns or doubts',
    c: 'Partially — they know what I like but push me towards something else',
    d: 'Not well — there is a big gap between what I want and what they expect',
    e: 'We have not really discussed it yet',
  },
  open_to_unconventional: {
    a: 'Yes — I am open to whatever the counsellor recommends',
    b: 'Open but with reservations — I would want to understand it fully first',
    c: 'No — I have a clear plan and prefer to stick to it',
  },
  financial_constraints: {
    a: 'No significant constraints — we are open to most options',
    b: 'Moderate constraints — we prefer affordable domestic options',
    c: 'Significant constraints — budget is a key decision factor',
  },
  study_away_openness: {
    open: 'Open to it',
    not_open: 'Not Open',
  },
  final_decision_maker: {
    a: 'Primarily us as parents',
    b: 'Primarily my child',
    c: 'We decide together as a family',
  },
  child_involvement: {
    a: 'Always — every major decision is discussed with them',
    b: 'Sometimes — for some decisions',
    c: 'Rarely — we prefer to decide on their behalf',
  },
  biggest_concern: {
    a: 'My child is confused about what to do',
    b: 'Academic performance is below expectations',
    c: 'My child lacks focus and direction',
    d: 'Peer pressure is a negative influence',
    e: 'I am worried they will make a wrong career choice',
    f: 'Any Other',
  },
  programme_expectations: {
    a: 'Help in choosing the right stream (Science / Commerce / Humanities)',
    b: 'Clarity on what career to aim for and a roadmap to get there',
    c: 'More confidence in myself and my choices',
    d: 'A better understanding of my own personality and strengths',
    e: 'Any Other',
  },
  programme_hopes: {
    a: 'Clarity on which stream to choose (Science / Commerce / Humanities)',
    b: 'A clear career direction with a roadmap',
    c: 'More confidence in themselves and their choices',
    d: 'Better self-awareness — understanding their own personality and strengths',
    e: 'Alignment between what my child wants and what we as parents expect',
    f: 'Any Other',
  },
};

// Resolves a single MCQ_SINGLE answer — a bare code string, or an { value, other }
// wrapper when the question allows a free-text "Any Other" answer — to its label.
const resolveMcqSingle = (raw: unknown, optionMap: Record<string, string>): string => {
  if (raw === null || raw === undefined || raw === '') return '';
  if (typeof raw === 'string') return optionMap[raw] ?? formatChartAnswer(raw);
  if (typeof raw === 'object') {
    const { value, other } = raw as Record<string, unknown>;
    const label = typeof value === 'string' ? optionMap[value] ?? formatChartAnswer(value) : '';
    const otherText = typeof other === 'string' ? other.trim() : '';
    if (otherText) return otherText;
    return label;
  }
  return formatChartAnswer(raw);
};

// Resolves an MCQ_MULTI answer — an array of codes, or a { selected, other } wrapper —
// to a comma-joined list of labels.
const resolveMcqMulti = (raw: unknown, optionMap: Record<string, string>): string => {
  if (raw === null || raw === undefined) return '';
  const codes = Array.isArray(raw)
    ? raw
    : typeof raw === 'object' && Array.isArray((raw as Record<string, unknown>).selected)
      ? ((raw as Record<string, unknown>).selected as unknown[])
      : [];
  const labels = codes
    .filter((c): c is string => typeof c === 'string')
    .map(c => optionMap[c] ?? formatChartAnswer(c));
  const otherText =
    typeof raw === 'object' && !Array.isArray(raw)
      ? (raw as Record<string, unknown>).other
      : undefined;
  if (typeof otherText === 'string' && otherText.trim()) labels.push(otherText.trim());
  return labels.filter(Boolean).join(', ');
};

// Subject-preference questions (A1.1/A1.2) are a MATRIX block of {subject, reason,
// reason_other} fields; the generic key: value dump reads as noisy field-key labels.
// Render just "Subject" then "Reason" on their own lines, the way a person would say it,
// resolving the reason's MCQ code to its full label via `reasonOptionMap`.
const formatSubjectBlock = (raw: unknown, reasonOptionMap: Record<string, string>): string => {
  if (!raw || typeof raw !== 'object') return '';
  const entries = Object.entries(raw as Record<string, unknown>).filter(
    ([, v]) => v !== null && v !== undefined && v !== ''
  );
  if (entries.length === 0) return '';

  const subjectEntry = entries.find(([k]) => /subject/i.test(k) && !/reason/i.test(k));
  const reasonEntry = entries.find(([k]) => /reason/i.test(k));

  const subject = subjectEntry ? formatChartAnswer(subjectEntry[1]) : '';
  const reason = reasonEntry ? resolveMcqSingle(reasonEntry[1], reasonOptionMap) : '';
  return [subject, reason].filter(Boolean).join('\n');
};

// study_away_table is a single MATRIX shared by both C3.3 ("another_city" row) and C3.4
// ("abroad" row) — pick just the one row this parameter card is about.
const formatStudyAwayRow = (raw: unknown, rowKey: 'another_city' | 'abroad'): string => {
  if (!raw || typeof raw !== 'object') return '';
  const row = (raw as Record<string, unknown>)[rowKey];
  if (!row || typeof row !== 'object') return '';
  return resolveMcqSingle((row as Record<string, unknown>).openness, OPTION_LABELS.study_away_openness);
};

// hobbies_table is a single MATRIX shared by both A2.2 (row "hobby_1") and A2.3 (row
// "hobby_2") — pick just the one row this parameter card is about, as "Name - N hours".
const formatHobbyRow = (raw: unknown, rowKey: 'hobby_1' | 'hobby_2'): string => {
  if (!raw || typeof raw !== 'object') return '';
  const row = (raw as Record<string, unknown>)[rowKey];
  if (!row || typeof row !== 'object') return '';
  const { name, hours } = row as Record<string, unknown>;
  if (name === null || name === undefined || name === '') return '';
  return hours !== null && hours !== undefined && hours !== ''
    ? `${formatChartAnswer(name)} - ${formatChartAnswer(hours)} hours`
    : formatChartAnswer(name);
};

// strengths_table / p_strengths_table is a single MATRIX shared by both B1.1
// ("Definitely me" / "Clearly see this") and B1.2 ("Somewhat me" / "Sometimes") — pick
// only the rows whose rating falls in this parameter's bucket, as a bullet list of traits.
const DEFINITELY_RATING_TOKENS = ['definitely', 'clearly'];
const SOMEWHAT_RATING_TOKENS = ['somewhat', 'sometimes'];

const formatStrengthsBucket = (raw: unknown, ratingTokens: string[]): string => {
  if (!raw || typeof raw !== 'object') return '';
  const matched: string[] = [];
  Object.entries(raw as Record<string, unknown>).forEach(([key, cell]) => {
    if (!cell || typeof cell !== 'object') return;
    const rating = (cell as Record<string, unknown>).rating;
    if (typeof rating !== 'string') return;
    if (ratingTokens.some(token => rating.toLowerCase().includes(token))) {
      matched.push(toTitleCase(key));
    }
  });
  if (matched.length === 0) return '';
  return matched.map(trait => `• ${trait}`).join('\n');
};

const CHART_PARAM_FORMATTERS: Record<
  string,
  { student?: (raw: unknown) => string; parent?: (raw: unknown) => string }
> = {
  'A1.1': {
    student: raw => formatSubjectBlock(raw, OPTION_LABELS.fav_subject_reason),
    parent: raw => formatSubjectBlock(raw, OPTION_LABELS.strong_subject_reason),
  },
  'A1.2': {
    student: raw => formatSubjectBlock(raw, OPTION_LABELS.hard_subject_reason),
    parent: raw => formatSubjectBlock(raw, OPTION_LABELS.struggle_subject_reason),
  },
  'A2.1': {
    student: raw => resolveMcqMulti(raw, OPTION_LABELS.free_time_activities),
    parent: raw => resolveMcqMulti(raw, OPTION_LABELS.p_free_time_activities),
  },
  'A2.2': { student: raw => formatHobbyRow(raw, 'hobby_1') },
  'A2.3': { student: raw => formatHobbyRow(raw, 'hobby_2') },
  'A2.4': { student: raw => resolveMcqMulti(raw, OPTION_LABELS.school_activities) },
  'A2.5': { student: raw => resolveMcqSingle(raw, OPTION_LABELS.learning_style) },
  'B1.1': {
    student: raw => formatStrengthsBucket(raw, DEFINITELY_RATING_TOKENS),
    parent: raw => formatStrengthsBucket(raw, DEFINITELY_RATING_TOKENS),
  },
  'B1.2': {
    student: raw => formatStrengthsBucket(raw, SOMEWHAT_RATING_TOKENS),
    parent: raw => formatStrengthsBucket(raw, SOMEWHAT_RATING_TOKENS),
  },
  'B1.4': {
    student: raw => resolveMcqSingle(raw, OPTION_LABELS.interest_consistency),
    parent: raw => resolveMcqSingle(raw, OPTION_LABELS.p_interest_consistency),
  },
  'B2.1': { student: raw => resolveMcqSingle(raw, OPTION_LABELS.energy_type) },
  'B2.2': { parent: raw => resolveMcqSingle(raw, OPTION_LABELS.child_personality) },
  'B2.3': { parent: raw => resolveMcqSingle(raw, OPTION_LABELS.child_interaction_style) },
  'B2.4': {
    student: raw => resolveMcqSingle(raw, OPTION_LABELS.decision_style),
    parent: raw => resolveMcqSingle(raw, OPTION_LABELS.child_decision_style),
  },
  'B3.1': {
    student: raw => resolveMcqMulti(raw, OPTION_LABELS.study_challenges),
    parent: raw => resolveMcqSingle(raw, OPTION_LABELS.child_study_obstacle),
  },
  'B3.2': {
    student: raw => resolveMcqSingle(raw, OPTION_LABELS.failure_response),
    parent: raw => resolveMcqSingle(raw, OPTION_LABELS.child_failure_response),
  },
  'C1.2': {
    student: raw => resolveMcqSingle(raw, OPTION_LABELS.career_interest_reason),
    parent: raw => resolveMcqSingle(raw, OPTION_LABELS.career_pref_reason),
  },
  'C2.1': { student: raw => resolveMcqSingle(raw, OPTION_LABELS.career_influence) },
  'C2.2': { student: raw => resolveMcqSingle(raw, OPTION_LABELS.parent_understanding) },
  'C3.1': { parent: raw => resolveMcqSingle(raw, OPTION_LABELS.open_to_unconventional) },
  'C3.2': { parent: raw => resolveMcqSingle(raw, OPTION_LABELS.financial_constraints) },
  'C3.3': { parent: raw => formatStudyAwayRow(raw, 'another_city') },
  'C3.4': { parent: raw => formatStudyAwayRow(raw, 'abroad') },
  'C3.5': { parent: raw => resolveMcqSingle(raw, OPTION_LABELS.final_decision_maker) },
  'C3.6': { parent: raw => resolveMcqSingle(raw, OPTION_LABELS.child_involvement) },
  'C3.7': { parent: raw => resolveMcqMulti(raw, OPTION_LABELS.biggest_concern) },
  'D1.1': {
    student: raw => resolveMcqMulti(raw, OPTION_LABELS.programme_expectations),
    parent: raw => resolveMcqMulti(raw, OPTION_LABELS.programme_hopes),
  },
};

const toComparisonGroups = (section?: ChartSection): ComparisonSubGroup[] => {
  if (!section) return [];
  const order: string[] = [];
  const groups = new Map<string, ComparisonItem[]>();
  section.parameters.forEach(p => {
    if (!groups.has(p.group)) {
      groups.set(p.group, []);
      order.push(p.group);
    }
    const formatters = CHART_PARAM_FORMATTERS[p.code];
    groups.get(p.group)!.push({
      id: p.code,
      code: p.code,
      parameter: p.label,
      studentResponse: formatters?.student ? formatters.student(p.student) : formatChartAnswer(p.student),
      parentResponse: formatters?.parent ? formatters.parent(p.parent) : formatChartAnswer(p.parent),
    });
  });
  return order.map((title, i) => ({ id: `${section.key}-grp-${i}`, title, items: groups.get(title)! }));
};

const pickString = (row: Record<string, unknown>, ...keys: string[]): string => {
  for (const k of keys) {
    const v = row[k];
    if (typeof v === 'string' || typeof v === 'number') return String(v);
  }
  return '';
};

// `academic_record_table` is a MATRIX question (PWC-backend
// prisma/seed-data/forms/preCounsellingStudent.ts, Q1): the stored answer is
// Record<rowKey, {c7?, c8?, c9?}>, one entry per row the student filled in — rows
// left blank are simply absent, not present with empty values.
const ACADEMIC_ROW_LABELS: Record<string, string> = {
  english: 'English',
  secondlang: 'Second Language',
  science: 'Science',
  maths: 'Mathematics',
  socsci: 'Social Science',
  cs: 'Computer Science',
  other: 'Other',
};

const normalizeAcademicRecords = (raw: unknown): AcademicRecord[] => {
  if (!raw || typeof raw !== 'object') return [];

  if (Array.isArray(raw)) {
    return raw.map((row, i) => {
      const r = (row ?? {}) as Record<string, unknown>;
      return {
        id: `rec-${i}`,
        subject: pickString(r, 'subject', 'Subject'),
        class7: pickString(r, 'class7', 'Class 7', 'c7'),
        class8: pickString(r, 'class8', 'Class 8', 'c8'),
        class9: pickString(r, 'class9', 'Class 9', 'c9'),
      };
    });
  }

  return Object.entries(raw as Record<string, unknown>).map(([key, cell], i) => {
    const r = (cell ?? {}) as Record<string, unknown>;
    return {
      id: `rec-${i}`,
      subject: ACADEMIC_ROW_LABELS[key] ?? toTitleCase(key),
      class7: pickString(r, 'c7'),
      class8: pickString(r, 'c8'),
      class9: pickString(r, 'c9'),
      isOther: key === 'other',
    };
  });
};

const trendToDisplay: Record<string, CounsellorFormChartData['studentInfo']['academicTrend']> = {
  IMPROVING: 'Improving',
  STABLE: 'Stable',
  DECLINING: 'Declining',
  NOT_ASSESSED: 'Not Assessed',
};
const trendToApi: Record<CounsellorFormChartData['studentInfo']['academicTrend'], PutCounsellorChartBody['academicTrend']> = {
  Improving: 'IMPROVING',
  Stable: 'STABLE',
  Declining: 'DECLINING',
  'Not Assessed': 'NOT_ASSESSED',
};

const alignmentToDisplay: Record<string, CounsellorFormChartData['sectionE']['academicCareerAlignment']> = {
  STRONGLY_ALIGNED: 'Strongly Aligned',
  PARTIALLY_ALIGNED: 'Partially Aligned',
  MISALIGNED: 'Misaligned',
  NOT_YET_ASSESSED: 'Not Yet Assessed',
};
const alignmentToApi: Record<CounsellorFormChartData['sectionE']['academicCareerAlignment'], PutCounsellorChartBody['alignmentRating']> = {
  'Strongly Aligned': 'STRONGLY_ALIGNED',
  'Partially Aligned': 'PARTIALLY_ALIGNED',
  Misaligned: 'MISALIGNED',
  'Not Yet Assessed': 'NOT_YET_ASSESSED',
};

const LAYER_LABEL: Record<AssessmentLayer, string> = {
  RIASEC: 'RIASEC',
  BIG_FIVE: 'BIG Five',
  APTITUDE: 'Aptitude',
  COGNITIVE: 'Cognitive & Decision',
};

const toTraitRow = (s: EnrichedTraitScore, no: number): TraitAssessmentItem => ({
  id: `trait-${s.trait}`,
  no,
  layerTrait: `${LAYER_LABEL[s.layer]} - ${toTitleCase(s.trait)}`,
  traitName: s.traitName,
  whatItMeasures: s.description,
  percentage: s.score.toFixed(2),
  grade: s.level,
  gradeMeaning: s.levelMeaning,
  studentQuality: s.studentQuality,
  studentFriendlyExplanation: s.studentFriendlyExplanation,
});

const emptyNotesFor = (codes: string[]): Record<string, string> =>
  Object.fromEntries(codes.map(c => [c, '']));

export const mapChartToFormData = (
  chart: CounsellorChartResponse,
  sessionId: string
): CounsellorFormChartData => {
  const notes = chart.counsellor.notes;
  const noteFor = (code: string) => notes[code] ?? '';

  const preByKey = new Map(chart.preCounselling.map(s => [s.key, s]));
  const report = chart.assessment;

  const traitsTable: TraitAssessmentItem[] = report
    ? [
        ...report.riasec.scores,
        ...report.bigFive.scores,
        ...report.cognitive.scores,
        ...report.aptitude.scores,
      ].map((s, i) => toTraitRow(s, i + 1))
    : [];

  const topCognitiveTrait = report?.cognitive.ranking[0];
  const thinkingModeTrait = report?.cognitive.scores.find(s => s.trait === topCognitiveTrait);

  const riasecScoreByTrait = new Map((report?.riasec.scores ?? []).map(s => [s.trait, s.score]));
  const bigFiveScoreByTrait = new Map((report?.bigFive.scores ?? []).map(s => [s.trait, s.score]));
  const toRankedTraitScores = (traits: TraitKey[], scoreByTrait: Map<TraitKey, number>): RankedTraitScore[] =>
    traits.map(t => ({
      name: toTitleCase(t),
      percentage: (scoreByTrait.get(t) ?? 0).toFixed(2),
    }));

  // Once a counsellor adds/removes a row, the whole edited array is persisted on the
  // chart (`chart.counsellor.<table>`) and becomes the permanent source of truth from
  // then on — otherwise fall back to freshly recomputing from the assessment report.
  // `fitScore` itself is never persisted (buildSaveBody strips it — the backend PUT
  // contracts for these 4 tables don't declare it), so it's re-attached here from the
  // report on every load by matching each persisted row back to its report row via a
  // natural key; array index can't be used since add/delete change row order/length.
  // Persisted `*ItemJson` types don't declare `fitScore` (buildSaveBody strips it before
  // the PUT), so it's read via this loose cast rather than being a real field on them.
  const readPersistedFitScore = (row: object): number | undefined =>
    (row as { fitScore?: number }).fitScore;

  // Matched against the full `ranked` list (every stream the assessment scored), not
  // just `top3` — so a role/stream/domain a counsellor adds later via the career
  // library still picks up a fit score even when it fell outside the top N.
  const streamFitByKey = new Map(
    (report?.streamFit.ranked ?? []).map(sf => [fitKey(sf.mainStream, sf.subStream), sf.fitScore])
  );
  const streamFitTable: StreamFitItem[] = (
    chart.counsellor.streamFitTable ??
    (report?.streamFit.top3 ?? []).map((sf, i) => ({
      id: `sf-${i}`,
      mainStream: sf.mainStream,
      subStream: sf.subStream,
      coreSubjects: sf.coreSubjects ?? '',
      electives: sf.electiveSubjects ?? '',
      explanation: sf.explanation ?? '',
      gradingLevel: sf.level,
      meaning: sf.meaning,
      fitScore: sf.fitScore ?? undefined,
    }))
  ).map(row => ({
    ...row,
    fitScore:
      readPersistedFitScore(row) ??
      streamFitByKey.get(fitKey(row.mainStream, row.subStream)) ??
      undefined,
  }));

  const graduationFitByKey = new Map(
    (report?.graduationPathways.ranked ?? []).map(gf => [
      fitKey(gf.clusterHead, gf.mainStream, gf.subStream),
      gf.fitScore,
    ])
  );
  const graduationTable: GraduationItem[] = (
    chart.counsellor.graduationTable ??
    (report?.graduationPathways.top3 ?? []).map((gf, i) => ({
      id: `gr-${i}`,
      cluster: gf.clusterHead ?? '',
      mainStream: gf.mainStream,
      subStream: gf.subStream,
      specialization: gf.specialisations ?? '',
      reasoning: gf.explanation ?? '',
      keyExams: gf.keyExams ?? '',
      fitScore: gf.fitScore ?? undefined,
    }))
  ).map(row => ({
    ...row,
    fitScore:
      readPersistedFitScore(row) ??
      graduationFitByKey.get(fitKey(row.cluster, row.mainStream, row.subStream)) ??
      undefined,
  }));

  const industryFitByKey = new Map(
    (report?.careerFit?.top3Industries ?? []).map(ind => [
      fitKey(ind.cluster, ind.industry, ind.domain),
      ind.fitScore,
    ])
  );
  const careerCompassClusterTable: CareerCompassClusterItem[] = (
    chart.counsellor.careerCompassClusterTable ??
    (report?.careerFit?.top3Industries ?? []).map((ind, i) => ({
      id: `ccc-${i}`,
      cluster: ind.cluster,
      industry: ind.industry,
      domain: ind.domain,
      streamRequirement: '',
      gradingLevel: ind.level,
      meaning: ind.meaning,
      fitScore: ind.fitScore ?? undefined,
    }))
  ).map(row => ({
    ...row,
    fitScore:
      readPersistedFitScore(row) ??
      industryFitByKey.get(fitKey(row.cluster, row.industry, row.domain)) ??
      undefined,
  }));

  // Matched against `rankedDomains` (every domain the assessment scored), not just
  // `top6Domains` — same reasoning as streamFitByKey above.
  const domainFitByKey = new Map(
    (report?.careerFit?.rankedDomains ?? []).map(d => [fitKey(d.domain), d.fitScore])
  );
  // `cluster`/`industry` on Career Compass rows only exist on Career Compass table
  // rows added after that redesign — a chart saved before it has persisted rows with
  // neither field, so backfill them by domain name from the assessment report rather
  // than showing a blank cell (or waiting on a backend data migration).
  const domainInfoByKey = new Map(
    (report?.careerFit?.rankedDomains ?? []).map(d => [
      fitKey(d.domain),
      { cluster: d.cluster, industry: d.industry },
    ])
  );
  const careerCompassTable: CareerCompassItem[] = (
    chart.counsellor.careerCompassTable ??
    (report?.careerFit?.top6Domains ?? []).map((d, i) => ({
      id: `cc-${i}`,
      cluster: d.cluster,
      industry: d.industry,
      domain: d.domain,
      role: d.representativeCareer?.jobRole ?? '',
      whyItFits: d.representativeCareer?.oneLineDescription ?? '',
      topEmployers: (d.representativeCareer?.topCompanies ?? []).join(', '),
      salaryIndia: d.representativeCareer?.salaryIndiaRangeText ?? '',
      salaryAbroad: d.representativeCareer?.salaryGlobalRangeText ?? '',
      fitScore: d.fitScore ?? undefined,
    }))
  ).map(row => ({
    ...row,
    cluster: row.cluster || domainInfoByKey.get(fitKey(row.domain))?.cluster || '',
    industry: row.industry || domainInfoByKey.get(fitKey(row.domain))?.industry || '',
    fitScore: readPersistedFitScore(row) ?? domainFitByKey.get(fitKey(row.domain)) ?? undefined,
  }));

  // `chart.reliabilityMeasures` (ReliabilityMeasureDefinition) carries the static
  // code/name/guiding-question text; only the score/status/explanation below are
  // computed per-attempt. Definition rows are keyed by the scoring engine's internal
  // code (RVS/ARI/ACI/ORI), distinct from the counsellor-chart display code
  // (EIM/ACI/AAI/HRS) used elsewhere in this UI.
  const measureDefByCode = new Map(chart.reliabilityMeasures.map(m => [m.code, m]));
  const reliabilityDef = (
    engineCode: 'RVS' | 'ARI' | 'ACI' | 'ORI',
    displayCode: string,
    fallbackName: string,
    fallbackQuestion: string
  ) => {
    const def = measureDefByCode.get(engineCode);
    return {
      code: displayCode,
      name: def?.friendlyName ?? fallbackName,
      measure: def?.measure ?? '',
      guidingQuestion: def?.whatItMeasures ?? fallbackQuestion,
    };
  };

  const reliabilityIndicators: ReliabilityCardData[] = [
    {
      ...reliabilityDef('RVS', 'EIM', 'Engagement Integrity Measure', 'How consistent were your personality answers?'),
      valueStatus: report ? `${report.reliability.rvs.score}% ${report.reliability.rvs.level}` : 'Not yet assessed',
      explanationText: report?.reliability.rvs.meaning ?? 'Assessment not yet submitted.',
    },
    {
      ...reliabilityDef('ARI', 'ACI', 'Aptitude Test Coherence Index', 'How logically did aptitude answers progress?'),
      valueStatus: report
        ? report.reliability.ari.ari
          ? `${report.reliability.ari.ari.score}% ${report.reliability.ari.ari.level}`
          : `${report.reliability.ari.dc}% (timing data pending)`
        : 'Not yet assessed',
      explanationText:
        report?.reliability.ari.ari?.meaning ??
        'Full coherence score needs per-question timing data, not yet collected for this attempt.',
    },
    {
      ...reliabilityDef('ACI', 'AAI', 'Aptitude Accuracy Indicator', "How many questions were marked 'Not Sure'?"),
      valueStatus: report
        ? `${(100 - report.reliability.aci.dkPercent).toFixed(0)}% ${report.reliability.aci.level}`
        : 'Not yet assessed',
      explanationText: report?.reliability.aci.meaning ?? 'Assessment not yet submitted.',
    },
    {
      ...reliabilityDef('ORI', 'HRS', 'Holistic Reliability Score', 'Was the completion pace psychologically normal?'),
      valueStatus: report
        ? `${report.reliability.ori.completionMinutes} min · ${report.reliability.ori.level}`
        : 'Not yet assessed',
      explanationText: report?.reliability.ori.meaning ?? 'Assessment not yet submitted.',
    },
  ];

  // Full 10-pair breakdown behind the EIM score, cross-referenced against the
  // backend's flaggedMirrorPairs (severity "strong" only) so the counsellor sees
  // exactly which contradictions warrant a follow-up or an amendment.
  const flaggedMirrorPairCodes = new Set(chart.flaggedMirrorPairs.map(p => p.code));
  const mirrorPairs: MirrorPairSummaryItem[] = (report?.reliability.rvs.pairs ?? []).map(p => ({
    code: p.code,
    questionA: p.a,
    questionB: p.b,
    responseA: p.responseA,
    responseB: p.responseB,
    gap: p.gap,
    severity: p.severity,
    penalty: p.penalty,
    flagged: flaggedMirrorPairCodes.has(p.code),
  }));

  const scri = chart.counsellor.scri;
  const scriItems: SCRIItemData[] = [
    { code: 'S1', name: 'Confidence', description: 'Comfort discussing career topics', rating: scri.confidence ?? 0 },
    { code: 'S2', name: 'Reasoned Thinking', description: 'Personal vs. borrowed reasoning', rating: scri.reasonedThinking ?? 0 },
    { code: 'S3', name: 'Reduced Anxiety', description: 'Comfort with uncertainty', rating: scri.reducedAnxiety ?? 0 },
    { code: 'S4', name: 'Self-Awareness', description: "Own interests vs. others' expectations", rating: scri.selfAwareness ?? 0 },
    { code: 'S5', name: 'Career Curiosity', description: 'Active exploration between sessions', rating: scri.careerCuriosity ?? 0 },
    { code: 'S6', name: 'Decision Ownership', description: 'Who is driving the decision', rating: scri.decisionOwnership ?? 0 },
  ];

  return {
    sessionId,
    studentId: chart.studentId,
    studentInfo: {
      studentName: chart.ourChampion.name,
      className: [chart.ourChampion.class, chart.ourChampion.division].filter(Boolean).join(' - '),
      instituteName: chart.ourChampion.institute,
      fatherName: chart.ourChampion.fatherName ?? '',
      fatherOccupation: chart.ourChampion.fatherOccupationCompany,
      motherName: chart.ourChampion.motherName ?? '',
      motherOccupation: chart.ourChampion.motherOccupationCompany,
      academicRecords: normalizeAcademicRecords(chart.academicRecord),
      academicTrend: chart.counsellor.academicTrend ? trendToDisplay[chart.counsellor.academicTrend] : 'Not Assessed',
      academicTrendNotes: '',
    },
    sectionA: {
      comparisonGroups: toComparisonGroups(preByKey.get('academics')),
      synthesisNotes: { A1: noteFor('A1'), A2: noteFor('A2'), A3: noteFor('A3'), A4: noteFor('A4'), A5: noteFor('A5') },
    },
    sectionB: {
      comparisonGroups: toComparisonGroups(preByKey.get('strengths')),
      synthesisNotesPre: { B1: noteFor('B1'), B2: noteFor('B2'), B3: noteFor('B3'), B4: noteFor('B4'), B5: noteFor('B5') },
      traitsTable,
      summaryStrip: {
        careerStyle: report
          ? {
              code: report.dominantCareerStyle.code,
              traits: toRankedTraitScores(report.dominantCareerStyle.traits, riasecScoreByTrait),
              style: report.dominantCareerStyle.style,
              description: report.dominantCareerStyle.description,
              explanation: report.dominantCareerStyle.explanation,
            }
          : { code: '', traits: [], style: 'Not yet assessed', description: '', explanation: '' },
        personalSignature: report
          ? {
              code: report.dominantPersonalityStyle.code,
              // Dominant Personality Style is resolved from the top-2 ranked Big Five traits
              // (see PWC-backend resolveDominantPersonalityStyle) — style/description/explanation
              // don't carry the underlying trait keys, so re-derive them from the ranking here.
              traits: toRankedTraitScores(report.bigFive.ranking.slice(0, 2), bigFiveScoreByTrait),
              style: report.dominantPersonalityStyle.style,
              description: report.dominantPersonalityStyle.description,
              explanation: report.dominantPersonalityStyle.explanation,
            }
          : { code: '', traits: [], style: 'Not yet assessed', description: '', explanation: '' },
        thinkingMode: thinkingModeTrait
          ? {
              layer: LAYER_LABEL[thinkingModeTrait.layer],
              trait: toTitleCase(thinkingModeTrait.trait),
              traitName: thinkingModeTrait.traitName,
              whatItMeasures: thinkingModeTrait.description,
              studentQuality: thinkingModeTrait.studentQuality,
              percentage: thinkingModeTrait.score.toFixed(2),
              level: thinkingModeTrait.level,
              levelMeaning: thinkingModeTrait.levelMeaning,
              personalizedExplanation: thinkingModeTrait.studentFriendlyExplanation ?? undefined,
            }
          : { layer: '', trait: '', traitName: 'Not yet assessed', whatItMeasures: '', level: '', levelMeaning: '' },
      },
      redFlags: {
        riasec: report?.riasec.flags.join(', ') ?? '',
        bigFive: report?.bigFive.flags.join(', ') ?? '',
        cogDec: report?.cognitive.flags.join(', ') ?? '',
        aptitude: report?.aptitude.flags.join(', ') ?? '',
      },
      careerDnaNarrative: chart.counsellor.careerDnaNarrative ?? {
        dnaDefinition: '',
        careerStyleReveals: report?.dominantCareerStyle.explanation ?? '',
        personalityStyleReveals: report?.dominantPersonalityStyle.explanation ?? '',
        thinkingModeReveals: '',
        aptitudeProfileReveals: '',
      },
    },
    sectionC: {
      comparisonGroups: toComparisonGroups(preByKey.get('compass')),
      synthesisNotesPre: { D1: noteFor('D1'), D2: noteFor('D2'), D3: noteFor('D3'), D4: noteFor('D4'), D5: noteFor('D5') },
      streamFitTable,
      whyThisStream1: chart.counsellor.whyThisStream?.whyThisStream1 ?? '',
      synthesisNotesE: { E1: noteFor('E1'), E2: noteFor('E2'), E3: noteFor('E3'), E4: noteFor('E4'), E5: noteFor('E5'), E6: noteFor('E6') },
      graduationTable,
      whyThisStream2: chart.counsellor.whyThisStream?.whyThisStream2 ?? '',
      // No backend field for a 3rd (graduation-fit) synthesis note group — F1-F3 is
      // reserved for the Reliability step (see Step4SectionD). Kept local-only.
      synthesisNotesF: emptyNotesFor(['F1', 'F2', 'F3', 'F4', 'F5', 'F6']),
      entranceExamsTable: chart.counsellor.entranceExamsTable ?? [],
      collegesTable: chart.counsellor.collegesTable ?? [],
      careerCompassClusterTable,
      careerCompassTable,
      // Lets the counsellor-add-row flow (Step3SectionC) score a new row the moment
      // it's picked from the career library, without waiting for a save + reload —
      // same natural-key lookup used above to re-hydrate persisted rows.
      fitScoreLookup: {
        stream: Object.fromEntries(streamFitByKey),
        graduation: Object.fromEntries(graduationFitByKey),
        domain: Object.fromEntries(domainFitByKey),
        industry: Object.fromEntries(industryFitByKey),
      },
    },
    sectionD: {
      indicators: reliabilityIndicators,
      mirrorPairs,
      synthesisNotes: { F1: noteFor('F1'), F2: noteFor('F2'), F3: noteFor('F3') },
    },
    sectionE: {
      roadmapGrid: chart.counsellor.roadmapGrid ?? {
        nowSkills: '', nowActivities: '', nowHabits: '',
        c11Stream: '', c11Exams: '', c11Electives: '',
        afterDegrees: '', afterCertifications: '', afterAbroad: '',
      },
      scriItems,
      academicCareerAlignment: chart.counsellor.alignmentRating
        ? alignmentToDisplay[chart.counsellor.alignmentRating]
        : 'Not Yet Assessed',
      synthesisNotes: { G1: noteFor('G1'), G2: noteFor('G2'), G3: noteFor('G3'), G4: noteFor('G4') },
    },
    sectionF: {
      comparisonGroups: toComparisonGroups(preByKey.get('goals')),
      synthesisNotes: { H1: noteFor('H1'), H2: noteFor('H2'), H3: noteFor('H3'), H4: noteFor('H4') },
    },
  };
};

// Placeholder shape rendered for the brief window before the first real chart has
// loaded — never shown standalone (StudentFormChartPage gates the full step UI on
// the fetch having resolved at least once).
export const emptyFormData = (sessionId: string, studentId: string): CounsellorFormChartData => ({
  sessionId,
  studentId,
  studentInfo: {
    studentName: '',
    className: '',
    instituteName: '',
    fatherName: '',
    fatherOccupation: '',
    motherName: '',
    motherOccupation: '',
    academicRecords: [],
    academicTrend: 'Not Assessed',
    academicTrendNotes: '',
  },
  sectionA: { comparisonGroups: [], synthesisNotes: emptyNotesFor(['A1', 'A2', 'A3', 'A4', 'A5']) },
  sectionB: {
    comparisonGroups: [],
    synthesisNotesPre: emptyNotesFor(['B1', 'B2', 'B3', 'B4', 'B5']),
    traitsTable: [],
    summaryStrip: {
      careerStyle: { code: '', traits: [], style: '', description: '', explanation: '' },
      personalSignature: { code: '', traits: [], style: '', description: '', explanation: '' },
      thinkingMode: { layer: '', trait: '', traitName: '', whatItMeasures: '', level: '', levelMeaning: '' },
    },
    redFlags: { riasec: '', bigFive: '', cogDec: '', aptitude: '' },
    careerDnaNarrative: {
      dnaDefinition: '', careerStyleReveals: '', personalityStyleReveals: '',
      thinkingModeReveals: '', aptitudeProfileReveals: '',
    },
  },
  sectionC: {
    comparisonGroups: [],
    synthesisNotesPre: emptyNotesFor(['D1', 'D2', 'D3', 'D4', 'D5']),
    streamFitTable: [],
    whyThisStream1: '',
    synthesisNotesE: emptyNotesFor(['E1', 'E2', 'E3', 'E4', 'E5', 'E6']),
    graduationTable: [],
    whyThisStream2: '',
    synthesisNotesF: emptyNotesFor(['F1', 'F2', 'F3', 'F4', 'F5', 'F6']),
    entranceExamsTable: [],
    collegesTable: [],
    careerCompassClusterTable: [],
    careerCompassTable: [],
    fitScoreLookup: { stream: {}, graduation: {}, domain: {}, industry: {} },
  },
  sectionD: { indicators: [], mirrorPairs: [], synthesisNotes: emptyNotesFor(['F1', 'F2', 'F3']) },
  sectionE: {
    roadmapGrid: {
      nowSkills: '', nowActivities: '', nowHabits: '',
      c11Stream: '', c11Exams: '', c11Electives: '',
      afterDegrees: '', afterCertifications: '', afterAbroad: '',
    },
    scriItems: [],
    academicCareerAlignment: 'Not Yet Assessed',
    synthesisNotes: emptyNotesFor(['G1', 'G2', 'G3', 'G4']),
  },
  sectionF: { comparisonGroups: [], synthesisNotes: emptyNotesFor(['H1', 'H2', 'H3', 'H4']) },
});

const stripFitScore = <T extends { fitScore?: number }>(row: T): Omit<T, 'fitScore'> => {
  const { fitScore: _fitScore, ...rest } = row;
  return rest;
};

// Gathers everything the current UI can persist back into one PUT body.
export const buildSaveBody = (
  formData: CounsellorFormChartData,
  lastEditedBy?: string
): PutCounsellorChartBody => {
  const allNotes: Record<string, string> = {
    ...formData.sectionA.synthesisNotes,
    ...formData.sectionB.synthesisNotesPre,
    ...formData.sectionC.synthesisNotesPre,
    ...formData.sectionC.synthesisNotesE,
    ...formData.sectionD.synthesisNotes,
    ...formData.sectionE.synthesisNotes,
    ...formData.sectionF.synthesisNotes,
  };
  // Send every valid code's current value, including empty strings — a note the
  // counsellor just cleared must overwrite the stale value already stored server-side,
  // not get silently dropped from the payload (which would leave the old text in place
  // and have it reappear on the next load).
  const notes = Object.entries(allNotes)
    .filter(([code]) => VALID_SYNTHESIS_NOTE_CODES.has(code))
    .map(([code, body]) => ({ code, body: body.slice(0, 5000) }));

  const scriRatings = formData.sectionE.scriItems;
  const findRating = (code: string) => scriRatings.find(s => s.code === code)?.rating;
  const scri: PutCounsellorChartBody['scri'] = {};
  const s1 = findRating('S1'); if (s1) scri.confidence = s1;
  const s2 = findRating('S2'); if (s2) scri.reasonedThinking = s2;
  const s3 = findRating('S3'); if (s3) scri.reducedAnxiety = s3;
  const s4 = findRating('S4'); if (s4) scri.selfAwareness = s4;
  const s5 = findRating('S5'); if (s5) scri.careerCuriosity = s5;
  const s6 = findRating('S6'); if (s6) scri.decisionOwnership = s6;

  return {
    notes,
    ...(Object.keys(scri).length > 0 ? { scri } : {}),
    academicTrend: trendToApi[formData.studentInfo.academicTrend],
    alignmentRating: alignmentToApi[formData.sectionE.academicCareerAlignment],
    roadmapGrid: formData.sectionE.roadmapGrid,
    careerDnaNarrative: formData.sectionB.careerDnaNarrative,
    whyThisStream: {
      whyThisStream1: formData.sectionC.whyThisStream1,
      whyThisStream2: formData.sectionC.whyThisStream2,
    },
    entranceExamsTable: formData.sectionC.entranceExamsTable,
    collegesTable: formData.sectionC.collegesTable,
    // `fitScore` is a UI-only display field seeded from the assessment report (see
    // mapChartToFormData) — none of these 4 tables' backend contracts declare it, so
    // strip it before sending; keeping it in the wire payload risks the backend
    // rejecting or silently dropping the whole row on save.
    streamFitTable: formData.sectionC.streamFitTable.map(stripFitScore),
    graduationTable: formData.sectionC.graduationTable.map(stripFitScore),
    careerCompassClusterTable: formData.sectionC.careerCompassClusterTable.map(stripFitScore),
    careerCompassTable: formData.sectionC.careerCompassTable.map(stripFitScore),
    ...(lastEditedBy ? { lastEditedBy } : {}),
  };
};
