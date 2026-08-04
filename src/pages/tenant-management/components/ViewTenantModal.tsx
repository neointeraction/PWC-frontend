import React from 'react';
import { Modal } from '@/components/Modal';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { useTenantManagementStore } from '@/store/tenant-management.store';
import { DetailGrid, DetailItem } from '../TenantManagement.styles';

export const ViewTenantModal: React.FC = () => {
  const { isViewModalOpen, closeViewModal, selectedUser } = useTenantManagementStore();

  if (!selectedUser) return null;

  const categoryVariant =
    selectedUser.userCategory === 'pwc'
      ? 'primary'
      : selectedUser.userCategory === 'institution'
      ? 'info'
      : 'success';

  const categoryLabel =
    selectedUser.userCategory === 'pwc'
      ? 'kREATE User'
      : selectedUser.userCategory === 'institution'
      ? 'Institution User'
      : 'Counselor User';

  return (
    <Modal
      isOpen={isViewModalOpen}
      onClose={closeViewModal}
      title="Tenant Profile Overview"
      subtitle={`Detailed metadata for ${selectedUser.name}`}
      size="md"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <DetailGrid>
          <DetailItem>
            <label>Full Name</label>
            <p>{selectedUser.name}</p>
          </DetailItem>

          <DetailItem>
            <label>User Category</label>
            <div>
              <Badge variant={categoryVariant}>{categoryLabel}</Badge>
            </div>
          </DetailItem>

          <DetailItem>
            <label>Email Address</label>
            <p>{selectedUser.email}</p>
          </DetailItem>

          <DetailItem>
            <label>Phone Number</label>
            <p>{selectedUser.phone || 'N/A'}</p>
          </DetailItem>

          <DetailItem>
            <label>Organization / Entity</label>
            <p>{selectedUser.organizationName || 'kREATE Global Engine'}</p>
          </DetailItem>

          <DetailItem>
            <label>Status</label>
            <div>
              <Badge
                variant={
                  selectedUser.status === 'active'
                    ? 'success'
                    : selectedUser.status === 'pending'
                    ? 'warning'
                    : 'default'
                }
                dot
              >
                {selectedUser.status.toUpperCase()}
              </Badge>
            </div>
          </DetailItem>

          <DetailItem>
            <label>Created On</label>
            <p>{selectedUser.createdAt}</p>
          </DetailItem>
        </DetailGrid>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
          <Button variant="secondary" onClick={closeViewModal}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
