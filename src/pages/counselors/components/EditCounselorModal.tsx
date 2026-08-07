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
import { ModalForm } from '../CounselorsList.styles';

const editCounselorSchema = z.object({
  counselorId: z.string().min(1, 'Counselor ID is required'),
  name: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  mobile: z.string().min(10, 'Mobile number must be at least 10 digits'),
  meetingLink: z.string().optional(),
  pwd: z.string().optional(),
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
        counselorId: selectedCounselorForEdit.counselorId,
        name: selectedCounselorForEdit.name,
        email: selectedCounselorForEdit.email,
        mobile: selectedCounselorForEdit.mobile,
        meetingLink: selectedCounselorForEdit.meetingLink || '',
        pwd: selectedCounselorForEdit.pwd || '',
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
    onError: () => {
      toast.error('Error', 'Failed to update counselor profile.');
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
        <Input
          label="Counselor ID"
          placeholder="e.g. C001"
          error={errors.counselorId?.message}
          {...register('counselorId')}
        />

        <Input
          label="Counselor Name"
          placeholder="e.g. Anil Iyer"
          error={errors.name?.message}
          {...register('name')}
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
          placeholder="e.g. 9819093786"
          error={errors.mobile?.message}
          {...register('mobile')}
        />

        <Input
          label="GMeet / Zoom Link"
          placeholder="e.g. https://meet.google.com/abc-defg-hij"
          error={errors.meetingLink?.message}
          {...register('meetingLink')}
        />

        <Input
          label="Password / PWD"
          type="password"
          placeholder="Enter new password to update"
          error={errors.pwd?.message}
          {...register('pwd')}
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
