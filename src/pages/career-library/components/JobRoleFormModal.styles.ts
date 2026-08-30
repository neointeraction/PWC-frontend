import styled from 'styled-components';

export const ModalScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
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

export const ErrorText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.danger};
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

export const ResilienceCommentText = styled.p`
  font-size: 13px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

// ---- Locked hierarchy display (read-only cluster / industry / domain) ----

export const LockedField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const LockedValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 9px 12px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.surfaceHover};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;

  svg {
    color: ${({ theme }) => theme.colors.textMuted};
    flex-shrink: 0;
  }
`;

export const HierarchyHint = styled.span`
  font-size: 11px;
  font-style: italic;
  color: ${({ theme }) => theme.colors.textMuted};
`;

// ---- Linked reference lists (exams / courses / institutions) ----

export const ExistingEntriesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const EmptyListHint = styled.div`
  font-size: 12px;
  font-style: italic;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 4px 0;
`;

export const EntryRow = styled.div<{ $checked?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 4px 0;
`;

export const EntryCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.4;
`;

export const NewTag = styled.span`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.primaryLight};
  border-radius: 3px;
  padding: 1px 6px;
  margin-left: 6px;
`;

export const LinkedTag = styled.span`
  font-size: 11px;
  font-style: italic;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-left: 6px;
`;

// ---- Typeahead search-to-add existing records ----

export const SearchWrapper = styled.div`
  position: relative;
`;

export const SearchResults = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  overflow: hidden;
  max-height: 180px;
  overflow-y: auto;
`;

export const SearchResultRow = styled.button`
  text-align: left;
  padding: 8px 12px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.surface};
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.textMuted};
    cursor: default;
  }
`;

export const SearchStatus = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 4px 2px;
`;

// ---- Expandable "add new record" subform ----

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

export const CloseFormButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textMuted};
  display: inline-flex;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const AddRowWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

// ---- Education path (domain-level tick list) ----

// Entries wrap to two lines, so the checkbox sits with the first line rather than
// floating to the vertical middle of a tall row.
export const EducationEntryRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 5px 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.45;
`;

export const EducationEntryText = styled.span`
  flex: 1;
`;

export const EducationLevelName = styled.strong`
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

export const AddEducationButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &:hover {
    text-decoration: underline;
  }
`;

// Separates the domain-level education path from the free-text qualification notes
// that still live under the same "Education Path" heading.
export const SectionDivider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: 6px 0 2px;
`;

// Sits in the modal footer and says why Save is disabled. `margin-right: auto` parks it
// on the left of the footer's flex-end row without moving the buttons.
export const SaveHint = styled.span`
  margin-right: auto;
  max-width: 60%;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.35;
  text-align: left;
`;
