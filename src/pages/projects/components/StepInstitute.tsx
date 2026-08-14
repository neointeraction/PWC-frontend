import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { DatePicker } from '@/components/DatePicker';
import { instituteService } from '@/services/institute.service';
import { useProjectStore } from '@/store/project.store';
import {
  StepFormContainer,
  StepTitle,
  StepSubtitle,
  FormGrid,
  FormGroup,
} from './AddProjectWizard.styles';

// Avoids the UTC-shift bug from `date.toISOString()` — formats using the
// picker's local Y/M/D instead of converting through UTC first.
const toLocalDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Parses a 'YYYY-MM-DD' string as local midnight (not UTC), so it round-trips
// with toLocalDateString/the DatePicker without shifting a day.
const parseLocalDate = (value: string): Date => {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const ModeToggle: React.FC<{ mode: 'existing' | 'new'; onChange: (m: 'existing' | 'new') => void }> = ({
  mode,
  onChange,
}) => (
  <FormGroup style={{ flexDirection: 'row', gap: 8 }}>
    <button
      type="button"
      onClick={() => onChange('existing')}
      style={{
        padding: '8px 16px',
        borderRadius: 4,
        border: mode === 'existing' ? '2px solid #5D2384' : '1px solid #E2E8F0',
        background: mode === 'existing' ? '#F3EAFB' : '#fff',
        cursor: 'pointer',
        fontWeight: 600,
      }}
    >
      Use Existing Institute
    </button>
    <button
      type="button"
      onClick={() => onChange('new')}
      style={{
        padding: '8px 16px',
        borderRadius: 4,
        border: mode === 'new' ? '2px solid #5D2384' : '1px solid #E2E8F0',
        background: mode === 'new' ? '#F3EAFB' : '#fff',
        cursor: 'pointer',
        fontWeight: 600,
      }}
    >
      Create New Institute
    </button>
  </FormGroup>
);

export const StepInstitute: React.FC = () => {
  const {
    instituteMode,
    setInstituteMode,
    selectedInstituteId,
    setSelectedInstituteId,
    newInstitute,
    setNewInstituteField,
    projectName,
    setProjectName,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
  } = useProjectStore();

  const { data: institutes = [], isLoading } = useQuery({
    queryKey: ['institutes'],
    queryFn: instituteService.getAll,
  });

  return (
    <StepFormContainer>
      <div>
        <StepTitle>Institute &amp; Project Details</StepTitle>
        <StepSubtitle>
          Pick the institute this project runs for, and set the project's name and window.
        </StepSubtitle>
      </div>

      <ModeToggle mode={instituteMode} onChange={setInstituteMode} />

      {instituteMode === 'existing' ? (
        <FormGrid>
          <Select
            label="Institute"
            options={institutes.map(i => ({ value: i.id, label: i.name }))}
            value={selectedInstituteId}
            onChange={e => setSelectedInstituteId(e.target.value)}
            placeholder={isLoading ? 'Loading institutes…' : 'Select institute'}
          />
        </FormGrid>
      ) : (
        <FormGrid>
          <FormGroup>
            <Input
              label="Institute Name"
              placeholder="e.g. Sunrise Public School"
              value={newInstitute.name}
              onChange={e => setNewInstituteField({ name: e.target.value })}
            />
            <Input
              label="Address"
              placeholder="e.g. 12 MG Road, Bengaluru"
              value={newInstitute.address}
              onChange={e => setNewInstituteField({ address: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Input
              label="Contact Number"
              placeholder="e.g. +919876543210"
              value={newInstitute.contactNumber}
              onChange={e => setNewInstituteField({ contactNumber: e.target.value })}
            />
            <Input
              label="Primary Email"
              type="email"
              placeholder="e.g. admin@institute.edu"
              value={newInstitute.primaryEmail}
              onChange={e => setNewInstituteField({ primaryEmail: e.target.value })}
            />
          </FormGroup>
        </FormGrid>
      )}

      <FormGrid>
        <FormGroup>
          <Input
            label="Project Name"
            placeholder="e.g. Career Guidance 2026 Batch A"
            value={projectName}
            onChange={e => setProjectName(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <FormGrid>
            <DatePicker
              label="Valid From"
              selected={fromDate ? parseLocalDate(fromDate) : null}
              onChange={(date: Date | null) => setFromDate(date ? toLocalDateString(date) : '')}
              placeholderText="Select start date"
              selectsStart
              startDate={fromDate ? parseLocalDate(fromDate) : undefined}
              endDate={toDate ? parseLocalDate(toDate) : undefined}
            />
            <DatePicker
              label="Valid To"
              selected={toDate ? parseLocalDate(toDate) : null}
              onChange={(date: Date | null) => setToDate(date ? toLocalDateString(date) : '')}
              placeholderText="Select end date"
              selectsEnd
              startDate={fromDate ? parseLocalDate(fromDate) : undefined}
              endDate={toDate ? parseLocalDate(toDate) : undefined}
              minDate={fromDate ? parseLocalDate(fromDate) : undefined}
            />
          </FormGrid>
        </FormGroup>
      </FormGrid>
    </StepFormContainer>
  );
};
