// Builders for the two "Class 910" report templates (docs/*.xlsx) — real .xlsx output,
// column-for-column matched to the sample files the counsellor ops team already uses.
import { Project } from '@/types/project.types';
import { ProjectStudentDetail } from '@/types/project.types';
import { counsellorChartService } from '@/services/counsellorChart.service';
import { formsService } from '@/services/forms.service';
import { toTitleCase } from '@/utils';
import { downloadXlsx, formatAnswerValue, XlsxHeaderColumn } from '@/utils/exportXlsx';
import { AssessmentLayer, EnrichedTraitScore } from '@/types/counsellorChart.types';

// The org runs a single cohort today — same constant used by the student-facing form
// pages (StudentFeedbackFormPage, ParentFeedbackFormPage, ParentPreCounsellingFormPage).
const COHORT = 'CLASS_9_10';

const LAYER_LABEL: Record<AssessmentLayer, string> = {
  RIASEC: 'RIASEC',
  BIG_FIVE: 'BIG Five',
  APTITUDE: 'Aptitude',
  COGNITIVE: 'Cognitive & Decision',
};

const blank = (v: string | number | null | undefined): string | number => v ?? '—';

// ---------------------------------------------------------------------------
// Counselor Chart report — one row per student, sourced from the counsellor
// chart (pre-counselling + computed assessment + counsellor-authored SCRI).
// ---------------------------------------------------------------------------
export const buildCounselorChartReport = async (
  project: Project | undefined,
  students: ProjectStudentDetail[]
): Promise<void> => {
  const charts = await Promise.all(
    students.map(s => counsellorChartService.getChart(s.id).catch(() => null))
  );

  // Pre-counselling section/parameter layout is driven by the (cohort-wide) form
  // templates, so it's the same across every student in the project — use the first
  // chart that actually has data as the canonical column layout.
  const sample = charts.find(c => c && c.preCounselling.length > 0);
  const preSections = sample?.preCounselling ?? [];

  const columns: XlsxHeaderColumn[] = [
    { group: null, header: 'Student Log-in ID' },
    { group: null, header: 'Class' },
    { group: null, header: 'Session Date' },
    { group: null, header: 'Location' },
  ];
  preSections.forEach(section => {
    section.parameters.forEach(p => {
      columns.push({ group: `Pre-counselling ${toTitleCase(section.key)}`, header: `${p.label} - Student` });
      columns.push({ group: `Pre-counselling ${toTitleCase(section.key)}`, header: `${p.label} - Parent` });
    });
  });
  for (let n = 1; n <= 18; n += 1) {
    columns.push({ group: n === 1 ? 'Assessment Traits' : null, header: `Trait No ${n} - Layer` });
    columns.push({ group: null, header: `Trait No ${n} - Trait Name` });
    columns.push({ group: null, header: `Trait No ${n} - %` });
    columns.push({ group: null, header: `Trait No ${n} - Grade` });
  }
  for (let r = 1; r <= 3; r += 1) {
    columns.push({ group: r === 1 ? 'Stream Fit' : null, header: `Rank ${r} - Main Stream` });
    columns.push({ group: null, header: `Rank ${r} - Sub-Stream` });
    columns.push({ group: null, header: `Rank ${r} - Core Subjects` });
    columns.push({ group: null, header: `Rank ${r} - Electives` });
    columns.push({ group: null, header: `Rank ${r} - Fit Score %` });
    columns.push({ group: null, header: `Rank ${r} - Grading Level (Meaning)` });
  }
  for (let r = 1; r <= 3; r += 1) {
    columns.push({ group: r === 1 ? 'Graduation Path' : null, header: `Rank ${r} - Cluster` });
    columns.push({ group: null, header: `Rank ${r} - Degree` });
  }
  for (let r = 1; r <= 2; r += 1) {
    columns.push({ group: r === 1 ? 'Career Path' : null, header: `Rank ${r} - Domain` });
    columns.push({ group: null, header: `Rank ${r} - Job Role` });
  }
  columns.push(
    { group: 'Roadmap', header: 'NOW (Class 9-10) - Skills to Build' },
    { group: null, header: 'NOW - Activities to Join' },
    { group: null, header: 'NOW - Habits to Develop' },
    { group: null, header: 'CLASS 11-12 - Stream to Choose' },
    { group: null, header: 'CLASS 11-12 - Exams to Watch' },
    { group: null, header: 'CLASS 11-12 - Electives to Pick' },
    { group: null, header: 'AFTER CLASS 12 - Degrees to Target' },
    { group: null, header: 'AFTER CLASS 12 - Certifications' },
    { group: null, header: 'AFTER CLASS 12 - Study Abroad' }
  );
  columns.push(
    { group: 'Reliability', header: 'EIM % (Engagement Integrity Measure)' },
    { group: null, header: 'EIM Label' },
    { group: null, header: 'ACI (Aptitude Test Coherence Index)' },
    { group: null, header: 'ACI Label' },
    { group: null, header: 'AAI (Aptitude Accuracy Indicator - Not Sure count)' },
    { group: null, header: 'AAI Label' },
    { group: null, header: 'HRS (Holistic Reliability Score)' },
    { group: null, header: 'HRS Label' }
  );
  columns.push(
    { group: 'SCRI', header: 'S1 Confidence (1-4)' },
    { group: null, header: 'S2 Reasoned Thinking (1-4)' },
    { group: null, header: 'S3 Reduced Anxiety (1-4)' },
    { group: null, header: 'S4 Self-Awareness (1-4)' },
    { group: null, header: 'S5 Career Curiosity (1-4)' },
    { group: null, header: 'S6 Decision Ownership (1-4)' },
    { group: null, header: 'SCRI Total (/24)' },
    { group: null, header: 'SCRI Band (1-4)' },
    { group: null, header: 'SCRI Band Label' },
    { group: null, header: 'Academic x Career Alignment' }
  );

  const toTraitRow = (s: EnrichedTraitScore): (string | number)[] => [
    LAYER_LABEL[s.layer],
    s.traitName,
    s.score,
    s.level,
  ];

  const rows: (string | number | null | undefined)[][] = students.map((student, i) => {
    const chart = charts[i];
    const report = chart?.assessment;
    const row: (string | number | null | undefined)[] = [
      student.studentId || student.id,
      chart?.ourChampion.class || student.className || student.grade,
      student.session1?.date || student.session2?.date || student.stageCompletedDate,
      chart?.ourChampion.instituteLocation,
    ];

    // Re-derive this student's own pre-counselling answers keyed by (section, code) —
    // parameter *order* is shared across students, but values are per-student.
    const paramValue = (sectionKey: string, code: string, side: 'student' | 'parent') => {
      const section = chart?.preCounselling.find(s => s.key === sectionKey);
      const param = section?.parameters.find(p => p.code === code);
      return param ? formatAnswerValue(param[side]) : '—';
    };
    preSections.forEach(section => {
      section.parameters.forEach(p => {
        row.push(paramValue(section.key, p.code, 'student'));
        row.push(paramValue(section.key, p.code, 'parent'));
      });
    });

    const traits = report
      ? [...report.riasec.scores, ...report.bigFive.scores, ...report.cognitive.scores, ...report.aptitude.scores]
      : [];
    for (let n = 0; n < 18; n += 1) {
      const t = traits[n];
      row.push(...(t ? toTraitRow(t) : ['—', '—', '—', '—']));
    }

    const streamFit = report?.streamFit.top3 ?? [];
    for (let r = 0; r < 3; r += 1) {
      const sf = streamFit[r];
      row.push(
        blank(sf?.mainStream),
        blank(sf?.subStream),
        blank(sf?.coreSubjects),
        blank(sf?.electiveSubjects),
        blank(sf?.fitScore),
        sf ? `${sf.level} (${sf.meaning})` : '—'
      );
    }

    const gradPaths = report?.graduationPathways.top3 ?? [];
    for (let r = 0; r < 3; r += 1) {
      const gf = gradPaths[r];
      row.push(blank(gf?.clusterHead ?? gf?.mainStream), blank(gf?.subStream));
    }

    const careerDomains = report?.careerFit?.top6Domains ?? [];
    for (let r = 0; r < 2; r += 1) {
      const d = careerDomains[r];
      row.push(blank(d?.domain), blank(d?.representativeCareer?.jobRole));
    }

    // No backend field for the roadmap grid yet (see counsellorChart.service.ts) — the
    // counsellor fills this in outside the system today.
    row.push('—', '—', '—', '—', '—', '—', '—', '—', '—');

    const reliability = report?.reliability;
    row.push(
      blank(reliability?.rvs.score),
      blank(reliability?.rvs.level),
      blank(reliability?.ari.ari?.score ?? reliability?.ari.dc),
      blank(reliability?.ari.ari?.level ?? (reliability ? 'Pending Timing Data' : undefined)),
      blank(reliability ? Number((100 - reliability.aci.dkPercent).toFixed(0)) : undefined),
      blank(reliability?.aci.level),
      blank(reliability?.ori.completionMinutes),
      blank(reliability?.ori.level)
    );

    const scri = chart?.counsellor.scri;
    row.push(
      blank(scri?.confidence),
      blank(scri?.reasonedThinking),
      blank(scri?.reducedAnxiety),
      blank(scri?.selfAwareness),
      blank(scri?.careerCuriosity),
      blank(scri?.decisionOwnership),
      blank(scri?.total),
      blank(scri?.band),
      blank(scri?.bandLabel),
      blank(chart?.counsellor.alignmentRating ? toTitleCase(chart.counsellor.alignmentRating) : undefined)
    );

    return row;
  });

  downloadXlsx(
    `${(project?.name ?? 'Project').replace(/\s+/g, '_')}_Counselor_Chart_Report`,
    'Project',
    columns,
    rows
  );
};

