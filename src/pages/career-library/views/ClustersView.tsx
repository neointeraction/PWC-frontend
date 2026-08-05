import React from 'react';
import styled from 'styled-components';
import { CareerCluster } from '@/types';
import { Tooltip } from '@/components/Tooltip';
import {
  RiEditLine,
  RiDeleteBinLine,
  RiPaletteLine,
  RiFlightTakeoffLine,
  RiBriefcase4Line,
  RiCompass3Line,
  RiBankCardLine,
  RiPlantLine,
  RiHeartPulseLine,
  RiComputerLine,
  RiScales3Line,
  RiShipLine,
  RiFilmLine,
  RiAtomLine,
  RiGraduationCapLine,
  RiGridLine,
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
  gap: ${({ theme }) => theme.spacing.lg};

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

const ClusterCard = styled.div<{ $selected?: boolean }>`
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
  min-height: 140px;
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
  width: 42px;
  height: 42px;
  border-radius: 4px;
  background-color: ${({ $selected, theme }) =>
    $selected ? 'rgba(255, 255, 255, 0.18)' : theme.colors.primaryLight};
  color: ${({ $selected, theme }) => ($selected ? '#FFFFFF' : theme.colors.primary)};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all ${({ theme }) => theme.transition.fast};
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
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ $selected, theme }) => ($selected ? '#FFFFFF' : theme.colors.text)};
  line-height: 1.35;
  margin: 0;
`;

const CardDesc = styled.p<{ $selected?: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ $selected, theme }) =>
    $selected ? 'rgba(255, 255, 255, 0.85)' : theme.colors.textSecondary};
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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



const getClusterIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('art') || n.includes('creative') || n.includes('design')) return <RiPaletteLine size={22} />;
  if (n.includes('aviation')) return <RiFlightTakeoffLine size={22} />;
  if (n.includes('business') || n.includes('management') || n.includes('sales')) return <RiBriefcase4Line size={22} />;
  if (n.includes('engineering')) return <RiCompass3Line size={22} />;
  if (n.includes('finance')) return <RiBankCardLine size={22} />;
  if (n.includes('food') || n.includes('agriculture')) return <RiPlantLine size={22} />;
  if (n.includes('health') || n.includes('wellness')) return <RiHeartPulseLine size={22} />;
  if (n.includes('information') || n.includes('technology') || n.includes('digital')) return <RiComputerLine size={22} />;
  if (n.includes('law') || n.includes('governance')) return <RiScales3Line size={22} />;
  if (n.includes('logistics') || n.includes('maritime')) return <RiShipLine size={22} />;
  if (n.includes('media') || n.includes('entertainment')) return <RiFilmLine size={22} />;
  if (n.includes('stem')) return <RiAtomLine size={22} />;
  if (n.includes('social') || n.includes('education')) return <RiGraduationCapLine size={22} />;
  return <RiGridLine size={22} />;
};

interface ClustersViewProps {
  clusters: CareerCluster[];
  selectedClusterName?: string;
  onSelectCluster: (cluster: CareerCluster) => void;
  onEditCluster?: (cluster: CareerCluster) => void;
  onDeleteCluster?: (cluster: CareerCluster) => void;
}

export const ClustersView: React.FC<ClustersViewProps> = ({
  clusters,
  selectedClusterName,
  onSelectCluster,
  onEditCluster,
  onDeleteCluster,
}) => {
  return (
    <Container>
      <Grid>
        {clusters.map(cluster => {
          const isSelected = cluster.name === selectedClusterName;
          return (
            <ClusterCard
              key={cluster.id}
              $selected={isSelected}
              onClick={() => onSelectCluster(cluster)}
            >
              <CardTopRow>
                <IconBadge $selected={isSelected}>
                  {getClusterIcon(cluster.name)}
                </IconBadge>

                {(onEditCluster || onDeleteCluster) && (
                  <ActionOverlay className="action-overlay" onClick={e => e.stopPropagation()}>
                    {onEditCluster && (
                      <Tooltip content="Edit Cluster">
                        <ActionButton
                          $selected={isSelected}
                          onClick={() => onEditCluster(cluster)}
                          aria-label="Edit cluster"
                        >
                          <RiEditLine size={16} />
                        </ActionButton>
                      </Tooltip>
                    )}
                    {onDeleteCluster && (
                      <Tooltip content="Delete Cluster">
                        <ActionButton
                          $selected={isSelected}
                          onClick={() => onDeleteCluster(cluster)}
                          aria-label="Delete cluster"
                        >
                          <RiDeleteBinLine size={16} />
                        </ActionButton>
                      </Tooltip>
                    )}
                  </ActionOverlay>
                )}
              </CardTopRow>

              <CardContent>
                <CardTitle $selected={isSelected}>{cluster.name}</CardTitle>
                {cluster.description && (
                  <CardDesc $selected={isSelected}>{cluster.description}</CardDesc>
                )}
              </CardContent>

              <CardFooterRow $selected={isSelected}>
                <CountBadge $selected={isSelected}>
                  {cluster.industryCount || 3} Industries
                </CountBadge>
                <ViewLink $selected={isSelected}>
                  Explore <RiArrowRightSLine size={16} className="arrow-icon" />
                </ViewLink>
              </CardFooterRow>
            </ClusterCard>
          );
        })}
      </Grid>
    </Container>
  );
};
