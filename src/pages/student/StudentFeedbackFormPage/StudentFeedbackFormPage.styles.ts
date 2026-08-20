import styled from 'styled-components';

export const FormPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
`;

export const SingleUnifiedCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 36px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);

  @media (max-width: 768px) {
    padding: 20px;
    gap: 20px;
  }
`;

export const DocumentHeaderRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
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
  max-width: 780px;
  line-height: 1.5;
`;

export const StudentMetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 16px 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const MetaLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const MetaValue = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const ScaleGuideBox = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primaryLight} 0%, #ffffff 100%);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ScaleGuideTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ScalePillsGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const ScalePill = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 4px 10px;
  font-size: 12px;
`;

export const ScaleBadgeNum = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
`;

export const ScaleLabelText = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

export const SectionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.surface};

  @media (max-width: 640px) {
    padding: 16px;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const SectionHeaderIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
`;

export const SectionTitleText = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const SectionSubCode = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.background};
  padding: 2px 8px;
  border-radius: 4px;
  margin-left: 6px;
`;

export const QuestionCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
`;

export const QuestionTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.4;
`;

export const RatingOptionsGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const RatingOptionButton = styled.button<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px 8px;
  border-radius: 4px;
  border: 1px solid
    ${({ $isSelected, theme }) => ($isSelected ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primaryLight : theme.colors.surface};
  color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.primary : theme.colors.text)};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: flex-start;
    padding: 10px 14px;
    gap: 10px;
    text-align: left;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const OptionScoreBadge = styled.span<{ $isSelected: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 4px;
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primary : theme.colors.border};
  color: ${({ $isSelected, theme }) => ($isSelected ? '#ffffff' : theme.colors.text)};
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
`;

export const OptionText = styled.span`
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;
`;

export const CustomTextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const FormFooterActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 640px) {
    flex-direction: column-reverse;
    gap: 12px;

    button {
      width: 100%;
    }
  }
`;
