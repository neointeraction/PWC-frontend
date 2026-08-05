import React from 'react';
import styled from 'styled-components';
import { Career } from '@/types';
import { Tooltip } from '@/components/Tooltip';
import {
  RiEditLine,
  RiDeleteBinLine,
  RiArrowRightSLine,
  RiUserStarLine,
  RiMoneyDollarCircleLine,
  RiShieldCheckLine,
} from 'react-icons/ri';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const RoleCard = styled.div<{ $selected?: boolean }>`
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
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
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

    .open-btn {
      transform: translateX(4px);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LeftMetaGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
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

const RoleInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const RoleTitle = styled.h2<{ $selected?: boolean }>`
  font-size: 19px;
  font-weight: 700;
  color: ${({ $selected, theme }) => ($selected ? '#FFFFFF' : theme.colors.text)};
  margin: 0;
`;

const RoleDesc = styled.p<{ $selected?: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ $selected, theme }) =>
    $selected ? 'rgba(255, 255, 255, 0.85)' : theme.colors.textSecondary};
  margin: 0;
`;

const TagRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
  flex-wrap: wrap;
`;

const TagPill = styled.span<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  color: ${({ $selected, theme }) => ($selected ? '#E5C158' : theme.colors.primary)};
  background-color: ${({ $selected, theme }) =>
    $selected ? 'rgba(229, 193, 88, 0.15)' : theme.colors.primaryLight};
  padding: 3px 10px;
  border-radius: 4px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    justify-content: space-between;
  }
`;

const OpenProfileBtn = styled.span<{ $selected?: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ $selected }) => ($selected ? '#E5C158' : '#C49419')};
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  transition: transform ${({ theme }) => theme.transition.fast};
`;

const ActionOverlay = styled.div`
  display: flex;
  gap: 6px;
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



interface JobRolesViewProps {
  roles: Career[];
  selectedRoleId?: string;
  onSelectRole: (role: Career) => void;
  onEditRole: (role: Career) => void;
  onDeleteRole: (role: Career) => void;
}

export const JobRolesView: React.FC<JobRolesViewProps> = ({
  roles,
  selectedRoleId,
  onSelectRole,
  onEditRole,
  onDeleteRole,
}) => {
  return (
    <Container>
      <List>
        {roles.map(role => {
          const isSelected = role.id === selectedRoleId;
          return (
            <RoleCard key={role.id} $selected={isSelected} onClick={() => onSelectRole(role)}>
              <LeftMetaGroup>
                <IconBadge $selected={isSelected}>
                  <RiUserStarLine size={24} />
                </IconBadge>

                <RoleInfo>
                  <RoleTitle $selected={isSelected}>{role.jobRole}</RoleTitle>
                  <RoleDesc $selected={isSelected}>{role.oneLineDescription}</RoleDesc>
                  <TagRow>
                    <TagPill $selected={isSelected}>
                      <RiShieldCheckLine size={13} /> AI Resilience:{' '}
                      {role.aiResilienceGrading || 'High'}
                    </TagPill>
                    <TagPill $selected={isSelected}>
                      <RiMoneyDollarCircleLine size={13} />{' '}
                      {role.approxSalaryRangeIndia || '₹4–15 LPA'}
                    </TagPill>
                  </TagRow>
                </RoleInfo>
              </LeftMetaGroup>

              <RightSection>
                <ActionOverlay className="action-overlay" onClick={e => e.stopPropagation()}>
                  <Tooltip content="Edit Job Role">
                    <ActionButton
                      $selected={isSelected}
                      onClick={() => onEditRole(role)}
                      aria-label="Edit job role"
                    >
                      <RiEditLine size={16} />
                    </ActionButton>
                  </Tooltip>
                  <Tooltip content="Delete Job Role">
                    <ActionButton
                      $selected={isSelected}
                      onClick={() => onDeleteRole(role)}
                      aria-label="Delete job role"
                    >
                      <RiDeleteBinLine size={16} />
                    </ActionButton>
                  </Tooltip>
                </ActionOverlay>

                <OpenProfileBtn $selected={isSelected} className="open-btn">
                  Open profile <RiArrowRightSLine size={18} />
                </OpenProfileBtn>
              </RightSection>
            </RoleCard>
          );
        })}
      </List>
    </Container>
  );
};
