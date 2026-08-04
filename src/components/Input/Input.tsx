import React from 'react';
import {
  InputWrapper,
  Label,
  InputContainer,
  StyledInput,
  IconSlot,
  ErrorMessage,
  HintText,
} from './Input.styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, fullWidth = true, id, ...rest }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;

    return (
      <InputWrapper $fullWidth={fullWidth}>
        {label && <Label htmlFor={inputId}>{label}</Label>}
        <InputContainer $hasError={!!error}>
          {leftIcon && <IconSlot>{leftIcon}</IconSlot>}
          <StyledInput ref={ref} id={inputId} {...rest} />
          {rightIcon && <IconSlot>{rightIcon}</IconSlot>}
        </InputContainer>
        {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
        {!error && hint && <HintText>{hint}</HintText>}
      </InputWrapper>
    );
  }
);

Input.displayName = 'Input';
