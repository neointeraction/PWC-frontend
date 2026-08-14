import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { counselorService } from '@/services/counselor.service';
import { useCounselorStore } from '@/store/counselor.store';
import { useToast } from '@/hooks';
import { getApiErrorMessage } from '@/utils';
import { ModalForm } from '../CounselorsList.styles';

const editCounselorSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  mobile: z.string().regex(/^\+\d{10,15}$/, 'Mobile must be E.164 format, e.g. +919876543210'),
  status: z.enum(['active', 'inactive']),
});

type EditCounselorFormData = z.infer<typeof editCounselorSchema>;

export const EditCounselorModal: React.FC = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { selectedCounselorForEdit, closeEditModal } = useCounselorStore();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EditCounselorFormData>({
    resolver: zodResolver(editCounselorSchema),
  });

  useEffect(() => {
    if (selectedCounselorForEdit) {
      reset({
        firstName: selectedCounselorForEdit.firstName,
        lastName: selectedCounselorForEdit.lastName,
        mobile: selectedCounselorForEdit.mobile,
        status: selectedCounselorForEdit.status,
      });
    }
  }, [selectedCounselorForEdit, reset]);

  const updateMutation = useMutation({
    mutationFn: (data: EditCounselorFormData) =>
      counselorService.update(selectedCounselorForEdit!.id, data),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['counselors'] });
      toast.success('Counselor Updated', `Successfully updated profile for ${data.name}.`);
      closeEditModal();
    },
    onError: err => {
      toast.error('Error', getApiErrorMessage(err, 'Failed to update counselor profile.'));
    },
  });

  const onSubmit = (data: EditCounselorFormData) => {
    if (selectedCounselorForEdit) {
      updateMutation.mutate(data);
    }
  };

  return (
    <Modal
      isOpen={Boolean(selectedCounselorForEdit)}
      onClose={closeEditModal}
      title="Edit Counselor Profile"
      subtitle={`Update profile and contact details for ${selectedCounselorForEdit?.name || ''}`}
      size="md"
      footer={
        <>
          <Button type="button" variant="secondary" onClick={closeEditModal}>
            Cancel
          </Button>
          <Button type="submit" form="edit-counselor-form" variant="primary" isLoading={updateMutation.isPending}>
            Save Changes
          </Button>
        </>
      }
    >
      <ModalForm id="edit-counselor-form" onSubmit={handleSubmit(onSubmit)}>
        <Input label="Counselor ID" value={selectedCounselorForEdit?.counselorId || ''} readOnly disabled />
        <Input label="Email Address" value={selectedCounselorForEdit?.email || ''} readOnly disabled />

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
          label="Mobile Number"
          placeholder="e.g. +919819093786"
          error={errors.mobile?.message}
          {...register('mobile')}
        />

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select
              label="Status"
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
              ]}
              value={field.value}
              onChange={field.onChange}
              error={errors.status?.message}
            />
          )}
        />
      </ModalForm>
    </Modal>
  );
};
