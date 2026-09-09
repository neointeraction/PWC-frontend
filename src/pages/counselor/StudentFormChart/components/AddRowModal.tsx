import React, { useEffect, useState } from 'react';
import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import { Select, SelectOption } from '@/components/Select';
import { Checkbox } from '@/components/Checkbox';
import { Button } from '@/components/Button';
import { FormTextarea } from '../StudentFormChartPage.styles';

export interface AddRowFieldConfig {
  key: string;
  label: string;
  multiline?: boolean;
  // Present when this field can be picked from the career library instead of typed.
  // Absent means the field is always free text, whether or not "Manual Entry" is on.
  dbSource?: {
    options: SelectOption[];
    isLoading?: boolean;
    // Auto-fills sibling fields on the same row from the picked option (e.g. picking a
    // Target Role prefills Why It Fits / Salary / etc. from that career-library entry).
    onSelect?: (value: string, setValue: (key: string, value: string) => void) => void;
  };
  // Has no db source of its own but is only ever filled via another field's onSelect —
  // shown disabled (not editable) while in DB mode, editable once Manual Entry is on.
  derivedOnly?: boolean;
}

interface AddRowModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: AddRowFieldConfig[];
  onSubmit: (values: Record<string, string>, isManualEntry: boolean) => void;
}

export const AddRowModal: React.FC<AddRowModalProps> = ({
  isOpen,
  onClose,
  title,
  fields,
  onSubmit,
}) => {
  const hasDbFields = fields.some(f => f.dbSource);
  const [isManualEntry, setIsManualEntry] = useState(!hasDbFields);
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setValues({});
      setIsManualEntry(!hasDbFields);
    }
  }, [isOpen, hasDbFields]);

  const setValue = (key: string, value: string) => setValues(prev => ({ ...prev, [key]: value }));

  const canSubmit = fields.some(f => (values[f.key] || '').trim().length > 0);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="md"
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => onSubmit(values, isManualEntry)}
            disabled={!canSubmit}
          >
            Add Row
          </Button>
        </div>
      }
    >
      {hasDbFields && (
        <div style={{ marginBottom: 16 }}>
          <Checkbox
            label="Manual Entry — type free text instead of selecting from the career library"
            checked={isManualEntry}
            onChange={e => setIsManualEntry(e.target.checked)}
          />
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {fields.map(field => {
          const useSelect = Boolean(field.dbSource) && !isManualEntry;
          const isDisabledDerived = field.derivedOnly && !isManualEntry;

          if (useSelect) {
            return (
              <Select
                key={field.key}
                label={field.label}
                options={field.dbSource!.options}
                value={values[field.key] || ''}
                placeholder={field.dbSource!.isLoading ? 'Loading…' : `Select ${field.label}`}
                disabled={field.dbSource!.isLoading}
                onChange={e => {
                  setValue(field.key, e.target.value);
                  field.dbSource?.onSelect?.(e.target.value, setValue);
                }}
              />
            );
          }

          if (field.multiline) {
            return (
              <div key={field.key}>
                <label
                  style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}
                >
                  {field.label}
                </label>
                <FormTextarea
                  value={values[field.key] || ''}
                  disabled={isDisabledDerived}
                  onChange={e => setValue(field.key, e.target.value)}
                  placeholder={
                    isDisabledDerived ? 'Auto-filled from the selected option above' : `Enter ${field.label.toLowerCase()}`
                  }
                  style={{ width: '100%', minHeight: '60px' }}
                />
              </div>
            );
          }

          return (
            <Input
              key={field.key}
              label={field.label}
              value={values[field.key] || ''}
              disabled={isDisabledDerived}
              onChange={e => setValue(field.key, e.target.value)}
              placeholder={
                isDisabledDerived ? 'Auto-filled from the selected option above' : `Enter ${field.label.toLowerCase()}`
              }
            />
          );
        })}
      </div>
    </Modal>
  );
};
