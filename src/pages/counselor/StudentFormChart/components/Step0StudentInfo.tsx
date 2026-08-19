import React from 'react';
import { CounsellorFormChartData } from '@/mocks/studentFormChart.mock';
import styled from 'styled-components';
import {
  StepHeaderCard,
  StepHeaderTitle,
  StepHeaderDescription,
  SectionBlock,
  SectionBlockTitle,
} from '../StudentFormChartPage.styles';

const InfoTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 8px 0 16px 0;
`;

const InfoGroupRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const HeaderRow = styled.div<{ $cols: 2 | 3 }>`
  display: grid;
  grid-template-columns: ${({ $cols }) => ($cols === 3 ? '1fr 1fr 1.5fr' : '1fr 2.5fr')};
  gap: 24px;
  padding-bottom: 4px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const ColumnHeader = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: #5b6b82;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ValueRow = styled.div<{ $cols: 2 | 3 }>`
  display: grid;
  grid-template-columns: ${({ $cols }) => ($cols === 3 ? '1fr 1fr 1.5fr' : '1fr 2.5fr')};
  gap: 24px;
  padding-top: 2px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const ColumnValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
`;

interface Step0StudentInfoProps {
  data: CounsellorFormChartData['studentInfo'];
  onChange: (updated: Partial<CounsellorFormChartData['studentInfo']>) => void;
}

export const Step0StudentInfo: React.FC<Step0StudentInfoProps> = ({ data }) => {
  return (
    <>
      <StepHeaderCard>
        <StepHeaderTitle>Our Champion</StepHeaderTitle>
        <StepHeaderDescription>
          Core onboarding details pulled from the student profile.
        </StepHeaderDescription>
      </StepHeaderCard>

      <SectionBlock>
        <SectionBlockTitle>Champion Details</SectionBlockTitle>

        <InfoTableWrapper>
          {/* Row 1: Champion Core Info */}
          <InfoGroupRow>
            <HeaderRow $cols={3}>
              <ColumnHeader>Name of the Champion</ColumnHeader>
              <ColumnHeader>Current Academic Year</ColumnHeader>
              <ColumnHeader>Name of the Institute & Location</ColumnHeader>
            </HeaderRow>
            <ValueRow $cols={3}>
              <ColumnValue>{data.studentName}</ColumnValue>
              <ColumnValue>{data.className}</ColumnValue>
              <ColumnValue>{data.instituteName}</ColumnValue>
            </ValueRow>
          </InfoGroupRow>

          {/* Row 2: Father Info */}
          <InfoGroupRow>
            <HeaderRow $cols={2}>
              <ColumnHeader>Father&apos;s Name</ColumnHeader>
              <ColumnHeader>Occupation & Company (Father)</ColumnHeader>
            </HeaderRow>
            <ValueRow $cols={2}>
              <ColumnValue>{data.fatherName}</ColumnValue>
              <ColumnValue>{data.fatherOccupation}</ColumnValue>
            </ValueRow>
          </InfoGroupRow>

          {/* Row 3: Mother Info */}
          <InfoGroupRow>
            <HeaderRow $cols={2}>
              <ColumnHeader>Mother&apos;s Name</ColumnHeader>
              <ColumnHeader>Occupation & Company (Mother)</ColumnHeader>
            </HeaderRow>
            <ValueRow $cols={2}>
              <ColumnValue>{data.motherName}</ColumnValue>
              <ColumnValue>{data.motherOccupation}</ColumnValue>
            </ValueRow>
          </InfoGroupRow>
        </InfoTableWrapper>
      </SectionBlock>
    </>
  );
};

