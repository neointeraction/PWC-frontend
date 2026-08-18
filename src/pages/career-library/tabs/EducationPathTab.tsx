import React from 'react';
import styled from 'styled-components';
import { Card } from '@/components/Card';
import { Career } from '@/types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const TimelineCard = styled.div`
  background-color: #f7f5fc;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing.xxl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  position: relative;
`;

const TimelineLineWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 ${({ theme }) => theme.spacing.xl};

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-50%);
    z-index: 1;
  }
`;

const TimelineDot = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  border: 4px solid #f7f5fc;
  z-index: 2;
  position: relative;
`;

const StepGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.div`
  background-color: #ece8f6;
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StepLabel = styled.span`
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #c49419;
`;

const StepTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const StepSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

const CertificationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const CertCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const CertTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const PillGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const CertPill = styled.span`
  background-color: #ece8f6;
  color: ${({ theme }) => theme.colors.text};
  border-radius: 20px;
  padding: 8px 18px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 600;
`;



interface EducationPathTabProps {
  role: Career;
}

// Certifications arrive as a '; '-joined string from the mapper — split back to pills.
const toList = (value?: string): string[] =>
  (value || '')
    .split(/[;,]/)
    .map(item => item.trim())
    .filter(Boolean);

export const EducationPathTab: React.FC<EducationPathTabProps> = ({ role }) => {
  const studentCerts = toList(role.certificationsStudents);
  const ugCerts = toList(role.certificationsUG);

  return (
    <Container>
      <TimelineCard>
        <TimelineLineWrapper>
          <TimelineDot />
          <TimelineDot />
          <TimelineDot />
        </TimelineLineWrapper>

        <StepGrid>
          <StepCard>
            <StepLabel>10+2</StepLabel>
            <StepTitle>{role.minQual10th12thRecommendedSubjects || '—'}</StepTitle>
            {role.qualification10th12thExplanation && (
              <StepSubtitle>{role.qualification10th12thExplanation}</StepSubtitle>
            )}
          </StepCard>

          <StepCard>
            <StepLabel>GRADUATE</StepLabel>
            <StepTitle>{role.minQualGradRecommendedSubjects || '—'}</StepTitle>
            {role.qualificationGraduationDefined && (
              <StepSubtitle>{role.qualificationGraduationDefined}</StepSubtitle>
            )}
          </StepCard>

          <StepCard>
            <StepLabel>POST-GRADUATE</StepLabel>
            <StepTitle>{role.minQualPGRecommendedSubjects || '—'}</StepTitle>
            {role.qualificationPGDefined && (
              <StepSubtitle>{role.qualificationPGDefined}</StepSubtitle>
            )}
          </StepCard>
        </StepGrid>
      </TimelineCard>

      <CertificationsGrid>
        <CertCard>
          <CertTitle>Certifications — Student Level</CertTitle>
          <PillGroup>
            {studentCerts.length > 0 ? (
              studentCerts.map((cert, i) => <CertPill key={i}>{cert}</CertPill>)
            ) : (
              <StepSubtitle>No certifications listed.</StepSubtitle>
            )}
          </PillGroup>
        </CertCard>

        <CertCard>
          <CertTitle>Certifications — Undergraduate Level</CertTitle>
          <PillGroup>
            {ugCerts.length > 0 ? (
              ugCerts.map((cert, i) => <CertPill key={i}>{cert}</CertPill>)
            ) : (
              <StepSubtitle>No certifications listed.</StepSubtitle>
            )}
          </PillGroup>
        </CertCard>
      </CertificationsGrid>
    </Container>
  );
};
