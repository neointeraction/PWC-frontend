import React from 'react';
import { RiAddLine, RiDeleteBinLine } from 'react-icons/ri';
import {
  CounsellorFormChartData,
  StreamFitItem,
  GraduationItem,
  CareerCompassItem,
} from '@/mocks/studentFormChart.mock';
import { Button } from '@/components/Button';
import { Tooltip } from '@/components/Tooltip';
import { ComparisonTable } from './ComparisonTable';
import { SynthesisNotesPanel } from './SynthesisNotesPanel';
import {
  StepHeaderCard,
  StepHeaderTitle,
  StepHeaderDescription,
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
  SynthesisPanel,
  SynthesisPanelHeader,
  SynthesisRowList,
  TableActionButton,
} from '../StudentFormChartPage.styles';

interface Step3SectionCProps {
  data: CounsellorFormChartData['sectionC'];
  onChangeNotesPre: (code: string, value: string) => void;
  onChangeStreamTable: (table: StreamFitItem[]) => void;
  onChangeWhyStream1: (value: string) => void;
  onChangeNotesE: (code: string, value: string) => void;
  onChangeGraduationTable: (table: GraduationItem[]) => void;
  onChangeWhyStream2: (value: string) => void;
  onChangeNotesF: (code: string, value: string) => void;
  onChangeCompassTable: (table: CareerCompassItem[]) => void;
}

const synthesisRowsPreDef = [
  { code: 'D1', placeholder: 'D1 · Career awareness synthesis...' },
  { code: 'D2', placeholder: 'D2 · Primary career aspirations synthesis...' },
  { code: 'D3', placeholder: 'D3 · Influencing factors synthesis...' },
  { code: 'D4', placeholder: 'D4 · Exposure gaps and action items...' },
  { code: 'D5', placeholder: 'D5 · Overall Pre-Counselling Section C summary...' },
];

const synthesisRowsEDef = [
  { code: 'E1', placeholder: 'E1 · Stream fit recommendation note...' },
  { code: 'E2', placeholder: 'E2 · Subject combination guidance...' },
  { code: 'E3', placeholder: 'E3 · Elective selection notes...' },
  { code: 'E4', placeholder: 'E4 · Academic rigor alignment...' },
  { code: 'E5', placeholder: 'E5 · Stream selection conclusion...' },
];

const synthesisRowsFDef = [
  { code: 'F1', placeholder: 'F1 · Graduation degree target notes...' },
  { code: 'F2', placeholder: 'F2 · Specialisation alignment notes...' },
  { code: 'F3', placeholder: 'F3 · Entrance exam strategy...' },
  { code: 'F4', placeholder: 'F4 · Additional study pathways...' },
  { code: 'F5', placeholder: 'F5 · Long-term higher education roadmap...' },
];

