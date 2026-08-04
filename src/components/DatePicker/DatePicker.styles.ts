import styled, { createGlobalStyle } from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';

export const DatePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const InputWrapper = styled.div<{ $hasError?: boolean }>`
  position: relative;
  width: 100%;

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container {
    width: 100%;
    
    input {
      width: 100%;
      height: 38px;
      padding: 8px 36px 8px 12px;
      font-size: ${({ theme }) => theme.fontSize.base};
      font-family: inherit;
      color: ${({ theme }) => theme.colors.text};
      background-color: ${({ theme }) => theme.colors.surface};
      border: 1px solid ${({ theme, $hasError }) =>
        $hasError ? theme.colors.danger : theme.colors.border};
      border-radius: ${({ theme }) => theme.borderRadius.md};
      transition: all ${({ theme }) => theme.transition.fast};
      outline: none;

      &::placeholder {
        color: ${({ theme }) => theme.colors.textMuted};
      }

      &:hover:not(:disabled) {
        border-color: ${({ theme, $hasError }) =>
          $hasError ? theme.colors.danger : theme.colors.textMuted};
      }

      &:focus {
        border-color: ${({ theme, $hasError }) =>
          $hasError ? theme.colors.danger : theme.colors.primary};
        box-shadow: 0 0 0 2px ${({ theme, $hasError }) =>
          $hasError ? `${theme.colors.danger}20` : `${theme.colors.primary}20`};
      }

      &:disabled {
        background-color: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.textMuted};
        cursor: not-allowed;
      }
    }
  }
`;

export const DatePickerGlobalStyles = createGlobalStyle`
  .react-datepicker-popper {
    z-index: 9999 !important;
  }

  /* Increase specificity to override react-datepicker default css */
  .react-datepicker-popper .react-datepicker {
    font-family: inherit;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.surface};
    box-shadow: ${({ theme }) => theme.colors.shadowLg || '0 10px 15px -3px rgba(0, 0, 0, 0.1)'};
    padding: ${({ theme }) => theme.spacing.sm};
  }

  .react-datepicker-popper .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker-popper .react-datepicker__header {
    background-color: ${({ theme }) => theme.colors.surface};
    border-bottom: none;
    padding-top: 8px;
  }

  .react-datepicker-popper .react-datepicker__current-month {
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSize.base};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  .react-datepicker-popper .react-datepicker__day-names {
    margin-bottom: 4px;
  }

  .react-datepicker-popper .react-datepicker__day-name {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    font-size: ${({ theme }) => theme.fontSize.sm};
    width: 36px;
    line-height: 36px;
    margin: 2px;
  }

  .react-datepicker-popper .react-datepicker__day {
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSize.sm};
    width: 36px;
    line-height: 36px;
    border-radius: 4px;
    margin: 2px;
    transition: all ${({ theme }) => theme.transition.fast};

    &:hover {
      background-color: ${({ theme }) => theme.colors.surfaceHover};
      border-radius: 4px;
    }
  }

  .react-datepicker-popper .react-datepicker__day--selected,
  .react-datepicker-popper .react-datepicker__day--keyboard-selected {
    background-color: ${({ theme }) => theme.colors.primary} !important;
    color: ${({ theme }) => theme.colors.surface} !important;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    border-radius: 4px;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryHover} !important;
    }
  }

  .react-datepicker-popper .react-datepicker__day--disabled {
    color: ${({ theme }) => theme.colors.textMuted};
    &:hover {
      background-color: transparent;
    }
  }

  .react-datepicker-popper .react-datepicker__day--outside-month {
    color: ${({ theme }) => theme.colors.border};
  }

  .react-datepicker-popper .react-datepicker__navigation {
    top: 20px;
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textMuted};
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Label = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const ErrorText = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.danger};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;
