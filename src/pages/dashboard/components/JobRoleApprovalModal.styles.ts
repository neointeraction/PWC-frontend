import styled from 'styled-components';

export const ModalScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const NoteBanner = styled.div`
  background-color: #FEF9C3;
  border-left: 3px solid #CA8A04;
  border-radius: 4px;
  padding: 10px 14px;
  font-size: 12px;
  color: #713F12;
  line-height: 1.45;
  font-weight: 500;
  display: flex;
  align-items: flex-start;
  gap: 8px;

  svg {
    color: #CA8A04;
    flex-shrink: 0;
    margin-top: 1px;
  }

  strong {
    font-weight: 700;
  }
`;

export const CapWarningBanner = styled.div<{ $isOverCap: boolean }>`
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: fit-content;

  ${({ $isOverCap }) =>
    $isOverCap
      ? `
    background-color: #FEE2E2;
    color: #DC2626;
    border: 1px solid #FECACA;
  `
      : `
    background-color: #ECFDF5;
    color: #059669;
    border: 1px solid #A7F3D0;
  `}
`;

export const SectionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const SectionTitle = styled.h4`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const FormGrid = styled.div<{ $columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns || 2}, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FieldLabel = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 75px;
  padding: 8px 12px;
  font-family: inherit;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  resize: vertical;
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight};
  }
`;

export const ResilienceCommentBox = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ResilienceCommentLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 0.3px;
`;

export const ExistingEntriesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const EntryRow = styled.div<{ $checked?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 4px 0;
  border: none;
  background-color: transparent;
`;

export const EntryCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.4;
`;

export const AutoPulledTag = styled.span`
  font-size: 11px;
  font-style: italic;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-left: 6px;
`;

export const ExpandedFormCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px dashed ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 4px;
`;

export const ExpandedFormTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
