import React from 'react';
import styled from 'styled-components';
import { Breadcrumb, BreadcrumbItem } from '@/components/Breadcrumb';

const PageHeaderWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
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

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.textSecondary};
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
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs,
  actions,
}) => (
  <PageHeaderWrapper>
    {breadcrumbs && breadcrumbs.length > 0 && (
      <div style={{ marginBottom: '8px' }}>
        <Breadcrumb items={breadcrumbs} />
      </div>
    )}
    <TopRow>
      <TitleGroup>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </TitleGroup>
      {actions && <Actions>{actions}</Actions>}
    </TopRow>
  </PageHeaderWrapper>
);
