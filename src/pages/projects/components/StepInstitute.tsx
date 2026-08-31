import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/Input';
import { DatePicker } from '@/components/DatePicker';
import { useProjectStore } from '@/store/project.store';
import { isValidPhone } from '@/utils';
import {
  StepFormContainer,
  StepSubtitle,
  FormGrid,
  FormGroup,
} from './AddProjectWizard.styles';
import { InstituteDetails } from '@/types/project.types';

const instituteSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Institute name is required')
      .min(3, 'Institute name must be at least 3 characters'),
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    location: z.string().min(1, 'Location is required'),
    phone: z
      .string()
      .min(1, 'Phone number is required')
      .refine(isValidPhone, 'Enter a valid number, e.g. 9876543210 (no leading zero)'),
    validFrom: z.string().min(1, 'Start date is required'),
    validTo: z.string().min(1, 'End date is required'),
  })
  .refine(
    data => {
      if (!data.validFrom || !data.validTo) return true;
      return new Date(data.validFrom) <= new Date(data.validTo);
    },
    {
      message: 'End date cannot be before start date',
      path: ['validTo'],
    }
  );

type InstituteFormValues = z.infer<typeof instituteSchema>;

export const StepInstitute: React.FC = () => {
  const { instituteDetails, setInstituteDetails } = useProjectStore();

  const {
    register,
    control,
    formState: { errors },
  } = useForm<InstituteFormValues>({
    resolver: zodResolver(instituteSchema),
    defaultValues: {
      ...instituteDetails,
    },
    mode: 'onChange',
  });

  const handleChange = (
    field: keyof InstituteDetails,
    value: string
  ) => {
    setInstituteDetails({ [field]: value });
  };

  return (
    <StepFormContainer>
      <StepSubtitle>
        Enter the primary contact and timeline information for this institute.
      </StepSubtitle>
      <FormGrid>
        <FormGroup>
          <Input
            label="Institute Name"
            placeholder="Enter institute name"
            error={errors.name?.message}
            {...register('name', {
              onChange: e => handleChange('name', e.target.value),
            })}
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="contact@institute.edu"
            error={errors.email?.message}
            {...register('email', {
              onChange: e => handleChange('email', e.target.value),
            })}
          />
          <Input
            label="Phone Number"
            type="tel"
            placeholder="XXXXX XXXXX"
            error={errors.phone?.message}
            {...register('phone', {
              onChange: e => handleChange('phone', e.target.value),
            })}
          />
        </FormGroup>

        <FormGroup>
          <FormGrid>
            <Controller
              name="validFrom"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Valid From"
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date: Date | null) => {
                    const isoDate = date ? date.toISOString() : '';
                    field.onChange(isoDate);
                    handleChange('validFrom', isoDate);
                  }}
                  error={errors.validFrom?.message}
                  placeholderText="Select start date"
                  selectsStart
                  startDate={field.value ? new Date(field.value) : undefined}
                  endDate={
                    instituteDetails.validTo
                      ? new Date(instituteDetails.validTo)
                      : undefined
                  }
                />
              )}
            />
            <Controller
              name="validTo"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Valid To"
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date: Date | null) => {
                    const isoDate = date ? date.toISOString() : '';
                    field.onChange(isoDate);
                    handleChange('validTo', isoDate);
                  }}
                  error={errors.validTo?.message}
                  placeholderText="Select end date"
                  selectsEnd
                  startDate={
                    instituteDetails.validFrom
                      ? new Date(instituteDetails.validFrom)
                      : undefined
                  }
                  endDate={field.value ? new Date(field.value) : undefined}
                  minDate={
                    instituteDetails.validFrom
                      ? new Date(instituteDetails.validFrom)
                      : undefined
                  }
                />
              )}
            />
          </FormGrid>
          <Input
            label="Location"
            placeholder="Location"
            error={errors.location?.message}
            {...register('location', {
              onChange: e => handleChange('location', e.target.value),
            })}
          />
        </FormGroup>
      </FormGrid>
    </StepFormContainer>
  );
};
