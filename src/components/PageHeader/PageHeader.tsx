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
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const BackButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};
  flex-shrink: 0;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
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
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs,
  actions,
  onBack,
}) => (
  <PageHeaderWrapper>
    {breadcrumbs && breadcrumbs.length > 0 && (
      <BreadcrumbContainer>
        <Breadcrumb items={breadcrumbs} />
      </BreadcrumbContainer>
    )}
    <TopRow>
      <TitleGroup>
        <TitleRow>
          {onBack && (
            <Tooltip content="Go back">
              <BackButton onClick={onBack} aria-label="Go back">
                <RiArrowLeftLine size={20} />
              </BackButton>
            </Tooltip>
          )}
          <Title>{title}</Title>
        </TitleRow>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </TitleGroup>
      {actions && <Actions>{actions}</Actions>}
    </TopRow>
  </PageHeaderWrapper>
);
