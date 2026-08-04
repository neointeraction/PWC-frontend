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

const editTenantSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  userCategory: z.enum(['pwc', 'institution', 'counselor']),
  roleLabel: z.string().optional(),
  organizationName: z.string().optional(),
  status: z.enum(['active', 'inactive', 'pending']),
});

type EditTenantFormData = z.infer<typeof editTenantSchema>;

import { ModalFormContainer } from '../TenantManagement.styles';

export const EditTenantModal: React.FC = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { isEditModalOpen, closeEditModal, selectedUser } = useTenantManagementStore();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<EditTenantFormData>({
    resolver: zodResolver(editTenantSchema),
  });

  const selectedCategory = watch('userCategory');

  useEffect(() => {
    if (selectedUser) {
      reset({
        name: selectedUser.name,
        email: selectedUser.email,
        phone: selectedUser.phone || '',
        userCategory: selectedUser.userCategory,
        roleLabel: selectedUser.roleLabel,
        organizationName: selectedUser.organizationName || '',
        status: selectedUser.status,
      });
    }
  }, [selectedUser, reset]);

  const updateMutation = useMutation({
    mutationFn: (data: EditTenantFormData) =>
      tenantManagementService.update(selectedUser!.id, data),
    onSuccess: updated => {
      queryClient.invalidateQueries({ queryKey: ['tenant-records'] });
      toast.success('Tenant User Updated', `Updated account details for ${updated.name}.`);
      closeEditModal();
    },
    onError: () => {
      toast.error('Error', 'Failed to update tenant user. Please try again.');
    },
  });

  const onSubmit = (data: EditTenantFormData) => {
    updateMutation.mutate(data);
  };

  return (
    <Modal
      isOpen={isEditModalOpen}
      onClose={closeEditModal}
      title="Edit Tenant Profile"
      subtitle={`Modify account attributes and access permissions for ${selectedUser?.name || 'tenant user'}`}
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
          label="Full Name"
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          label="Email Address"
          type="email"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Phone Number"
          error={errors.phone?.message}
          {...register('phone')}
        />

        <Select
          label="User Type"
          options={[
            { value: 'pwc', label: 'kREATE User (Admin)' },
            { value: 'institution', label: 'Institution User (Admin)', disabled: true },
            { value: 'counselor', label: 'Counselor User (Career Advisor / Counselor)', disabled: true },
          ]}
          error={errors.userCategory?.message}
          {...register('userCategory')}
        />

        {selectedCategory !== 'pwc' && (
          <Input
            label="Organization / Institution Name"
            error={errors.organizationName?.message}
            {...register('organizationName')}
          />
        )}

        <Select
          label="Account Status"
          options={[
            { value: 'active', label: 'Active' },
            { value: 'pending', label: 'Pending Invitation' },
            { value: 'inactive', label: 'Inactive' },
          ]}
          error={errors.status?.message}
          {...register('status')}
        />
      </ModalFormContainer>
    </Modal>
  );
};
