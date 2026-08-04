import React from 'react';
import { LoaderOverlay, SpinnerCircle } from './Loader.styles';

interface LoaderProps {
  size?: number;
  color?: string;
  fullPage?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ size = 36, color, fullPage = false }) => {
  if (fullPage) {
    return (
      <LoaderOverlay
        style={{ minHeight: '100vh', position: 'fixed', inset: 0, background: 'inherit' }}
        role="status"
        aria-label="Loading"
      >
        <SpinnerCircle $size={size} $color={color} />
      </LoaderOverlay>
    );
  }

  return (
    <LoaderOverlay role="status" aria-label="Loading">
      <SpinnerCircle $size={size} $color={color} />
    </LoaderOverlay>
  );
};
