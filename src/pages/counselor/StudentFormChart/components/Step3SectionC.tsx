import React, { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
  RiAddLine,
  RiDeleteBinLine,
  RiPencilLine,
} from 'react-icons/ri';
import {
  CounsellorFormChartData,
  StreamFitItem,
  GraduationItem,
  CareerCompassItem,
  EntranceExamItem,
  CollegesAfterItem,
  CareerCompassClusterItem,
} from '@/mocks/studentFormChart.mock';
import { Button } from '@/components/Button';
import { Tooltip } from '@/components/Tooltip';
import { Badge } from '@/components/Badge';
import { Select, SelectOption } from '@/components/Select';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { useToast } from '@/hooks';
import { careerService } from '@/services/career.service';
import { Career } from '@/types/career.types';
import { JobRoleFormModal } from '@/pages/career-library/components/JobRoleFormModal';

import { ComparisonTable } from './ComparisonTable';
import { SynthesisNotesPanel } from './SynthesisNotesPanel';
// Load-from-Career-Library is disabled for now (see Step3SectionC's read-only tables) —
// kept around in case it's re-enabled later.
// import { CareerLibraryPickerModal } from './CareerLibraryPickerModal';
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
  FormTextarea,
  TableActionButton,
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
  // Graduation fit, colleges, and the indicative-clusters table are now counsellor
  // read-only (assessment-derived output) — these setters stay on the parent/props
  // contract so re-enabling editing later doesn't require touching the plumbing.
  onChangeGraduationTable: (table: GraduationItem[]) => void;
  onChangeWhyStream2: (value: string) => void;
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

// A counsellor-proposed/approved role fetched from the backend, reshaped to the same row
// type the assessment-derived table uses so both render through one table.
const toCompassItem = (career: Career, approvalStatus?: CareerCompassItem['approvalStatus']): CareerCompassItem => ({
  id: career.id,
  domain: career.domain,
  role: career.jobRole,
  whyItFits: career.oneLineDescription,
  topEmployers: (career.topCompaniesRecruiting || []).join(', '),
  aiResilience: career.aiResilienceGrading,
  salaryIndia: career.approxSalaryRangeIndia || '',
  salaryAbroad: career.globalSalaryRange || '',
  approvalStatus,
});

