import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { RiDownloadLine, RiCheckboxCircleLine, RiErrorWarningLine, RiFileCopyLine } from 'react-icons/ri';
import { FileUpload } from '@/components/FileUpload';
import { Select } from '@/components/Select';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Table, Column } from '@/components/Table';
import { Badge } from '@/components/Badge';
import { instituteService, InstituteClass } from '@/services/institute.service';
import { enrolledStudentService } from '@/services/enrolled-student.service';
import { useProjectStore } from '@/store/project.store';
import { useToast } from '@/hooks';
import { CreateEnrolledStudentInput, CreateEnrolledStudentResult } from '@/types/enrolled-student.types';
import { parseExcelFile } from '@/utils/excelParser';
import { StepFormContainer, StepTitle, StepSubtitle, FormGrid } from './AddProjectWizard.styles';

const InlineCreateRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
`;

const ResultsBox = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  overflow: hidden;
`;

interface ParsedRow extends CreateEnrolledStudentInput {
  displayName: string;
  isValid: boolean;
  validationError?: string;
}

const REQUIRED_COLUMNS: { key: keyof CreateEnrolledStudentInput; headers: string[] }[] = [
  { key: 'studentCode', headers: ['Student Code', 'studentCode'] },
  { key: 'firstName', headers: ['First Name', 'firstName'] },
  { key: 'lastName', headers: ['Last Name', 'lastName'] },
  { key: 'email', headers: ['Email', 'email'] },
  { key: 'mobile', headers: ['Mobile', 'mobile'] },
  { key: 'parentMobile', headers: ['Parent Mobile', 'parentMobile'] },
  { key: 'parentEmail', headers: ['Parent Email', 'parentEmail'] },
  { key: 'fatherName', headers: ['Father Name', 'fatherName'] },
  { key: 'fatherOccupation', headers: ['Father Occupation', 'fatherOccupation'] },
  { key: 'motherName', headers: ['Mother Name', 'motherName'] },
  { key: 'motherOccupation', headers: ['Mother Occupation', 'motherOccupation'] },
];
const OPTIONAL_COLUMNS: { key: keyof CreateEnrolledStudentInput; headers: string[] }[] = [
  { key: 'whatsappNumber', headers: ['WhatsApp', 'whatsappNumber'] },
  { key: 'fatherEmployer', headers: ['Father Employer', 'fatherEmployer'] },
  { key: 'motherEmployer', headers: ['Mother Employer', 'motherEmployer'] },
];

const readCol = (row: Record<string, string>, headers: string[]): string => {
  for (const h of headers) {
    if (row[h]) return row[h];
  }
  return '';
};

const MOBILE_RE = /^\+\d{10,15}$/;

