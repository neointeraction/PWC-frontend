import React from 'react';
import { CounsellorFormChartData } from '@/mocks/studentFormChart.mock';
import styled from 'styled-components';
import {
  StepHeaderCard,
  StepHeaderTitle,
  StepHeaderDescription,
  SectionBlock,
  SectionBlockTitle,
  FormGrid,
  FormGroup,
  FormLabel,
} from '../StudentFormChartPage.styles';

const ReadOnlyField = styled.div`
  padding: 4px 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  font-weight: 500;
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
        <FormGrid $cols={3}>
          <FormGroup>
            <FormLabel>Name of the Champion</FormLabel>
            <ReadOnlyField>{data.studentName}</ReadOnlyField>
          </FormGroup>
          <FormGroup>
            <FormLabel>Current Academic Year</FormLabel>
            <ReadOnlyField>{data.className}</ReadOnlyField>
          </FormGroup>
          <FormGroup>
            <FormLabel>Name of the Institute & Location</FormLabel>
            <ReadOnlyField>{data.instituteName}</ReadOnlyField>
          </FormGroup>
          <FormGroup>
            <FormLabel>Father's Name</FormLabel>
            <ReadOnlyField>{data.fatherName}</ReadOnlyField>
          </FormGroup>
          <FormGroup>
            <FormLabel>Occupation & Company (Father)</FormLabel>
            <ReadOnlyField>{data.fatherOccupation}</ReadOnlyField>
          </FormGroup>
          <FormGroup>
            <FormLabel>Mother's Name</FormLabel>
            <ReadOnlyField>{data.motherName}</ReadOnlyField>
          </FormGroup>
          <FormGroup>
            <FormLabel>Occupation & Company (Mother)</FormLabel>
            <ReadOnlyField>{data.motherOccupation}</ReadOnlyField>
          </FormGroup>
        </FormGrid>
      </SectionBlock>
    </>
  );
};
