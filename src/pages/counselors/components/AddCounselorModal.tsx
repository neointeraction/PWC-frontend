import React from 'react';
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

const addCounselorSchema = z.object({
  counselorId: z.string().min(1, 'Counselor ID is required'),
  name: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  mobile: z.string().min(10, 'Mobile number must be at least 10 digits'),
  meetingLink: z.string().optional(),
  status: z.enum(['active', 'inactive']),
});

type AddCounselorFormData = z.infer<typeof addCounselorSchema>;

export const AddCounselorModal: React.FC = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { isAddModalOpen, closeAddModal } = useCounselorStore();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddCounselorFormData>({
    resolver: zodResolver(addCounselorSchema),
    defaultValues: {
      counselorId: '',
      name: '',
      email: '',
      mobile: '',
      meetingLink: '',
      status: 'active',
    },
  });

  const createMutation = useMutation({
    mutationFn: counselorService.create,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['counselors'] });
      queryClient.invalidateQueries({ queryKey: ['counselors-stats'] });
      toast.success('Counselor Added', `Successfully registered counselor ${data.name} (${data.counselorId}).`);
      reset();
      closeAddModal();
    },
    onError: () => {
      toast.error('Error', 'Failed to register new counselor.');
    },
  });

  const onSubmit = (data: AddCounselorFormData) => {
    createMutation.mutate(data);
  };

  return (
    <Modal
      isOpen={isAddModalOpen}
      onClose={closeAddModal}
      title="Add New Counselor"
      subtitle="Register a new counselor account into the platform"
      size="md"
      footer={
        <>
          <Button type="button" variant="secondary" onClick={closeAddModal}>
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
          placeholder="Enter counselor ID"
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
