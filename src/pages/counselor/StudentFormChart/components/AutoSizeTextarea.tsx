import React, { useRef, useEffect, useState, TextareaHTMLAttributes } from 'react';
import styled from 'styled-components';

// Visually hidden mirror div — same font/padding as the textarea
const MirrorDiv = styled.div`
  position: absolute;
  visibility: hidden;
  pointer-events: none;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
  font-size: 0.875rem;
  font-family: inherit;
  line-height: 1.5;
  padding: 10px 12px;
  border: 1px solid transparent;
  box-sizing: border-box;
`;

const TextareaEl = styled.textarea<{ $minHeight: number }>`
  flex: 1;
  width: 100%;
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  font-family: inherit;
  line-height: 1.5;
  min-height: ${({ $minHeight }) => $minHeight}px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const Wrapper = styled.div`
  flex: 1;
  position: relative;
`;

type AutoSizeTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

/**
 * A textarea whose min-height automatically matches the height
 * needed to fully display the placeholder text at the actual container width.
 * Uses a hidden mirror div with identical styling to measure real line-wrap height.
 */
export const AutoSizeTextarea: React.FC<AutoSizeTextareaProps> = ({
  placeholder,
  ...rest
}) => {
  const mirrorRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [minHeight, setMinHeight] = useState(48);

  useEffect(() => {
    const mirror = mirrorRef.current;
    const wrapper = wrapperRef.current;
    if (!mirror || !wrapper) return;

    const measure = () => {
      // Match mirror width to the actual textarea width
      mirror.style.width = `${wrapper.offsetWidth}px`;
      setMinHeight(mirror.scrollHeight);
    };

    // Measure on mount
    measure();

    // Re-measure if container resizes (e.g., sidebar collapse)
    const observer = new ResizeObserver(measure);
    observer.observe(wrapper);

    return () => observer.disconnect();
  }, [placeholder]);

  return (
    <Wrapper ref={wrapperRef}>
      {/* Hidden mirror renders placeholder text to measure real height */}
      <MirrorDiv ref={mirrorRef}>
        {placeholder || ' '}
      </MirrorDiv>
      <TextareaEl
        placeholder={placeholder}
        $minHeight={minHeight}
        {...rest}
      />
    </Wrapper>
  );
};
