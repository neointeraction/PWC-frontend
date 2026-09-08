import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
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
  FormInput,
  FormTextarea,
  TableActionButton,
  StreamFitTableContainer,
  StreamFitTableHeaderRow,
  StreamFitTableHeaderCell,
  StreamFitDataRow,
  StreamFitCell,
} from '../StudentFormChartPage.styles';

interface Step3SectionCProps {
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

const AI_RESILIENCE_OPTIONS: SelectOption[] = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
  { value: 'Very High', label: 'Very High' },
];

export const Step3SectionC: React.FC<Step3SectionCProps> = ({
  data,
  onChangeNotesPre,
  onChangeNotesE,
  onChangeWhyStream2,
  onChangeNotesF,
  onChangeEntranceExamsTable,
  onChangeCompassTable,
}) => {
  const toast = useToast();

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

  // Counsellors can't edit the Career Compass tables directly — the only action left is
  // proposing a brand-new job role. That reuses the same "Add Job Role" popup the Career
  // Library admin screen uses; submitted by a counsellor, POST /career-library stages it
  // as a CareerLibraryEntryProposal (pending Super Admin review) instead of a live entry
  // — see PWC-backend career-library.service.ts `createCareerEntry`. The role is also
  // appended to this candidate's own Career Compass table below, purely locally, so it
  // shows up in this report right away.
  const [isRequestRoleOpen, setIsRequestRoleOpen] = useState(false);
  const [requestDomainId, setRequestDomainId] = useState('');
  // A counsellor-proposed role (approvalStatus === 'Pending Admin Approval') can be edited
  // or removed inline, purely in this table's local state — same as every other counsellor
  // edit on this step, it's persisted by the normal step/form save, not a separate API call.
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);

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

  const handleRoleProposed = (saved: Career) => {
    onChangeCompassTable([
      ...data.careerCompassTable,
      {
        id: `cc-${Date.now()}`,
        domain: saved.domain,
        role: saved.jobRole,
        whyItFits: saved.oneLineDescription,
        topEmployers: (saved.topCompaniesRecruiting || []).join(', '),
        aiResilience: saved.aiResilienceGrading,
        salaryIndia: saved.approxSalaryRangeIndia || '',
        salaryAbroad: saved.globalSalaryRange || '',
        approvalStatus: 'Pending Admin Approval',
      },
    ]);
    toast.success(
      'Job Role Requested',
      `"${saved.jobRole}" was submitted for Super Admin approval and added to this report.`
    );
    setIsRequestRoleOpen(false);
    setRequestDomainId('');
  };

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
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '16px',
            }}
          >
            {(data.entranceExamsTable || []).map((exam, idx) => (
              <div
                key={exam.id}
                style={{
                  border: '1px solid #E5E7EB',
                  borderRadius: '4px',
                  padding: '16px',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px',
                  }}
                >
                  <h4 style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111827' }}>
                    Exam {idx + 1}: {exam.fullName || '[Exam Name]'}
                  </h4>
                  <Tooltip content="Delete Exam">
                    <TableActionButton
                      type="button"
                      onClick={() =>
                        onChangeEntranceExamsTable(
                          data.entranceExamsTable.filter(e => e.id !== exam.id)
                        )
                      }
                    >
                      <RiDeleteBinLine size={16} />
                    </TableActionButton>
                  </Tooltip>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#4B5563' }}>
                      Full Name
                    </span>
                    <FormInput
                      value={exam.fullName}
                      onChange={e =>
                        onChangeEntranceExamsTable(
                          data.entranceExamsTable.map(item =>
                            item.id === exam.id ? { ...item, fullName: e.target.value } : item
                          )
                        )
                      }
                      placeholder="[Full name of the exam]"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#4B5563' }}>
                      Conducting Body
                    </span>
                    <FormInput
                      value={exam.conductingBody}
                      onChange={e =>
                        onChangeEntranceExamsTable(
                          data.entranceExamsTable.map(item =>
                            item.id === exam.id ? { ...item, conductingBody: e.target.value } : item
                          )
                        )
                      }
                      placeholder="[Conducting organisation]"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#4B5563' }}>
                      Level
                    </span>
                    <FormInput
                      value={exam.level}
                      onChange={e =>
                        onChangeEntranceExamsTable(
                          data.entranceExamsTable.map(item =>
                            item.id === exam.id ? { ...item, level: e.target.value } : item
                          )
                        )
                      }
                      placeholder="[National / State / Institute]"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#4B5563' }}>
                      Applicable For
                    </span>
                    <FormInput
                      value={exam.applicableFor}
                      onChange={e =>
                        onChangeEntranceExamsTable(
                          data.entranceExamsTable.map(item =>
                            item.id === exam.id ? { ...item, applicableFor: e.target.value } : item
                          )
                        )
                      }
                      placeholder="[Degree / Programme]"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#4B5563' }}>
                      Subject Requirements
                    </span>
                    <FormInput
                      value={exam.subjectRequirements}
                      onChange={e =>
                        onChangeEntranceExamsTable(
                          data.entranceExamsTable.map(item =>
                            item.id === exam.id
                              ? { ...item, subjectRequirements: e.target.value }
                              : item
                          )
                        )
                      }
                      placeholder="[12th]"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#4B5563' }}>
                      Exam Month
                    </span>
                    <FormInput
                      value={exam.examMonth}
                      onChange={e =>
                        onChangeEntranceExamsTable(
                          data.entranceExamsTable.map(item =>
                            item.id === exam.id ? { ...item, examMonth: e.target.value } : item
                          )
                        )
                      }
                      placeholder="[Approx]"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#4B5563' }}>
                      URL Link
                    </span>
                    <FormInput
                      value={exam.urlLink}
                      onChange={e =>
                        onChangeEntranceExamsTable(
                          data.entranceExamsTable.map(item =>
                            item.id === exam.id ? { ...item, urlLink: e.target.value } : item
                          )
                        )
                      }
                      placeholder="[Paste the URL link]"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                gridTemplateColumns: '180px 160px 1fr 180px 220px 120px 120px',
                minWidth: '1100px',
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

            {data.careerCompassTable.map(row => {
              const isCounsellorAdded = row.approvalStatus === 'Pending Admin Approval';
              const isEditing = isCounsellorAdded && editingRoleId === row.id;
              const updateRow = (patch: Partial<CareerCompassItem>) =>
                onChangeCompassTable(
                  data.careerCompassTable.map(item =>
                    item.id === row.id ? { ...item, ...patch } : item
                  )
                );

              return (
                <CompDataRow
                  key={row.id}
                  style={{
                    gridTemplateColumns: '180px 160px 1fr 180px 220px 120px 120px',
                    minWidth: '1100px',
                  }}
                >
                  <CompParamCell>
                    {row.domain}
                    {isCounsellorAdded && (
                      <span
                        style={{
                          marginLeft: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <Badge variant="warning">Pending Approval</Badge>
                        <Tooltip content={isEditing ? 'Done Editing' : 'Edit Job Role'}>
                          <TableActionButton
                            type="button"
                            onClick={() => setEditingRoleId(isEditing ? null : row.id)}
                          >
                            <RiPencilLine size={14} />
                          </TableActionButton>
                        </Tooltip>
                        <Tooltip content="Delete Job Role">
                          <TableActionButton
                            type="button"
                            onClick={() => {
                              onChangeCompassTable(
                                data.careerCompassTable.filter(item => item.id !== row.id)
                              );
                              if (editingRoleId === row.id) setEditingRoleId(null);
                            }}
                          >
                            <RiDeleteBinLine size={14} />
                          </TableActionButton>
                        </Tooltip>
                      </span>
                    )}
                  </CompParamCell>
                  {isEditing ? (
                    <>
                      <CompResponseCell style={{ borderLeft: 'none' }}>
                        <FormInput
                          value={row.role}
                          onChange={e => updateRow({ role: e.target.value })}
                          style={{ width: '100%' }}
                        />
                      </CompResponseCell>
                      <CompResponseCell style={{ borderLeft: 'none' }}>
                        <FormInput
                          value={row.whyItFits}
                          onChange={e => updateRow({ whyItFits: e.target.value })}
                          style={{ width: '100%' }}
                        />
                      </CompResponseCell>
                      <CompResponseCell style={{ borderLeft: 'none' }}>
                        <FormInput
                          value={row.topEmployers}
                          onChange={e => updateRow({ topEmployers: e.target.value })}
                          style={{ width: '100%' }}
                        />
                      </CompResponseCell>
                      <CompResponseCell style={{ borderLeft: 'none' }}>
                        <Select
                          value={row.aiResilience}
                          options={AI_RESILIENCE_OPTIONS}
                          onChange={e => updateRow({ aiResilience: e.target.value })}
                          fullWidth
                        />
                      </CompResponseCell>
                      <CompResponseCell style={{ borderLeft: 'none' }}>
                        <FormInput
                          value={row.salaryIndia}
                          onChange={e => updateRow({ salaryIndia: e.target.value })}
                          style={{ width: '100%' }}
                        />
                      </CompResponseCell>
                      <CompResponseCell style={{ borderLeft: 'none' }}>
                        <FormInput
                          value={row.salaryAbroad}
                          onChange={e => updateRow({ salaryAbroad: e.target.value })}
                          style={{ width: '100%' }}
                        />
                      </CompResponseCell>
                    </>
                  ) : (
                    <>
                      <CompResponseCell style={{ borderLeft: 'none' }}>{row.role}</CompResponseCell>
                      <CompResponseCell style={{ borderLeft: 'none' }}>{row.whyItFits}</CompResponseCell>
                      <CompResponseCell style={{ borderLeft: 'none' }}>{row.topEmployers}</CompResponseCell>
                      <CompResponseCell style={{ borderLeft: 'none' }}>{row.aiResilience}</CompResponseCell>
                      <CompResponseCell style={{ borderLeft: 'none' }}>{row.salaryIndia}</CompResponseCell>
                      <CompResponseCell style={{ borderLeft: 'none' }}>{row.salaryAbroad}</CompResponseCell>
                    </>
                  )}
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

          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
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
      </SectionBlock>

      <JobRoleFormModal
        isOpen={isRequestRoleOpen}
        onClose={() => setIsRequestRoleOpen(false)}
        onSaved={handleRoleProposed}
        mode="add"
        domainId={selectedDomain?.id}
        domainLabel={selectedDomain?.name}
        industryLabel={selectedDomain?.industryName}
        clusterLabel={selectedDomain?.clusterName}
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
