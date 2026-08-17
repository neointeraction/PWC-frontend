import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { tenantManagementService } from '@/services/tenant-management.service';
import { useTenantManagementStore } from '@/store/tenant-management.store';
import { useToast } from '@/hooks';
import { getApiErrorMessage } from '@/utils';
import { ModalFormContainer } from '../TenantManagement.styles';

const addTenantSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  isViewOnly: z.boolean().optional(),
});

type AddTenantFormData = z.infer<typeof addTenantSchema>;

export const AddTenantModal: React.FC = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { isAddModalOpen, closeAddModal, openCredentialsModal } = useTenantManagementStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddTenantFormData>({
    resolver: zodResolver(addTenantSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      isViewOnly: false,
    },
  });

  const createMutation = useMutation({
    mutationFn: tenantManagementService.create,
    onSuccess: newUser => {
      queryClient.invalidateQueries({ queryKey: ['tenant-records'] });
      toast.success(
        'Admin Created',
        `${newUser.name} was added as ${newUser.roleLabel}. Share the temporary password shown next.`
      );
      reset();
      closeAddModal();
      // Surface the one-time temp password — it's never retrievable again.
      openCredentialsModal(newUser);
    },
    onError: (err: unknown) => {
      toast.error('Error', getApiErrorMessage(err, 'Failed to create admin. Please try again.'));
    },
  });

  const onSubmit = (data: AddTenantFormData) => {
    createMutation.mutate(data);
  };

  return (
    <Modal
      isOpen={isAddModalOpen}
      onClose={closeAddModal}
      title="Add New Admin"
      subtitle="Create a kREATE App Admin login. A temporary password is generated on creation."
      size="md"
      footer={
        <>
          <Button type="button" variant="secondary" onClick={closeAddModal}>
            Cancel
          </Button>
          <Button type="submit" form="add-tenant-form" variant="primary" isLoading={createMutation.isPending}>
            Create Admin Account
          </Button>
        </>
      }
    >
      <ModalFormContainer id="add-tenant-form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="First Name"
          placeholder="e.g. Alex"
          error={errors.firstName?.message}
          {...register('firstName')}
        />

        <Input
          label="Last Name"
          placeholder="e.g. Morgan"
          error={errors.lastName?.message}
          {...register('lastName')}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="e.g. alex.morgan@example.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
          <input
            type="checkbox"
            id="add-tenant-is-view-only"
            style={{ width: '18px', height: '18px', accentColor: '#2563EB', cursor: 'pointer' }}
            {...register('isViewOnly')}
          />
          <label
            htmlFor="add-tenant-is-view-only"
            style={{ fontSize: '14px', fontWeight: 500, color: '#334155', cursor: 'pointer' }}
          >
            View Only Admin (Read-only access — every write action is blocked)
          </label>
        </div>
      </ModalFormContainer>
    </Modal>
  );
};
