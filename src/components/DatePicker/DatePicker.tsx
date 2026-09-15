import { forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import { RiCalendarLine } from 'react-icons/ri';
import {
  DatePickerWrapper,
  InputWrapper,
  IconWrapper,
  Label,
  ErrorText,
  DatePickerGlobalStyles,
} from './DatePicker.styles';

export interface CustomDatePickerProps {
  label?: string;
  error?: string;
  onChange: (date: any) => void;
  selected: Date | null | undefined;
  placeholderText?: string;
  [key: string]: any;
}

export const DatePicker = forwardRef<ReactDatePicker, CustomDatePickerProps>(
  ({ label, error, onChange, selected, placeholderText, ...props }, ref) => {
    return (
      <DatePickerWrapper>
        <DatePickerGlobalStyles />
        {label && <Label>{label}</Label>}
        <InputWrapper $hasError={!!error}>
          <ReactDatePicker
            ref={ref}
            selected={selected}
            onChange={onChange as any}
            dateFormat="MMM dd, yyyy"
            placeholderText={placeholderText || 'Select a date'}
            portalId="root"
            // Typing a date freehand (e.g. a mistyped/truncated year like "202") produces a
            // silently-valid but wrong Date; forcing calendar-only selection prevents that.
            onChangeRaw={e => e?.preventDefault()}
            {...props}
          />
          <IconWrapper>
            <RiCalendarLine size={18} />
          </IconWrapper>
        </InputWrapper>
        {error && <ErrorText>{error}</ErrorText>}
      </DatePickerWrapper>
    );
  }
);

DatePicker.displayName = 'DatePicker';
