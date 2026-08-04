import React, { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MdCloudUpload, MdDownload, MdInsertDriveFile, MdCheckCircle, MdErrorOutline } from 'react-icons/md';
import styled from 'styled-components';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { Table, Column } from '@/components/Table';
import { Badge } from '@/components/Badge';
import { careerService } from '@/services/career.service';
import { useToast } from '@/hooks';
import { Career } from '@/types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const TemplateSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surfaceHover};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const TemplateInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  h4 {
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    font-size: ${({ theme }) => theme.fontSize.xs};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const DropZone = styled.div<{ $isDragging?: boolean; $hasFile?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xl};
  border: 2px dashed
    ${({ theme, $isDragging, $hasFile }) =>
      $isDragging
        ? theme.colors.primary
        : $hasFile
        ? theme.colors.success
        : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme, $isDragging }) =>
    $isDragging ? theme.colors.primaryLight : theme.colors.surface};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};
  text-align: center;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

const DropIcon = styled.div<{ $color?: string }>`
  font-size: 36px;
  color: ${({ theme, $color }) => $color || theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const HiddenInput = styled.input`
  display: none;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xs};

  h4 {
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const JobRolePrimaryText = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

const BadgeIconMargin = styled.span`
  margin-right: 4px;
  display: inline-flex;
  align-items: center;
`;

const DropzoneHintText = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const DropzoneTitleText = styled.div`
  font-weight: 500;
`;

const ErrorMessageBox = styled.div`
  padding: 8px 12px;
  width: 100%;
  color: ${({ theme }) => theme.colors.danger};
  background-color: ${({ theme }) => theme.colors.dangerLight};
  border-radius: 4px;
  font-size: 13px;
`;

const PreviewTableScroll = styled.div`
  margin-top: 12px;
  max-height: 250px;
  overflow-y: auto;
`;

const ModalFooterActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
`;

export interface ParsedCareerRow {
  jobRole: string;
  careerCluster: string;
  industry: string;
  domain: string;
  aiResilienceGrading: 'Low' | 'Medium' | 'High';
  aiResilienceComment: string;
  oneLineDescription: string;
  topCompaniesRecruiting: string;
  approxSalaryRangeIndia: string;
  globalSalaryRange: string;
  minQual10th12thRecommendedSubjects: string;
  minQualGradRecommendedSubjects: string;
  entranceExamsUG: string;
  minQualPGRecommendedSubjects: string;
  entranceExamsPG: string;
  certificationsStudents: string;
  certificationsUG: string;
  topCoursesToStudy: string;
  isValid: boolean;
  error?: string;
}

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BulkUploadModal: React.FC<BulkUploadModalProps> = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [parsedRows, setParsedRows] = useState<ParsedCareerRow[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);

  const bulkMutation = useMutation({
    mutationFn: careerService.bulkCreate,
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: ['careers'] });
      toast.success('18-Spec Import Successful', `Successfully imported ${res.count} career profiles.`);
      handleReset();
      onClose();
    },
    onError: (err: Error) => {
      toast.error('Bulk upload failed', err.message);
    },
  });

  const handleReset = () => {
    setFileName(null);
    setParsedRows([]);
    setParseError(null);
    setIsDragging(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const downloadSampleTemplate = () => {
    const csvHeader = [
      'Career Cluster',
      'Industry',
      'Domain',
      'Job Role',
      'AI Resilience Grading',
      'AI Resilience Comment',
      'One-line Description',
      'Top Companies Recruiting',
      'Approx Salary Range (India)',
      'Global Salary Range',
      'Minimum Qualification (10th/12th) + Recommended Subjects',
      'Minimum Qualification (Grad) + Recommended Subjects',
      'Entrance Exams (UG Level)',
      'Minimum Qualification (PG) + Recommended Subjects',
      'Entrance Exams (PG Level)',
      'Certifications - Students',
      'Certifications - UG',
      'Top Courses to Study (UG + PG + Certifications)'
    ].map(h => `"${h}"`).join(',') + '\n';

    const sampleRow = [
      'STEM & Computing',
      'Information Technology',
      'Artificial Intelligence',
      'AI & Machine Learning Engineer',
      'High',
      'Requires architectural reasoning and novel algorithm design',
      'Design, train, and deploy intelligent neural network algorithms',
      'Google; Microsoft; OpenAI; NVIDIA; TCS',
      '₹12,00,000 - ₹38,00,000 / year',
      '$115,000 - $190,000 / year',
      '12th Science Stream with PCM + Computer Science (Min 75%)',
      'B.Tech / B.E. in Computer Science or Data Science',
      'JEE Main, JEE Advanced, BITSAT',
      'M.Tech / M.S. in Machine Learning or Computational Data Science',
      'GATE (CS/DA Track), GRE',
      'Python for Everybody (Coursera)',
      'AWS Certified Machine Learning Specialty',
      'B.Tech AI & Data Science, M.Tech Data Science'
    ].map(v => `"${v}"`).join(',') + '\n';

    const blob = new Blob([csvHeader + sampleRow], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '18_spec_career_profiles_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const parseFile = (file: File) => {
    setFileName(file.name);
    setParseError(null);

    const reader = new FileReader();
    reader.onload = e => {
      try {
        const text = e.target?.result as string;
        if (!text) {
          setParseError('The uploaded file is empty.');
          return;
        }

        const lines = text.split(/\r\n|\n/).filter(line => line.trim().length > 0);
        if (lines.length <= 1) {
          setParseError('The file contains no data rows besides the header.');
          return;
        }

        const headers = parseCsvLine(lines[0]).map(h => h.toLowerCase());

        const jobRoleIdx = headers.findIndex(h => h.includes('job role') || h.includes('role') || h.includes('title'));
        const clusterIdx = headers.findIndex(h => h.includes('cluster') || h.includes('category'));
        const industryIdx = headers.findIndex(h => h.includes('industry'));
        const domainIdx = headers.findIndex(h => h.includes('domain'));
        const aiGradingIdx = headers.findIndex(h => h.includes('resilience grading') || h.includes('grading'));
        const aiCommentIdx = headers.findIndex(h => h.includes('resilience comment') || h.includes('ai comment'));
        const descIdx = headers.findIndex(h => h.includes('one-line') || h.includes('description'));
        const compIdx = headers.findIndex(h => h.includes('companies') || h.includes('recruiting'));
        const salIndIdx = headers.findIndex(h => h.includes('india') || h.includes('salary range (india)'));
        const salGlobIdx = headers.findIndex(h => h.includes('global') || h.includes('global salary'));
        const qual10_12Idx = headers.findIndex(h => h.includes('10th/12th') || h.includes('minimum qualification (10th'));
        const qualGradIdx = headers.findIndex(h => h.includes('(grad)') || h.includes('grad recommended'));
        const examsUGIdx = headers.findIndex(h => h.includes('exams (ug') || h.includes('entrance exams (ug'));
        const qualPGIdx = headers.findIndex(h => h.includes('(pg)') || h.includes('pg recommended'));
        const examsPGIdx = headers.findIndex(h => h.includes('exams (pg') || h.includes('entrance exams (pg'));
        const certStudIdx = headers.findIndex(h => h.includes('certifications - students') || h.includes('students'));
        const certUGIdx = headers.findIndex(h => h.includes('certifications - ug') || h.includes('certifications ug'));
        const coursesIdx = headers.findIndex(h => h.includes('top courses') || h.includes('courses to study'));

        const results: ParsedCareerRow[] = [];

        for (let i = 1; i < lines.length; i++) {
          const cells = parseCsvLine(lines[i]);
          if (cells.length === 0 || cells.every(c => !c.trim())) continue;

          const jobRole = (jobRoleIdx !== -1 && cells[jobRoleIdx] ? cells[jobRoleIdx] : cells[3] || cells[0] || '').trim();
          const careerCluster = (clusterIdx !== -1 && cells[clusterIdx] ? cells[clusterIdx] : cells[0] || 'STEM & Computing').trim();
          const industry = (industryIdx !== -1 && cells[industryIdx] ? cells[industryIdx] : cells[1] || 'Information Technology').trim();
          const domain = (domainIdx !== -1 && cells[domainIdx] ? cells[domainIdx] : cells[2] || 'Artificial Intelligence').trim();
          const aiResilienceGradingRaw = (aiGradingIdx !== -1 && cells[aiGradingIdx] ? cells[aiGradingIdx].trim() : 'High');
          const aiResilienceGrading: 'Low' | 'Medium' | 'High' = ['Low', 'Medium', 'High'].includes(aiResilienceGradingRaw) ? (aiResilienceGradingRaw as any) : 'High';
          
          const aiResilienceComment = (aiCommentIdx !== -1 && cells[aiCommentIdx] ? cells[aiCommentIdx] : 'Requires analytical problem solving and strategic design.').trim();
          const oneLineDescription = (descIdx !== -1 && cells[descIdx] ? cells[descIdx] : 'Design and deliver scalable technological systems.').trim();
          const topCompaniesRecruiting = (compIdx !== -1 && cells[compIdx] ? cells[compIdx] : 'Google, Microsoft, IBM').trim();
          const approxSalaryRangeIndia = (salIndIdx !== -1 && cells[salIndIdx] ? cells[salIndIdx] : '₹12,00,000 - ₹35,00,000 / year').trim();
          const globalSalaryRange = (salGlobIdx !== -1 && cells[salGlobIdx] ? cells[salGlobIdx] : '$110,000 - $185,000 / year').trim();
          const minQual10th12thRecommendedSubjects = (qual10_12Idx !== -1 && cells[qual10_12Idx] ? cells[qual10_12Idx] : '12th Science Stream with PCM').trim();
          const minQualGradRecommendedSubjects = (qualGradIdx !== -1 && cells[qualGradIdx] ? cells[qualGradIdx] : 'B.Tech / B.E. in Computer Science').trim();
          const entranceExamsUG = (examsUGIdx !== -1 && cells[examsUGIdx] ? cells[examsUGIdx] : 'JEE Main, BITSAT').trim();
          const minQualPGRecommendedSubjects = (qualPGIdx !== -1 && cells[qualPGIdx] ? cells[qualPGIdx] : 'M.Tech / M.S. in Data Science').trim();
          const entranceExamsPG = (examsPGIdx !== -1 && cells[examsPGIdx] ? cells[examsPGIdx] : 'GATE, GRE').trim();
          const certificationsStudents = (certStudIdx !== -1 && cells[certStudIdx] ? cells[certStudIdx] : 'Python Basics').trim();
          const certificationsUG = (certUGIdx !== -1 && cells[certUGIdx] ? cells[certUGIdx] : 'AWS Certified Developer').trim();
          const topCoursesToStudy = (coursesIdx !== -1 && cells[coursesIdx] ? cells[coursesIdx] : 'B.Tech CS, M.Tech Data Science').trim();

          const isValid = jobRole.length >= 2;
          const error = !isValid ? 'Job Role must be at least 2 characters' : undefined;

          results.push({
            jobRole,
            careerCluster,
            industry,
            domain,
            aiResilienceGrading,
            aiResilienceComment,
            oneLineDescription,
            topCompaniesRecruiting,
            approxSalaryRangeIndia,
            globalSalaryRange,
            minQual10th12thRecommendedSubjects,
            minQualGradRecommendedSubjects,
            entranceExamsUG,
            minQualPGRecommendedSubjects,
            entranceExamsPG,
            certificationsStudents,
            certificationsUG,
            topCoursesToStudy,
            isValid,
            error,
          });
        }

        setParsedRows(results);
      } catch (err) {
        setParseError('Failed to parse file. Please ensure it is a valid CSV/Excel file format.');
      }
    };

    reader.readAsText(file);
  };

  const parseCsvLine = (line: string): string[] => {
    const result: string[] = [];
    let insideQuote = false;
    let currentCell = '';

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        insideQuote = !insideQuote;
      } else if (char === ',' && !insideQuote) {
        result.push(currentCell.replace(/^"|"$/g, '').trim());
        currentCell = '';
      } else {
        currentCell += char;
      }
    }
    result.push(currentCell.replace(/^"|"$/g, '').trim());
    return result;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      parseFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      parseFile(file);
    }
  };

  const handleUploadConfirm = () => {
    const validEntries = parsedRows.filter(r => r.isValid);
    if (validEntries.length === 0) {
      toast.error('No valid rows to upload');
      return;
    }

    const payload: Partial<Career>[] = validEntries.map(r => ({
      jobRole: r.jobRole,
      title: r.jobRole,
      careerCluster: r.careerCluster,
      category: r.careerCluster,
      industry: r.industry,
      domain: r.domain,
      aiResilienceGrading: r.aiResilienceGrading,
      aiResilienceComment: r.aiResilienceComment,
      oneLineDescription: r.oneLineDescription,
      description: r.oneLineDescription,
      topCompaniesRecruiting: r.topCompaniesRecruiting.split(/;|,/).map(s => s.trim()).filter(Boolean),
      approxSalaryRangeIndia: r.approxSalaryRangeIndia,
      globalSalaryRange: r.globalSalaryRange,
      minQual10th12thRecommendedSubjects: r.minQual10th12thRecommendedSubjects,
      minQualGradRecommendedSubjects: r.minQualGradRecommendedSubjects,
      entranceExamsUG: r.entranceExamsUG,
      minQualPGRecommendedSubjects: r.minQualPGRecommendedSubjects,
      entranceExamsPG: r.entranceExamsPG,
      certificationsStudents: r.certificationsStudents,
      certificationsUG: r.certificationsUG,
      topCoursesToStudy: r.topCoursesToStudy,
      status: 'active',
      sourceTenant: 'Super Admin 18-Spec Import',
    }));

    bulkMutation.mutate(payload as Omit<Career, 'id' | 'lastUpdated'>[]);
  };

  const validCount = parsedRows.filter(r => r.isValid).length;

  const previewColumns: Column<ParsedCareerRow>[] = [
    {
      key: 'jobRole',
      header: 'Job Role (Primary Key)',
      render: row => <JobRolePrimaryText>{row.jobRole || '—'}</JobRolePrimaryText>,
    },
    { key: 'careerCluster', header: 'Career Cluster' },
    { key: 'industry', header: 'Industry' },
    {
      key: 'aiResilienceGrading',
      header: 'AI Resilience',
      render: row => (
        <Badge variant={row.aiResilienceGrading === 'High' ? 'success' : row.aiResilienceGrading === 'Medium' ? 'warning' : 'danger'}>
          {row.aiResilienceGrading}
        </Badge>
      ),
    },
    {
      key: 'isValid',
      header: 'Validation',
      render: row =>
        row.isValid ? (
          <Badge variant="success">
            <BadgeIconMargin>
              <MdCheckCircle size={13} />
            </BadgeIconMargin>{' '}
            Valid
          </Badge>
        ) : (
          <Badge variant="danger">
            <BadgeIconMargin>
              <MdErrorOutline size={13} />
            </BadgeIconMargin>{' '}
            {row.error || 'Invalid'}
          </Badge>
        ),
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Bulk Import Career Profiles"
      subtitle="Import career profiles using CSV or Excel format"
      size="lg"
      footer={
        <ModalFooterActions>
          <Button variant="secondary" onClick={handleClose} disabled={bulkMutation.isPending}>
            Cancel
          </Button>
          <Button
            onClick={handleUploadConfirm}
            disabled={validCount === 0 || bulkMutation.isPending}
            isLoading={bulkMutation.isPending}
          >
            Import {validCount} Career Profiles
          </Button>
        </ModalFooterActions>
      }
    >
      <Container>
        <TemplateSection>
          <TemplateInfo>
            <h4>Standard CSV Template</h4>
            <p>Download sample CSV template matching the Career Profile table schema.</p>
          </TemplateInfo>
          <Button
            size="sm"
            variant="secondary"
            leftIcon={<MdDownload size={16} />}
            onClick={downloadSampleTemplate}
          >
            Download 18-Spec Template
          </Button>
        </TemplateSection>

        <DropZone
          $isDragging={isDragging}
          $hasFile={!!fileName}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={e => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <HiddenInput
            ref={fileInputRef}
            type="file"
            accept=".csv, .xlsx, .xls"
            onChange={handleFileChange}
          />
          {fileName ? (
            <>
              <DropIcon $color="#16a34a">
                <MdInsertDriveFile />
              </DropIcon>
              <FileInfo>{fileName}</FileInfo>
              <DropzoneHintText>Click or drag to replace file</DropzoneHintText>
            </>
          ) : (
            <>
              <DropIcon>
                <MdCloudUpload />
              </DropIcon>
              <DropzoneTitleText>Click to browse or drag & drop 18-spec CSV file here</DropzoneTitleText>
              <DropzoneHintText>Supports .xlsx, .xls, .csv files with 18 standard headers</DropzoneHintText>
            </>
          )}
        </DropZone>

        {parseError && <ErrorMessageBox>{parseError}</ErrorMessageBox>}

        {parsedRows.length > 0 && (
          <div>
            <SectionHeader>
              <h4>Parsed 18-Spec Rows Preview</h4>
              <Badge variant={validCount > 0 ? 'success' : 'danger'}>
                {validCount} of {parsedRows.length} rows valid
              </Badge>
            </SectionHeader>
            <PreviewTableScroll>
              <Table
                columns={previewColumns}
                data={parsedRows}
                keyExtractor={(row: ParsedCareerRow, index?: number) => `preview-${row.jobRole || index || 0}`}
                emptyMessage="No data rows found."
              />
            </PreviewTableScroll>
          </div>
        )}
      </Container>
    </Modal>
  );
};
