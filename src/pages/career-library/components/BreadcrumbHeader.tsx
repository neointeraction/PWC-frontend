import React from 'react';
import styled from 'styled-components';
import { SearchBox } from '@/components/SearchBox';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

const BreadcrumbList = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  flex-wrap: wrap;
`;

const BreadcrumbItem = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  padding: 0;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ $active, theme }) => ($active ? theme.fontWeight.bold : theme.fontWeight.medium)};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.textSecondary)};
  cursor: ${({ $active }) => ($active ? 'default' : 'pointer')};

  &:hover {
    color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.text)};
  }
`;

const Separator = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 12px;
`;

const SearchWrapper = styled.div`
  width: 280px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }
`;

const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    flex-wrap: wrap;
  }
`;

export interface BreadcrumbStep {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbHeaderProps {
  steps: BreadcrumbStep[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  actions?: React.ReactNode;
}

export const BreadcrumbHeader: React.FC<BreadcrumbHeaderProps> = ({
  steps,
  searchQuery,
  onSearchChange,
  actions,
}) => {
  return (
    <HeaderContainer>
      <BreadcrumbList>
        {steps.map((step, idx) => {
          const isLast = idx === steps.length - 1;
          return (
            <React.Fragment key={idx}>
              <BreadcrumbItem $active={isLast} onClick={step.onClick}>
                {step.label}
              </BreadcrumbItem>
              {!isLast && <Separator>›</Separator>}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>

      <RightControls>
        <SearchWrapper>
          <SearchBox
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search a career, role, exam..."
          />
        </SearchWrapper>
        {actions}
      </RightControls>
    </HeaderContainer>
  );
};