// ---------------------------------------------------------------------------
// Counselor Feedback Rating report — raw per-question section scores from the
// FEEDBACK_STUDENT / FEEDBACK_PARENT forms, one row per student.
//
// Column code -> real fieldKey, confirmed against PWC-backend's seed data
// (feedbackStudent.ts / feedbackParent.ts, cohort CLASS_9_10) by the backend dev.
// ---------------------------------------------------------------------------
const STUDENT_FIELD_KEYS: [code: string, fieldKey: string][] = [
  ['S-SE1', 'sse_q1'], ['S-SE2', 'sse_q2'], ['S-SE3', 'sse_q3'], ['S-SE4', 'sse_q4'],
  ['S-CD1', 'scd_q1'], ['S-CD2', 'scd_q2'], ['S-CD3', 'scd_q3'], ['S-CD4', 'scd_q4'],
  ['S-OQ1', 'soq_q1'], ['S-OQ2', 'soq_q2'], ['S-OQ3', 'soq_q3'],
  ['S-OS1', 'sos_q1'], ['S-OS2', 'sos_q2'],
  ['S-OF1', 'most_helpful_part'], ['S-OF2', 'could_be_improved'],
];
const PARENT_FIELD_KEYS: [code: string, fieldKey: string][] = [
  ['P-PE1', 'ppe_q1'], ['P-PE2', 'ppe_q2'], ['P-PE3', 'ppe_q3'],
  ['P-CE1', 'pce_q1'], ['P-CE2', 'pce_q2'], ['P-CE3', 'pce_q3'], ['P-CE4', 'pce_q4'],
  ['P-OA1', 'poa_q1'], ['P-OA2', 'poa_q2'], ['P-OA3', 'poa_q3'],
  ['P-DC1', 'pdc_q1'], ['P-DC2', 'pdc_q2'],
  ['P-RC1', 'prc_q1'],
  ['P-OF1', 'most_appreciated'], ['P-OF2', 'improve_suggestion'],
];
const STUDENT_CODES = STUDENT_FIELD_KEYS.map(([code]) => code);
const PARENT_CODES = PARENT_FIELD_KEYS.map(([code]) => code);

