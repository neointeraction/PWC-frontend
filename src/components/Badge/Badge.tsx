import React from 'react';
import { StyledBadge } from './Badge.styles';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary';
export type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  children,
  dot,
}) => (
  <StyledBadge $variant={variant} $size={size}>
    {dot && (
      <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor">
        <circle cx="3" cy="3" r="3" />
      </svg>
    )}
    {children}
  </StyledBadge>
);
