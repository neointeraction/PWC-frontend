import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { SearchBox } from '@/components/SearchBox';
import type { Career } from '@/types/career.types';

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
  position: relative;
  width: 280px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }
`;

const ResultsPanel = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  min-width: 320px;
  max-height: 360px;
  overflow-y: auto;
  z-index: 20;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  padding: 4px;
`;

const ResultItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  width: 100%;
  padding: 8px 10px;
  text-align: left;
  background: none;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.colors.background};
    outline: none;
  }
`;

const ResultTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
`;

const ResultPath = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const EmptyResult = styled.div`
  padding: 10px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
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
  /** Job-role matches for the current query; undefined while the box is empty. */
  searchResults?: Career[];
  onSelectSearchResult?: (role: Career) => void;
  actions?: React.ReactNode;
}

export const BreadcrumbHeader: React.FC<BreadcrumbHeaderProps> = ({
  steps,
  searchQuery,
  onSearchChange,
  searchResults,
  onSelectSearchResult,
  actions,
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const showPanel = open && searchResults !== undefined && searchQuery.trim().length > 0;

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
        <SearchWrapper
          ref={wrapperRef}
          onFocus={() => setOpen(true)}
          onKeyDown={e => {
            if (e.key === 'Escape') setOpen(false);
          }}
        >
          <SearchBox
            value={searchQuery}
            onChange={q => {
              onSearchChange(q);
              setOpen(true);
            }}
            placeholder="Search a job role..."
          />
          {showPanel && (
            <ResultsPanel role="listbox">
              {searchResults.length === 0 ? (
                <EmptyResult>No matching job roles</EmptyResult>
              ) : (
                searchResults.map(role => (
                  <ResultItem
                    key={role.id}
                    type="button"
                    role="option"
                    onClick={() => {
                      setOpen(false);
                      onSelectSearchResult?.(role);
                    }}
                  >
                    <ResultTitle>{role.jobRole}</ResultTitle>
                    <ResultPath>
                      {[role.careerCluster, role.industry, role.domain].filter(Boolean).join(' › ')}
                    </ResultPath>
                  </ResultItem>
                ))
              )}
            </ResultsPanel>
          )}
        </SearchWrapper>
        {actions}
      </RightControls>
    </HeaderContainer>
  );
};
