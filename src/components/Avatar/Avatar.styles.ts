import styled from 'styled-components';

export const AvatarContainer = styled.div<{
  $size: number;
  $hasImage: boolean;
}>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, $hasImage }) =>
    $hasImage ? 'transparent' : theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  font-size: ${({ $size }) => Math.round($size * 0.38)}px;
  user-select: none;
  border: 2px solid ${({ theme }) => theme.colors.border};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
