import React from 'react';
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

const addTenantSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  userCategory: z.enum(['pwc', 'institution', 'counselor']),
  roleLabel: z.string().optional(),
  organizationName: z.string().optional(),
  status: z.enum(['active', 'inactive', 'pending']).optional(),
});

type AddTenantFormData = z.infer<typeof addTenantSchema>;

export const AddTenantModal: React.FC = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { isAddModalOpen, closeAddModal } = useTenantManagementStore();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddTenantFormData>({
    resolver: zodResolver(addTenantSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      userCategory: 'pwc',
      roleLabel: 'kREATE Default User',
      organizationName: '',
      status: 'active',
    },
  });

  const selectedCategory = watch('userCategory');

  const createMutation = useMutation({
    mutationFn: tenantManagementService.create,
    onSuccess: newUser => {
      queryClient.invalidateQueries({ queryKey: ['tenant-records'] });
      toast.success('Tenant User Created', `Successfully added ${newUser.name} as ${newUser.userCategory.toUpperCase()} user.`);
      reset();
      closeAddModal();
    },
    onError: (err: Error) => {
      toast.error('Error', err.message || 'Failed to create tenant user record. Please try again.');
    },
  });

  const onSubmit = (data: AddTenantFormData) => {
    createMutation.mutate({
      ...data,
      status: 'active',
      roleLabel: data.userCategory === 'pwc' ? 'Admin' : data.userCategory === 'institution' ? 'Institution User' : 'Counselor',
      organizationName:
        data.userCategory === 'pwc'
          ? 'kREATE Global Engine'
          : data.organizationName || 'kREATE Network Partner',
    });
  };

  return (
    <Modal
      isOpen={isAddModalOpen}
      onClose={closeAddModal}
      title="Add New Tenant User"
      subtitle="Register a kREATE User, Institution User, or Counselor User"
      size="md"
      footer={
        <>
          <Button type="button" variant="secondary" onClick={closeAddModal}>
            Cancel
          </Button>
          <Button type="submit" form="add-tenant-form" variant="primary" isLoading={createMutation.isPending}>
            Create Tenant Account
          </Button>
        </>
      }
    >
      <form id="add-tenant-form" onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Input
          label="Full Name"
          placeholder="e.g. Alex Morgan"
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="e.g. alex.morgan@example.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Phone Number (Optional)"
          placeholder="e.g. +1 (555) 123-4567"
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
            placeholder="e.g. Phoenix Academy or Horizon High School"
            error={errors.organizationName?.message}
            {...register('organizationName')}
          />
        )}
      </form>
    </Modal>
  );
};
