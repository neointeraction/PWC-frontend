import styled from 'styled-components';

export const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 14px 16px;
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

export const CheckboxGroupContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  flex-wrap: wrap;
`;

export const CommentsTextarea = styled.textarea`
  width: 100%;
  min-height: 70px;
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

export const SaveButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const HistorySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const HistoryHeadingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HistoryHeading = styled.h4`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const HistoryCountBadge = styled.span`
  background-color: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
`;

export const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 260px;
  overflow-y: auto;
  padding-right: 4px;
`;

export const HistoryCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
  transition: all 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

export const HistoryCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

export const HistoryLeftMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const HistoryDateText = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const StagePill = styled.span`
  font-size: 11px;
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 2px 7px;
  border-radius: 4px;
`;

export const ByAdminTag = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

export const OutcomeBadge = styled.span<{ $outcome: string }>`
  font-size: 11px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;

  ${({ $outcome }) => {
    const lower = $outcome.toLowerCase();
    if (lower.includes('booked')) {
      return `
        background-color: #DCFCE7;
        color: #15803D;
        border: 1px solid #BBF7D0;
      `;
    }
    if (lower.includes('complete')) {
      return `
        background-color: #EDE9FE;
        color: #6B21A8;
        border: 1px solid #DDD6FE;
      `;
    }
    if (lower.includes('no answer')) {
      return `
        background-color: #FEF3C7;
        color: #B45309;
        border: 1px solid #FDE68A;
      `;
    }
    if (lower.includes('not connecting') || lower.includes('refused')) {
      return `
        background-color: #FEE2E2;
        color: #DC2626;
        border: 1px solid #FECACA;
      `;
    }
    return `
      background-color: #F1F5F9;
      color: #475569;
      border: 1px solid #E2E8F0;
    `;
  }}
`;

export const SpokenToPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
  }
`;

export const CommentCallout = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-left: 3px solid ${({ theme }) => theme.colors.primary};
  padding: 6px 10px;
  border-radius: 0 4px 4px 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.4;
  display: flex;
  align-items: flex-start;
  gap: 6px;

  svg {
    color: ${({ theme }) => theme.colors.primary};
    flex-shrink: 0;
    margin-top: 2px;
  }
`;
