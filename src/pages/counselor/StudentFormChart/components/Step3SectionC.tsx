import React, { useState } from 'react';
import {
  RiAddLine,
  RiDeleteBinLine,
  RiBookReadLine,
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
import { Select, SelectOption } from '@/components/Select';
import { useToast } from '@/hooks';

const DOMAIN_OPTIONS: SelectOption[] = [
  { value: 'Library & Information Science', label: 'Library & Information Science' },
  { value: 'Applied Arts & Design', label: 'Applied Arts & Design' },
  { value: 'Animation, Graphics & Digital Arts', label: 'Animation, Graphics & Digital Arts' },
  { value: 'Performing Arts & Music', label: 'Performing Arts & Music' },
  { value: 'Aeronautics & Aviation', label: 'Aeronautics & Aviation' },
  { value: 'Business, Sales & Management', label: 'Business, Sales & Management' },
  { value: 'Core Engineering & Industrial Systems', label: 'Core Engineering & Industrial Systems' },
  { value: 'Computer Science & Artificial Intelligence', label: 'Computer Science & Artificial Intelligence' },
  { value: 'Finance & Algorithmic Trading', label: 'Finance & Algorithmic Trading' },
  { value: 'Food Science & Agriculture', label: 'Food Science & Agriculture' },
  { value: 'Healthcare & Clinical Sciences', label: 'Healthcare & Clinical Sciences' },
  { value: 'Information Technology & Cybersecurity', label: 'Information Technology & Cybersecurity' },
  { value: 'Law & Public Policy', label: 'Law & Public Policy' },
  { value: 'Logistics & Supply Chain', label: 'Logistics & Supply Chain' },
  { value: 'Media, Journalism & Digital Content', label: 'Media, Journalism & Digital Content' },
  { value: 'STEM Research & Applied Sciences', label: 'STEM Research & Applied Sciences' },
  { value: 'Social Science, Psychology & Education', label: 'Social Science, Psychology & Education' },
];
import { ComparisonTable } from './ComparisonTable';
import { SynthesisNotesPanel } from './SynthesisNotesPanel';
import { CareerLibraryPickerModal } from './CareerLibraryPickerModal';
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
} from '../StudentFormChartPage.styles';

