import React from 'react';
import { Modal } from '@/components/Modal';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { useTenantManagementStore } from '@/store/tenant-management.store';
import { formatDate } from '@/utils';
import { DetailGrid, DetailItem, FlexColumnGap, FlexRowEnd } from '../TenantManagement.styles';

export const ViewTenantModal: React.FC = () => {
  const { isViewModalOpen, closeViewModal, selectedUser } = useTenantManagementStore();

  if (!selectedUser) return null;

  return (
    <Modal
      isOpen={isViewModalOpen}
      onClose={closeViewModal}
      title="Admin Profile Overview"
      subtitle={`Detailed metadata for ${selectedUser.name}`}
      size="md"
    >
      <FlexColumnGap>
        <DetailGrid>
          <DetailItem>
            <label>Full Name</label>
            <p>{selectedUser.name}</p>
          </DetailItem>

          <DetailItem>
            <label>Role</label>
            <div>
              <Badge variant={selectedUser.isViewOnly ? 'warning' : 'primary'}>
                {selectedUser.roleLabel}
              </Badge>
            </div>
          </DetailItem>

          <DetailItem>
            <label>Access Mode</label>
            <div>
              <Badge variant={selectedUser.isViewOnly ? 'warning' : 'primary'}>
                {selectedUser.isViewOnly ? 'View Only (Read-Only)' : 'Full Access (Admin)'}
              </Badge>
            </div>
          </DetailItem>

          <DetailItem>
            <label>Email Address</label>
            <p>{selectedUser.email}</p>
          </DetailItem>

          <DetailItem>
            <label>Status</label>
            <div>
              <Badge variant={selectedUser.status === 'active' ? 'success' : 'default'} dot>
                {selectedUser.status.toUpperCase()}
              </Badge>
            </div>
          </DetailItem>

          <DetailItem>
            <label>Created On</label>
            <p>{selectedUser.createdAt ? formatDate(selectedUser.createdAt) : 'N/A'}</p>
          </DetailItem>

          <DetailItem>
            <label>Last Active</label>
            <p>{selectedUser.lastActive ? formatDate(selectedUser.lastActive) : 'N/A'}</p>
          </DetailItem>
        </DetailGrid>

        <FlexRowEnd>
          <Button variant="secondary" onClick={closeViewModal}>
            Close
          </Button>
        </FlexRowEnd>
      </FlexColumnGap>
    </Modal>
  );
};
