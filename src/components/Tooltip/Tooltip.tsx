import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

const TooltipWrapper = styled.div`
  display: inline-flex;
`;

const PortalTooltipBox = styled.div`
  position: fixed;
  z-index: 999999;
  padding: 5px 9px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textInverse};
  background-color: ${({ theme }) => theme.colors.text};
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
  transition: opacity 120ms ease;
`;

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 150,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState<React.CSSProperties>({});
  const wrapperRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updatePosition = useCallback(() => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let style: React.CSSProperties = {};

    switch (position) {
      case 'bottom':
        style = {
          top: `${rect.bottom + 6}px`,
          left: `${centerX}px`,
          transform: 'translateX(-50%)',
        };
        break;
      case 'left':
        style = {
          top: `${centerY}px`,
          left: `${rect.left - 6}px`,
          transform: 'translate(-100%, -50%)',
        };
        break;
      case 'right':
        style = {
          top: `${centerY}px`,
          left: `${rect.right + 6}px`,
          transform: 'translateY(-50%)',
        };
        break;
      case 'top':
      default:
        // If top edge is too close to browser viewport top (< 40px), auto-flip to bottom
        if (rect.top < 40) {
          style = {
            top: `${rect.bottom + 6}px`,
            left: `${centerX}px`,
            transform: 'translateX(-50%)',
          };
        } else {
          style = {
            top: `${rect.top - 6}px`,
            left: `${centerX}px`,
            transform: 'translate(-50%, -100%)',
          };
        }
        break;
    }

    setCoords(style);
  }, [position]);

  const showTooltip = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      updatePosition();
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsVisible(false);
  };

  useEffect(() => {
    if (!isVisible) return;
    updatePosition();

    const handleScrollOrResize = () => {
      updatePosition();
    };

    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [isVisible, updatePosition]);

  if (!content) return <>{children}</>;

  return (
    <TooltipWrapper
      ref={wrapperRef}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {isVisible &&
        createPortal(
          <PortalTooltipBox style={coords}>
            {content}
          </PortalTooltipBox>,
          document.body
        )}
    </TooltipWrapper>
  );
};
