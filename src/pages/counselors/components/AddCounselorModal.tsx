import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RiFileCopyLine } from 'react-icons/ri';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { counselorService } from '@/services/counselor.service';
import { instituteService } from '@/services/institute.service';
import { useCounselorStore } from '@/store/counselor.store';
import { useToast } from '@/hooks';
import { getApiErrorMessage } from '@/utils';
import { CreateCounselorResult } from '@/types/counselor.types';
import { ModalForm } from '../CounselorsList.styles';

const addCounselorSchema = z.object({
  counselorId: z.string().min(1, 'Counselor ID is required'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  mobile: z.string().regex(/^\+\d{10,15}$/, 'Mobile must be E.164 format, e.g. +919876543210'),
  instituteId: z.string().min(1, 'Institute is required'),
});

type AddCounselorFormData = z.infer<typeof addCounselorSchema>;

export const AddCounselorModal: React.FC = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { isAddModalOpen, closeAddModal } = useCounselorStore();
  const [created, setCreated] = useState<CreateCounselorResult | null>(null);

  const { data: institutes = [] } = useQuery({
    queryKey: ['institutes'],
    queryFn: instituteService.getAll,
    enabled: isAddModalOpen,
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddCounselorFormData>({
    resolver: zodResolver(addCounselorSchema),
    defaultValues: { counselorId: '', firstName: '', lastName: '', email: '', mobile: '', instituteId: '' },
  });

  const createMutation = useMutation({
    mutationFn: counselorService.create,
    onSuccess: result => {
      queryClient.invalidateQueries({ queryKey: ['counselors'] });
      toast.success('Counselor Added', `Successfully registered ${result.counselor.name}.`);
      setCreated(result);
      reset();
    },
    onError: err => {
      toast.error('Error', getApiErrorMessage(err, 'Failed to register new counselor.'));
    },
  });

  const onSubmit = (data: AddCounselorFormData) => {
    createMutation.mutate(data);
  };

  const handleClose = () => {
    setCreated(null);
    reset();
    closeAddModal();
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.info('Copied to Clipboard', 'Temporary password copied.');
  };

  if (created) {
    return (
      <Modal
        isOpen={isAddModalOpen}
        onClose={handleClose}
        title="Counselor Created"
        subtitle={`Save these credentials now — the password is shown only once.`}
        size="md"
        footer={
          <Button variant="primary" onClick={handleClose}>
            Done
          </Button>
        }
      >
        <ModalForm as="div">
          <Input label="Email" value={created.counselor.email} readOnly />
          <Input
            label="Temporary Password"
            value={created.tempPassword}
            readOnly
            rightIcon={
              <RiFileCopyLine
                size={18}
                style={{ cursor: 'pointer' }}
                onClick={() => handleCopy(created.tempPassword)}
              />
            }
          />
        </ModalForm>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isAddModalOpen}
      onClose={handleClose}
      title="Add New Counselor"
      subtitle="Register a new counselor account into the platform"
      size="md"
      footer={
        <>
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" form="add-counselor-form" variant="primary" isLoading={createMutation.isPending}>
            Save Counselor
          </Button>
        </>
      }
    >
      <ModalForm id="add-counselor-form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Counselor ID"
          placeholder="e.g. CN014"
          error={errors.counselorId?.message}
          {...register('counselorId')}
        />

        <Input
          label="First Name"
          placeholder="e.g. Anil"
          error={errors.firstName?.message}
          {...register('firstName')}
        />

        <Input
          label="Last Name"
          placeholder="e.g. Iyer"
          error={errors.lastName?.message}
          {...register('lastName')}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="e.g. anil.iyer@example.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Mobile Number"
          placeholder="e.g. +919819093786"
          error={errors.mobile?.message}
          {...register('mobile')}
        />

        <Controller
          name="instituteId"
          control={control}
          render={({ field }) => (
            <Select
              label="Institute"
              options={institutes.map(i => ({ value: i.id, label: i.name }))}
              value={field.value}
              onChange={field.onChange}
              placeholder="Select institute"
              error={errors.instituteId?.message}
            />
          )}
        />
      </ModalForm>
    </Modal>
  );
};
