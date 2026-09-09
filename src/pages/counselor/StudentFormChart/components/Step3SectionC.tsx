import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { RiAddLine, RiDeleteBinLine } from 'react-icons/ri';
import {
  CounsellorFormChartData,
  StreamFitItem,
  GraduationItem,
  CareerCompassItem,
  EntranceExamItem,
  CollegesAfterItem,
  CareerCompassClusterItem,
} from '@/mocks/studentFormChart.mock';
import { Tooltip } from '@/components/Tooltip';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { SelectOption } from '@/components/Select';
import { useToast } from '@/hooks';
import { careerService } from '@/services/career.service';
import { assessmentService } from '@/services/assessment.service';
import { fitKey } from '@/services/counsellorChart.service';

import { ComparisonTable } from './ComparisonTable';
import { SynthesisNotesPanel } from './SynthesisNotesPanel';
import { AddRowModal, AddRowFieldConfig } from './AddRowModal';
import {
  StepHeaderCard,
  StepHeaderTitle,
  SectionBlock,
  SectionBlockTitle,
  CompTableContainer,
  CompTableHeaderRow,
  CompTableHeaderCell,
  CompDataRow,
  CompParamCell,
  CompResponseCell,
  RowActionsCell,
  RowDeleteButton,
  StreamFitTableContainer,
  StreamFitTableHeaderRow,
  StreamFitTableHeaderCell,
  StreamFitDataRow,
  StreamFitCell,
} from '../StudentFormChartPage.styles';

interface Step3SectionCProps {
  studentId: string;
  data: CounsellorFormChartData['sectionC'];
  onChangeNotesPre: (code: string, value: string) => void;
  onChangeStreamTable?: (table: StreamFitItem[]) => void;
  onChangeWhyStream1?: (value: string) => void;
  onChangeNotesE: (code: string, value: string) => void;
  onChangeGraduationTable: (table: GraduationItem[]) => void;
  onChangeNotesF: (code: string, value: string) => void;
  onChangeEntranceExamsTable: (table: EntranceExamItem[]) => void;
  onChangeCollegesTable: (table: CollegesAfterItem[]) => void;
  onChangeCompassClusterTable: (table: CareerCompassClusterItem[]) => void;
  onChangeCompassTable: (table: CareerCompassItem[]) => void;
}

const synthesisRowsPreDef = [
  {
    code: 'D1',
    placeholder:
      "Career Goal Alignment : Compare the student's stated goal (1.1) with the parent's preferred path (1.1 parent column); note whether they match, partially match, or diverge.",
  },
  {
    code: 'D2',
    placeholder:
      'Motivation Driver : Compare the underlying reason for interest on both sides (1.2) - passion, stability, prestige, earning potential and note if student and parent are optimising for the same thing.',
  },
  {
    code: 'D3',
    placeholder:
      "Influencer Mapping : Note who is shaping the student's career thinking (2.1) and how well the parent actually understands the student's interests (2.2); flag if an external influencer is dominating over self-driven interest.",
  },
  {
    code: 'D4',
    placeholder:
      "Openness Check : Compare the parent's stated openness to unconventional careers (3.1) against what the assessment is likely to recommend; flag early if a mismatch is expected so the session can address it directly.",
  },
  {
    code: 'D5',
    placeholder:
      'Practical Constraints : Capture financial, relocation, and decision-ownership constraints (3.2–3.6) that must shape a realistic roadmap, plus any specific concern (3.7–3.8) to raise carefully with the family.',
  },
];

const synthesisRowsEDef = [
  {
    code: 'E1',
    placeholder:
      "Student alignment - compare the recommended stream against the student's stated career interest (1.1); note if the recommendation confirms, refines, or challenges what the student already believes.",
  },
  {
    code: 'E2',
    placeholder:
      "Parent alignment - compare the recommended stream against the parent's preferred path (1.1 parent column); flag if this needs careful framing given the parent's stance on unconventional paths (3.1).",
  },
  {
    code: 'E3',
    placeholder:
      "Skill gap to bridge - note any subject/skill gap (e.g. Numerical Reasoning) that should be actively worked on if the chosen stream differs from the student's current strongest academic area.",
  },
  {
    code: 'E4',
    placeholder:
      "Constraint cross-check - weigh these degree options against the parent's financial and relocation constraints (3.2–3.4); flag any option that may not be practically viable.",
  },
  {
    code: 'E5',
    placeholder:
      'Exam-prep timeline - note if any of the listed Key Exams need preparation to start as early as Class 11, and build this into the roadmap.',
  },
  {
    code: 'E6',
    placeholder:
      "Goal cross-check - compare the student's stated career goal (1.1) with the actual Career Compass output below; note whether this confirms the goal or opens a new direction worth discussing.",
  },
];

