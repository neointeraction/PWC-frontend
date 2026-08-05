import React from 'react';
import styled from 'styled-components';
import { CareerDomain } from '@/types';
import { Tooltip } from '@/components/Tooltip';
import {
  RiEditLine,
  RiDeleteBinLine,
  RiMovieLine,
  RiPaletteLine,
  RiLayoutLine,
  RiHammerLine,
  RiSearchEyeLine,
  RiComputerLine,
  RiShirtLine,
  RiMagicLine,
  RiVolumeUpLine,
  RiCameraLine,
  RiImageLine,
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
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const DomainCard = styled.div<{ $selected?: boolean }>`
  position: relative;
  background: ${({ $selected, theme }) =>
    $selected
      ? `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryHover} 100%)`
      : theme.colors.surface};
  color: ${({ $selected, theme }) => ($selected ? '#FFFFFF' : theme.colors.text)};
  border: 1px solid
    ${({ $selected, theme }) => ($selected ? theme.colors.primary : theme.colors.border)};
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  min-height: 120px;
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
  width: 38px;
  height: 38px;
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

const CardTitle = styled.h3<{ $selected?: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ $selected, theme }) => ($selected ? '#FFFFFF' : theme.colors.text)};
  line-height: 1.3;
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



const getDomainIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('animation')) return <RiMovieLine size={20} />;
  if (n.includes('applied arts')) return <RiPaletteLine size={20} />;
  if (n.includes('design')) return <RiLayoutLine size={20} />;
  if (n.includes('craft')) return <RiHammerLine size={20} />;
  if (n.includes('curation')) return <RiSearchEyeLine size={20} />;
  if (n.includes('digital')) return <RiComputerLine size={20} />;
  if (n.includes('fashion') || n.includes('lifestyle')) return <RiShirtLine size={20} />;
  if (n.includes('future')) return <RiMagicLine size={20} />;
  if (n.includes('performing')) return <RiVolumeUpLine size={20} />;
  if (n.includes('photo') || n.includes('video')) return <RiCameraLine size={20} />;
  if (n.includes('visual')) return <RiImageLine size={20} />;
  return <RiStackLine size={20} />;
};

interface DomainsViewProps {
  domains: CareerDomain[];
  selectedDomainName?: string;
  onSelectDomain: (domain: CareerDomain) => void;
  onEditDomain: (domain: CareerDomain) => void;
  onDeleteDomain: (domain: CareerDomain) => void;
}

export const DomainsView: React.FC<DomainsViewProps> = ({
  domains,
  selectedDomainName,
  onSelectDomain,
  onEditDomain,
  onDeleteDomain,
}) => {
  return (
    <Container>
      <Grid>
        {domains.map(dom => {
          const isSelected = dom.name === selectedDomainName;
          return (
            <DomainCard
              key={dom.id}
              $selected={isSelected}
              onClick={() => onSelectDomain(dom)}
            >
              <CardTopRow>
                <IconBadge $selected={isSelected}>
                  {getDomainIcon(dom.name)}
                </IconBadge>

                <ActionOverlay className="action-overlay" onClick={e => e.stopPropagation()}>
                  <Tooltip content="Edit Domain">
                    <ActionButton
                      $selected={isSelected}
                      onClick={() => onEditDomain(dom)}
                      aria-label="Edit domain"
                    >
                      <RiEditLine size={16} />
                    </ActionButton>
                  </Tooltip>
                  <Tooltip content="Delete Domain">
                    <ActionButton
                      $selected={isSelected}
                      onClick={() => onDeleteDomain(dom)}
                      aria-label="Delete domain"
                    >
                      <RiDeleteBinLine size={16} />
                    </ActionButton>
                  </Tooltip>
                </ActionOverlay>
              </CardTopRow>

              <CardTitle $selected={isSelected}>{dom.name}</CardTitle>

              <CardFooterRow $selected={isSelected}>
                <CountBadge $selected={isSelected}>
                  {dom.roleCount || 3} Job Roles
                </CountBadge>
                <ViewLink $selected={isSelected}>
                  Explore <RiArrowRightSLine size={16} className="arrow-icon" />
                </ViewLink>
              </CardFooterRow>
            </DomainCard>
          );
        })}
      </Grid>
    </Container>
  );
};