export const StepStudents: React.FC = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { createdProjectId, createdInstituteId, createdInstituteName } = useProjectStore();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedRows, setParsedRows] = useState<ParsedRow[]>([]);
  const [classId, setClassId] = useState('');
  const [divisionId, setDivisionId] = useState('');
  const [newClassName, setNewClassName] = useState('');
  const [newDivisionName, setNewDivisionName] = useState('');
  const [results, setResults] = useState<{
    succeeded: CreateEnrolledStudentResult[];
    failed: { input: CreateEnrolledStudentInput; message: string }[];
  } | null>(null);

  const { data: classes = [] } = useQuery({
    queryKey: ['institute-classes', createdInstituteId],
    queryFn: () => instituteService.getClasses(createdInstituteId!),
    enabled: !!createdInstituteId,
  });

  const activeClass = classes.find((c: InstituteClass) => c.id === classId);

  const createClassMutation = useMutation({
    mutationFn: (name: string) => instituteService.createClass(createdInstituteId!, name),
    onSuccess: created => {
      queryClient.invalidateQueries({ queryKey: ['institute-classes', createdInstituteId] });
      setClassId(created.id);
      setNewClassName('');
      toast.success('Class Added', `"${created.name}" created.`);
    },
    onError: () => toast.error('Error', 'Failed to create class.'),
  });

  const createDivisionMutation = useMutation({
    mutationFn: (name: string) => instituteService.createDivision(createdInstituteId!, classId, name),
    onSuccess: created => {
      queryClient.invalidateQueries({ queryKey: ['institute-classes', createdInstituteId] });
      setDivisionId(created.id);
      setNewDivisionName('');
      toast.success('Division Added', `"${created.name}" created.`);
    },
    onError: () => toast.error('Error', 'Failed to create division.'),
  });

  const bulkMutation = useMutation({
    mutationFn: enrolledStudentService.bulkCreate,
    onSuccess: result => {
      setResults(result);
      if (result.failed.length === 0) {
        toast.success('Students Imported', `Successfully imported ${result.succeeded.length} student(s).`);
      } else {
        toast.error(
          'Partial Import',
          `${result.succeeded.length} imported, ${result.failed.length} failed.`
        );
      }
    },
    onError: () => toast.error('Error', 'Failed to import students.'),
  });

  const handleDownloadTemplate = () => {
    const headers = [
      'Student Code', 'First Name', 'Last Name', 'Email', 'Mobile', 'WhatsApp',
      'Parent Mobile', 'Parent Email', 'Father Name', 'Father Occupation', 'Father Employer',
      'Mother Name', 'Mother Occupation', 'Mother Employer',
    ];
    const sample = [
      'CB1', 'Aditi', 'Rao', 'aditi.rao@example.com', '+919876500001', '+919876500002',
      '+919876500003', 'parent-aditi@example.com', 'Ramesh Rao', 'Engineer', 'Acme Corp',
      'Sunita Rao', 'Doctor', 'City Hospital',
    ];
    const csvContent = `${headers.join(',')}\n${sample.join(',')}\n`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'students_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setIsProcessing(true);
    setResults(null);

    try {
      const rows = await parseExcelFile(file);
      if (rows.length === 0) {
        toast.error('Empty File', 'The uploaded file contains no data rows.');
        setIsProcessing(false);
        return;
      }

      const parsed: ParsedRow[] = rows.map(row => {
        const base: any = { projectId: createdProjectId, divisionId };
        REQUIRED_COLUMNS.forEach(({ key, headers }) => {
          base[key] = readCol(row, headers);
        });
        OPTIONAL_COLUMNS.forEach(({ key, headers }) => {
          const v = readCol(row, headers);
          if (v) base[key] = v;
        });

        const missing = REQUIRED_COLUMNS.filter(({ key }) => !base[key]);
        const badMobile = [base.mobile, base.parentMobile, base.whatsappNumber].some(
          m => m && !MOBILE_RE.test(m)
        );
        const badEmail = [base.email, base.parentEmail].some(e => e && !e.includes('@'));

        let validationError: string | undefined;
        if (missing.length > 0) validationError = `Missing: ${missing.map(m => m.key).join(', ')}`;
        else if (badMobile) validationError = "Mobile numbers must be E.164 (+countrycode…)";
        else if (badEmail) validationError = 'Invalid email format';

        return {
          ...base,
          displayName: `${base.firstName} ${base.lastName}`.trim() || base.studentCode || 'Unknown',
          isValid: !validationError,
          validationError,
        } as ParsedRow;
      });

      setParsedRows(parsed);
      toast.success('File Parsed', `${parsed.length} row(s) found.`);
    } catch (err) {
      toast.error('Parse Error', err instanceof Error ? err.message : 'Failed to parse the uploaded file.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setParsedRows([]);
    setResults(null);
  };

  const handleImport = () => {
    if (!divisionId) {
      toast.error('Division Required', 'Select (or create) the class & division these students belong to.');
      return;
    }
    const validInputs = parsedRows
      .filter(r => r.isValid)
      .map(({ displayName, isValid, validationError, ...rest }) => rest);
    if (validInputs.length === 0) {
      toast.error('No Valid Rows', 'Please ensure your file contains valid student records.');
      return;
    }
    bulkMutation.mutate(validInputs);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.info('Copied to Clipboard', 'Temporary password copied.');
  };

  const columns: Column<ParsedRow>[] = [
    { key: 'studentCode', header: 'Code', width: '90px', render: r => <strong>{r.studentCode}</strong> },
    { key: 'name', header: 'Name', render: r => r.displayName },
    { key: 'email', header: 'Email', render: r => r.email },
    { key: 'mobile', header: 'Mobile', render: r => r.mobile },
    {
      key: 'isValid',
      header: 'Validation',
      width: '160px',
      render: r => (
        <Badge variant={r.isValid ? 'success' : 'danger'}>
          {r.isValid ? <RiCheckboxCircleLine size={14} /> : <RiErrorWarningLine size={14} />}
          {r.isValid ? 'Valid' : r.validationError}
        </Badge>
      ),
    },
  ];

  const validCount = parsedRows.filter(r => r.isValid).length;

  if (!createdProjectId || !createdInstituteId) {
    return (
      <StepFormContainer>
        <StepSubtitle>
          Complete the Institute &amp; Project step first — students are onboarded against a real project.
        </StepSubtitle>
      </StepFormContainer>
    );
  }

  return (
    <StepFormContainer>
      <div>
        <StepTitle>Onboard Students</StepTitle>
        <StepSubtitle>
          Upload a CSV/Excel file to create student accounts for "{createdInstituteName}", real-time
          against the backend — each row is created individually and its temp password is shown once.
        </StepSubtitle>
      </div>

      <FormGrid>
        <Select
          label="Class"
          options={classes.map((c: InstituteClass) => ({ value: c.id, label: c.name }))}
          value={classId}
          onChange={e => {
            setClassId(e.target.value);
            setDivisionId('');
          }}
          placeholder="Select class"
        />
        <Select
          label="Division"
          options={(activeClass?.divisions || []).map(d => ({ value: d.id, label: d.name }))}
          value={divisionId}
          onChange={e => setDivisionId(e.target.value)}
          placeholder={classId ? 'Select division' : 'Select a class first'}
          disabled={!classId}
        />
      </FormGrid>

      <InlineCreateRow>
        <Input
          placeholder="New class name, e.g. Grade 9"
          value={newClassName}
          onChange={e => setNewClassName(e.target.value)}
        />
        <Button
          type="button"
          variant="secondary"
          size="sm"
          isLoading={createClassMutation.isPending}
          onClick={() => newClassName.trim() && createClassMutation.mutate(newClassName.trim())}
        >
          + Add Class
        </Button>
      </InlineCreateRow>

      {classId && (
        <InlineCreateRow>
          <Input
            placeholder="New division name, e.g. A"
            value={newDivisionName}
            onChange={e => setNewDivisionName(e.target.value)}
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            isLoading={createDivisionMutation.isPending}
            onClick={() => newDivisionName.trim() && createDivisionMutation.mutate(newDivisionName.trim())}
          >
            + Add Division
          </Button>
        </InlineCreateRow>
      )}

      <div>
        <Button variant="secondary" size="sm" leftIcon={<RiDownloadLine size={16} />} onClick={handleDownloadTemplate}>
          Download Sample CSV
        </Button>
      </div>

      <FileUpload
        label="Student List"
        hint="CSV or Excel (.xlsx) — see sample for required columns"
        onFileSelect={handleFileSelect}
        onFileRemove={handleFileRemove}
        selectedFile={selectedFile}
      />

      {parsedRows.length > 0 && !results && (
        <div>
          <Table
            columns={columns}
            data={parsedRows}
            isLoading={isProcessing}
            keyExtractor={row => row.studentCode || row.email}
          />
          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="primary"
              disabled={validCount === 0 || !divisionId}
              isLoading={bulkMutation.isPending}
              onClick={handleImport}
            >
              Import {validCount} Student{validCount !== 1 ? 's' : ''}
            </Button>
          </div>
        </div>
      )}

      {results && (
        <ResultsBox>
          <Table
            columns={[
              { key: 'code', header: 'Code', width: '90px', render: (r: CreateEnrolledStudentResult) => r.student.studentCode },
              { key: 'name', header: 'Name', render: (r: CreateEnrolledStudentResult) => r.student.name },
              { key: 'email', header: 'Email', render: (r: CreateEnrolledStudentResult) => r.student.email },
              {
                key: 'pwd',
                header: 'Temp Password',
                render: (r: CreateEnrolledStudentResult) => (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'monospace' }}>
                    {r.tempPassword}
                    <RiFileCopyLine
                      size={14}
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleCopy(r.tempPassword)}
                    />
                  </span>
                ),
              },
            ]}
            data={results.succeeded}
            keyExtractor={r => r.student.id}
            emptyMessage="No students were created."
          />
          {results.failed.length > 0 && (
            <div style={{ padding: 12 }}>
              <strong>Failed rows:</strong>
              <ul>
                {results.failed.map((f, i) => (
                  <li key={i}>
                    {f.input.email}: {f.message}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </ResultsBox>
      )}
    </StepFormContainer>
  );
};
