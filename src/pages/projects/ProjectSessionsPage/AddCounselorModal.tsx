import React, { useState, useCallback } from 'react';
import { RiDeleteBinLine, RiUserAddLine } from 'react-icons/ri';
import styled from 'styled-components';
import { Modal } from '@/components/Modal';
import { Badge } from '@/components/Badge';
import { FileUpload } from '@/components/FileUpload';
import { Table, Column } from '@/components/Table';
import { Button } from '@/components/Button';
import { Tooltip } from '@/components/Tooltip';
import { projectService } from '@/services/project.service';
import { parseExcelFile } from '@/utils/excelParser';
import { ProjectCounselor, CounsellorSlotRow } from '@/types/project.types';
import { useToast } from '@/hooks';

const ModalBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SummaryRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
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

// Excel serial (1900 system) or a date string → YYYY-MM-DD.
const toISODate = (v: string): string => {
  const s = String(v ?? '').trim();
  if (!s) return '';
  if (/^\d+(\.\d+)?$/.test(s)) {
    const serial = Math.floor(parseFloat(s));
    return new Date((serial - 25569) * 86400000).toISOString().slice(0, 10);
  }
  return s;
};

// "9:00" / "09:00" / Excel time fraction → HH:mm (24h, zero-padded).
const toHHMM = (v: string): string => {
  const s = String(v ?? '').trim();
  if (!s) return '';
  if (s.includes(':')) {
    const [h, m] = s.split(':');
    return `${h.padStart(2, '0')}:${(m || '0').slice(0, 2).padStart(2, '0')}`;
  }
  const num = parseFloat(s);
  if (!isNaN(num) && num >= 0 && num < 1) {
    const total = Math.round(num * 24 * 60);
    return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
  }
  return s;
};

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

        // Availability sheet: group rows by Counsellor ID, collecting their slots.
        const byCode = new Map<string, { code: string; slots: CounsellorSlotRow[] }>();
        for (const row of rows) {
          const code = (
            row['Counsellor ID'] || row['Counselor ID'] || row['counsellorCode'] || row['Code'] || ''
          ).trim();
          if (!code) continue;
          if (!byCode.has(code)) byCode.set(code, { code, slots: [] });
          const date = toISODate(row['Date'] || row['date'] || '');
          const startTime = toHHMM(row['Start Time'] || row['startTime'] || row['Start'] || '');
          const endTime = toHHMM(row['End Time'] || row['endTime'] || row['End'] || '');
          if (date && startTime && endTime) {
            byCode.get(code)!.slots.push({ date, startTime, endTime });
          }
        }

        if (byCode.size === 0) {
          toast.error(
            'Invalid Format',
            'No valid rows. Ensure columns: Counsellor ID, Date, Start Time, End Time.'
          );
          setIsProcessing(false);
          return;
        }

        // Match each Counsellor ID against the real directory (only directory
        // counsellors can be assigned to a project).
        const directory = await projectService.getCounsellorDirectory();
        const dirByCode = new Map(directory.map(d => [d.counsellorCode, d]));
        const parsed: ProjectCounselor[] = Array.from(byCode.values()).map(g => {
          const dir = dirByCode.get(g.code);
          return dir
            ? {
                name: dir.name,
                email: dir.email,
                mobile: dir.mobile,
                matchStatus: 'matched' as const,
                counsellorCode: g.code,
                directoryId: dir.id,
                slots: g.slots,
              }
            : { name: '', email: '', mobile: '', matchStatus: 'new' as const, counsellorCode: g.code, slots: g.slots };
        });

        setCounselorList(prev => [...prev, ...parsed]);
        const matchedN = parsed.filter(p => p.matchStatus === 'matched').length;
        const newN = parsed.length - matchedN;
        const totalSlots = parsed.reduce((n, p) => n + (p.slots?.length || 0), 0);
        if (newN > 0) {
          toast.error(
            'Some Not In Directory',
            `${matchedN} matched, ${newN} not in the counsellor directory (add them there first).`
          );
        } else {
          toast.success('Counselors Loaded', `${matchedN} counsellor(s) with ${totalSlots} slots.`);
        }
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
    setCounselorList(prev => prev.filter(c => c.counsellorCode !== row.counsellorCode));
    toast.info('Counselor Removed', 'Removed from assignment list.');
  };

  const handleAssignToProject = () => {
    if (counselorList.length === 0) {
      toast.error('No Counselors', 'Please upload at least one counselor.');
      return;
    }
    onCounselorsAssigned(counselorList);
    setCounselorList([]);
    setSelectedFile(null);
    onClose();
  };

  const matchedCount = counselorList.filter(c => c.matchStatus === 'matched').length;
  const newCount = counselorList.filter(c => c.matchStatus === 'new').length;

  const columns: Column<ProjectCounselor>[] = [
    {
      key: 'counsellorCode',
      header: 'Counsellor ID',
    },
    {
      key: 'name',
      header: 'Name',
      render: row => row.name || '—',
    },
    {
      key: 'slots',
      header: 'Slots',
      render: row => row.slots?.length ?? 0,
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
      subtitle="Upload counselor availability to assign them to this project"
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
        <FileUpload
          label="Counselor List"
          hint="Availability sheet — columns: Counsellor ID, Date, Start Time, End Time"
          onFileSelect={handleFileSelect}
          onFileRemove={handleFileRemove}
          selectedFile={selectedFile}
        />

        <SummaryRow>
          <span>
            <strong>{matchedCount}</strong> matched
          </span>
          <span>•</span>
          <span>
            <strong>{newCount}</strong> new counselors
          </span>
          <span>•</span>
          <span>
            <strong>{counselorList.length}</strong> total
          </span>
        </SummaryRow>

        {counselorList.length > 0 && (
          <div style={{ marginTop: '12px' }}>
            <Table
              columns={columns}
              data={counselorList}
              isLoading={isProcessing}
              keyExtractor={row => row.counsellorCode || row.name}
              emptyMessage="No counselors added yet."
            />
          </div>
        )}
      </ModalBodyWrapper>
    </Modal>
  );
};

export default AddCounselorModal;