export const Step3SectionC: React.FC<Step3SectionCProps> = ({
  studentId,
  data,
  onChangeNotesPre,
  onChangeNotesE,
  onChangeWhyStream2,
  onChangeNotesF,
}) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  // "Load from CL" is disabled for now alongside the rest of the Career Compass editing
  // — kept here (commented) in case it's re-enabled later.
  // const [isCLModalOpen, setIsCLModalOpen] = useState(false);
  // const handleAddCLRoles = (roles: CareerCompassItem[]) => {
  //   onChangeCompassTable([...data.careerCompassTable, ...roles]);
  //   toast.success(
  //     'Roles Loaded from Career Library!',
  //     `${roles.length} role(s) added to Career Compass table.`
  //   );
  // };

  // Counsellors can't edit the assessment-derived Career Compass rows directly — the only
  // action left there is proposing a brand-new job role. That reuses the same "Add Job
  // Role" popup the Career Library admin screen uses; submitted by a counsellor, POST
  // /career-library stages it as a CareerLibraryEntryProposal (pending Super Admin
  // review) tied to this student (studentId on the payload), instead of a live entry —
  // see PWC-backend career-library.service.ts `createCareerEntry`. Once a Super Admin
  // approves it, the same studentId carries over onto the real CareerLibraryEntry, so
  // both queries below are what makes a counsellor's own added role show up here again
  // (still pending, or now live) every time this chart is reopened.
  const [isRequestRoleOpen, setIsRequestRoleOpen] = useState(false);
  const [requestDomainId, setRequestDomainId] = useState('');
  // Editing a still-pending proposal reopens the same JobRoleFormModal, pointed at that
  // proposal (entityKind="proposal" switches it to the proposal detail/PATCH endpoints —
  // see JobRoleFormModal). Deleting asks for confirmation first.
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  const [deletingRoleId, setDeletingRoleId] = useState<string | null>(null);

  const { data: domains = [] } = useQuery({
    queryKey: ['career-domains-all'],
    queryFn: () => careerService.getDomains(),
    staleTime: 5 * 60 * 1000,
  });

  const domainOptions: SelectOption[] = domains.map(d => ({
    value: d.id,
    label: `${d.name} (${d.industryName})`,
  }));
  const selectedDomain = domains.find(d => d.id === requestDomainId);

  const proposalsQueryKey = ['career-proposals', 'student', studentId];
  const approvedQueryKey = ['career-approved', 'student', studentId];

  const { data: myProposals = [] } = useQuery({
    queryKey: proposalsQueryKey,
    queryFn: () => careerService.listProposalsForStudent(studentId),
    enabled: Boolean(studentId),
    staleTime: 30_000,
  });
  const { data: myApprovedRoles = [] } = useQuery({
    queryKey: approvedQueryKey,
    queryFn: () => careerService.listApprovedForStudent(studentId),
    enabled: Boolean(studentId),
    staleTime: 30_000,
  });

  // The table always shows 6 roles total. Counsellor-added roles (pending or approved)
  // always make the cut; system-generated ones fill the remaining slots, highest
  // fitScore first — so a 7th added role bumps the lowest-scored system role, keeping
  // the total at 6.
  const MAX_COMPASS_ROLES = 6;
  const addedRows: CareerCompassItem[] = [
    ...myProposals.map(p => toCompassItem(p, 'Pending Admin Approval')),
    ...myApprovedRoles.map(r => toCompassItem(r)),
  ];
  const systemSlots = Math.max(0, MAX_COMPASS_ROLES - addedRows.length);
  const systemRows = [...data.careerCompassTable]
    .sort((a, b) => (b.fitScore ?? 0) - (a.fitScore ?? 0))
    .slice(0, systemSlots);
  const compassRows: CareerCompassItem[] = [...systemRows, ...addedRows];

  const handleRoleProposed = () => {
    queryClient.invalidateQueries({ queryKey: proposalsQueryKey });
    toast.success(
      'Job Role Requested',
      'Submitted for Super Admin approval and added to this report.'
    );
    setIsRequestRoleOpen(false);
    setRequestDomainId('');
  };

  const editingRole = myProposals.find(p => p.id === editingRoleId);

  const handleRoleEdited = () => {
    queryClient.invalidateQueries({ queryKey: proposalsQueryKey });
    toast.success('Job Role Updated', 'Your proposed role was updated.');
    setEditingRoleId(null);
  };

  const deleteProposalMutation = useMutation({
    mutationFn: (id: string) => careerService.deleteEntryProposal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: proposalsQueryKey });
      toast.success('Job Role Removed', 'Your proposed role was withdrawn.');
      setDeletingRoleId(null);
    },
    onError: () => {
      toast.error('Could Not Remove', 'Failed to withdraw the proposed job role.');
    },
  });

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

      {/* Sub-Block 2: Assessment Result View */}
      <SectionBlock id="sec-c-stream-fit">
        <SectionBlockTitle>Assessment Result View — Stream Fit & Pathways</SectionBlockTitle>

        {/* 1. Stream Fit Table (View Only, Non-editable, Max 3 rows, Fits in one frame) */}
        <StreamFitTableContainer>
          <StreamFitTableHeaderRow>
            <StreamFitTableHeaderCell>Main Stream</StreamFitTableHeaderCell>
            <StreamFitTableHeaderCell>Sub-Streams</StreamFitTableHeaderCell>
            <StreamFitTableHeaderCell>Core Subjects Usually Offered</StreamFitTableHeaderCell>
            <StreamFitTableHeaderCell>Optional / Elective Subjects</StreamFitTableHeaderCell>
            <StreamFitTableHeaderCell>Student & Parent-Friendly Explanation</StreamFitTableHeaderCell>
          </StreamFitTableHeaderRow>

          {data.streamFitTable.slice(0, 3).map(row => (
            <StreamFitDataRow key={row.id}>
              <StreamFitCell $bold>{row.mainStream}</StreamFitCell>
              <StreamFitCell $bold>{row.subStream}</StreamFitCell>
              <StreamFitCell>{row.coreSubjects}</StreamFitCell>
              <StreamFitCell>{row.electives}</StreamFitCell>
              <StreamFitCell $secondary>
                {row.explanation || row.meaning || row.streamRequirement}
              </StreamFitCell>
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

        {/* 2. Graduation Table — read-only (assessment-derived output; not counsellor-editable) */}
        <div id="sec-c-graduation-fit" style={{ marginTop: '20px' }}>
          <SectionBlockTitle style={{ marginBottom: '12px' }}>Graduation Fit</SectionBlockTitle>
          <CompTableContainer style={{ overflowX: 'auto' }}>
            <CompTableHeaderRow
              style={{
                gridTemplateColumns: '120px 180px 180px 150px 1fr 180px',
                minWidth: '900px',
              }}
            >
              <CompTableHeaderCell>Cluster</CompTableHeaderCell>
              <CompTableHeaderCell>Main Stream</CompTableHeaderCell>
              <CompTableHeaderCell>Sub-Stream</CompTableHeaderCell>
              <CompTableHeaderCell>Specialization</CompTableHeaderCell>
              <CompTableHeaderCell>Reasoning</CompTableHeaderCell>
              <CompTableHeaderCell>Key Exams</CompTableHeaderCell>
            </CompTableHeaderRow>

            {data.graduationTable.map(row => (
              <CompDataRow
                key={row.id}
                style={{
                  gridTemplateColumns: '120px 180px 180px 150px 1fr 180px',
                  minWidth: '900px',
                }}
              >
                <CompParamCell>{row.cluster}</CompParamCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{row.mainStream}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{row.subStream}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{row.specialization}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{row.reasoning}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{row.keyExams}</CompResponseCell>
              </CompDataRow>
            ))}
          </CompTableContainer>

          {/* Counsellor-added rows/edits are disabled here — kept commented for easy
              re-enablement rather than deleted.
          <div style={{ marginTop: '12px' }}>
            <Button
              size="sm"
              variant="secondary"
              leftIcon={<RiAddLine size={16} />}
              onClick={() =>
                onChangeGraduationTable([
                  ...data.graduationTable,
                  {
                    id: `gr-${Date.now()}`,
                    cluster: '',
                    mainStream: '',
                    subStream: '',
                    specialization: '',
                    reasoning: '',
                    keyExams: '',
                  },
                ])
              }
            >
              Add Graduation Fit Row
            </Button>
          </div>
          */}
        </div>

        {/* Colleges After Class 11 & 12 Table — read-only (assessment-derived output) */}
        <div id="sec-c-colleges" style={{ marginTop: '20px' }}>
          <SectionBlockTitle style={{ marginBottom: '12px' }}>
            Colleges After Class 11&12
          </SectionBlockTitle>
          <CompTableContainer style={{ overflowX: 'auto' }}>
            <CompTableHeaderRow
              style={{
                gridTemplateColumns: '1fr 140px 120px 120px 140px 100px 160px',
                minWidth: '900px',
              }}
            >
              <CompTableHeaderCell>College Name</CompTableHeaderCell>
              <CompTableHeaderCell>Location</CompTableHeaderCell>
              <CompTableHeaderCell>Type</CompTableHeaderCell>
              <CompTableHeaderCell>Course</CompTableHeaderCell>
              <CompTableHeaderCell>Entrance Exam</CompTableHeaderCell>
              <CompTableHeaderCell>Ranking</CompTableHeaderCell>
              <CompTableHeaderCell>Website</CompTableHeaderCell>
            </CompTableHeaderRow>

            {(data.collegesTable || []).map(row => (
              <CompDataRow
                key={row.id}
                style={{
                  gridTemplateColumns: '1fr 140px 120px 120px 140px 100px 160px',
                  minWidth: '900px',
                }}
              >
                <CompParamCell>{row.collegeName}</CompParamCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{row.location}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{row.type}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{row.course}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{row.entranceExam}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{row.ranking}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{row.website}</CompResponseCell>
              </CompDataRow>
            ))}
          </CompTableContainer>
          {/* Counsellor-added rows/edits are disabled here — kept commented for easy
              re-enablement rather than deleted.
          <div style={{ marginTop: '12px' }}>
            <Button
              size="sm"
              variant="secondary"
              leftIcon={<RiAddLine size={16} />}
              onClick={() =>
                onChangeCollegesTable([
                  ...(data.collegesTable || []),
                  {
                    id: `col-${Date.now()}`,
                    collegeName: '',
                    location: '',
                    type: '',
                    course: '',
                    entranceExam: '',
                    ranking: '',
                    website: '',
                  },
                ])
              }
            >
              Add College Row
            </Button>
          </div>
          */}
        </div>

        {/* Entrance Exams Section */}
        <div id="sec-c-entrance-exams" style={{ marginTop: '20px' }}>
          <SectionBlockTitle style={{ marginBottom: '12px' }}>Entrance Exams</SectionBlockTitle>
          <CompTableContainer style={{ overflowX: 'auto' }}>
            <CompTableHeaderRow
              style={{
                gridTemplateColumns: '1fr 160px 120px 140px 140px 120px 160px',
                minWidth: '1000px',
              }}
            >
              <CompTableHeaderCell>Exam Name</CompTableHeaderCell>
              <CompTableHeaderCell>Conducting Body</CompTableHeaderCell>
              <CompTableHeaderCell>Level</CompTableHeaderCell>
              <CompTableHeaderCell>Applicable For</CompTableHeaderCell>
              <CompTableHeaderCell>Subject Requirements</CompTableHeaderCell>
              <CompTableHeaderCell>Exam Month</CompTableHeaderCell>
              <CompTableHeaderCell>Website</CompTableHeaderCell>
            </CompTableHeaderRow>

            {(data.entranceExamsTable || []).map(exam => (
              <CompDataRow
                key={exam.id}
                style={{
                  gridTemplateColumns: '1fr 160px 120px 140px 140px 120px 160px',
                  minWidth: '1000px',
                }}
              >
                <CompParamCell>{exam.fullName}</CompParamCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{exam.conductingBody}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{exam.level}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{exam.applicableFor}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{exam.subjectRequirements}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{exam.examMonth}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{exam.urlLink}</CompResponseCell>
              </CompDataRow>
            ))}
          </CompTableContainer>
          {/* Add Entrance Exam Card button is commented out to show table view
          <div style={{ marginTop: '12px' }}>
            <Button
              size="sm"
              variant="secondary"
              leftIcon={<RiAddLine size={16} />}
              onClick={() =>
                onChangeEntranceExamsTable([
                  ...(data.entranceExamsTable || []),
                  {
                    id: `ee-${Date.now()}`,
                    fullName: '',
                    conductingBody: '',
                    level: '',
                    applicableFor: '',
                    subjectRequirements: '',
                    examMonth: '',
                    urlLink: '',
                  },
                ])
              }
            >
              Add Entrance Exam Card
            </Button>
          </div>
          */}
        </div>

        {/* Why Stream 2 Textarea */}
        <div style={{ marginTop: '16px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#374151',
              marginBottom: '6px',
            }}
          >
            Why these graduation degrees are recommended:
          </label>
          <FormTextarea
            value={data.whyThisStream2}
            onChange={e => onChangeWhyStream2(e.target.value)}
            placeholder="Explain why these graduation pathways suit the student..."
            style={{ width: '100%', minHeight: '70px' }}
          />
        </div>

        {/* Synthesis Notes F1–F6 */}
        <SynthesisNotesPanel
          title="Counsellor Synthesis Notes"
          rows={synthesisRowsFDef}
          notes={data.synthesisNotesF}
          onChangeNote={onChangeNotesF}
        />

        {/* Career Compass Cluster Table — read-only (assessment-derived output) */}
        <div style={{ marginTop: '20px' }}>
          <SectionBlockTitle style={{ marginBottom: '12px' }}>
            Career Compass (Indicative Clusters)
          </SectionBlockTitle>
          <CompTableContainer style={{ overflowX: 'auto' }}>
            <CompTableHeaderRow
              style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr 120px 1fr', minWidth: '900px' }}
            >
              <CompTableHeaderCell>Cluster</CompTableHeaderCell>
              <CompTableHeaderCell>Industry</CompTableHeaderCell>
              <CompTableHeaderCell>Domain</CompTableHeaderCell>
              <CompTableHeaderCell>Stream Requirement</CompTableHeaderCell>
              <CompTableHeaderCell>Grading Level</CompTableHeaderCell>
              <CompTableHeaderCell>Meaning</CompTableHeaderCell>
            </CompTableHeaderRow>

            {(data.careerCompassClusterTable || []).map(row => (
              <CompDataRow
                key={row.id}
                style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr 120px 1fr', minWidth: '900px' }}
              >
                <CompParamCell>{row.cluster}</CompParamCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{row.industry}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{row.domain}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{row.streamRequirement}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{row.gradingLevel}</CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>{row.meaning}</CompResponseCell>
              </CompDataRow>
            ))}
          </CompTableContainer>
          {/* Counsellor-added rows/edits are disabled here — kept commented for easy
              re-enablement rather than deleted.
          <div style={{ marginTop: '12px' }}>
            <Button
              size="sm"
              variant="secondary"
              leftIcon={<RiAddLine size={16} />}
              onClick={() =>
                onChangeCompassClusterTable([
                  ...(data.careerCompassClusterTable || []),
                  {
                    id: `ccc-${Date.now()}`,
                    cluster: '',
                    industry: '',
                    domain: '',
                    streamRequirement: '',
                    gradingLevel: '',
                    meaning: '',
                  },
                ])
              }
            >
              Add Cluster Row
            </Button>
          </div>
          */}
        </div>

        {/* 3. Career Compass Job Roles Table — read-only (assessment-derived output). The
            only counsellor action left is proposing a brand-new role (see below). */}
        <div id="sec-c-target-roles" style={{ marginTop: '20px' }}>
          <SectionBlockTitle style={{ marginBottom: '4px' }}>
            Career Compass (Target Roles & Compensation)
          </SectionBlockTitle>
          <div style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '12px' }}>
            All 18 trait scores were matched against the full career domain library. Counsellors can
            propose a new job role for Super Admin approval.
          </div>
          <CompTableContainer style={{ overflowX: 'auto' }}>
            <CompTableHeaderRow
              style={{
                gridTemplateColumns: '220px 160px 1fr 180px 220px 120px 120px',
                minWidth: '1140px',
              }}
            >
              <CompTableHeaderCell>Domain</CompTableHeaderCell>
              <CompTableHeaderCell>Target Role</CompTableHeaderCell>
              <CompTableHeaderCell>Why It Fits</CompTableHeaderCell>
              <CompTableHeaderCell>Top Employers</CompTableHeaderCell>
              <CompTableHeaderCell>AI Resilience</CompTableHeaderCell>
              <CompTableHeaderCell>Salary (India)</CompTableHeaderCell>
              <CompTableHeaderCell>Salary (Abroad)</CompTableHeaderCell>
            </CompTableHeaderRow>

            {compassRows.map(row => {
              // Only a still-pending proposal (this counsellor's own) can be edited or
              // withdrawn here — once a Super Admin approves it, it's a real
              // CareerLibraryEntry and behaves like any other read-only compass row.
              const isPending = row.approvalStatus === 'Pending Admin Approval';
              const isDeleting = deleteProposalMutation.isPending && deleteProposalMutation.variables === row.id;

              return (
                <CompDataRow
                  key={row.id}
                  style={{
                    gridTemplateColumns: '220px 160px 1fr 180px 220px 120px 120px',
                    minWidth: '1140px',
                  }}
                >
                  <CompParamCell
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: '8px',
                      minWidth: 0,
                      maxWidth: '100%',
                    }}
                  >
                    <span>{row.domain}</span>
                    {isPending && (
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '6px',
                          maxWidth: '100%',
                        }}
                      >
                        <Badge variant="warning">Pending Approval</Badge>
                        <Tooltip content="Edit Job Role">
                          <TableActionButton type="button" onClick={() => setEditingRoleId(row.id)}>
                            <RiPencilLine size={14} />
                          </TableActionButton>
                        </Tooltip>
                        <Tooltip content="Delete Job Role">
                          <TableActionButton
                            type="button"
                            disabled={isDeleting}
                            onClick={() => setDeletingRoleId(row.id)}
                          >
                            <RiDeleteBinLine size={14} />
                          </TableActionButton>
                        </Tooltip>
                      </span>
                    )}
                  </CompParamCell>
                  <CompResponseCell style={{ borderLeft: 'none' }}>{row.role}</CompResponseCell>
                  <CompResponseCell style={{ borderLeft: 'none' }}>{row.whyItFits}</CompResponseCell>
                  <CompResponseCell style={{ borderLeft: 'none' }}>{row.topEmployers}</CompResponseCell>
                  <CompResponseCell style={{ borderLeft: 'none' }}>{row.aiResilience}</CompResponseCell>
                  <CompResponseCell style={{ borderLeft: 'none' }}>{row.salaryIndia}</CompResponseCell>
                  <CompResponseCell style={{ borderLeft: 'none' }}>{row.salaryAbroad}</CompResponseCell>
                </CompDataRow>
              );
            })}
          </CompTableContainer>

          {/* "Load from CL" and manual quick-add rows are disabled alongside the rest of
              this table's editing — kept commented for easy re-enablement.
          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <Button
              size="sm"
              variant="primary"
              leftIcon={<RiBookReadLine size={16} />}
              onClick={() => setIsCLModalOpen(true)}
            >
              Load from CL
            </Button>
            <Button
              size="sm"
              variant="secondary"
              leftIcon={<RiAddLine size={16} />}
              onClick={() =>
                onChangeCompassTable([
                  ...data.careerCompassTable,
                  {
                    id: `cc-${Date.now()}`,
                    domain: '',
                    role: '',
                    whyItFits: '',
                    topEmployers: '',
                    aiResilience: '',
                    salaryIndia: '',
                    salaryAbroad: '',
                  },
                ])
              }
            >
              Add Quick Role Row
            </Button>
          </div>
          */}

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ 
              fontSize: '0.875rem', 
              fontWeight: 600, 
              color: '#374151', 
              marginBottom: '8px' 
            }}>
              Want to add a Job Role ?
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ minWidth: '260px' }}>
                <Select
                  value={requestDomainId}
                  options={domainOptions}
                  onChange={e => setRequestDomainId(e.target.value)}
                  placeholder="Select a domain to propose a role in"
                  fullWidth
                />
              </div>
              <Button
                size="sm"
                variant="primary"
                leftIcon={<RiAddLine size={16} />}
                disabled={!requestDomainId}
                onClick={() => setIsRequestRoleOpen(true)}
              >
                Request New Job Role
              </Button>
            </div>
          </div>
        </div>
      </SectionBlock>

      <JobRoleFormModal
        isOpen={isRequestRoleOpen}
        onClose={() => setIsRequestRoleOpen(false)}
        onSaved={handleRoleProposed}
        mode="add"
        suppressSuccessToast
        studentId={studentId}
        domainId={selectedDomain?.id}
        domainLabel={selectedDomain?.name}
        industryLabel={selectedDomain?.industryName}
        clusterLabel={selectedDomain?.clusterName}
      />

      <JobRoleFormModal
        isOpen={Boolean(editingRoleId)}
        onClose={() => setEditingRoleId(null)}
        onSaved={handleRoleEdited}
        mode="edit"
        entityKind="proposal"
        suppressSuccessToast
        entity={editingRole}
      />

      <ConfirmDialog
        isOpen={Boolean(deletingRoleId)}
        onClose={() => setDeletingRoleId(null)}
        onConfirm={() => {
          if (deletingRoleId) deleteProposalMutation.mutate(deletingRoleId);
        }}
        title="Delete Job Role"
        description="This will withdraw the proposed job role from Super Admin review and remove it from this report. This cannot be undone."
        confirmLabel="Delete"
        isDangerous
        isLoading={deleteProposalMutation.isPending}
      />

      {/* Load-from-Career-Library is disabled for now — kept commented for easy
          re-enablement rather than deleted.
      <CareerLibraryPickerModal
        isOpen={isCLModalOpen}
        onClose={() => setIsCLModalOpen(false)}
        onAddRoles={handleAddCLRoles}
        existingCount={data.careerCompassTable.length}
      />
      */}
    </>
  );
};