interface Step3SectionCProps {
  data: CounsellorFormChartData['sectionC'];
  onChangeNotesPre: (code: string, value: string) => void;
  onChangeStreamTable: (table: StreamFitItem[]) => void;
  onChangeWhyStream1?: (value: string) => void;
  onChangeNotesE: (code: string, value: string) => void;
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

export const Step3SectionC: React.FC<Step3SectionCProps> = ({
  data,
  onChangeNotesPre,
  onChangeStreamTable,
  onChangeNotesE,
  onChangeGraduationTable,
  onChangeWhyStream2,
  onChangeNotesF,
  onChangeEntranceExamsTable,
  onChangeCollegesTable,
  onChangeCompassClusterTable,
  onChangeCompassTable,
}) => {
  const toast = useToast();
  const [isCLModalOpen, setIsCLModalOpen] = useState(false);
  const handleAddCLRoles = (roles: CareerCompassItem[]) => {
    onChangeCompassTable([...data.careerCompassTable, ...roles]);
    toast.success(
      'Roles Loaded from Career Library!',
      `${roles.length} role(s) added to Career Compass table.`
    );
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

        {/* 1. Stream Fit Table */}
        <CompTableContainer style={{ overflowX: 'auto' }}>
          <CompTableHeaderRow
            style={{
              gridTemplateColumns: '120px 160px 180px 140px 180px 120px 1fr 60px',
              minWidth: '1000px',
            }}
          >
            <CompTableHeaderCell>Main Stream</CompTableHeaderCell>
            <CompTableHeaderCell>Sub-Stream</CompTableHeaderCell>
            <CompTableHeaderCell>Core Subjects</CompTableHeaderCell>
            <CompTableHeaderCell>Electives</CompTableHeaderCell>
            <CompTableHeaderCell>Stream Requirement</CompTableHeaderCell>
            <CompTableHeaderCell>Grading Level</CompTableHeaderCell>
            <CompTableHeaderCell>Meaning</CompTableHeaderCell>
            <CompTableHeaderCell style={{ textAlign: 'center' }}>Action</CompTableHeaderCell>
          </CompTableHeaderRow>

          {data.streamFitTable.map(row => (
            <CompDataRow
              key={row.id}
              style={{
                gridTemplateColumns: '120px 160px 180px 140px 180px 120px 1fr 60px',
                minWidth: '1000px',
              }}
            >
              <CompParamCell style={{ padding: '4px' }}>
                <FormInput
                  value={row.mainStream}
                  onChange={e =>
                    onChangeStreamTable(
                      data.streamFitTable.map(r =>
                        r.id === row.id ? { ...r, mainStream: e.target.value } : r
                      )
                    )
                  }
                  style={{ width: '100%' }}
                />
              </CompParamCell>
              <CompResponseCell style={{ borderLeft: 'none', padding: '4px' }}>
                <FormInput
                  value={row.subStream}
                  onChange={e =>
                    onChangeStreamTable(
                      data.streamFitTable.map(r =>
                        r.id === row.id ? { ...r, subStream: e.target.value } : r
                      )
                    )
                  }
                  style={{ width: '100%' }}
                />
              </CompResponseCell>
              <CompResponseCell style={{ borderLeft: 'none', padding: '4px' }}>
                <FormInput
                  value={row.coreSubjects}
                  onChange={e =>
                    onChangeStreamTable(
                      data.streamFitTable.map(r =>
                        r.id === row.id ? { ...r, coreSubjects: e.target.value } : r
                      )
                    )
                  }
                  style={{ width: '100%' }}
                />
              </CompResponseCell>
              <CompResponseCell style={{ borderLeft: 'none', padding: '4px' }}>
                <FormInput
                  value={row.electives}
                  onChange={e =>
                    onChangeStreamTable(
                      data.streamFitTable.map(r =>
                        r.id === row.id ? { ...r, electives: e.target.value } : r
                      )
                    )
                  }
                  style={{ width: '100%' }}
                />
              </CompResponseCell>
              <CompResponseCell style={{ borderLeft: 'none', padding: '4px' }}>
                <FormInput
                  value={row.streamRequirement || ''}
                  onChange={e =>
                    onChangeStreamTable(
                      data.streamFitTable.map(r =>
                        r.id === row.id ? { ...r, streamRequirement: e.target.value } : r
                      )
                    )
                  }
                  style={{ width: '100%' }}
                  placeholder="Stream Requirement"
                />
              </CompResponseCell>
              <CompResponseCell style={{ borderLeft: 'none', padding: '4px' }}>
                <FormInput
                  value={row.gradingLevel}
                  onChange={e =>
                    onChangeStreamTable(
                      data.streamFitTable.map(r =>
                        r.id === row.id ? { ...r, gradingLevel: e.target.value } : r
                      )
                    )
                  }
                  style={{ width: '100%' }}
                />
              </CompResponseCell>
              <CompResponseCell style={{ borderLeft: 'none', padding: '4px' }}>
                <FormInput
                  value={row.meaning}
                  onChange={e =>
                    onChangeStreamTable(
                      data.streamFitTable.map(r =>
                        r.id === row.id ? { ...r, meaning: e.target.value } : r
                      )
                    )
                  }
                  style={{ width: '100%' }}
                />
              </CompResponseCell>
              <CompResponseCell
                style={{
                  borderLeft: 'none',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Tooltip content="Delete Row">
                  <TableActionButton
                    type="button"
                    onClick={() =>
                      onChangeStreamTable(data.streamFitTable.filter(r => r.id !== row.id))
                    }
                  >
                    <RiDeleteBinLine size={16} />
                  </TableActionButton>
                </Tooltip>
              </CompResponseCell>
            </CompDataRow>
          ))}
        </CompTableContainer>

        <div>
          <Button
            size="sm"
            variant="secondary"
            leftIcon={<RiAddLine size={16} />}
            onClick={() =>
              onChangeStreamTable([
                ...data.streamFitTable,
                {
                  id: `sf-${Date.now()}`,
                  mainStream: '',
                  subStream: '',
                  coreSubjects: '',
                  electives: '',
                  streamRequirement: '',
                  gradingLevel: '',
                  meaning: '',
                },
              ])
            }
          >
            Add Stream Fit Row
          </Button>
        </div>

        {/* Synthesis Notes E1–E6 */}
        <SynthesisNotesPanel
          title="Counsellor Synthesis Notes"
          rows={synthesisRowsEDef}
          notes={data.synthesisNotesE}
          onChangeNote={onChangeNotesE}
        />

        {/* 2. Graduation Table */}
        <div id="sec-c-graduation-fit" style={{ marginTop: '20px' }}>
          <SectionBlockTitle style={{ marginBottom: '12px' }}>Graduation Fit</SectionBlockTitle>
          <CompTableContainer style={{ overflowX: 'auto' }}>
            <CompTableHeaderRow
              style={{
                gridTemplateColumns: '120px 180px 180px 150px 1fr 180px 60px',
                minWidth: '950px',
              }}
            >
              <CompTableHeaderCell>Cluster</CompTableHeaderCell>
              <CompTableHeaderCell>Main Stream</CompTableHeaderCell>
              <CompTableHeaderCell>Sub-Stream</CompTableHeaderCell>
              <CompTableHeaderCell>Specialization</CompTableHeaderCell>
              <CompTableHeaderCell>Reasoning</CompTableHeaderCell>
              <CompTableHeaderCell>Key Exams</CompTableHeaderCell>
              <CompTableHeaderCell style={{ textAlign: 'center' }}>Action</CompTableHeaderCell>
            </CompTableHeaderRow>

            {data.graduationTable.map(row => (
              <CompDataRow
                key={row.id}
                style={{
                  gridTemplateColumns: '120px 180px 180px 150px 1fr 180px 60px',
                  minWidth: '950px',
                }}
              >
                <CompParamCell style={{ padding: '4px' }}>
                  <FormInput
                    value={row.cluster}
                    onChange={e =>
                      onChangeGraduationTable(
                        data.graduationTable.map(r =>
                          r.id === row.id ? { ...r, cluster: e.target.value } : r
                        )
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompParamCell>
                <CompResponseCell style={{ borderLeft: 'none', padding: '4px' }}>
                  <FormInput
                    value={row.mainStream || ''}
                    onChange={e =>
                      onChangeGraduationTable(
                        data.graduationTable.map(r =>
                          r.id === row.id ? { ...r, mainStream: e.target.value } : r
                        )
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none', padding: '4px' }}>
                  <FormInput
                    value={row.subStream || ''}
                    onChange={e =>
                      onChangeGraduationTable(
                        data.graduationTable.map(r =>
                          r.id === row.id ? { ...r, subStream: e.target.value } : r
                        )
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none', padding: '4px' }}>
                  <FormInput
                    value={row.specialization || ''}
                    onChange={e =>
                      onChangeGraduationTable(
                        data.graduationTable.map(r =>
                          r.id === row.id ? { ...r, specialization: e.target.value } : r
                        )
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none', padding: '4px' }}>
                  <FormTextarea
                    value={row.reasoning || ''}
                    onChange={e =>
                      onChangeGraduationTable(
                        data.graduationTable.map(r =>
                          r.id === row.id ? { ...r, reasoning: e.target.value } : r
                        )
                      )
                    }
                    style={{ width: '100%', minHeight: '60px', padding: '4px', fontSize: '0.8rem' }}
                  />
                </CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none', padding: '4px' }}>
                  <FormInput
                    value={row.keyExams}
                    onChange={e =>
                      onChangeGraduationTable(
                        data.graduationTable.map(r =>
                          r.id === row.id ? { ...r, keyExams: e.target.value } : r
                        )
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompResponseCell>
                <CompResponseCell
                  style={{
                    borderLeft: 'none',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Tooltip content="Delete Row">
                    <TableActionButton
                      type="button"
                      onClick={() =>
                        onChangeGraduationTable(data.graduationTable.filter(r => r.id !== row.id))
                      }
                    >
                      <RiDeleteBinLine size={16} />
                    </TableActionButton>
                  </Tooltip>
                </CompResponseCell>
              </CompDataRow>
            ))}
          </CompTableContainer>

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
        </div>

        {/* Colleges After Class 11 & 12 Table */}
        <div id="sec-c-colleges" style={{ marginTop: '20px' }}>
          <SectionBlockTitle style={{ marginBottom: '12px' }}>
            Colleges After Class 11&12
          </SectionBlockTitle>
          <CompTableContainer style={{ overflowX: 'auto' }}>
            <CompTableHeaderRow
              style={{
                gridTemplateColumns: '1fr 140px 120px 120px 140px 100px 160px 60px',
                minWidth: '950px',
              }}
            >
              <CompTableHeaderCell>College Name</CompTableHeaderCell>
              <CompTableHeaderCell>Location</CompTableHeaderCell>
              <CompTableHeaderCell>Type</CompTableHeaderCell>
              <CompTableHeaderCell>Course</CompTableHeaderCell>
              <CompTableHeaderCell>Entrance Exam</CompTableHeaderCell>
              <CompTableHeaderCell>Ranking</CompTableHeaderCell>
              <CompTableHeaderCell>Website</CompTableHeaderCell>
              <CompTableHeaderCell style={{ textAlign: 'center' }}>Action</CompTableHeaderCell>
            </CompTableHeaderRow>

            {(data.collegesTable || []).map(row => (
              <CompDataRow
                key={row.id}
                style={{
                  gridTemplateColumns: '1fr 140px 120px 120px 140px 100px 160px 60px',
                  minWidth: '950px',
                }}
              >
                <CompParamCell style={{ padding: '4px' }}>
                  <FormInput
                    value={row.collegeName}
                    onChange={e =>
                      onChangeCollegesTable(
                        data.collegesTable.map(r =>
                          r.id === row.id ? { ...r, collegeName: e.target.value } : r
                        )
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompParamCell>
                <CompResponseCell style={{ borderLeft: 'none', padding: '4px' }}>
                  <FormInput
                    value={row.location}
                    onChange={e =>
                      onChangeCollegesTable(
                        data.collegesTable.map(r =>
                          r.id === row.id ? { ...r, location: e.target.value } : r
                        )
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none', padding: '4px' }}>
                  <FormInput
                    value={row.type}
                    onChange={e =>
                      onChangeCollegesTable(
                        data.collegesTable.map(r =>
                          r.id === row.id ? { ...r, type: e.target.value } : r
                        )
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none', padding: '4px' }}>
                  <FormInput
                    value={row.course}
                    onChange={e =>
                      onChangeCollegesTable(
                        data.collegesTable.map(r =>
                          r.id === row.id ? { ...r, course: e.target.value } : r
                        )
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none', padding: '4px' }}>
                  <FormInput
                    value={row.entranceExam}
                    onChange={e =>
                      onChangeCollegesTable(
                        data.collegesTable.map(r =>
                          r.id === row.id ? { ...r, entranceExam: e.target.value } : r
                        )
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none', padding: '4px' }}>
                  <FormInput
                    value={row.ranking}
                    onChange={e =>
                      onChangeCollegesTable(
                        data.collegesTable.map(r =>
                          r.id === row.id ? { ...r, ranking: e.target.value } : r
                        )
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none', padding: '4px' }}>
                  <FormInput
                    value={row.website}
                    onChange={e =>
                      onChangeCollegesTable(
                        data.collegesTable.map(r =>
                          r.id === row.id ? { ...r, website: e.target.value } : r
                        )
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompResponseCell>
                <CompResponseCell
                  style={{
                    borderLeft: 'none',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Tooltip content="Delete Row">
                    <TableActionButton
                      type="button"
                      onClick={() =>
                        onChangeCollegesTable(data.collegesTable.filter(r => r.id !== row.id))
                      }
                    >
                      <RiDeleteBinLine size={16} />
                    </TableActionButton>
                  </Tooltip>
                </CompResponseCell>
              </CompDataRow>
            ))}
          </CompTableContainer>
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

        {/* Career Compass Cluster Table */}
        <div style={{ marginTop: '20px' }}>
          <SectionBlockTitle style={{ marginBottom: '12px' }}>
            Career Compass (Indicative Clusters)
          </SectionBlockTitle>
          <CompTableContainer style={{ overflowX: 'auto' }}>
            <CompTableHeaderRow
              style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr 120px 1fr 60px', minWidth: '950px' }}
            >
              <CompTableHeaderCell>Cluster</CompTableHeaderCell>
              <CompTableHeaderCell>Industry</CompTableHeaderCell>
              <CompTableHeaderCell>Domain</CompTableHeaderCell>
              <CompTableHeaderCell>Stream Requirement</CompTableHeaderCell>
              <CompTableHeaderCell>Grading Level</CompTableHeaderCell>
              <CompTableHeaderCell>Meaning</CompTableHeaderCell>
              <CompTableHeaderCell style={{ textAlign: 'center' }}>Action</CompTableHeaderCell>
            </CompTableHeaderRow>

            {(data.careerCompassClusterTable || []).map(row => (
              <CompDataRow
                key={row.id}
                style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr 120px 1fr 60px', minWidth: '950px' }}
              >
                <CompParamCell style={{ padding: '4px' }}>
                  <FormInput
                    value={row.cluster}
                    onChange={e =>
                      onChangeCompassClusterTable(
                        data.careerCompassClusterTable.map(r =>
                          r.id === row.id ? { ...r, cluster: e.target.value } : r
                        )
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompParamCell>
                <CompResponseCell style={{ borderLeft: 'none', padding: '4px' }}>
                  <FormInput
                    value={row.industry}
                    onChange={e =>
                      onChangeCompassClusterTable(
                        data.careerCompassClusterTable.map(r =>
                          r.id === row.id ? { ...r, industry: e.target.value } : r
                        )
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none', padding: '4px' }}>
                  <FormInput
                    value={row.domain}
                    onChange={e =>
                      onChangeCompassClusterTable(
                        data.careerCompassClusterTable.map(r =>
                          r.id === row.id ? { ...r, domain: e.target.value } : r
                        )
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none', padding: '4px' }}>
                  <FormInput
                    value={row.streamRequirement}
                    onChange={e =>
                      onChangeCompassClusterTable(
                        data.careerCompassClusterTable.map(r =>
                          r.id === row.id ? { ...r, streamRequirement: e.target.value } : r
                        )
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none', padding: '4px' }}>
                  <FormInput
                    value={row.gradingLevel}
                    onChange={e =>
                      onChangeCompassClusterTable(
                        data.careerCompassClusterTable.map(r =>
                          r.id === row.id ? { ...r, gradingLevel: e.target.value } : r
                        )
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none', padding: '4px' }}>
                  <FormInput
                    value={row.meaning}
                    onChange={e =>
                      onChangeCompassClusterTable(
                        data.careerCompassClusterTable.map(r =>
                          r.id === row.id ? { ...r, meaning: e.target.value } : r
                        )
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompResponseCell>
                <CompResponseCell
                  style={{
                    borderLeft: 'none',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Tooltip content="Delete Row">
                    <TableActionButton
                      type="button"
                      onClick={() =>
                        onChangeCompassClusterTable(
                          data.careerCompassClusterTable.filter(r => r.id !== row.id)
                        )
                      }
                    >
                      <RiDeleteBinLine size={16} />
                    </TableActionButton>
                  </Tooltip>
                </CompResponseCell>
              </CompDataRow>
            ))}
          </CompTableContainer>
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
        </div>

        {/* 3. Career Compass Job Roles Table */}
        <div id="sec-c-target-roles" style={{ marginTop: '20px' }}>
          <SectionBlockTitle style={{ marginBottom: '4px' }}>
            Career Compass (Target Roles & Compensation)
          </SectionBlockTitle>
          <div style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '12px' }}>
            All 18 trait scores were matched against the full career domain library. Counsellors can
            also propose new job roles and map domains for App Admin approval.
          </div>
          <CompTableContainer style={{ overflowX: 'auto' }}>
            <CompTableHeaderRow
              style={{
                gridTemplateColumns: '180px 160px 1fr 180px 120px 120px 120px 60px',
                minWidth: '1050px',
              }}
            >
              <CompTableHeaderCell>Domain</CompTableHeaderCell>
              <CompTableHeaderCell>Target Role</CompTableHeaderCell>
              <CompTableHeaderCell>Why It Fits</CompTableHeaderCell>
              <CompTableHeaderCell>Top Employers</CompTableHeaderCell>
              <CompTableHeaderCell>AI Resilience</CompTableHeaderCell>
              <CompTableHeaderCell>Salary (India)</CompTableHeaderCell>
              <CompTableHeaderCell>Salary (Abroad)</CompTableHeaderCell>
              <CompTableHeaderCell style={{ textAlign: 'center' }}>Action</CompTableHeaderCell>
            </CompTableHeaderRow>

            {data.careerCompassTable.map(row => (
              <CompDataRow
                key={row.id}
                style={{
                  gridTemplateColumns: '180px 160px 1fr 180px 120px 120px 120px 60px',
                  minWidth: '1050px',
                }}
              >
                <CompParamCell style={{ padding: '4px' }}>
                  <Select
                    value={row.domain}
                    options={
                      DOMAIN_OPTIONS.some(opt => opt.value === row.domain) || !row.domain
                        ? DOMAIN_OPTIONS
                        : [{ value: row.domain, label: row.domain }, ...DOMAIN_OPTIONS]
                    }
                    onChange={e =>
                      onChangeCompassTable(
                        data.careerCompassTable.map(r =>
                          r.id === row.id ? { ...r, domain: e.target.value } : r
                        )
                      )
                    }
                    placeholder="Select Domain"
                    fullWidth
                  />
                </CompParamCell>
                <CompResponseCell style={{ borderLeft: 'none', padding: '4px' }}>
                  <FormInput
                    value={row.role}
                    onChange={e =>
                      onChangeCompassTable(
                        data.careerCompassTable.map(r =>
                          r.id === row.id ? { ...r, role: e.target.value } : r
                        )
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none', padding: '4px' }}>
                  <FormInput
                    value={row.whyItFits}
                    onChange={e =>
                      onChangeCompassTable(
                        data.careerCompassTable.map(r =>
                          r.id === row.id ? { ...r, whyItFits: e.target.value } : r
                        )
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none', padding: '4px' }}>
                  <FormTextarea
                    value={row.topEmployers}
                    onChange={e =>
                      onChangeCompassTable(
                        data.careerCompassTable.map(r =>
                          r.id === row.id ? { ...r, topEmployers: e.target.value } : r
                        )
                      )
                    }
                    style={{ width: '100%', minHeight: '60px', padding: '4px', fontSize: '0.8rem' }}
                  />
                </CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none', padding: '4px' }}>
                  <FormTextarea
                    value={row.aiResilience}
                    onChange={e =>
                      onChangeCompassTable(
                        data.careerCompassTable.map(r =>
                          r.id === row.id ? { ...r, aiResilience: e.target.value } : r
                        )
                      )
                    }
                    style={{ width: '100%', minHeight: '60px', padding: '4px', fontSize: '0.8rem' }}
                  />
                </CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none', padding: '4px' }}>
                  <FormInput
                    value={row.salaryIndia}
                    onChange={e =>
                      onChangeCompassTable(
                        data.careerCompassTable.map(r =>
                          r.id === row.id ? { ...r, salaryIndia: e.target.value } : r
                        )
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none', padding: '4px' }}>
                  <FormInput
                    value={row.salaryAbroad}
                    onChange={e =>
                      onChangeCompassTable(
                        data.careerCompassTable.map(r =>
                          r.id === row.id ? { ...r, salaryAbroad: e.target.value } : r
                        )
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompResponseCell>
                <CompResponseCell
                  style={{
                    borderLeft: 'none',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Tooltip content="Delete Row">
                    <TableActionButton
                      type="button"
                      onClick={() =>
                        onChangeCompassTable(data.careerCompassTable.filter(r => r.id !== row.id))
                      }
                    >
                      <RiDeleteBinLine size={16} />
                    </TableActionButton>
                  </Tooltip>
                </CompResponseCell>
              </CompDataRow>
            ))}
          </CompTableContainer>

          <div
            style={{
              marginTop: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
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
        </div>
      </SectionBlock>

      <CareerLibraryPickerModal
        isOpen={isCLModalOpen}
        onClose={() => setIsCLModalOpen(false)}
        onAddRoles={handleAddCLRoles}
      />
    </>
  );
};
