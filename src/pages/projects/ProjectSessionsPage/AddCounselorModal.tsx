import React, { useState, useCallback } from 'react';
import { RiAddLine, RiDeleteBinLine, RiUserAddLine } from 'react-icons/ri';
import styled from 'styled-components';
import { Modal } from '@/components/Modal';
import { Badge } from '@/components/Badge';
import { FileUpload } from '@/components/FileUpload';
import { Table, Column } from '@/components/Table';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Tooltip } from '@/components/Tooltip';
import { projectService } from '@/services/project.service';
import { parseExcelFile } from '@/utils/excelParser';
import { ProjectCounselor } from '@/types/project.types';
import { useToast } from '@/hooks';

const ModalBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SubtitleText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
`;

const SummaryRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const SummaryCount = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const ManualFormCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  gap: 12px;
  align-items: end;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.surfaceHover};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ActionIconButton = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.danger};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.danger};
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

interface AddCounselorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCounselorsAssigned: (counselors: ProjectCounselor[]) => void;
}

export const AddCounselorModal: React.FC<AddCounselorModalProps> = ({
  isOpen,
  onClose,
  onCounselorsAssigned,
}) => {
  const [counselorList, setCounselorList] = useState<ProjectCounselor[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showManualForm, setShowManualForm] = useState(false);
  const [newCounselor, setNewCounselor] = useState<Omit<ProjectCounselor, 'matchStatus'>>({
    name: '',
    email: '',
    mobile: '',
  });
  const toast = useToast();

  const handleFileSelect = useCallback(
    async (file: File) => {
      setSelectedFile(file);
      setIsProcessing(true);

      try {
        const rows = await parseExcelFile(file);

        if (rows.length === 0) {
          toast.error('Empty File', 'The uploaded file contains no data rows.');
          setIsProcessing(false);
          return;
        }

        const rawCounselors = rows.map(row => ({
          name: row['Name'] || row['name'] || '',
          email: row['Email'] || row['email'] || '',
          mobile: row['Mobile'] || row['mobile'] || row['Phone'] || row['phone'] || '',
        }));

        const validCounselors = rawCounselors.filter(c => c.name && c.email);

        if (validCounselors.length === 0) {
          toast.error(
            'Invalid Format',
            'No valid counselor records found. Ensure columns: Name, Email, Mobile.'
          );
          setIsProcessing(false);
          return;
        }

        const validated = await projectService.validateCounselors(validCounselors);
        setCounselorList(prev => [...prev, ...validated]);
        toast.success(
          'Counselors Loaded',
          `${validated.length} counselor(s) added successfully.`
        );
      } catch {
        toast.error('Parse Error', 'Failed to parse the uploaded file.');
      } finally {
        setIsProcessing(false);
      }
    },
    [toast]
  );

  const handleFileRemove = useCallback(() => {
    setSelectedFile(null);
  }, []);

  const handleRemoveCounselor = (row: ProjectCounselor) => {
    setCounselorList(prev => prev.filter(c => c.email !== row.email));
    toast.info('Counselor Removed', 'Removed from assignment list.');
  };

  const handleAddManualCounselor = async () => {
    if (!newCounselor.name.trim() || !newCounselor.email.trim()) {
      toast.error('Validation Error', 'Counselor Name and Email are required.');
      return;
    }
    const validated = await projectService.validateCounselors([newCounselor]);
    setCounselorList(prev => [...prev, ...validated]);
    setNewCounselor({ name: '', email: '', mobile: '' });
    setShowManualForm(false);
    toast.success('Counselor Added', `${newCounselor.name} added to assignment list.`);
  };

  const handleAssignToProject = () => {
    if (counselorList.length === 0) {
      toast.error('No Counselors', 'Please upload or add at least one counselor.');
      return;
    }
    onCounselorsAssigned(counselorList);
    toast.success(
      'Counselors Assigned',
      `Successfully assigned ${counselorList.length} counselor(s) to this project.`
    );
    setCounselorList([]);
    setSelectedFile(null);
    onClose();
  };

  const matchedCount = counselorList.filter(c => c.matchStatus === 'matched').length;
  const newCount = counselorList.filter(c => c.matchStatus === 'new').length;

  const columns: Column<ProjectCounselor>[] = [
    {
      key: 'name',
      header: 'Name',
    },
    {
      key: 'email',
      header: 'Email',
    },
    {
      key: 'mobile',
      header: 'Mobile',
    },
    {
      key: 'matchStatus',
      header: 'Status',
      render: row => (
        <Badge variant={row.matchStatus === 'matched' ? 'success' : 'warning'}>
          {row.matchStatus === 'matched' ? 'Matched' : 'New'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Action',
      width: '60px',
      render: row => (
        <Tooltip content="Remove Counselor">
          <ActionIconButton
            type="button"
            aria-label="Remove Counselor"
            onClick={() => handleRemoveCounselor(row)}
          >
            <RiDeleteBinLine size={16} />
          </ActionIconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Counselors to Project"
      subtitle="Upload or manually assign counselors for project session scheduling"
      size="lg"
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', width: '100%' }}>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleAssignToProject}
            disabled={counselorList.length === 0}
            leftIcon={<RiUserAddLine size={16} />}
          >
            Assign {counselorList.length > 0 ? `(${counselorList.length})` : ''} Counselors
          </Button>
        </div>
      }
    >
      <ModalBodyWrapper>
        <SubtitleText>
          Upload a CSV/Excel file or add counselors individually to assign them to this project.
        </SubtitleText>

        <FileUpload
          label="Counselor List"
          hint="CSV with columns: Name, Email, Mobile"
          onFileSelect={handleFileSelect}
          onFileRemove={handleFileRemove}
          selectedFile={selectedFile}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
          <SummaryRow>
            <SummaryText>
              <SummaryCount>{matchedCount}</SummaryCount> matched
            </SummaryText>
            <SummaryText>•</SummaryText>
            <SummaryText>
              <SummaryCount>{newCount}</SummaryCount> new counselors
            </SummaryText>
            <SummaryText>•</SummaryText>
            <SummaryText>
              <SummaryCount>{counselorList.length}</SummaryCount> total
            </SummaryText>
          </SummaryRow>

          <Button
            type="button"
            size="sm"
            variant="secondary"
            leftIcon={<RiAddLine size={16} />}
            onClick={() => setShowManualForm(prev => !prev)}
          >
            {showManualForm ? 'Cancel Manual Add' : 'Add Counselor Manually'}
          </Button>
        </div>

        {showManualForm && (
          <ManualFormCard>
            <Input
              label="Name"
              placeholder="e.g. Priya Sundaram"
              value={newCounselor.name}
              onChange={e => setNewCounselor({ ...newCounselor, name: e.target.value })}
            />
            <Input
              label="Email"
              placeholder="priya.sundaram@pwc.org"
              value={newCounselor.email}
              onChange={e => setNewCounselor({ ...newCounselor, email: e.target.value })}
            />
            <Input
              label="Mobile"
              placeholder="+91 98111 22334"
              value={newCounselor.mobile}
              onChange={e => setNewCounselor({ ...newCounselor, mobile: e.target.value })}
            />
            <Button type="button" size="sm" onClick={handleAddManualCounselor}>
              Add
            </Button>
          </ManualFormCard>
        )}

        {counselorList.length > 0 && (
          <div style={{ marginTop: '12px' }}>
            <Table
              columns={columns}
              data={counselorList}
              isLoading={isProcessing}
              keyExtractor={row => row.email || row.name}
              emptyMessage="No counselors added yet."
            />
          </div>
        )}
      </ModalBodyWrapper>
    </Modal>
  );
};

const SummaryText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export default AddCounselorModal;
