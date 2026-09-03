import React, { useState, useCallback } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { Badge } from '@/components/Badge';
import { FileUpload } from '@/components/FileUpload';
import { Table, Column } from '@/components/Table';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Tooltip } from '@/components/Tooltip';
import { useProjectStore } from '@/store/project.store';
import { projectService } from '@/services/project.service';
import { parseExcelFile } from '@/utils/excelParser';
import { ProjectCounselor, CounsellorSlotRow } from '@/types/project.types';
import { useToast } from '@/hooks';

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

const rowKey = (c: ProjectCounselor) => c.counsellorCode || c.email || c.name;
import { ActionIconButton } from '../Projects.styles';
import {
  StepFormContainer,
  StepSubtitle,
  PreviewTableWrapper,
  SummaryRow,
  SummaryText,
  SummaryCount,
} from './AddProjectWizard.styles';

export const StepCounselors: React.FC = () => {
  const { counselors, setCounselors } = useProjectStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
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

        // Availability sheet: group rows by Counsellor ID, collecting their slots.
        const byCode = new Map<string, { code: string; name: string; slots: CounsellorSlotRow[] }>();
        for (const row of rows) {
          const code = (
            row['Counsellor ID'] || row['Counselor ID'] || row['counsellorCode'] || row['Code'] || ''
          ).trim();
          if (!code) continue;
          const name = (row['Counsellor Name'] || row['Counselor Name'] || row['Name'] || '').trim();
          if (!byCode.has(code)) byCode.set(code, { code, name, slots: [] });
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
        // counsellors can be added to a project).
        const directory = await projectService.getCounsellorDirectory();
        const dirByCode = new Map(directory.map(d => [d.counsellorCode, d]));
        const parsed: ProjectCounselor[] = Array.from(byCode.values()).map(g => {
          const dir = dirByCode.get(g.code);
          return dir
            ? {
                name: dir.name || g.name,
                email: dir.email,
                mobile: dir.mobile,
                matchStatus: 'matched' as const,
                counsellorCode: g.code,
                directoryId: dir.id,
                slots: g.slots,
              }
            : { name: g.name, email: '', mobile: '', matchStatus: 'new' as const, counsellorCode: g.code, slots: g.slots };
        });

        setCounselors([...counselors, ...parsed]);
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
    [counselors, setCounselors, toast]
  );

  const handleFileRemove = useCallback(() => {
    setSelectedFile(null);
  }, []);

  const handleRemoveCounselor = (row: ProjectCounselor) => {
    setCounselors(counselors.filter(c => rowKey(c) !== rowKey(row)));
    toast.success('Counselor Removed', 'Counselor removed from project assignment.');
  };

  const handleAddManualCounselor = async () => {
    if (!newCounselor.email.trim()) {
      toast.error('Validation Error', 'Counselor Email is required to match the directory.');
      return;
    }
    const directory = await projectService.getCounsellorDirectory();
    const dir = directory.find(
      d => d.email.toLowerCase() === newCounselor.email.toLowerCase().trim()
    );
    const entry: ProjectCounselor = dir
      ? {
          name: dir.name,
          email: dir.email,
          mobile: dir.mobile,
          matchStatus: 'matched',
          counsellorCode: dir.counsellorCode,
          directoryId: dir.id,
          slots: [],
        }
      : { ...newCounselor, matchStatus: 'new' };
    setCounselors([...counselors, entry]);
    setNewCounselor({ name: '', email: '', mobile: '' });
    setShowAddForm(false);
    toast[dir ? 'success' : 'error'](
      dir ? 'Counselor Added' : 'Not In Directory',
      dir ? `${dir.name} assigned to project.` : 'That email is not in the counsellor directory.'
    );
  };

  const matchedCount = counselors.filter(c => c.matchStatus === 'matched').length;
  const newCount = counselors.filter(c => c.matchStatus === 'new').length;

  const columns: Column<ProjectCounselor>[] = [
    {
      key: 'name',
      header: 'Name',
    },
    {
      key: 'counsellorCode',
      header: 'Counselor ID',
      render: row => row.counsellorCode || '-',
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
    <StepFormContainer>
      <StepSubtitle>
        Upload a CSV/Excel file or add counselors individually to assign them to this project.
      </StepSubtitle>

      <FileUpload
        label="Counselor List"
        hint="Availability sheet — columns: Counsellor ID, Date, Start Time, End Time"
        onFileSelect={handleFileSelect}
        onFileRemove={handleFileRemove}
        selectedFile={selectedFile}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
        <SummaryRow style={{ margin: 0 }}>
          <SummaryText>
            <SummaryCount>{matchedCount}</SummaryCount> matched
          </SummaryText>
          <SummaryText>•</SummaryText>
          <SummaryText>
            <SummaryCount>{newCount}</SummaryCount> new counselors
          </SummaryText>
          <SummaryText>•</SummaryText>
          <SummaryText>
            <SummaryCount>{counselors.length}</SummaryCount> total
          </SummaryText>
        </SummaryRow>
        {/* <Button
          type="button"
          size="sm"
          variant="secondary"
          leftIcon={<RiAddLine size={16} />}
          onClick={() => setShowAddForm(prev => !prev)}
        >
          {showAddForm ? 'Cancel Manual Add' : 'Add Counselor Manually'}
        </Button> */}
      </div>

      {showAddForm && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr auto',
            gap: '12px',
            alignItems: 'end',
            padding: '16px',
            backgroundColor: '#F9FAFB',
            borderRadius: '4px',
            border: '1px solid #E5E7EB',
            marginTop: '12px',
          }}
        >
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
            placeholder="98111 22334"
            value={newCounselor.mobile}
            onChange={e => setNewCounselor({ ...newCounselor, mobile: e.target.value })}
          />
          <Button type="button" size="sm" onClick={handleAddManualCounselor}>
            Add
          </Button>
        </div>
      )}

      {counselors.length > 0 && (
        <PreviewTableWrapper style={{ marginTop: '12px' }}>
          <Table
            columns={columns}
            data={counselors}
            isLoading={isProcessing}
            keyExtractor={row => rowKey(row)}
            emptyMessage="No counselors added yet."
          />
        </PreviewTableWrapper>
      )}
    </StepFormContainer>
  );
};
