import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from 'react';
import { RiCheckLine, RiSubtractLine } from 'react-icons/ri';
import {
  Container,
  CheckboxWrapper,
  HiddenInput,
  StyledBox,
  LabelText,
  ErrorMessage,
} from './Checkbox.styles';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      error,
      checked,
      defaultChecked = false,
      indeterminate = false,
      disabled = false,
      id,
      className,
      style,
      onChange,
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);

    const [internalChecked, setInternalChecked] = useState<boolean>(
      checked !== undefined ? checked : defaultChecked
    );

    useEffect(() => {
      if (checked !== undefined) {
        setInternalChecked(checked);
      }
    }, [checked]);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = !!indeterminate;
      }
    }, [indeterminate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      if (checked === undefined) {
        setInternalChecked(e.target.checked);
      }
      if (onChange) {
        onChange(e);
      }
    };

    const checkboxId = id || `checkbox-${Math.random().toString(36).slice(2, 9)}`;
    const isChecked = checked !== undefined ? checked : internalChecked;

    return (
      <Container>
        <CheckboxWrapper $disabled={disabled} htmlFor={checkboxId} className={className} style={style}>
          <HiddenInput
            ref={inputRef}
            type="checkbox"
            id={checkboxId}
            checked={isChecked}
            disabled={disabled}
            onChange={handleChange}
            {...rest}
          />
          <StyledBox
            $checked={isChecked}
            $indeterminate={indeterminate}
            $hasError={!!error}
            $disabled={disabled}
          >
            {indeterminate ? (
              <RiSubtractLine size={14} />
            ) : (
              isChecked && <RiCheckLine size={14} />
            )}
          </StyledBox>
          {label && <LabelText>{label}</LabelText>}
        </CheckboxWrapper>
        {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
      </Container>
    );
  }
);

Checkbox.displayName = 'Checkbox';