const synthesisRowsFDef = [
  {
    code: 'F1',
    placeholder:
      "Student alignment : Compare the recommended stream against the student's stated career interest (1.1); note if the recommendation confirms, refines, or challenges what the student already believes.",
  },
  {
    code: 'F2',
    placeholder:
      "Parent alignment : Compare the recommended stream against the parent's preferred path (1.1 parent column); flag if this needs careful framing given the parent's stance on unconventional paths (3.1).",
  },
  {
    code: 'F3',
    placeholder:
      "Skill gap to bridge : Note any subject/skill gap (e.g. Numerical Reasoning) that should be actively worked on if the chosen stream differs from the student's current strongest academic area.",
  },
  {
    code: 'F4',
    placeholder:
      "Constraint cross-check : Weigh these degree options against the parent's financial and relocation constraints (3.2–3.4); flag any option that may not be practically viable.",
  },
  {
    code: 'F5',
    placeholder:
      'Exam-prep timeline : Note if any of the listed Key Exams need preparation to start as early as Class 11, and build this into the roadmap.',
  },
  {
    code: 'F6',
    placeholder:
      "Goal cross-check : Compare the student's stated career goal (1.1) with the actual Career Compass output below; note whether this confirms the goal or opens a new direction worth discussing.",
  },
];

// Every counsellor-editable Career Compass table on this step, keyed for the shared
// add/delete modal plumbing below.
type TableKey =
  | 'cluster'
  | 'targetRole'
  | 'streamFit'
  | 'graduation'
  | 'colleges'
  | 'entranceExam';

const MAX_ROWS: Record<TableKey, number> = {
  cluster: 3,
  targetRole: 6,
  streamFit: 2,
  graduation: 3,
  colleges: 6,
  entranceExam: 6,
};

const ManualBadge: React.FC = () => <Badge variant="warning">Manual Entry</Badge>;

