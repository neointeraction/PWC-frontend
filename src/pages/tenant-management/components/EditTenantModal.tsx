import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Button } from '@/components/Button';
import { tenantManagementService } from '@/services/tenant-management.service';
import { useTenantManagementStore } from '@/store/tenant-management.store';
import { useToast } from '@/hooks';
import { getApiErrorMessage } from '@/utils';
import { ModalFormContainer } from '../TenantManagement.styles';

const editTenantSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(1, 'Last name is required'),
  isViewOnly: z.boolean().optional(),
  status: z.enum(['active', 'inactive']),
});

type EditTenantFormData = z.infer<typeof editTenantSchema>;

export const EditTenantModal: React.FC = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { isEditModalOpen, closeEditModal, selectedUser } = useTenantManagementStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditTenantFormData>({
    resolver: zodResolver(editTenantSchema),
  });

  useEffect(() => {
    if (selectedUser) {
      reset({
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        isViewOnly: Boolean(selectedUser.isViewOnly),
        status: selectedUser.status === 'inactive' ? 'inactive' : 'active',
      });
    }
  }, [selectedUser, reset]);

  const updateMutation = useMutation({
    mutationFn: (data: EditTenantFormData) =>
      tenantManagementService.update(selectedUser!.id, data),
    onSuccess: updated => {
      queryClient.invalidateQueries({ queryKey: ['tenant-records'] });
      toast.success('Admin Updated', `Updated account details for ${updated.name}.`);
      closeEditModal();
    },
    onError: (err: unknown) => {
      toast.error('Error', getApiErrorMessage(err, 'Failed to update admin. Please try again.'));
    },
  });

  const onSubmit = (data: EditTenantFormData) => {
    updateMutation.mutate(data);
  };

  return (
    <Modal
      isOpen={isEditModalOpen}
      onClose={closeEditModal}
      title="Edit Admin Profile"
      subtitle={`Modify account details and access for ${selectedUser?.name || 'admin'}`}
      size="md"
      footer={
        <>
          <Button type="button" variant="secondary" onClick={closeEditModal}>
            Cancel
          </Button>
          <Button type="submit" form="edit-tenant-form" variant="primary" isLoading={updateMutation.isPending}>
            Save Changes
          </Button>
        </>
      }
    >
      <ModalFormContainer id="edit-tenant-form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="First Name"
          error={errors.firstName?.message}
          {...register('firstName')}
        />

        <Input
          label="Last Name"
          error={errors.lastName?.message}
          {...register('lastName')}
        />

        <Input
          label="Email Address"
          type="email"
          value={selectedUser?.email || ''}
          disabled
          hint="Email can't be changed after creation."
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
          <input
            type="checkbox"
            id="edit-tenant-is-view-only"
            style={{ width: '18px', height: '18px', accentColor: '#2563EB', cursor: 'pointer' }}
            {...register('isViewOnly')}
          />
          <label
            htmlFor="edit-tenant-is-view-only"
            style={{ fontSize: '14px', fontWeight: 500, color: '#334155', cursor: 'pointer' }}
          >
            View Only Admin (Read-only access — every write action is blocked)
          </label>
        </div>

        <Select
          label="Account Status"
          options={[
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive (login disabled)' },
          ]}
          error={errors.status?.message}
          {...register('status')}
        />
      </ModalFormContainer>
    </Modal>
  );
};
