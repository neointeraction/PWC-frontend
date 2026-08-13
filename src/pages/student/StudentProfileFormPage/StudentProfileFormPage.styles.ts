import styled from 'styled-components';

export const FormPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
`;

export const SingleUnifiedCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
`;

export const DocumentHeaderRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  padding: 28px 28px 24px 28px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.surface} 0%, #fafaff 100%);
`;

export const HeaderTopNavRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;
`;

export const HeaderBackButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

export const DocHeaderBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  padding: 4px 14px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

export const DocTitle = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  letter-spacing: -0.3px;

  @media (max-width: 640px) {
    font-size: 20px;
  }
`;

export const DocSubtitle = styled.h2`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

export const DocNote = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  max-width: 720px;
  line-height: 1.5;
`;

export const IntroGreetingNotice = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 18px 24px;
  margin: 24px 28px 8px 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: 16px 16px 4px 16px;
    padding: 14px 16px;
  }
`;

export const GreetingHeadline = styled.p`
  font-weight: 700;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const GreetingParagraph = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`;

export const GreetingHighlightParagraph = styled.p`
  margin: 0;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

export const GreetingActionText = styled.p`
  margin: 4px 0 0 0;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const SectionBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 28px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-of-type {
    border-bottom: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 20px 16px;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 16px;
`;

export const SectionHeaderIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
`;

export const SectionBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const FooterNoteBlock = styled.div`
  margin: 32px 28px 24px 28px;
  padding: 20px 24px;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  border: 1px dashed ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: 24px 16px 16px 16px;
    padding: 16px;
  }
`;

export const FooterNoteText = styled.p`
  font-style: italic;
  font-size: 14.5px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  line-height: 1.5;
`;

export const FormFooterActions = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 20px 28px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column-reverse;
    align-items: stretch;
    padding: 16px;
  }
`;
