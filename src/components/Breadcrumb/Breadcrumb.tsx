import React from 'react';
import { Link } from 'react-router-dom';
import { RiArrowRightSLine } from 'react-icons/ri';
import styled from 'styled-components';

const BreadcrumbNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
`;

const BreadcrumbItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};

  a {
    color: ${({ theme }) => theme.colors.textSecondary};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transition.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      text-decoration: none;
    }
  }

  &:last-child {
    color: ${({ theme }) => theme.colors.text};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
`;

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => (
  <BreadcrumbNav aria-label="Breadcrumb">
    {items.map((item, index) => (
      <BreadcrumbItem key={index}>
        {index > 0 && <RiArrowRightSLine size={16} />}
        {item.href && index < items.length - 1 ? (
          <Link to={item.href}>{item.label}</Link>
        ) : (
          <span>{item.label}</span>
        )}
      </BreadcrumbItem>
    ))}
  </BreadcrumbNav>
);
