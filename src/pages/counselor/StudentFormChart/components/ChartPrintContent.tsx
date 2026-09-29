import React from 'react';
import { CounsellorFormChartData } from '@/mocks/studentFormChart.mock';
import { ScriBandGuidance } from '@/types';
import { ReadOnlyContext } from '../ReadOnlyContext';
import {
  Container,
  MainContentPanel,
  ReadOnlyStepContent,
  ChartPrintStyles,
  StepHeaderTitle,
} from '../StudentFormChartPage.styles';
import { Step0StudentInfo } from './Step0StudentInfo';
import { Step1SectionA } from './Step1SectionA';
import { Step2SectionB } from './Step2SectionB';
import { Step3SectionC } from './Step3SectionC';
import { Step4SectionD } from './Step4SectionD';
import { Step5SectionE } from './Step5SectionE';
import { Step6SCRI } from './Step6SCRI';
import { Step6SectionF } from './Step6SectionF';

interface ChartPrintContentProps {
  studentId: string;
  data: CounsellorFormChartData;
  scriBandGuidance?: ScriBandGuidance[];
}

const noop = () => undefined;

// Every step of the Counsellor Chart stacked read-only, for the backend's headless
// "Download Chart" PDF render (see PrintChartOnlyPage). Nothing here is editable, so all
// change handlers are no-ops.
export const ChartPrintContent: React.FC<ChartPrintContentProps> = ({
  studentId,
  data,
  scriBandGuidance,
}) => (
  <Container>
    <ChartPrintStyles />
    <MainContentPanel>
      <StepHeaderTitle>Counsellor Chart — {data.studentInfo.studentName}</StepHeaderTitle>
      <ReadOnlyStepContent $readOnly>
        <ReadOnlyContext.Provider value>
          <Step0StudentInfo data={data.studentInfo} onChange={noop} />
          <Step1SectionA data={data.sectionA} studentInfo={data.studentInfo} onChangeNotes={noop} />
          <Step2SectionB data={data.sectionB} onChangeNotesPre={noop} onChangeDna={noop} />
          <Step3SectionC
            studentId={studentId}
            data={data.sectionC}
            onChangeNotesPre={noop}
            onChangeGraduationTable={noop}
            onChangeNotesE={noop}
            onChangeEntranceExamsTable={noop}
            onChangeCollegesTable={noop}
            onChangeCollegesAndExamsTable={noop}
            onChangeCompassClusterTable={noop}
            onChangeCompassTable={noop}
          />
          <Step4SectionD data={data.sectionD} onChangeNotes={noop} />
          <Step5SectionE data={data.sectionE} onChangeGrid={noop} />
          <Step6SCRI
            data={data.sectionE}
            bandGuidance={scriBandGuidance}
            onChangeScriRating={noop}
            onChangeAlignment={noop}
            onChangeNotes={noop}
          />
          <Step6SectionF data={data.sectionF} onChangeNotes={noop} />
        </ReadOnlyContext.Provider>
      </ReadOnlyStepContent>
    </MainContentPanel>
  </Container>
);
