import React from 'react';
import styled from 'styled-components';
import { InstitutionDetail } from '@/types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const InstCard = styled.div`
  background-color: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  min-height: 440px;
`;

const TopContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const BadgePill = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  border-radius: 20px;
  padding: 4px 16px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 700;
  width: fit-content;
`;

const InstName = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const CityText = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: 4px 0;
`;

const DetailList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.4;
`;

const DetailRow = styled.div`
  strong {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 700;
  }
`;

const LinkText = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  word-break: break-all;

  &:hover {
    text-decoration: underline;
  }
`;

interface InstitutionsTabProps {
  institutions: InstitutionDetail[];
}

export const InstitutionsTab: React.FC<InstitutionsTabProps> = ({ institutions }) => {
  return (
    <Container>
      <Grid>
        {institutions.map(inst => (
          <InstCard key={inst.id}>
            <TopContent>
              <BadgePill>{inst.badge}</BadgePill>
              <InstName>{inst.name}</InstName>
              <CityText>{inst.cityState}</CityText>
              <Divider />

              <DetailList>
                <DetailRow>
                  <strong>Entrance:</strong> {inst.entranceExam}
                </DetailRow>

                <DetailRow>
                  <strong>Programs Offered:</strong> {inst.programsOffered}
                </DetailRow>

                <DetailRow>
                  <strong>RANKING:</strong> {inst.ranking}
                </DetailRow>

                <DetailRow>
                  <strong>WEBSITE:</strong>{' '}
                  <LinkText href={inst.website} target="_blank" rel="noopener noreferrer">
                    {inst.website}
                  </LinkText>
                </DetailRow>
              </DetailList>
            </TopContent>
          </InstCard>
        ))}
      </Grid>
    </Container>
  );
};
