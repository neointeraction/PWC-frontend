import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { RiArrowDownSLine, RiCheckLine } from 'react-icons/ri';
import {
  SelectWrapper,
  Label,
  DropdownContainer,
  DropdownTrigger,
  TriggerText,
  ChevronIcon,
  DropdownMenu,
  DropdownItem,
  ComingSoonTag,
  ErrorMessage,
} from './Select.styles';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (e: { target: { value: string; name?: string } }) => void;
  placeholder?: string;
  error?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  name?: string;
  id?: string;
  style?: React.CSSProperties;
  className?: string;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      label,
      options,
      value,
      defaultValue,
      onChange,
      placeholder = 'Select an option',
      error,
      fullWidth = true,
      disabled = false,
      name,
      id,
      style,
      className,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string>(
      value !== undefined ? value : defaultValue || ''
    );
    const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});

    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);

    // Sync controlled value
    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    // Update portal menu position
    const updatePosition = useCallback(() => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const openUpward = spaceBelow < 220 && rect.top > 220;

      setMenuStyle({
        position: 'fixed',
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        zIndex: 99999,
        ...(openUpward
          ? {
              bottom: `${window.innerHeight - rect.top + 4}px`,
              top: 'auto',
              boxShadow: '0 -10px 25px -5px rgba(0, 0, 0, 0.2), 0 -8px 10px -6px rgba(0, 0, 0, 0.1)',
            }
          : {
              top: `${rect.bottom + 4}px`,
              bottom: 'auto',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            }),
      });
    }, []);

    // Handle position on open, scroll, or resize
    useEffect(() => {
      if (!isOpen) return;
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
    }, [isOpen, updatePosition]);

    // Handle click outside (check both container and portal menu)
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        const isClickInContainer = containerRef.current?.contains(target);
        const isClickInMenu = menuRef.current?.contains(target);

        if (!isClickInContainer && !isClickInMenu) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    const toggleOpen = () => {
      if (disabled) return;
      if (!isOpen) {
        updatePosition();
      }
      setIsOpen(prev => !prev);
    };

    const selectedOption = options.find(opt => opt.value === selectedValue);

    const handleSelect = (option: SelectOption) => {
      if (disabled || option.disabled) return;
      setSelectedValue(option.value);
      setIsOpen(false);

      if (onChange) {
        onChange({
          target: {
            value: option.value,
            name,
          },
        });
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleOpen();
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const selectId = id || `select-${Math.random().toString(36).slice(2, 9)}`;

    return (
      <SelectWrapper $fullWidth={fullWidth} style={style} className={className} ref={ref}>
        {label && <Label htmlFor={selectId}>{label}</Label>}
        <DropdownContainer ref={containerRef}>
          <DropdownTrigger
            ref={triggerRef}
            id={selectId}
            type="button"
            $isOpen={isOpen}
            $hasError={!!error}
            $isDisabled={disabled}
            disabled={disabled}
            onClick={toggleOpen}
            onKeyDown={handleKeyDown}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            <TriggerText $isPlaceholder={!selectedOption}>
              {selectedOption ? selectedOption.label : placeholder}
            </TriggerText>
            <ChevronIcon $isOpen={isOpen}>
              <RiArrowDownSLine size={18} />
            </ChevronIcon>
          </DropdownTrigger>

          {isOpen &&
            createPortal(
              <DropdownMenu ref={menuRef} role="listbox" style={menuStyle}>
                {options.map(opt => {
                  const isSelected = opt.value === selectedValue;
                  const isOptDisabled = Boolean(opt.disabled);
                  return (
                    <DropdownItem
                      key={opt.value}
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={isOptDisabled}
                      $isSelected={isSelected}
                      $isDisabled={isOptDisabled}
                      onClick={() => handleSelect(opt)}
                    >
                      <span>
                        {opt.label}
                        {isOptDisabled && <ComingSoonTag>(Coming Soon)</ComingSoonTag>}
                      </span>
                      {isSelected && <RiCheckLine size={16} />}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>,
              document.body
            )}
        </DropdownContainer>
        {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
      </SelectWrapper>
    );
  }
);

Select.displayName = 'Select';
