import React from 'react';
import styled from 'styled-components';
import { CareerIndustry } from '@/types';
import { Tooltip } from '@/components/Tooltip';
import {
  RiEditLine,
  RiDeleteBinLine,
  RiBrushLine,
  RiMovie2Line,
  RiPlayCircleLine,
  RiStackLine,
  RiArrowRightSLine,
} from 'react-icons/ri';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const IndustryCard = styled.div<{ $selected?: boolean }>`
  position: relative;
  background: ${({ $selected, theme }) =>
    $selected
      ? `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryHover} 100%)`
      : theme.colors.surface};
  color: ${({ $selected, theme }) => ($selected ? '#FFFFFF' : theme.colors.text)};
  border: 1px solid
    ${({ $selected, theme }) => ($selected ? theme.colors.primary : theme.colors.border)};
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  min-height: 150px;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};
  box-shadow: ${({ $selected, theme }) =>
    $selected ? '0 8px 20px -4px rgba(93, 35, 132, 0.3)' : theme.colors.shadow};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-3px);
    box-shadow: 0 10px 24px -4px rgba(93, 35, 132, 0.18);

    .action-overlay {
      opacity: 1;
    }

    .arrow-icon {
      transform: translateX(4px);
    }
  }
`;

const CardTopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const IconBadge = styled.div<{ $selected?: boolean }>`
  width: 44px;
  height: 44px;
  border-radius: 4px;
  background-color: ${({ $selected, theme }) =>
    $selected ? 'rgba(255, 255, 255, 0.18)' : theme.colors.primaryLight};
  color: ${({ $selected, theme }) => ($selected ? '#FFFFFF' : theme.colors.primary)};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ActionOverlay = styled.div`
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity ${({ theme }) => theme.transition.fast};
`;

const ActionButton = styled.button<{ $selected?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid
    ${({ $selected, theme }) => ($selected ? 'rgba(255,255,255,0.3)' : theme.colors.border)};
  background-color: ${({ $selected, theme }) =>
    $selected ? 'rgba(255,255,255,0.15)' : theme.colors.surface};
  color: ${({ $selected, theme }) => ($selected ? '#FFFFFF' : theme.colors.textSecondary)};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CardTitle = styled.h3<{ $selected?: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ $selected, theme }) => ($selected ? '#FFFFFF' : theme.colors.text)};
  line-height: 1.3;
  margin: 0;
`;

const CardDesc = styled.p<{ $selected?: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ $selected, theme }) =>
    $selected ? 'rgba(255, 255, 255, 0.85)' : theme.colors.textSecondary};
  margin: 0;
`;

const CardFooterRow = styled.div<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${({ theme }) => theme.spacing.xs};
  border-top: 1px solid
    ${({ $selected, theme }) => ($selected ? 'rgba(255, 255, 255, 0.15)' : theme.colors.border)};
`;

const CountBadge = styled.span<{ $selected?: boolean }>`
  font-size: 11px;
  font-weight: 700;
  color: ${({ $selected, theme }) => ($selected ? '#E5C158' : theme.colors.primary)};
  background-color: ${({ $selected, theme }) =>
    $selected ? 'rgba(229, 193, 88, 0.15)' : theme.colors.primaryLight};
  padding: 3px 8px;
  border-radius: 4px;
`;

const ViewLink = styled.span<{ $selected?: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 600;
  color: ${({ $selected, theme }) => ($selected ? '#FFFFFF' : theme.colors.textSecondary)};
  display: flex;
  align-items: center;
  gap: 2px;
`;



const getIndustryIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('applied')) return <RiBrushLine size={24} />;
  if (n.includes('animation') || n.includes('design')) return <RiMovie2Line size={24} />;
  if (n.includes('performing')) return <RiPlayCircleLine size={24} />;
  return <RiStackLine size={24} />;
};

interface IndustriesViewProps {
  industries: CareerIndustry[];
  selectedIndustryName?: string;
  onSelectIndustry: (industry: CareerIndustry) => void;
  onEditIndustry: (industry: CareerIndustry) => void;
  onDeleteIndustry: (industry: CareerIndustry) => void;
}

export const IndustriesView: React.FC<IndustriesViewProps> = ({
  industries,
  selectedIndustryName,
  onSelectIndustry,
  onEditIndustry,
  onDeleteIndustry,
}) => {
  return (
    <Container>
      <Grid>
        {industries.map(ind => {
          const isSelected = ind.name === selectedIndustryName;
          return (
            <IndustryCard
              key={ind.id}
              $selected={isSelected}
              onClick={() => onSelectIndustry(ind)}
            >
              <CardTopRow>
                <IconBadge $selected={isSelected}>
                  {getIndustryIcon(ind.name)}
                </IconBadge>

                <ActionOverlay className="action-overlay" onClick={e => e.stopPropagation()}>
                  <Tooltip content="Edit Industry">
                    <ActionButton
                      $selected={isSelected}
                      onClick={() => onEditIndustry(ind)}
                      aria-label="Edit industry"
                    >
                      <RiEditLine size={16} />
                    </ActionButton>
                  </Tooltip>
                  <Tooltip content="Delete Industry">
                    <ActionButton
                      $selected={isSelected}
                      onClick={() => onDeleteIndustry(ind)}
                      aria-label="Delete industry"
                    >
                      <RiDeleteBinLine size={16} />
                    </ActionButton>
                  </Tooltip>
                </ActionOverlay>
              </CardTopRow>

              <CardContent>
                <CardTitle $selected={isSelected}>{ind.name}</CardTitle>
                {ind.description && (
                  <CardDesc $selected={isSelected}>{ind.description}</CardDesc>
                )}
              </CardContent>

              <CardFooterRow $selected={isSelected}>
                <CountBadge $selected={isSelected}>
                  {ind.domainCount || 11} Domains
                </CountBadge>
                <ViewLink $selected={isSelected}>
                  Explore <RiArrowRightSLine size={16} className="arrow-icon" />
                </ViewLink>
              </CardFooterRow>
            </IndustryCard>
          );
        })}
      </Grid>
    </Container>
  );
};
