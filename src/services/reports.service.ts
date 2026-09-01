import { apiClient } from './api';
import { formatDate, toTitleCase } from '@/utils';
import {
  AssessmentLayer,
  EnrichedTraitScore,
  LayerReport,
  DominantCareerStyle,
  DominantPersonalityStyle,
  StreamFitResult,
  GraduationFitResult,
  CareerFitResult,
  AriResult,
  AciResult,
  OriResult,
  RvsResult,
} from '@/types/counsellorChart.types';
import {
  StudentCareerIkigaiReportData,
  TraitMapItem,
  ReliabilityMetric,
  StreamFitItem,
  GraduationPathwayItem,
  CareerRecommendationCard,
} from '@/types/studentIkigaiReport.types';

// GET /api/v1/reports/students/{studentId}/assessment response shape — see
// assembleStudentAssessmentReport in PWC-backend/src/modules/reports/reports.service.ts.
// 404 until the student has a computed assessment result.
interface ApiStudentAssessmentReport {
  student: {
    id: string;
    name: string;
    studentCode: string;
    institute: string;
    class: string;
    division: string;
  };
  championProfile: {
    dominantCareerStyle: DominantCareerStyle;
    dominantPersonalityStyle: DominantPersonalityStyle;
  };
  traitMap: {
    traitScores: Record<string, number>;
    riasec: LayerReport;
    bigFive: LayerReport;
    aptitude: LayerReport;
    cognitive: LayerReport;
  };
  careerCompass: CareerFitResult | null;
  streamFit: StreamFitResult;
  graduationPathways: GraduationFitResult;
  reliability: {
    ari: AriResult;
    aci: AciResult;
    ori: OriResult;
    rvs: RvsResult;
  };
  counsellorNarrative: {
    strengths: string[];
    hobbies: string[];
  } | null;
  meta: {
    generatedAt: string;
  };
}

const LAYER_LABEL: Record<AssessmentLayer, string> = {
  RIASEC: 'RIASEC',
  BIG_FIVE: 'BIG Five',
  APTITUDE: 'Aptitude',
  COGNITIVE: 'Cognitive & Decision',
};

const toTraitRow = (s: EnrichedTraitScore, no: number): TraitMapItem => ({
  no,
  layerTrait: `${LAYER_LABEL[s.layer]} - ${toTitleCase(s.trait)}`,
  traitName: s.traitName,
  whatItMeasures: s.description,
  grade: s.level,
  gradeMeaning: s.levelMeaning,
});

const mapReport = (
  api: ApiStudentAssessmentReport,
  counselorName: string
): StudentCareerIkigaiReportData => {
  const { dominantCareerStyle: dcs, dominantPersonalityStyle: dps } = api.championProfile;

  const traitMap: TraitMapItem[] = [
    ...api.traitMap.riasec.scores,
    ...api.traitMap.bigFive.scores,
    ...api.traitMap.cognitive.scores,
    ...api.traitMap.aptitude.scores,
  ].map((s, i) => toTraitRow(s, i + 1));

  const reliability: ReliabilityMetric[] = [
    {
      code: 'EIM',
      name: 'Engagement Integrity Measure',
      score: `${api.reliability.rvs.score}%`,
      status: api.reliability.rvs.level,
      guidance: api.reliability.rvs.meaning,
    },
    {
      code: 'ACI',
      name: 'Aptitude Test Coherence Index',
      score: api.reliability.ari.ari
        ? `${api.reliability.ari.ari.score}%`
        : `${api.reliability.ari.dc}%`,
      status: api.reliability.ari.ari?.level ?? 'Pending Timing Data',
      guidance:
        api.reliability.ari.ari?.meaning ??
        'Full coherence score needs per-question timing data, not yet collected for this attempt.',
    },
    {
      code: 'AAI',
      name: 'Aptitude Accuracy Indicator',
      score: `${(100 - api.reliability.aci.dkPercent).toFixed(0)}%`,
      status: api.reliability.aci.level,
      guidance: api.reliability.aci.meaning,
    },
    {
      code: 'HRS',
      name: 'Holistic Reliability Score',
      score: `${api.reliability.ori.completionMinutes} min`,
      status: api.reliability.ori.level,
      guidance: api.reliability.ori.meaning,
    },
  ];

  const streamFitTable: StreamFitItem[] = api.streamFit.top3.map((sf, i) => ({
    id: `sf-${i}`,
    mainStream: sf.mainStream,
    subStream: sf.subStream,
    coreSubjects: sf.coreSubjects ?? '',
    electives: sf.electiveSubjects ?? '',
  }));
  const whyTheseStreams =
    api.streamFit.top3
      .map(sf => sf.explanation)
      .filter(Boolean)
      .join(' ') || 'Stream fit explanation not yet available.';

  const pathways: GraduationPathwayItem[] = api.graduationPathways.top3.map((gf, i) => ({
    id: `gp-${i}`,
    cluster: gf.clusterHead ?? gf.mainStream,
    degree: gf.subStream,
    specialisations: gf.specialisations ?? '',
    keyExams: gf.keyExams ?? '',
  }));

  const careerCompass: CareerRecommendationCard[] = (api.careerCompass?.top6Domains ?? [])
    .filter(d => d.representativeCareer)
    .map((d, i) => {
      const rc = d.representativeCareer!;
      return {
        id: `cc-${i}`,
        role: rc.jobRole,
        cluster: d.cluster,
        industry: d.industry,
        domain: d.domain,
        whyItFits: rc.oneLineDescription,
        topEmployers: rc.topCompanies.join(', '),
        aiResilience: `${toTitleCase(rc.aiResilienceGrade)} — ${rc.aiResilienceComment}`,
        salaryIndia: rc.salaryIndiaRangeText ?? 'Not available',
        salaryAbroad: rc.salaryGlobalRangeText ?? 'Not available',
      };
    });

  return {
    studentInfo: {
      studentName: api.student.name,
      studentId: api.student.studentCode,
      gradeClass: [api.student.class, api.student.division].filter(Boolean).join(' - '),
      schoolName: api.student.institute,
      counselorName,
      reportDate: formatDate(api.meta.generatedAt),
    },
    studentProfile: {
      archetype: `${dcs.style} · ${dps.style}`,
      snapshotSummary: `${dcs.explanation} ${dps.explanation}`.trim(),
      coreStrengths: api.counsellorNarrative?.strengths ?? [],
      hobbies: api.counsellorNarrative?.hobbies ?? [],
    },
    traitMap,
    reliability,
    streamFit: { table: streamFitTable, whyTheseStreams },
    graduation: { pathways },
    careerCompass,
  };
};

export const reportsService = {
  // GET /reports/students/{studentId}/assessment
  getStudentAssessmentReport: async (
    studentId: string,
    counselorName: string
  ): Promise<StudentCareerIkigaiReportData> => {
    const { data } = await apiClient.get<ApiStudentAssessmentReport>(
      `/reports/students/${studentId}/assessment`
    );
    return mapReport(data, counselorName);
  },
};
