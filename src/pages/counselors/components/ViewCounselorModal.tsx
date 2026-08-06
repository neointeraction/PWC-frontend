import React from 'react';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { useCounselorStore } from '@/store/counselor.store';
import { DetailGrid, DetailItem } from '../CounselorsList.styles';

export const ViewCounselorModal: React.FC = () => {
  const { selectedCounselorForView, closeViewModal } = useCounselorStore();

  if (!selectedCounselorForView) return null;

  return (
    <Modal
      isOpen={Boolean(selectedCounselorForView)}
      onClose={closeViewModal}
      title="Counselor Details"
      subtitle={`Viewing account record for ${selectedCounselorForView.name}`}
      size="md"
      footer={
        <Button variant="secondary" onClick={closeViewModal}>
          Close
        </Button>
      }
    >
      <DetailGrid>
        <DetailItem>
          <label>Counselor ID</label>
          <p>{selectedCounselorForView.counselorId}</p>
        </DetailItem>

        <DetailItem>
          <label>Counselor Name</label>
          <p>{selectedCounselorForView.name}</p>
        </DetailItem>

        <DetailItem>
          <label>Email Address</label>
          <p>{selectedCounselorForView.email}</p>
        </DetailItem>

        <DetailItem>
          <label>Mobile Number</label>
          <p>{selectedCounselorForView.mobile}</p>
        </DetailItem>

        <DetailItem>
          <label>GMeet / Zoom Link</label>
          <p>
            {selectedCounselorForView.meetingLink ? (
              <a
                href={selectedCounselorForView.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#5D2384', textDecoration: 'underline' }}
              >
                {selectedCounselorForView.meetingLink}
              </a>
            ) : (
              'N/A'
            )}
          </p>
        </DetailItem>

        <DetailItem>
          <label>Account Status</label>
          <div>
            <Badge variant={selectedCounselorForView.status === 'active' ? 'success' : 'default'} dot>
              {selectedCounselorForView.status.toUpperCase()}
            </Badge>
          </div>
        </DetailItem>

        <DetailItem>
          <label>Registered Date</label>
          <p>{selectedCounselorForView.createdAt || 'N/A'}</p>
        </DetailItem>
      </DetailGrid>
    </Modal>
  );
};
