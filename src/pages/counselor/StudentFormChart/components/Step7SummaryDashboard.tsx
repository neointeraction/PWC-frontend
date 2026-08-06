import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiCheckDoubleLine, RiSaveLine, RiFileTextLine } from 'react-icons/ri';
import { CounsellorFormChartData } from '@/mocks/studentFormChart.mock';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { ROUTES } from '@/constants';
import {
  StepHeaderCard,
  StepHeaderTitle,
  StepHeaderDescription,
  SectionBlock,
  SectionBlockTitle,
  SummaryCardStrip,
  SummaryCard,
  SummaryCardLabel,
  SummaryCardValue,
  FormGrid,
  FormGroup,
  FormLabel,
} from '../StudentFormChartPage.styles';

interface Step7SummaryDashboardProps {
  formData: CounsellorFormChartData;
  onSaveFinal: () => void;
}

export const Step7SummaryDashboard: React.FC<Step7SummaryDashboardProps> = ({
  formData,
  onSaveFinal,
}) => {
  const navigate = useNavigate();

  const handleGenerateReport = () => {
    navigate(ROUTES.GENERATE_REPORT.replace(':sessionId', formData.sessionId));
  };

  const scriTotal = formData.sectionE.scriItems.reduce((acc, item) => acc + item.rating, 0);

  return (
    <>
      <StepHeaderCard>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <div>
            <StepHeaderTitle>
              Summary Dashboard · Counsellor Form Chart Review
            </StepHeaderTitle>
            <StepHeaderDescription>
              Executive summary consolidating all transcribed responses, test results, SCRI ratings, and synthesis notes for {formData.studentInfo.studentName}.
            </StepHeaderDescription>
          </div>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<RiFileTextLine size={16} />}
            onClick={handleGenerateReport}
          >
            Generate IKIGAI Report
          </Button>
        </div>
      </StepHeaderCard>

      <SummaryCardStrip>
        <SummaryCard>
          <SummaryCardLabel>Student Name</SummaryCardLabel>
          <SummaryCardValue>{formData.studentInfo.studentName}</SummaryCardValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryCardLabel>Current Class</SummaryCardLabel>
          <SummaryCardValue>{formData.studentInfo.className}</SummaryCardValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryCardLabel>Academic Trend</SummaryCardLabel>
          <SummaryCardValue>
            <Badge variant="success">{formData.studentInfo.academicTrend}</Badge>
          </SummaryCardValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryCardLabel>SCRI Score</SummaryCardLabel>
          <SummaryCardValue>{scriTotal} / 24</SummaryCardValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryCardLabel>Academic x Career Alignment</SummaryCardLabel>
          <SummaryCardValue>
            <Badge variant="info">{formData.sectionE.academicCareerAlignment}</Badge>
          </SummaryCardValue>
        </SummaryCard>
      </SummaryCardStrip>

      {/* Summary Highlights per Section */}
      <SectionBlock>
        <SectionBlockTitle>Section A & B Synthesis Highlights</SectionBlockTitle>
        <FormGrid $cols={2}>
          <FormGroup>
            <FormLabel>Career Style & Signature</FormLabel>
            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>
              {formData.sectionB.summaryStrip.careerStyle} — {formData.sectionB.summaryStrip.personalSignature}
            </div>
          </FormGroup>
          <FormGroup>
            <FormLabel>Career DNA Definition</FormLabel>
            <div style={{ fontSize: '0.85rem', color: '#4B5563' }}>
              {formData.sectionB.careerDnaNarrative.dnaDefinition}
            </div>
          </FormGroup>
        </FormGrid>
      </SectionBlock>

      <SectionBlock>
        <SectionBlockTitle>Section C & D Stream Fit & Validity</SectionBlockTitle>
        <FormGrid $cols={2}>
          <FormGroup>
            <FormLabel>Recommended Stream</FormLabel>
            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>
              {formData.sectionC.streamFitTable[0]?.mainStream || 'Science'} ({formData.sectionC.streamFitTable[0]?.subStream || 'PCM'})
            </div>
          </FormGroup>
          <FormGroup>
            <FormLabel>Assessment Reliability Status</FormLabel>
            <div style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: 600 }}>
              High Diagnostic Integrity (&gt;95% Consistency Across Indicators)
            </div>
          </FormGroup>
        </FormGrid>
      </SectionBlock>

      <SectionBlock>
        <SectionBlockTitle>Section E Strategic 3-Phase Roadmap Summary</SectionBlockTitle>
        <FormGrid $cols={3}>
          <FormGroup>
            <FormLabel>Now (Class 9-10)</FormLabel>
            <div style={{ fontSize: '0.85rem' }}>{formData.sectionE.roadmapGrid.nowSkills}</div>
          </FormGroup>
          <FormGroup>
            <FormLabel>Class 11-12 Target</FormLabel>
            <div style={{ fontSize: '0.85rem' }}>{formData.sectionE.roadmapGrid.c11Stream}</div>
          </FormGroup>
          <FormGroup>
            <FormLabel>After Class 12 Degrees</FormLabel>
            <div style={{ fontSize: '0.85rem' }}>{formData.sectionE.roadmapGrid.afterDegrees}</div>
          </FormGroup>
        </FormGrid>
      </SectionBlock>

      <SectionBlock style={{ alignItems: 'center', textAlign: 'center', padding: '32px' }}>
        <RiCheckDoubleLine size={48} color="#10B981" />
        <h3 style={{ margin: '8px 0 4px 0', fontSize: '1.2rem', fontWeight: 700 }}>
          Counsellor Form Chart Complete
        </h3>
        <p style={{ margin: '0 0 16px 0', fontSize: '0.875rem', color: '#6B7280' }}>
          All sections A through F have been reviewed and transcribed. Click below to finalize and record this chart.
        </p>
        <Button
          variant="primary"
          size="lg"
          leftIcon={<RiSaveLine size={18} />}
          onClick={onSaveFinal}
        >
          Save & Finalize Counsellor Form Chart
        </Button>
      </SectionBlock>
    </>
  );
};
