import React, { useState, useCallback } from 'react';
import { RiAddLine, RiDeleteBinLine } from 'react-icons/ri';
import { Badge } from '@/components/Badge';
import { FileUpload } from '@/components/FileUpload';
import { Table, Column } from '@/components/Table';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Tooltip } from '@/components/Tooltip';
import { useProjectStore } from '@/store/project.store';
import { projectService } from '@/services/project.service';
import { parseExcelFile } from '@/utils/excelParser';
import { ProjectCounselor } from '@/types/project.types';
import { useToast } from '@/hooks';
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
        setCounselors([...counselors, ...validated]);
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
    [counselors, setCounselors, toast]
  );

  const handleFileRemove = useCallback(() => {
    setSelectedFile(null);
  }, []);

  const handleRemoveCounselor = (row: ProjectCounselor) => {
    const updated = counselors.filter(c => c.email !== row.email);
    setCounselors(updated);
    toast.success('Counselor Removed', 'Counselor removed from project assignment.');
  };

  const handleAddManualCounselor = async () => {
    if (!newCounselor.name.trim() || !newCounselor.email.trim()) {
      toast.error('Validation Error', 'Counselor Name and Email are required.');
      return;
    }
    const validated = await projectService.validateCounselors([newCounselor]);
    setCounselors([...counselors, ...validated]);
    setNewCounselor({ name: '', email: '', mobile: '' });
    setShowAddForm(false);
    toast.success('Counselor Added', `${newCounselor.name} assigned to project.`);
  };

  const matchedCount = counselors.filter(c => c.matchStatus === 'matched').length;
  const newCount = counselors.filter(c => c.matchStatus === 'new').length;

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
        hint="CSV with columns: Name, Email, Mobile"
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
        <Button
          type="button"
          size="sm"
          variant="secondary"
          leftIcon={<RiAddLine size={16} />}
          onClick={() => setShowAddForm(prev => !prev)}
        >
          {showAddForm ? 'Cancel Manual Add' : 'Add Counselor Manually'}
        </Button>
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
            placeholder="+91 98111 22334"
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
            keyExtractor={row => row.email || row.name}
            emptyMessage="No counselors added yet."
          />
        </PreviewTableWrapper>
      )}
    </StepFormContainer>
  );
};