export const buildCounselorFeedbackRatingReport = async (
  project: Project | undefined,
  students: ProjectStudentDetail[]
): Promise<void> => {
  const submissions = await Promise.all(
    students.map(s =>
      Promise.all([
        formsService.getSubmission('FEEDBACK_STUDENT', s.id, COHORT).catch(() => null),
        formsService.getSubmission('FEEDBACK_PARENT', s.id, COHORT).catch(() => null),
      ])
    )
  );

  const columns: XlsxHeaderColumn[] = [
    { group: null, header: 'Project Code' },
    { group: null, header: 'Counsellor Code' },
    { group: null, header: 'Student Code' },
    { group: null, header: 'Current Stage' },
    ...STUDENT_CODES.map(c => ({ group: null, header: c })),
    ...PARENT_CODES.map(c => ({ group: null, header: c })),
  ];

  const rows = students.map((student, i) => {
    const [studentForm, parentForm] = submissions[i];
    const studentAnswers = new Map((studentForm?.answers ?? []).map(a => [a.fieldKey, a.answer]));
    const parentAnswers = new Map((parentForm?.answers ?? []).map(a => [a.fieldKey, a.answer]));

    const row: (string | number | null | undefined)[] = [
      project?.code,
      student.counselorId,
      student.studentId || student.id,
      student.stage,
    ];
    STUDENT_FIELD_KEYS.forEach(([, fieldKey]) => {
      row.push(studentAnswers.has(fieldKey) ? formatAnswerValue(studentAnswers.get(fieldKey)) : '—');
    });
    PARENT_FIELD_KEYS.forEach(([, fieldKey]) => {
      row.push(parentAnswers.has(fieldKey) ? formatAnswerValue(parentAnswers.get(fieldKey)) : '—');
    });
    return row;
  });

  downloadXlsx(
    `${(project?.name ?? 'Project').replace(/\s+/g, '_')}_Counselor_Feedback_Rating_Report`,
    'Format',
    columns,
    rows
  );
};
