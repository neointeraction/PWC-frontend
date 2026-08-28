import React from 'react';
import { CounsellorFormChartData } from '@/mocks/studentFormChart.mock';
import styled from 'styled-components';
import {
  RiUser3Line,
  RiGraduationCapLine,
  RiBuilding4Line,
  RiBriefcaseLine,
  RiBookOpenLine,
} from 'react-icons/ri';
import {
  StepHeaderCard,
  StepHeaderTitle,
  StepHeaderDescription,
  SectionBlock,
  SectionBlockTitle,
} from '../StudentFormChartPage.styles';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const HeaderIconBox = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => `${theme.colors.primary}26`};
`;

const HeaderTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div<{ $fullWidth?: boolean }>`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s ease;
  ${({ $fullWidth }) => ($fullWidth ? 'grid-column: 1 / -1;' : '')}

  &:hover {
    border-color: ${({ theme }) => `${theme.colors.primary}40`};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }
`;

const CardIconWrapper = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => `${theme.colors.primary}20`};
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

const CardLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CardValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.4;
  word-break: break-word;
`;

interface Step0StudentInfoProps {
  data: CounsellorFormChartData['studentInfo'];
  onChange: (updated: Partial<CounsellorFormChartData['studentInfo']>) => void;
}

export const Step0StudentInfo: React.FC<Step0StudentInfoProps> = ({ data }) => {
  return (
    <>
      <StepHeaderCard>
        <HeaderContainer>
          <HeaderIconBox>
            <RiUser3Line size={24} />
          </HeaderIconBox>
          <HeaderTextGroup>
            <StepHeaderTitle style={{ margin: 0 }}>Our Champion</StepHeaderTitle>
            <StepHeaderDescription>
              Core onboarding details pulled from the student profile.
            </StepHeaderDescription>
          </HeaderTextGroup>
        </HeaderContainer>
      </StepHeaderCard>

      <SectionBlock>
        <SectionBlockTitle>Champion Details</SectionBlockTitle>

        <CardsGrid>
          {/* Card 1: Champion Name */}
          <InfoCard>
            <CardIconWrapper>
              <RiUser3Line size={20} />
            </CardIconWrapper>
            <CardContent>
              <CardLabel>Name of the Champion</CardLabel>
              <CardValue>{data.studentName || '—'}</CardValue>
            </CardContent>
          </InfoCard>

          {/* Card 2: Current Academic Year */}
          <InfoCard>
            <CardIconWrapper>
              <RiGraduationCapLine size={20} />
            </CardIconWrapper>
            <CardContent>
              <CardLabel>Current Academic Year</CardLabel>
              <CardValue>{data.className || '—'}</CardValue>
            </CardContent>
          </InfoCard>

          {/* Card 3: Institute & Location */}
          <InfoCard>
            <CardIconWrapper>
              <RiBuilding4Line size={20} />
            </CardIconWrapper>
            <CardContent>
              <CardLabel>Institute & Location</CardLabel>
              <CardValue>{data.instituteName || '—'}</CardValue>
            </CardContent>
          </InfoCard>

          {/* Spacer / Empty alignment or span */}
          <div />

          {/* Card 4: Father's Name */}
          <InfoCard>
            <CardIconWrapper>
              <RiUser3Line size={20} />
            </CardIconWrapper>
            <CardContent>
              <CardLabel>Father&apos;s Name</CardLabel>
              <CardValue>{data.fatherName || '—'}</CardValue>
            </CardContent>
          </InfoCard>

          {/* Card 5: Occupation & Company (Father) */}
          <InfoCard>
            <CardIconWrapper>
              <RiBriefcaseLine size={20} />
            </CardIconWrapper>
            <CardContent>
              <CardLabel>Occupation & Company (Father)</CardLabel>
              <CardValue>{data.fatherOccupation || '—'}</CardValue>
            </CardContent>
          </InfoCard>

          {/* Card 6: Mother's Name */}
          <InfoCard>
            <CardIconWrapper>
              <RiUser3Line size={20} />
            </CardIconWrapper>
            <CardContent>
              <CardLabel>Mother&apos;s Name</CardLabel>
              <CardValue>{data.motherName || '—'}</CardValue>
            </CardContent>
          </InfoCard>

          {/* Card 7: Occupation & Company (Mother) */}
          <InfoCard>
            <CardIconWrapper>
              <RiBookOpenLine size={20} />
            </CardIconWrapper>
            <CardContent>
              <CardLabel>Occupation & Company (Mother)</CardLabel>
              <CardValue>{data.motherOccupation || '—'}</CardValue>
            </CardContent>
          </InfoCard>
        </CardsGrid>
      </SectionBlock>
    </>
  );
};

