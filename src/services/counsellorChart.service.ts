import { apiClient } from './api';
import { toTitleCase } from '@/utils';
import {
  CounsellorChartResponse,
  PutCounsellorChartBody,
  AmendMirrorPairBody,
  AssessmentResultRow,
  VALID_SYNTHESIS_NOTE_CODES,
  ChartSection,
  EnrichedTraitScore,
  AssessmentLayer,
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
} from '@/mocks/studentFormChart.mock';

export const counsellorChartService = {
  // GET /counsellor-chart/students/{studentId} — lazily creates an empty chart row
  // server-side if none exists yet, so this never 404s except for an unknown student.
  getChart: async (studentId: string): Promise<CounsellorChartResponse> => {
    const { data } = await apiClient.get<CounsellorChartResponse>(
      `/counsellor-chart/students/${studentId}`
    );
    return data;
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

// Raw pre-counselling answers are `unknown` JSON on the backend (shape varies per
// fieldKey — block/table/plain string) — render something readable rather than
// requiring per-fieldKey narrowing for every one of the ~30 question types.
const formatChartAnswer = (value: unknown): string => {
  if (value === null || value === undefined || value === '') return 'NA';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return 'NA';
    if (value.every(v => typeof v === 'string' || typeof v === 'number')) {
      return value.join(', ');
    }
    return value.map(formatChartAnswer).join('; ');
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>).filter(
      ([, v]) => v !== null && v !== undefined && v !== ''
    );
    if (entries.length === 0) return 'NA';
    return entries.map(([k, v]) => `${toTitleCase(k)}: ${formatChartAnswer(v)}`).join(', ');
  }
  return String(value);
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
    groups.get(p.group)!.push({
      id: p.code,
      code: p.code,
      parameter: p.label,
      studentResponse: formatChartAnswer(p.student),
      parentResponse: formatChartAnswer(p.parent),
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

  const streamFitTable: StreamFitItem[] = (report?.streamFit.top3 ?? []).map((sf, i) => ({
    id: `sf-${i}`,
    mainStream: sf.mainStream,
    subStream: sf.subStream,
    coreSubjects: sf.coreSubjects ?? '',
    electives: sf.electiveSubjects ?? '',
    explanation: sf.explanation ?? '',
    gradingLevel: sf.level,
    meaning: sf.meaning,
  }));

  const graduationTable: GraduationItem[] = (report?.graduationPathways.top3 ?? []).map((gf, i) => ({
    id: `gr-${i}`,
    cluster: gf.clusterHead ?? '',
    mainStream: gf.mainStream,
    subStream: gf.subStream,
    specialization: gf.specialisations ?? '',
    reasoning: gf.explanation ?? '',
    keyExams: gf.keyExams ?? '',
  }));

  const careerCompassClusterTable: CareerCompassClusterItem[] = (
    report?.careerFit?.top3Industries ?? []
  ).map((ind, i) => ({
    id: `ccc-${i}`,
    cluster: ind.cluster,
    industry: ind.industry,
    domain: ind.domain,
    streamRequirement: '',
    gradingLevel: ind.level,
    meaning: ind.meaning,
  }));

  const careerCompassTable: CareerCompassItem[] = (report?.careerFit?.top6Domains ?? []).map(
    (d, i) => ({
      id: `cc-${i}`,
      domain: d.domain,
      role: d.representativeCareer?.jobRole ?? '',
      whyItFits: d.representativeCareer?.oneLineDescription ?? '',
      topEmployers: (d.representativeCareer?.topCompanies ?? []).join(', '),
      aiResilience: d.representativeCareer
        ? `${toTitleCase(d.representativeCareer.aiResilienceGrade)}. ${d.representativeCareer.aiResilienceComment}`
        : '',
      salaryIndia: d.representativeCareer?.salaryIndiaRangeText ?? '',
      salaryAbroad: d.representativeCareer?.salaryGlobalRangeText ?? '',
    })
  );

  const reliabilityIndicators: ReliabilityCardData[] = [
    {
      code: 'EIM',
      name: 'Engagement Integrity Measure',
      guidingQuestion: 'How consistent were your personality answers?',
      valueStatus: report ? `${report.reliability.rvs.score}% ${report.reliability.rvs.level}` : 'Not yet assessed',
      explanationText: report?.reliability.rvs.meaning ?? 'Assessment not yet submitted.',
    },
    {
      code: 'ACI',
      name: 'Aptitude Test Coherence Index',
      guidingQuestion: 'How logically did aptitude answers progress?',
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
      code: 'AAI',
      name: 'Aptitude Accuracy Indicator',
      guidingQuestion: "How many questions were marked 'Not Sure'?",
      valueStatus: report
        ? `${(100 - report.reliability.aci.dkPercent).toFixed(0)}% ${report.reliability.aci.level}`
        : 'Not yet assessed',
      explanationText: report?.reliability.aci.meaning ?? 'Assessment not yet submitted.',
    },
    {
      code: 'HRS',
      name: 'Holistic Reliability Score',
      guidingQuestion: 'Was the completion pace psychologically normal?',
      valueStatus: report
        ? `${report.reliability.ori.completionMinutes} min · ${report.reliability.ori.level}`
        : 'Not yet assessed',
      explanationText: report?.reliability.ori.meaning ?? 'Assessment not yet submitted.',
    },
  ];

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
        careerStyle: report?.dominantCareerStyle.style ?? 'Not yet assessed',
        personalSignature: report?.dominantPersonalityStyle.style ?? 'Not yet assessed',
        thinkingMode: thinkingModeTrait?.traitName ?? 'Not yet assessed',
      },
      redFlags: {
        riasec: report?.riasec.flags.join(', ') || 'No red flags detected',
        bigFive: report?.bigFive.flags.join(', ') || 'No red flags detected',
        cogDec: report?.cognitive.flags.join(', ') || 'No red flags detected',
        aptitude: report?.aptitude.flags.join(', ') || 'No red flags detected',
      },
      careerDnaNarrative: {
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
      whyThisStream1: '',
      synthesisNotesE: { E1: noteFor('E1'), E2: noteFor('E2'), E3: noteFor('E3'), E4: noteFor('E4'), E5: noteFor('E5'), E6: noteFor('E6') },
      graduationTable,
      whyThisStream2: '',
      // No backend field for a 3rd (graduation-fit) synthesis note group — F1-F3 is
      // reserved for the Reliability step (see Step4SectionD). Kept local-only.
      synthesisNotesF: emptyNotesFor(['F1', 'F2', 'F3', 'F4', 'F5', 'F6']),
      entranceExamsTable: [],
      collegesTable: [],
      careerCompassClusterTable,
      careerCompassTable,
    },
    sectionD: {
      indicators: reliabilityIndicators,
      synthesisNotes: { F1: noteFor('F1'), F2: noteFor('F2'), F3: noteFor('F3') },
    },
    sectionE: {
      // No backend field for the roadmap grid yet — starts blank, edits stay local-only.
      roadmapGrid: {
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
    summaryStrip: { careerStyle: '', personalSignature: '', thinkingMode: '' },
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
  },
  sectionD: { indicators: [], synthesisNotes: emptyNotesFor(['F1', 'F2', 'F3']) },
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

// Gathers everything the current UI can actually persist back into one PUT body —
// only fields the backend schema supports; anything else (roadmap grid, DNA
// narrative, why-this-stream text, entrance exams/colleges tables) has no server
// slot yet and stays session-local, same as before integration.
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
  const notes = Object.entries(allNotes)
    .filter(([code, body]) => VALID_SYNTHESIS_NOTE_CODES.has(code) && body.trim().length > 0)
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
    ...(lastEditedBy ? { lastEditedBy } : {}),
  };
};