export const Step3SectionC: React.FC<Step3SectionCProps> = ({
  studentId: _studentId,
  data,
  onChangeNotesPre,
  onChangeStreamTable,
  onChangeNotesE,
  onChangeGraduationTable,
  onChangeNotesF,
  onChangeEntranceExamsTable,
  onChangeCollegesTable,
  onChangeCompassClusterTable,
  onChangeCompassTable,
}) => {
  const toast = useToast();

  const [activeAddTable, setActiveAddTable] = useState<TableKey | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ table: TableKey; id: string } | null>(null);
  // Drives the Target Role dropdown, which is scoped to whichever Domain was picked
  // first in the same "Add Target Role" popup.
  const [targetRoleDomainId, setTargetRoleDomainId] = useState('');
  // Scope the Stream Fit / Graduation Fit Sub-Stream dropdown to whichever Main Stream
  // was picked first in the same popup (same two-level pattern as Domain → Target Role).
  const [streamFitMainStream, setStreamFitMainStream] = useState('');
  const [graduationMainStream, setGraduationMainStream] = useState('');

  const { data: clusters = [] } = useQuery({
    queryKey: ['career-clusters-all'],
    queryFn: () => careerService.getClusters(),
    staleTime: 5 * 60 * 1000,
  });
  const { data: domains = [] } = useQuery({
    queryKey: ['career-domains-all'],
    queryFn: () => careerService.getDomains(),
    staleTime: 5 * 60 * 1000,
  });
  const { data: targetRoleOptions = [], isFetching: isLoadingTargetRoles } = useQuery({
    queryKey: ['career-job-roles', targetRoleDomainId],
    queryFn: () => careerService.getJobRoles(targetRoleDomainId),
    enabled: Boolean(targetRoleDomainId),
    staleTime: 60_000,
  });
  const { data: streamWeights = [] } = useQuery({
    queryKey: ['assessment-stream-weights'],
    queryFn: () => assessmentService.getStreamWeights(),
    staleTime: 5 * 60 * 1000,
  });
  const { data: graduateStreamWeights = [] } = useQuery({
    queryKey: ['assessment-graduate-stream-weights'],
    queryFn: () => assessmentService.getGraduateStreamWeights(),
    staleTime: 5 * 60 * 1000,
  });

  // Target Role's Domain picker is scoped to the industries the assessment already
  // surfaced in the Career Compass (Indicative Clusters) table above — falls back to
  // the full domain list if that table is empty so the picker never bricks.
  const compassClusterIndustries = new Set(
    (data.careerCompassClusterTable || []).map(r => r.industry).filter(Boolean)
  );
  const domainsForTargetRole =
    compassClusterIndustries.size > 0
      ? domains.filter(d => compassClusterIndustries.has(d.industryName))
      : domains;
  const domainSelectOptions: SelectOption[] = domainsForTargetRole.map(d => ({
    value: d.id,
    label: `${d.name} (${d.industryName})`,
  }));
  const clusterSelectOptions: SelectOption[] = clusters.map(c => ({ value: c.name, label: c.name }));
  const streamFitMainStreamOptions: SelectOption[] = Array.from(
    new Set(streamWeights.map(s => s.mainStream))
  ).map(m => ({ value: m, label: m }));
  const streamFitSubStreamOptions: SelectOption[] = streamWeights
    .filter(s => s.mainStream === streamFitMainStream)
    .map(s => ({ value: s.id, label: s.subStream }));
  const graduationMainStreamOptions: SelectOption[] = Array.from(
    new Set(graduateStreamWeights.map(g => g.mainStream))
  ).map(m => ({ value: m, label: m }));
  const graduationSubStreamOptions: SelectOption[] = graduateStreamWeights
    .filter(g => g.mainStream === graduationMainStream)
    .map(g => ({ value: g.id, label: g.subStream }));

  const closeAddModal = () => {
    setActiveAddTable(null);
    setTargetRoleDomainId('');
    setStreamFitMainStream('');
    setGraduationMainStream('');
  };

  const handleAddRow = (values: Record<string, string>, isManualEntry: boolean) => {
    const table = activeAddTable;
    if (!table) return;

    // Assessment-scored tables carry a natural-key lookup (`data.fitScoreLookup`) built
    // from the full ranked assessment output — not just the top N shown by default —
    // so a role/stream/domain picked from the career library gets scored immediately,
    // the same score it would be re-attached with on the next chart load. A manual free-
    // text entry (or one the assessment never scored) simply gets no match, and the
    // table shows "—" for it, same as today.
    const lookup = data.fitScoreLookup;

    switch (table) {
      case 'cluster': {
        const fitScore =
          lookup?.industry[fitKey(values.cluster, values.industry, values.domain)] ?? undefined;
        const row: CareerCompassClusterItem = {
          id: `ccc-${Date.now()}`,
          cluster: values.cluster || '',
          industry: values.industry || '',
          domain: values.domain || '',
          streamRequirement: values.streamRequirement || '',
          gradingLevel: values.gradingLevel || '',
          meaning: values.meaning || '',
          fitScore: fitScore ?? undefined,
          isManualEntry,
        };
        onChangeCompassClusterTable([...(data.careerCompassClusterTable || []), row]);
        break;
      }
      case 'targetRole': {
        const fitScore = lookup?.domain[fitKey(values.domain)] ?? undefined;
        const row: CareerCompassItem = {
          id: `cc-${Date.now()}`,
          domain: values.domain || '',
          role: values.role || '',
          whyItFits: values.whyItFits || '',
          topEmployers: values.topEmployers || '',
          aiResilience: values.aiResilience || '',
          salaryIndia: values.salaryIndia || '',
          salaryAbroad: values.salaryAbroad || '',
          fitScore: fitScore ?? undefined,
          isManualEntry,
        };
        onChangeCompassTable([...data.careerCompassTable, row]);
        break;
      }
      case 'streamFit': {
        const fitScore = lookup?.stream[fitKey(values.mainStream, values.subStream)] ?? undefined;
        const row: StreamFitItem = {
          id: `sf-${Date.now()}`,
          mainStream: values.mainStream || '',
          subStream: values.subStream || '',
          coreSubjects: values.coreSubjects || '',
          electives: values.electives || '',
          explanation: values.explanation || '',
          fitScore: fitScore ?? undefined,
          isManualEntry,
        };
        onChangeStreamTable?.([...data.streamFitTable, row]);
        break;
      }
      case 'graduation': {
        const fitScore =
          lookup?.graduation[fitKey(values.cluster, values.mainStream, values.subStream)] ??
          undefined;
        const row: GraduationItem = {
          id: `gr-${Date.now()}`,
          cluster: values.cluster || '',
          mainStream: values.mainStream || '',
          subStream: values.subStream || '',
          specialization: values.specialization || '',
          reasoning: values.reasoning || '',
          keyExams: values.keyExams || '',
          fitScore: fitScore ?? undefined,
          isManualEntry,
        };
        onChangeGraduationTable([...data.graduationTable, row]);
        break;
      }
      case 'colleges': {
        const row: CollegesAfterItem = {
          id: `col-${Date.now()}`,
          collegeName: values.collegeName || '',
          location: values.location || '',
          type: values.type || '',
          course: values.course || '',
          entranceExam: values.entranceExam || '',
          ranking: values.ranking || '',
          website: values.website || '',
          isManualEntry,
        };
        onChangeCollegesTable([...(data.collegesTable || []), row]);
        break;
      }
      case 'entranceExam': {
        const row: EntranceExamItem = {
          id: `ee-${Date.now()}`,
          fullName: values.fullName || '',
          conductingBody: values.conductingBody || '',
          level: values.level || '',
          applicableFor: values.applicableFor || '',
          subjectRequirements: values.subjectRequirements || '',
          examMonth: values.examMonth || '',
          urlLink: values.urlLink || '',
          isManualEntry,
        };
        onChangeEntranceExamsTable([...(data.entranceExamsTable || []), row]);
        break;
      }
    }

    toast.success('Row Added', isManualEntry ? 'Manual entry added and flagged for review.' : 'Row added.');
    closeAddModal();
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    const { table, id } = deleteTarget;

    switch (table) {
      case 'cluster':
        onChangeCompassClusterTable((data.careerCompassClusterTable || []).filter(r => r.id !== id));
        break;
      case 'targetRole':
        onChangeCompassTable(data.careerCompassTable.filter(r => r.id !== id));
        break;
      case 'streamFit':
        onChangeStreamTable?.(data.streamFitTable.filter(r => r.id !== id));
        break;
      case 'graduation':
        onChangeGraduationTable(data.graduationTable.filter(r => r.id !== id));
        break;
      case 'colleges':
        onChangeCollegesTable((data.collegesTable || []).filter(r => r.id !== id));
        break;
      case 'entranceExam':
        onChangeEntranceExamsTable((data.entranceExamsTable || []).filter(r => r.id !== id));
        break;
    }
    toast.success('Row Removed', 'The row was removed from this report.');
    setDeleteTarget(null);
  };

  const getFieldsForTable = (table: TableKey): AddRowFieldConfig[] => {
    switch (table) {
      case 'cluster':
        return [
          { key: 'cluster', label: 'Cluster', dbSource: { options: clusterSelectOptions } },
          { key: 'industry', label: 'Industry' },
          { key: 'domain', label: 'Domain' },
          { key: 'streamRequirement', label: 'Stream Requirement' },
          { key: 'gradingLevel', label: 'Grading Level' },
          { key: 'meaning', label: 'Meaning', multiline: true },
        ];
      case 'targetRole':
        return [
          {
            key: 'domain',
            label: 'Domain',
            dbSource: {
              options: domainSelectOptions,
              onSelect: (value, setValue) => {
                setTargetRoleDomainId(value);
                const dom = domains.find(d => d.id === value);
                if (dom) setValue('domain', dom.name);
              },
            },
          },
          {
            key: 'role',
            label: 'Target Role',
            dbSource: {
              options: targetRoleOptions.map(r => ({ value: r.id, label: r.jobRole })),
              isLoading: isLoadingTargetRoles,
              onSelect: (value, setValue) => {
                const role = targetRoleOptions.find(r => r.id === value);
                if (!role) return;
                setValue('role', role.jobRole);
                setValue('whyItFits', role.oneLineDescription || '');
                setValue('topEmployers', (role.topCompaniesRecruiting || []).join(', '));
                setValue('aiResilience', role.aiResilienceGrading || '');
                setValue('salaryIndia', role.approxSalaryRangeIndia || '');
                setValue('salaryAbroad', role.globalSalaryRange || '');
              },
            },
          },
          { key: 'whyItFits', label: 'Why It Fits', multiline: true, derivedOnly: true },
          { key: 'topEmployers', label: 'Top Employers', derivedOnly: true },
          { key: 'aiResilience', label: 'AI Resilience', derivedOnly: true },
          { key: 'salaryIndia', label: 'Salary (India)', derivedOnly: true },
          { key: 'salaryAbroad', label: 'Salary (Abroad)', derivedOnly: true },
        ];
      case 'streamFit':
        return [
          {
            key: 'mainStream',
            label: 'Main Stream',
            dbSource: {
              options: streamFitMainStreamOptions,
              onSelect: (value, setValue) => {
                setStreamFitMainStream(value);
                setValue('subStream', '');
                setValue('coreSubjects', '');
                setValue('electives', '');
                setValue('explanation', '');
              },
            },
          },
          {
            key: 'subStream',
            label: 'Sub-Streams',
            dbSource: {
              options: streamFitSubStreamOptions,
              onSelect: (value, setValue) => {
                const row = streamWeights.find(s => s.id === value);
                if (!row) return;
                setValue('subStream', row.subStream);
                setValue('coreSubjects', row.coreSubjects || '');
                setValue('electives', row.electiveSubjects || '');
                setValue('explanation', row.explanation || '');
              },
            },
          },
          { key: 'coreSubjects', label: 'Core Subjects Usually Offered', multiline: true, derivedOnly: true },
          { key: 'electives', label: 'Optional / Elective Subjects', multiline: true, derivedOnly: true },
          {
            key: 'explanation',
            label: 'Student & Parent-Friendly Explanation',
            multiline: true,
            derivedOnly: true,
          },
        ];
      case 'graduation':
        return [
          {
            key: 'mainStream',
            label: 'Main Stream',
            dbSource: {
              options: graduationMainStreamOptions,
              onSelect: (value, setValue) => {
                setGraduationMainStream(value);
                setValue('subStream', '');
                setValue('cluster', '');
                setValue('specialization', '');
                setValue('reasoning', '');
                setValue('keyExams', '');
              },
            },
          },
          {
            key: 'subStream',
            label: 'Sub-Stream',
            dbSource: {
              options: graduationSubStreamOptions,
              onSelect: (value, setValue) => {
                const row = graduateStreamWeights.find(g => g.id === value);
                if (!row) return;
                setValue('subStream', row.subStream);
                setValue('cluster', row.clusterHead || '');
                setValue('specialization', row.specialisations || '');
                setValue('reasoning', row.explanation || '');
                setValue('keyExams', row.keyExams || '');
              },
            },
          },
          { key: 'cluster', label: 'Cluster', derivedOnly: true },
          { key: 'specialization', label: 'Specialization', derivedOnly: true },
          { key: 'reasoning', label: 'Reasoning', multiline: true, derivedOnly: true },
          { key: 'keyExams', label: 'Key Exams', derivedOnly: true },
        ];
      case 'colleges':
        // Colleges are always added as free-text manual entries now — the career-library
        // typeahead was surfacing a stale/partial subset of the canonical institution list,
        // so every add is treated as manual and flagged for Super Admin review instead.
        return [
          { key: 'collegeName', label: 'College Name' },
          { key: 'location', label: 'Location' },
          { key: 'type', label: 'Type' },
          { key: 'course', label: 'Course' },
          { key: 'entranceExam', label: 'Entrance Exam' },
          { key: 'ranking', label: 'Ranking' },
          { key: 'website', label: 'Website' },
        ];
      case 'entranceExam':
        // Same as Colleges above — always free-text manual entry, flagged for review.
        return [
          { key: 'fullName', label: 'Exam Name' },
          { key: 'conductingBody', label: 'Conducting Body' },
          { key: 'level', label: 'Level' },
          { key: 'applicableFor', label: 'Applicable For' },
          { key: 'subjectRequirements', label: 'Subject Requirements', multiline: true },
          { key: 'examMonth', label: 'Exam Month' },
          { key: 'urlLink', label: 'Website' },
        ];
    }
  };

  const modalTitles: Record<TableKey, string> = {
    cluster: 'Add Indicative Cluster',
    targetRole: 'Add Target Role',
    streamFit: 'Add Stream Fit Row',
    graduation: 'Add Graduation Fit Row',
    colleges: 'Add College',
    entranceExam: 'Add Entrance Exam',
  };

  // A section title with an "+ Add" button on the right — used by every editable
  // table below except Career Compass (Indicative Clusters), which stays add-only via
  // the assessment (counsellors may still delete a row from it).
  const TableHeader: React.FC<{ title: string; table?: TableKey; count: number }> = ({
    title,
    table,
    count,
  }) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
      }}
    >
      <SectionBlockTitle style={{ marginBottom: 0 }}>{title}</SectionBlockTitle>
      {table && count < MAX_ROWS[table] && (
        <Button leftIcon={<RiAddLine size={18} />} onClick={() => setActiveAddTable(table)}>
          Add
        </Button>
      )}
    </div>
  );

  const clusterRows = (data.careerCompassClusterTable || []).slice(0, MAX_ROWS.cluster);
  const targetRoleRows = data.careerCompassTable;
  const streamFitRows = data.streamFitTable.slice(0, MAX_ROWS.streamFit);
  const graduationRows = data.graduationTable;
  const collegesRows = data.collegesTable || [];
  const entranceExamRows = data.entranceExamsTable || [];

  return (
    <>
      <StepHeaderCard>
        <StepHeaderTitle>Setting the Compass – Career Direction</StepHeaderTitle>
      </StepHeaderCard>

      {/* Sub-Block 1: Pre-Counselling View */}
      <SectionBlock id="sec-c-pre-counselling">
        <SectionBlockTitle>Pre-Counselling View — Career Clarity & Awareness</SectionBlockTitle>
        <ComparisonTable groups={data.comparisonGroups} />
      </SectionBlock>

      <SynthesisNotesPanel
        title="Counsellor Synthesis Notes"
        rows={synthesisRowsPreDef}
        notes={data.synthesisNotesPre}
        onChangeNote={onChangeNotesPre}
      />

      {/* Career Compass Cluster Table — assessment-derived; no "+" here, but a
          counsellor can still remove a row that doesn't fit. */}
      <div style={{ marginTop: '20px' }}>
        <TableHeader title="Career Compass (Indicative Clusters)" count={clusterRows.length} />
        <CompTableContainer style={{ overflowX: 'auto' }}>
          <CompTableHeaderRow
            style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr 120px 1fr 100px 40px', minWidth: '1040px' }}
          >
            <CompTableHeaderCell>Cluster</CompTableHeaderCell>
            <CompTableHeaderCell>Industry</CompTableHeaderCell>
            <CompTableHeaderCell>Domain</CompTableHeaderCell>
            <CompTableHeaderCell>Stream Requirement</CompTableHeaderCell>
            <CompTableHeaderCell>Grading Level</CompTableHeaderCell>
            <CompTableHeaderCell>Meaning</CompTableHeaderCell>
            <CompTableHeaderCell>Fit Score</CompTableHeaderCell>
            <CompTableHeaderCell />
          </CompTableHeaderRow>

          {clusterRows.map(row => (
            <CompDataRow
              key={row.id}
              style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr 120px 1fr 100px 40px', minWidth: '1040px' }}
            >
              <CompParamCell style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
                <span>{row.cluster}</span>
                {row.isManualEntry && <ManualBadge />}
              </CompParamCell>
              <CompResponseCell style={{ borderLeft: 'none' }}>{row.industry}</CompResponseCell>
              <CompResponseCell style={{ borderLeft: 'none' }}>{row.domain}</CompResponseCell>
              <CompResponseCell style={{ borderLeft: 'none' }}>{row.streamRequirement}</CompResponseCell>
              <CompResponseCell style={{ borderLeft: 'none' }}>{row.gradingLevel}</CompResponseCell>
              <CompResponseCell style={{ borderLeft: 'none' }}>{row.meaning}</CompResponseCell>
              <CompResponseCell style={{ borderLeft: 'none' }}>
                {row.fitScore !== undefined ? `${row.fitScore}%` : '—'}
              </CompResponseCell>
              <RowActionsCell>
                <Tooltip content="Delete Row">
                  <RowDeleteButton
                    type="button"
                    onClick={() => setDeleteTarget({ table: 'cluster', id: row.id })}
                  >
                    <RiDeleteBinLine size={14} />
                  </RowDeleteButton>
                </Tooltip>
              </RowActionsCell>
            </CompDataRow>
          ))}
        </CompTableContainer>
      </div>

      {/* Career Compass Job Roles Table */}
      <div id="sec-c-target-roles" style={{ marginTop: '20px' }}>
        <TableHeader
          title="Career Compass (Target Roles & Compensation)"
          table="targetRole"
          count={targetRoleRows.length}
        />
        <div style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '12px' }}>
          All 18 trait scores were matched against the full career domain library.
        </div>
        <CompTableContainer style={{ overflowX: 'auto' }}>
          <CompTableHeaderRow
            style={{
              gridTemplateColumns: '220px 160px 1fr 180px 220px 120px 120px 100px 40px',
              minWidth: '1280px',
            }}
          >
            <CompTableHeaderCell>Domain</CompTableHeaderCell>
            <CompTableHeaderCell>Target Role</CompTableHeaderCell>
            <CompTableHeaderCell>Why It Fits</CompTableHeaderCell>
            <CompTableHeaderCell>Top Employers</CompTableHeaderCell>
            <CompTableHeaderCell>AI Resilience</CompTableHeaderCell>
            <CompTableHeaderCell>Salary (India)</CompTableHeaderCell>
            <CompTableHeaderCell>Salary (Abroad)</CompTableHeaderCell>
            <CompTableHeaderCell>Fit Score</CompTableHeaderCell>
            <CompTableHeaderCell />
          </CompTableHeaderRow>

          {targetRoleRows.map(row => (
            <CompDataRow
              key={row.id}
              style={{
                gridTemplateColumns: '220px 160px 1fr 180px 220px 120px 120px 100px 40px',
                minWidth: '1280px',
              }}
            >
              <CompParamCell style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
                <span>{row.domain}</span>
                {row.isManualEntry && <ManualBadge />}
              </CompParamCell>
              <CompResponseCell style={{ borderLeft: 'none' }}>{row.role}</CompResponseCell>
              <CompResponseCell style={{ borderLeft: 'none' }}>{row.whyItFits}</CompResponseCell>
              <CompResponseCell style={{ borderLeft: 'none' }}>{row.topEmployers}</CompResponseCell>
              <CompResponseCell style={{ borderLeft: 'none' }}>{row.aiResilience}</CompResponseCell>
              <CompResponseCell style={{ borderLeft: 'none' }}>{row.salaryIndia}</CompResponseCell>
              <CompResponseCell style={{ borderLeft: 'none' }}>{row.salaryAbroad}</CompResponseCell>
              <CompResponseCell style={{ borderLeft: 'none' }}>
                {row.fitScore !== undefined ? `${row.fitScore}%` : '—'}
              </CompResponseCell>
              <RowActionsCell>
                <Tooltip content="Delete Row">
                  <RowDeleteButton
                    type="button"
                    onClick={() => setDeleteTarget({ table: 'targetRole', id: row.id })}
                  >
                    <RiDeleteBinLine size={14} />
                  </RowDeleteButton>
                </Tooltip>
              </RowActionsCell>
            </CompDataRow>
          ))}
        </CompTableContainer>
      </div>

      {/* Sub-Block 2: Assessment Result View */}
      <SectionBlock id="sec-c-stream-fit">
        <TableHeader
          title="Assessment Result View — Stream Fit & Pathways"
          table="streamFit"
          count={streamFitRows.length}
        />

        {/* 1. Stream Fit Table */}
        <StreamFitTableContainer>
          <StreamFitTableHeaderRow style={{ gridTemplateColumns: '110px 1.3fr 1.4fr 1.5fr 3fr 100px 40px' }}>
            <StreamFitTableHeaderCell>Main Stream</StreamFitTableHeaderCell>
            <StreamFitTableHeaderCell>Sub-Streams</StreamFitTableHeaderCell>
            <StreamFitTableHeaderCell>Core Subjects Usually Offered</StreamFitTableHeaderCell>
            <StreamFitTableHeaderCell>Optional / Elective Subjects</StreamFitTableHeaderCell>
            <StreamFitTableHeaderCell>Student & Parent-Friendly Explanation</StreamFitTableHeaderCell>
            <StreamFitTableHeaderCell>Fit Score</StreamFitTableHeaderCell>
            <StreamFitTableHeaderCell />
          </StreamFitTableHeaderRow>

          {streamFitRows.map(row => (
            <StreamFitDataRow
              key={row.id}
              style={{ gridTemplateColumns: '110px 1.3fr 1.4fr 1.5fr 3fr 100px 40px' }}
            >
              <StreamFitCell $bold>
                {row.mainStream}
                {row.isManualEntry && (
                  <div style={{ marginTop: 6 }}>
                    <ManualBadge />
                  </div>
                )}
              </StreamFitCell>
              <StreamFitCell $bold>{row.subStream}</StreamFitCell>
              <StreamFitCell>{row.coreSubjects}</StreamFitCell>
              <StreamFitCell>{row.electives}</StreamFitCell>
              <StreamFitCell $secondary>
                {row.explanation || row.meaning || row.streamRequirement}
              </StreamFitCell>
              <StreamFitCell>{row.fitScore !== undefined ? `${row.fitScore}%` : '—'}</StreamFitCell>
              <RowActionsCell>
                <Tooltip content="Delete Row">
                  <RowDeleteButton
                    type="button"
                    onClick={() => setDeleteTarget({ table: 'streamFit', id: row.id })}
                  >
                    <RiDeleteBinLine size={14} />
                  </RowDeleteButton>
                </Tooltip>
              </RowActionsCell>
            </StreamFitDataRow>
          ))}
        </StreamFitTableContainer>

        {/* Synthesis Notes E1–E6 */}
        <SynthesisNotesPanel
          title="Counsellor Synthesis Notes"
          rows={synthesisRowsEDef}
          notes={data.synthesisNotesE}
          onChangeNote={onChangeNotesE}
        />

        {/* 2. Graduation Table */}
        <div id="sec-c-graduation-fit" style={{ marginTop: '20px' }}>
          <TableHeader title="Graduation Fit" table="graduation" count={graduationRows.length} />
          <CompTableContainer style={{ overflowX: 'auto' }}>
            <CompTableHeaderRow
              style={{
                gridTemplateColumns: '120px 180px 180px 150px 1fr 180px 100px 40px',
                minWidth: '1040px',
              }}
            >
              <CompTableHeaderCell>Cluster</CompTableHeaderCell>
              <CompTableHeaderCell>Main Stream</CompTableHeaderCell>
              <CompTableHeaderCell>Sub-Stream</CompTableHeaderCell>
              <CompTableHeaderCell>Specialization</CompTableHeaderCell>
              <CompTableHeaderCell>Reasoning</CompTableHeaderCell>
              <CompTableHeaderCell>Key Exams</CompTableHeaderCell>
              <CompTableHeaderCell>Fit Score</CompTableHeaderCell>
              <CompTableHeaderCell />
            </CompTableHeaderRow>

            {graduationRows.map(row => (
              <CompDataRow
                key={row.id}
                style={{
                  gridTemplateColumns: '120px 180px 180px 150px 1fr 180px 100px 40px',
                  minWidth: '1040px',
                }}
              >
                <CompParamCell style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
                  <span>{row.cluster}</span>
                  {row.isManualEntry && <ManualBadge />}
                </CompParamCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{row.mainStream}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{row.subStream}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{row.specialization}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{row.reasoning}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{row.keyExams}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>
                  {row.fitScore !== undefined ? `${row.fitScore}%` : '—'}
                </CompResponseCell>
                <RowActionsCell>
                  <Tooltip content="Delete Row">
                    <RowDeleteButton
                      type="button"
                      onClick={() => setDeleteTarget({ table: 'graduation', id: row.id })}
                    >
                      <RiDeleteBinLine size={14} />
                    </RowDeleteButton>
                  </Tooltip>
                </RowActionsCell>
              </CompDataRow>
            ))}
          </CompTableContainer>
        </div>

        {/* Colleges After Class 11 & 12 Table */}
        <div id="sec-c-colleges" style={{ marginTop: '20px' }}>
          <TableHeader title="Colleges After Class 11&12" table="colleges" count={collegesRows.length} />
          <CompTableContainer style={{ overflowX: 'auto' }}>
            <CompTableHeaderRow
              style={{
                gridTemplateColumns: '1fr 140px 120px 120px 140px 100px 160px 40px',
                minWidth: '940px',
              }}
            >
              <CompTableHeaderCell>College Name</CompTableHeaderCell>
              <CompTableHeaderCell>Location</CompTableHeaderCell>
              <CompTableHeaderCell>Type</CompTableHeaderCell>
              <CompTableHeaderCell>Course</CompTableHeaderCell>
              <CompTableHeaderCell>Entrance Exam</CompTableHeaderCell>
              <CompTableHeaderCell>Ranking</CompTableHeaderCell>
              <CompTableHeaderCell>Website</CompTableHeaderCell>
              <CompTableHeaderCell />
            </CompTableHeaderRow>

            {collegesRows.map(row => (
              <CompDataRow
                key={row.id}
                style={{
                  gridTemplateColumns: '1fr 140px 120px 120px 140px 100px 160px 40px',
                  minWidth: '940px',
                }}
              >
                <CompParamCell style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
                  <span>{row.collegeName}</span>
                  {row.isManualEntry && <ManualBadge />}
                </CompParamCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{row.location}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{row.type}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{row.course}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{row.entranceExam}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{row.ranking}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{row.website}</CompResponseCell>
                <RowActionsCell>
                  <Tooltip content="Delete Row">
                    <RowDeleteButton
                      type="button"
                      onClick={() => setDeleteTarget({ table: 'colleges', id: row.id })}
                    >
                      <RiDeleteBinLine size={14} />
                    </RowDeleteButton>
                  </Tooltip>
                </RowActionsCell>
              </CompDataRow>
            ))}
          </CompTableContainer>
        </div>

        {/* Entrance Exams Section */}
        <div id="sec-c-entrance-exams" style={{ marginTop: '20px' }}>
          <TableHeader title="Entrance Exams" table="entranceExam" count={entranceExamRows.length} />
          <CompTableContainer style={{ overflowX: 'auto' }}>
            <CompTableHeaderRow
              style={{
                gridTemplateColumns: '1fr 160px 120px 140px 140px 120px 160px 40px',
                minWidth: '1040px',
              }}
            >
              <CompTableHeaderCell>Exam Name</CompTableHeaderCell>
              <CompTableHeaderCell>Conducting Body</CompTableHeaderCell>
              <CompTableHeaderCell>Level</CompTableHeaderCell>
              <CompTableHeaderCell>Applicable For</CompTableHeaderCell>
              <CompTableHeaderCell>Subject Requirements</CompTableHeaderCell>
              <CompTableHeaderCell>Exam Month</CompTableHeaderCell>
              <CompTableHeaderCell>Website</CompTableHeaderCell>
              <CompTableHeaderCell />
            </CompTableHeaderRow>

            {entranceExamRows.map(exam => (
              <CompDataRow
                key={exam.id}
                style={{
                  gridTemplateColumns: '1fr 160px 120px 140px 140px 120px 160px 40px',
                  minWidth: '1040px',
                }}
              >
                <CompParamCell style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
                  <span>{exam.fullName}</span>
                  {exam.isManualEntry && <ManualBadge />}
                </CompParamCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{exam.conductingBody}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{exam.level}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{exam.applicableFor}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{exam.subjectRequirements}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{exam.examMonth}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{exam.urlLink}</CompResponseCell>
                <RowActionsCell>
                  <Tooltip content="Delete Row">
                    <RowDeleteButton
                      type="button"
                      onClick={() => setDeleteTarget({ table: 'entranceExam', id: exam.id })}
                    >
                      <RiDeleteBinLine size={14} />
                    </RowDeleteButton>
                  </Tooltip>
                </RowActionsCell>
              </CompDataRow>
            ))}
          </CompTableContainer>
        </div>

        {/* Synthesis Notes F1–F6 */}
        <SynthesisNotesPanel
          title="Counsellor Synthesis Notes"
          rows={synthesisRowsFDef}
          notes={data.synthesisNotesF}
          onChangeNote={onChangeNotesF}
        />
      </SectionBlock>

      <AddRowModal
        isOpen={activeAddTable !== null}
        onClose={closeAddModal}
        title={activeAddTable ? modalTitles[activeAddTable] : ''}
        fields={activeAddTable ? getFieldsForTable(activeAddTable) : []}
        onSubmit={handleAddRow}
      />

      <ConfirmDialog
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Row"
        description="This will remove the row from this report. This cannot be undone."
        confirmLabel="Delete"
        isDangerous
      />
    </>
  );
};
