import styled from 'styled-components';

export const ModalBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const ContactCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const ContactCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceHover || '#F9FAFB'};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ContactCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const ContactRoleTag = styled.span<{ $role?: 'student' | 'parent' }>`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: ${({ $role, theme }) => ($role === 'student' ? theme.colors.primary : '#D97706')};
  background-color: ${({ $role, theme }) => ($role === 'student' ? theme.colors.primaryLight : '#FEF3C7')};
  padding: 2px 8px;
  border-radius: 4px;
`;

export const ContactName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const ContactDetailRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ContactValueText = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  word-break: break-all;
`;

export const ContactActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
  flex-wrap: wrap;
`;

export const WhatsAppButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background-color: #DCFCE7;
  border: 1px solid #86EFAC;
  color: #15803D;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #BBF7D0;
    border-color: #4ADE80;
    color: #166534;
  }
`;

export const EmailButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

export const CopyIconButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

/* Stage Pre-defined Message Section */
export const MessageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 14px 16px;
`;

export const MessageHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const MessageSectionTitle = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const MessageTextarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 10px 12px;
  font-family: inherit;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.surfaceHover || '#F9FAFB'};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  resize: vertical;
  line-height: 1.5;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.surface};
  }
`;

export const MessageQuickSendRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 4px;
  flex-wrap: wrap;
`;

/* History Section */
export const HistorySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 1px dashed ${({ theme }) => theme.colors.border};
  padding-top: 14px;
`;

export const HistoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 110px;
  overflow-y: auto;
`;

export const HistoryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 6px 10px;
  background-color: ${({ theme }) => theme.colors.surfaceHover || '#F9FAFB'};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
`;

export const HistoryDateBadge = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 11px;
`;

export const EmptyHistoryText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted || '#9CA3AF'};
  font-style: italic;
  padding: 4px 0;
`;

/* Modal Footer Custom Layout */
export const ModalFooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
  flex-wrap: wrap;
`;

export const FooterRightButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
