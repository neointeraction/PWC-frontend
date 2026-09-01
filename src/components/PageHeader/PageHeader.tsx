import React from 'react';
import styled from 'styled-components';
import { Breadcrumb, BreadcrumbItem } from '@/components/Breadcrumb';
import { Tooltip } from '@/components/Tooltip';
import { RiArrowLeftLine } from 'react-icons/ri';

const PageHeaderWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const BreadcrumbContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const TitleTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
`;

const BackButton = styled.button<{ $disabled?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  transition: all ${({ theme }) => theme.transition.fast};
  flex-shrink: 0;

  &:hover {
    border-color: ${({ $disabled, theme }) => ($disabled ? theme.colors.border : theme.colors.primary)};
    color: ${({ $disabled, theme }) => ($disabled ? theme.colors.text : theme.colors.primary)};
    background-color: ${({ $disabled, theme }) => ($disabled ? theme.colors.surface : theme.colors.primaryLight)};
  }
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  onBack?: () => void;
  backDisabled?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs,
  actions,
  onBack,
  backDisabled,
}) => (
  <PageHeaderWrapper>
    {breadcrumbs && breadcrumbs.length > 0 && (
      <BreadcrumbContainer>
        <Breadcrumb items={breadcrumbs} />
      </BreadcrumbContainer>
    )}
    <TopRow>
      <HeaderLeft>
        {onBack && (
          <Tooltip content={backDisabled ? "Can't go back once you've started answering" : 'Go back'}>
            <BackButton
              type="button"
              onClick={backDisabled ? undefined : onBack}
              aria-label="Go back"
              aria-disabled={backDisabled}
              $disabled={backDisabled}
            >
              <RiArrowLeftLine size={20} />
            </BackButton>
          </Tooltip>
        )}
        <TitleTextGroup>
          <Title>{title}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </TitleTextGroup>
      </HeaderLeft>
      {actions && <Actions>{actions}</Actions>}
    </TopRow>
  </PageHeaderWrapper>
);
