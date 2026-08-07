import React from 'react';
import { RiAddLine, RiDeleteBinLine } from 'react-icons/ri';
import { CounsellorFormChartData, AcademicRecord } from '@/mocks/studentFormChart.mock';
import { Button } from '@/components/Button';
import { Select } from '@/components/Select';
import { Tooltip } from '@/components/Tooltip';
import {
  StepHeaderCard,
  StepHeaderTitle,
  StepHeaderDescription,
  SectionBlock,
  SectionBlockTitle,
  FormGrid,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  CompTableContainer,
  CompTableHeaderRow,
  CompTableHeaderCell,
  CompDataRow,
  CompParamCell,
  CompResponseCell,
  SynthesisPanel,
  SynthesisPanelHeader,
  SynthesisRowList,
  TableActionButton,
} from '../StudentFormChartPage.styles';

interface Step0StudentInfoProps {
  data: CounsellorFormChartData['studentInfo'];
  onChange: (updated: Partial<CounsellorFormChartData['studentInfo']>) => void;
}

const trendOptions = [
  { value: 'Improving', label: 'Improving Trend' },
  { value: 'Stable', label: 'Stable Trend' },
  { value: 'Declining', label: 'Declining Trend' },
  { value: 'Not Assessed', label: 'Not Assessed' },
];

export const Step0StudentInfo: React.FC<Step0StudentInfoProps> = ({ data, onChange }) => {
  const handleRecordChange = (id: string, field: keyof AcademicRecord, value: string) => {
    const updatedRecords = data.academicRecords.map(r =>
      r.id === id ? { ...r, [field]: value } : r
    );
    onChange({ academicRecords: updatedRecords });
  };

  const handleAddRecord = () => {
    const newRecord: AcademicRecord = {
      id: `rec-${Date.now()}`,
      classLevel: `Class ${data.academicRecords.length + 7}`,
      subject: 'Core Subjects',
      grade: 'A',
    };
    onChange({ academicRecords: [...data.academicRecords, newRecord] });
  };

  const handleDeleteRecord = (id: string) => {
    onChange({ academicRecords: data.academicRecords.filter(r => r.id !== id) });
  };

  return (
    <>
      <StepHeaderCard>
        <StepHeaderTitle>Step 0 · Student Profile Information</StepHeaderTitle>
        <StepHeaderDescription>
          Record core onboarding details, historical academic grades (Class 7, 8 & 9), and initial academic trend observations.
        </StepHeaderDescription>
      </StepHeaderCard>

      <SectionBlock>
        <SectionBlockTitle>Student Onboarding Details</SectionBlockTitle>
        <FormGrid $cols={2}>
          <FormGroup>
            <FormLabel>Student Name</FormLabel>
            <FormInput
              value={data.studentName}
              onChange={e => onChange({ studentName: e.target.value })}
              placeholder="e.g. Aarav Sharma"
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Current Class / Grade</FormLabel>
            <FormInput
              value={data.className}
              onChange={e => onChange({ className: e.target.value })}
              placeholder="e.g. Class 10 - Section A"
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Parent Name(s)</FormLabel>
            <FormInput
              value={data.parentName}
              onChange={e => onChange({ parentName: e.target.value })}
              placeholder="e.g. Rajesh Sharma & Sunita Sharma"
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Parent Occupation(s)</FormLabel>
            <FormInput
              value={data.occupation}
              onChange={e => onChange({ occupation: e.target.value })}
              placeholder="e.g. Software Engineer & Educator"
            />
          </FormGroup>
        </FormGrid>
      </SectionBlock>

      <SectionBlock>
        <SectionBlockTitle>Academic Record (Class 7, 8 & 9)</SectionBlockTitle>
        <CompTableContainer>
          <CompTableHeaderRow style={{ gridTemplateColumns: '150px 1fr 150px 60px' }}>
            <CompTableHeaderCell>Class Level</CompTableHeaderCell>
            <CompTableHeaderCell>Subject Focus</CompTableHeaderCell>
            <CompTableHeaderCell>Grade / Percentage</CompTableHeaderCell>
            <CompTableHeaderCell style={{ textAlign: 'center' }}>Action</CompTableHeaderCell>
          </CompTableHeaderRow>

          {data.academicRecords.map(rec => (
            <CompDataRow key={rec.id} style={{ gridTemplateColumns: '150px 1fr 150px 60px' }}>
              <CompParamCell>
                <FormInput
                  value={rec.classLevel}
                  onChange={e => handleRecordChange(rec.id, 'classLevel', e.target.value)}
                  style={{ width: '100%' }}
                />
              </CompParamCell>
              <CompResponseCell style={{ borderLeft: 'none' }}>
                <FormInput
                  value={rec.subject}
                  onChange={e => handleRecordChange(rec.id, 'subject', e.target.value)}
                  style={{ width: '100%' }}
                />
              </CompResponseCell>
              <CompResponseCell style={{ borderLeft: 'none' }}>
                <FormInput
                  value={rec.grade}
                  onChange={e => handleRecordChange(rec.id, 'grade', e.target.value)}
                  style={{ width: '100%' }}
                />
              </CompResponseCell>
              <CompResponseCell style={{ borderLeft: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Tooltip content="Delete Record">
                  <TableActionButton type="button" onClick={() => handleDeleteRecord(rec.id)}>
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
            onClick={handleAddRecord}
          >
            Add Academic Record Row
          </Button>
        </div>
      </SectionBlock>

      <SynthesisPanel>
        <SynthesisPanelHeader>Academic Trend Synthesis Note</SynthesisPanelHeader>
        <SynthesisRowList>
          <FormGroup>
            <FormLabel>Academic Trend Rating</FormLabel>
            <Select
              options={trendOptions}
              value={data.academicTrend}
              onChange={e => onChange({ academicTrend: e.target.value as any })}
            />
          </FormGroup>

          <FormGroup style={{ marginTop: '12px' }}>
            <FormLabel>Academic Trend Counsellor Observation</FormLabel>
            <FormTextarea
              value={data.academicTrendNotes}
              onChange={e => onChange({ academicTrendNotes: e.target.value })}
              placeholder="Record notes on student trajectory from Class 7 to 9..."
            />
          </FormGroup>
        </SynthesisRowList>
      </SynthesisPanel>
    </>
  );
};
