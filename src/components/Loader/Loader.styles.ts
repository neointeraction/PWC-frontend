import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.surfaceHover} 25%,
    ${({ theme }) => theme.colors.border} 50%,
    ${({ theme }) => theme.colors.surfaceHover} 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const LoaderOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxxxl};
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const SpinnerCircle = styled.div<{ $size: number; $color?: string }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border: 3px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme, $color }) => $color || theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;
