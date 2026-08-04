import React from 'react';
import { AvatarContainer } from './Avatar.styles';

interface AvatarProps {
  src?: string;
  name?: string;
  size?: number;
  alt?: string;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export const Avatar: React.FC<AvatarProps> = ({ src, name = '', size = 36, alt }) => (
  <AvatarContainer $size={size} $hasImage={!!src} aria-label={alt || name}>
    {src ? <img src={src} alt={alt || name} /> : getInitials(name)}
  </AvatarContainer>
);
