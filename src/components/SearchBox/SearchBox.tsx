import React, { useRef, useEffect } from 'react';
import { RiSearchLine, RiCloseLine } from 'react-icons/ri';
import styled from 'styled-components';

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input<{ $width?: string }>`
  width: ${({ $width }) => $width || '260px'};
  height: 36px;
  padding: 0 36px 0 36px;
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  outline: none;
  transition:
    border-color ${({ theme }) => theme.transition.fast},
    box-shadow ${({ theme }) => theme.transition.fast};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderFocus};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}22;
  }
`;

const IconLeft = styled.span`
  position: absolute;
  left: 10px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textMuted};
  pointer-events: none;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 8px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 2px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: color ${({ theme }) => theme.transition.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  width?: string;
  autoFocus?: boolean;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  value,
  onChange,
  placeholder = 'Search…',
  width,
  autoFocus,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  return (
    <SearchContainer>
      <IconLeft>
        <RiSearchLine size={18} />
      </IconLeft>
      <SearchInput
        ref={inputRef}
        $width={width}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
      {value && (
        <ClearButton onClick={() => onChange('')} aria-label="Clear search">
          <RiCloseLine size={16} />
        </ClearButton>
      )}
    </SearchContainer>
  );
};