export const Step3SectionC: React.FC<Step3SectionCProps> = ({
  data,
  onChangeNotesPre,
  onChangeStreamTable,
  onChangeWhyStream1,
  onChangeNotesE,
  onChangeGraduationTable,
  onChangeWhyStream2,
  onChangeNotesF,
  onChangeCompassTable,
}) => {
  return (
    <>
      <StepHeaderCard>
        <StepHeaderTitle>Section C · Career Clarity & Awareness</StepHeaderTitle>
        <StepHeaderDescription>
          Pre-counselling career awareness comparison, psychometric stream fit, graduation degree targets, and long-term Career Compass pathways.
        </StepHeaderDescription>
      </StepHeaderCard>

      {/* Sub-Block 1: Pre-Counselling View */}
      <SectionBlock>
        <SectionBlockTitle>Pre-Counselling View — Career Clarity & Awareness</SectionBlockTitle>
        <ComparisonTable groups={data.comparisonGroups} />
      </SectionBlock>

      <SynthesisNotesPanel
        title="Pre-Counselling View — Counsellor Synthesis Notes (D1–D5)"
        rows={synthesisRowsPreDef}
        notes={data.synthesisNotesPre}
        onChangeNote={onChangeNotesPre}
      />

      {/* Sub-Block 2: Assessment Result View */}
      <SectionBlock>
        <SectionBlockTitle>Assessment Result View — Stream Fit & Pathways</SectionBlockTitle>

        {/* 1. Stream Fit Table */}
        <CompTableContainer style={{ overflowX: 'auto' }}>
          <CompTableHeaderRow style={{ gridTemplateColumns: '140px 180px 180px 150px 130px 1fr 60px', minWidth: '950px' }}>
            <CompTableHeaderCell>Main Stream</CompTableHeaderCell>
            <CompTableHeaderCell>Sub-Stream</CompTableHeaderCell>
            <CompTableHeaderCell>Core Subjects</CompTableHeaderCell>
            <CompTableHeaderCell>Electives</CompTableHeaderCell>
            <CompTableHeaderCell>Grading Level</CompTableHeaderCell>
            <CompTableHeaderCell>Meaning</CompTableHeaderCell>
            <CompTableHeaderCell style={{ textAlign: 'center' }}>Action</CompTableHeaderCell>
          </CompTableHeaderRow>

          {data.streamFitTable.map(row => (
            <CompDataRow key={row.id} style={{ gridTemplateColumns: '140px 180px 180px 150px 130px 1fr 60px', minWidth: '950px' }}>
              <CompParamCell>
                <FormInput
                  value={row.mainStream}
                  onChange={e =>
                    onChangeStreamTable(
                      data.streamFitTable.map(r => (r.id === row.id ? { ...r, mainStream: e.target.value } : r))
                    )
                  }
                  style={{ width: '100%' }}
                />
              </CompParamCell>
              <CompResponseCell style={{ borderLeft: 'none' }}>
                <FormInput
                  value={row.subStream}
                  onChange={e =>
                    onChangeStreamTable(
                      data.streamFitTable.map(r => (r.id === row.id ? { ...r, subStream: e.target.value } : r))
                    )
                  }
                  style={{ width: '100%' }}
                />
              </CompResponseCell>
              <CompResponseCell style={{ borderLeft: 'none' }}>
                <FormInput
                  value={row.coreSubjects}
                  onChange={e =>
                    onChangeStreamTable(
                      data.streamFitTable.map(r => (r.id === row.id ? { ...r, coreSubjects: e.target.value } : r))
                    )
                  }
                  style={{ width: '100%' }}
                />
              </CompResponseCell>
              <CompResponseCell style={{ borderLeft: 'none' }}>
                <FormInput
                  value={row.electives}
                  onChange={e =>
                    onChangeStreamTable(
                      data.streamFitTable.map(r => (r.id === row.id ? { ...r, electives: e.target.value } : r))
                    )
                  }
                  style={{ width: '100%' }}
                />
              </CompResponseCell>
              <CompResponseCell style={{ borderLeft: 'none' }}>
                <FormInput
                  value={row.gradingLevel}
                  onChange={e =>
                    onChangeStreamTable(
                      data.streamFitTable.map(r => (r.id === row.id ? { ...r, gradingLevel: e.target.value } : r))
                    )
                  }
                  style={{ width: '100%' }}
                />
              </CompResponseCell>
              <CompResponseCell style={{ borderLeft: 'none' }}>
                <FormInput
                  value={row.meaning}
                  onChange={e =>
                    onChangeStreamTable(
                      data.streamFitTable.map(r => (r.id === row.id ? { ...r, meaning: e.target.value } : r))
                    )
                  }
                  style={{ width: '100%' }}
                />
              </CompResponseCell>
              <CompResponseCell style={{ borderLeft: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Tooltip content="Delete Row">
                  <TableActionButton
                    type="button"
                    onClick={() => onChangeStreamTable(data.streamFitTable.filter(r => r.id !== row.id))}
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
                  mainStream: 'Science',
                  subStream: 'PCM',
                  coreSubjects: 'Physics, Math',
                  electives: 'CS',
                  gradingLevel: 'Tier 1',
                  meaning: 'Good Fit',
                },
              ])
            }
          >
            Add Stream Fit Row
          </Button>
        </div>

        {/* Full-width "Why This Stream?" Narrative */}
        <SynthesisPanel style={{ marginTop: '12px' }}>
          <SynthesisPanelHeader>Why This Stream? Narrative (Stream Recommendation)</SynthesisPanelHeader>
          <SynthesisRowList>
            <FormTextarea
              value={data.whyThisStream1}
              onChange={e => onChangeWhyStream1(e.target.value)}
              placeholder="Explain the detailed rationale for recommending this stream..."
              style={{ minHeight: '80px' }}
            />
          </SynthesisRowList>
        </SynthesisPanel>

        {/* Synthesis Notes E1–E5 */}
        <SynthesisNotesPanel
          title="Stream Fit — Counsellor Synthesis Notes (E1–E5)"
          rows={synthesisRowsEDef}
          notes={data.synthesisNotesE}
          onChangeNote={onChangeNotesE}
        />

        {/* 2. Graduation Table */}
        <div style={{ marginTop: '20px' }}>
          <SectionBlockTitle style={{ marginBottom: '12px' }}>Graduation Pathways</SectionBlockTitle>
          <CompTableContainer style={{ overflowX: 'auto' }}>
            <CompTableHeaderRow style={{ gridTemplateColumns: '160px 140px 180px 180px 1fr 60px', minWidth: '950px' }}>
              <CompTableHeaderCell>Cluster</CompTableHeaderCell>
              <CompTableHeaderCell>Degree</CompTableHeaderCell>
              <CompTableHeaderCell>Specialisations</CompTableHeaderCell>
              <CompTableHeaderCell>Additional Path</CompTableHeaderCell>
              <CompTableHeaderCell>Key Exams</CompTableHeaderCell>
              <CompTableHeaderCell style={{ textAlign: 'center' }}>Action</CompTableHeaderCell>
            </CompTableHeaderRow>

            {data.graduationTable.map(row => (
              <CompDataRow key={row.id} style={{ gridTemplateColumns: '160px 140px 180px 180px 1fr 60px', minWidth: '950px' }}>
                <CompParamCell>
                  <FormInput
                    value={row.cluster}
                    onChange={e =>
                      onChangeGraduationTable(
                        data.graduationTable.map(r => (r.id === row.id ? { ...r, cluster: e.target.value } : r))
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompParamCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>
                  <FormInput
                    value={row.degree}
                    onChange={e =>
                      onChangeGraduationTable(
                        data.graduationTable.map(r => (r.id === row.id ? { ...r, degree: e.target.value } : r))
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>
                  <FormInput
                    value={row.specialisations}
                    onChange={e =>
                      onChangeGraduationTable(
                        data.graduationTable.map(r => (r.id === row.id ? { ...r, specialisations: e.target.value } : r))
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>
                  <FormInput
                    value={row.additionalPath}
                    onChange={e =>
                      onChangeGraduationTable(
                        data.graduationTable.map(r => (r.id === row.id ? { ...r, additionalPath: e.target.value } : r))
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>
                  <FormInput
                    value={row.keyExams}
                    onChange={e =>
                      onChangeGraduationTable(
                        data.graduationTable.map(r => (r.id === row.id ? { ...r, keyExams: e.target.value } : r))
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Tooltip content="Delete Row">
                    <TableActionButton
                      type="button"
                      onClick={() => onChangeGraduationTable(data.graduationTable.filter(r => r.id !== row.id))}
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
                    cluster: 'Tech Cluster',
                    degree: 'B.Tech',
                    specialisations: 'AI/ML',
                    additionalPath: 'Dual Degree',
                    keyExams: 'JEE Main',
                  },
                ])
              }
            >
              Add Graduation Pathway Row
            </Button>
          </div>
        </div>

        {/* Second Full-width "Why This Stream?" Narrative */}
        <SynthesisPanel style={{ marginTop: '12px' }}>
          <SynthesisPanelHeader>Why This Graduation Path? Narrative</SynthesisPanelHeader>
          <SynthesisRowList>
            <FormTextarea
              value={data.whyThisStream2}
              onChange={e => onChangeWhyStream2(e.target.value)}
              placeholder="Explain the rationale for the selected graduation degrees and entrance exams..."
              style={{ minHeight: '80px' }}
            />
          </SynthesisRowList>
        </SynthesisPanel>

        {/* Synthesis Notes F1–F5 */}
        <SynthesisNotesPanel
          title="Graduation — Counsellor Synthesis Notes (F1–F5)"
          rows={synthesisRowsFDef}
          notes={data.synthesisNotesF}
          onChangeNote={onChangeNotesF}
        />

        {/* 3. Career Compass Table */}
        <div style={{ marginTop: '20px' }}>
          <SectionBlockTitle style={{ marginBottom: '12px' }}>Career Compass (Target Roles & Compensation)</SectionBlockTitle>
          <CompTableContainer style={{ overflowX: 'auto' }}>
            <CompTableHeaderRow style={{ gridTemplateColumns: '140px 160px 180px 160px 120px 140px 140px 60px', minWidth: '1100px' }}>
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
              <CompDataRow key={row.id} style={{ gridTemplateColumns: '140px 160px 180px 160px 120px 140px 140px 60px', minWidth: '1100px' }}>
                <CompParamCell>
                  <FormInput
                    value={row.domain}
                    onChange={e =>
                      onChangeCompassTable(
                        data.careerCompassTable.map(r => (r.id === row.id ? { ...r, domain: e.target.value } : r))
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompParamCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>
                  <FormInput
                    value={row.role}
                    onChange={e =>
                      onChangeCompassTable(
                        data.careerCompassTable.map(r => (r.id === row.id ? { ...r, role: e.target.value } : r))
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>
                  <FormInput
                    value={row.whyItFits}
                    onChange={e =>
                      onChangeCompassTable(
                        data.careerCompassTable.map(r => (r.id === row.id ? { ...r, whyItFits: e.target.value } : r))
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>
                  <FormInput
                    value={row.topEmployers}
                    onChange={e =>
                      onChangeCompassTable(
                        data.careerCompassTable.map(r => (r.id === row.id ? { ...r, topEmployers: e.target.value } : r))
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>
                  <FormInput
                    value={row.aiResilience}
                    onChange={e =>
                      onChangeCompassTable(
                        data.careerCompassTable.map(r => (r.id === row.id ? { ...r, aiResilience: e.target.value } : r))
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>
                  <FormInput
                    value={row.salaryIndia}
                    onChange={e =>
                      onChangeCompassTable(
                        data.careerCompassTable.map(r => (r.id === row.id ? { ...r, salaryIndia: e.target.value } : r))
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none' }}>
                  <FormInput
                    value={row.salaryAbroad}
                    onChange={e =>
                      onChangeCompassTable(
                        data.careerCompassTable.map(r => (r.id === row.id ? { ...r, salaryAbroad: e.target.value } : r))
                      )
                    }
                    style={{ width: '100%' }}
                  />
                </CompResponseCell>
                <CompResponseCell style={{ borderLeft: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Tooltip content="Delete Row">
                    <TableActionButton
                      type="button"
                      onClick={() => onChangeCompassTable(data.careerCompassTable.filter(r => r.id !== row.id))}
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
                onChangeCompassTable([
                  ...data.careerCompassTable,
                  {
                    id: `cc-${Date.now()}`,
                    domain: 'New Domain',
                    role: 'Target Role',
                    whyItFits: 'Aptitude match',
                    topEmployers: 'Top Tech Firms',
                    aiResilience: 'High',
                    salaryIndia: '₹15 - ₹25 LPA',
                    salaryAbroad: '$100,000/yr',
                  },
                ])
              }
            >
              Add Career Compass Row
            </Button>
          </div>
        </div>
      </SectionBlock>
    </>
  );
};
