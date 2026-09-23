import React from 'react';
import styled from 'styled-components';

// Same italic "compiling data" placeholder the career library tabs (CoursesTab,
// InstitutionsTab, EntranceExamsTab) show for a career-library field that isn't filled in
// yet — reused here for every report cell sourced from a career-library record.
const CompilingDataText = styled.span`
  font-style: italic;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const MISSING_VALUES = new Set(['', '—', '-', 'n/a', 'na']);

export const isMissingValue = (value: string | null | undefined) =>
  value == null || MISSING_VALUES.has(String(value).trim().toLowerCase());

export const CompilingData: React.FC = () => <CompilingDataText>compiling data</CompilingDataText>;

export const orCompilingData = (value: string | null | undefined): React.ReactNode =>
  isMissingValue(value) ? <CompilingData /> : value;
