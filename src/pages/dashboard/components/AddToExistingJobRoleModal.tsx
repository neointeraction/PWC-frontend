import React, { useState } from 'react';
import styled from 'styled-components';
import {
  RiAddLine,
  RiCloseLine,
  RiCheckLine,
} from 'react-icons/ri';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { useToast } from '@/hooks';

const ModalScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const SectionTitle = styled.h4`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const FormGrid = styled.div<{ $columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns || 2}, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const FieldLabel = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 75px;
  padding: 8px 12px;
  font-family: inherit;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  resize: vertical;
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight};
  }
`;

const ExpandedFormCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px dashed ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 4px;
`;

const ExpandedFormTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AddedItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const AddedItemPill = styled.div`
  font-size: 12px;
  padding: 6px 10px;
  background-color: #ECFDF5;
  border: 1px solid #A7F3D0;
  color: #065F46;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface AddToExistingJobRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobRoleName?: string;
  domainName?: string;
  onSave?: (data: any) => void;
}

export const AddToExistingJobRoleModal: React.FC<AddToExistingJobRoleModalProps> = ({
  isOpen,
  onClose,
  jobRoleName = 'Applied UI Designer',
  domainName = 'UI/UX & Product Design',
  onSave,
}) => {
  const toast = useToast();

  // Active section toggles
  const [activeTab, setActiveTab] = useState<'edu' | 'exam' | 'course' | 'inst' | null>(null);

  // Education Entry Form State
  const [eduLevel, setEduLevel] = useState('Graduate');
  const [eduProgName, setEduProgName] = useState('');
  const [eduDesc, setEduDesc] = useState('');
  const [addedEduList, setAddedEduList] = useState<string[]>([]);

  // Entrance Exam Form State
  const [examAbbr, setExamAbbr] = useState('');
  const [examName, setExamName] = useState('');
  const [examConductedBy, setExamConductedBy] = useState('');
  const [examMode, setExamMode] = useState('Online / CBT');
  const [examFreq, setExamFreq] = useState('Once a year');
  const [examApplicableFor, setExamApplicableFor] = useState('');
  const [exam12thReq, setExam12thReq] = useState('Any stream');
  const [examWindow, setExamWindow] = useState('');
  const [examWebsite, setExamWebsite] = useState('');
  const [addedExamsList, setAddedExamsList] = useState<string[]>([]);

  // Course Form State
  const [courseAbbr, setCourseAbbr] = useState('');
  const [courseName, setCourseName] = useState('');
  const [course12thReq, setCourse12thReq] = useState('Any stream, min 50% aggregate');
  const [courseExams, setCourseExams] = useState('');
  const [coursePrograms, setCoursePrograms] = useState('');
  const [courseColleges, setCourseColleges] = useState('');
  const [courseFurtherStudy, setCourseFurtherStudy] = useState('');
  const [addedCoursesList, setAddedCoursesList] = useState<string[]>([]);

  // Institution Form State
  const [instAbbr, setInstAbbr] = useState('');
  const [instName, setInstName] = useState('');
  const [instLocation, setInstLocation] = useState('');
  const [instExamReq, setInstExamReq] = useState('');
  const [instPrograms, setInstPrograms] = useState('');
  const [instRanking, setInstRanking] = useState('');
  const [instWebsite, setInstWebsite] = useState('');
  const [addedInstList, setAddedInstList] = useState<string[]>([]);

  const handleAddEducation = () => {
    if (!eduProgName.trim()) return;
    const label = `${eduLevel}: ${eduProgName.trim()}${eduDesc.trim() ? ` — ${eduDesc.trim()}` : ''}`;
    setAddedEduList(prev => [...prev, label]);
    setEduProgName('');
    setEduDesc('');
    toast.success('Education Entry Added', 'Added to domain supplementary entries.');
  };

  const handleAddExam = () => {
    if (!examName.trim() && !examAbbr.trim()) return;
    const label = `${examAbbr.trim() ? `${examAbbr.trim()} — ` : ''}${examName.trim()} (${examConductedBy || 'National'})`;
    setAddedExamsList(prev => [...prev, label]);
    setExamAbbr('');
    setExamName('');
    setExamConductedBy('');
    setExamApplicableFor('');
    setExamWindow('');
    setExamWebsite('');
    toast.success('Exam Added', 'Added to domain supplementary entries.');
  };

  const handleAddCourse = () => {
    if (!courseName.trim() && !courseAbbr.trim()) return;
    const label = `${courseAbbr.trim() ? `${courseAbbr.trim()} — ` : ''}${courseName.trim()}`;
    setAddedCoursesList(prev => [...prev, label]);
    setCourseAbbr('');
    setCourseName('');
    setCourseExams('');
    setCoursePrograms('');
    setCourseColleges('');
    setCourseFurtherStudy('');
    toast.success('Course Added', 'Added to domain supplementary entries.');
  };

  const handleAddInstitution = () => {
    if (!instName.trim() && !instAbbr.trim()) return;
    const label = `${instAbbr.trim() ? `${instAbbr.trim()} — ` : ''}${instName.trim()}${instLocation.trim() ? `, ${instLocation.trim()}` : ''}`;
    setAddedInstList(prev => [...prev, label]);
    setInstAbbr('');
    setInstName('');
    setInstLocation('');
    setInstExamReq('');
    setInstPrograms('');
    setInstRanking('');
    setInstWebsite('');
    toast.success('Institution Added', 'Added to domain supplementary entries.');
  };

  const handleSaveChanges = () => {
    const totalCount =
      addedEduList.length + addedExamsList.length + addedCoursesList.length + addedInstList.length;

    if (onSave) {
      onSave({
        jobRoleName,
        domainName,
        education: addedEduList,
        exams: addedExamsList,
        courses: addedCoursesList,
        institutions: addedInstList,
      });
    }

    toast.success(
      'Changes Saved',
      `Updated supplementary information for ${jobRoleName} across ${totalCount} items.`
    );
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add to Existing Job Role"
      size="lg"
      footer={
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', width: '100%' }}>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" leftIcon={<RiCheckLine size={16} />} onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </div>
      }
    >
      <ModalScrollContainer>
        {/* 1. Add New Education Entry */}
        <SectionBox>
          <SectionTitle>Education Path</SectionTitle>
          {!activeTab || activeTab !== 'edu' ? (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<RiAddLine size={14} />}
                onClick={() => setActiveTab('edu')}
              >
                + Add New Education Entry
              </Button>
            </div>
          ) : (
            <ExpandedFormCard>
              <ExpandedFormTitle>
                <span>+ ADD NEW EDUCATION ENTRY</span>
                <button
                  type="button"
                  onClick={() => setActiveTab(null)}
                  style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                >
                  <RiCloseLine size={18} />
                </button>
              </ExpandedFormTitle>
              <Select
                label="Level"
                value={eduLevel}
                onChange={e => setEduLevel(e.target.value)}
                options={[
                  { value: '10+2', label: '10+2' },
                  { value: 'Graduate', label: 'Graduate' },
                  { value: 'Post-Graduate', label: 'Post-Graduate' },
                  { value: 'Certification – Student', label: 'Certification – Student' },
                  { value: 'Certification – UG', label: 'Certification – UG' },
                ]}
              />
              <Input
                label="Programme / Requirement Name *"
                placeholder="e.g. B.Des – Communication Design"
                value={eduProgName}
                onChange={e => setEduProgName(e.target.value)}
              />
              <FieldGroup>
                <FieldLabel>Description / Details</FieldLabel>
                <StyledTextarea
                  placeholder="Eligibility, focus area, notes..."
                  value={eduDesc}
                  onChange={e => setEduDesc(e.target.value)}
                />
              </FieldGroup>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <Button variant="secondary" size="sm" onClick={() => setActiveTab(null)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleAddEducation}>
                  Add Education Entry
                </Button>
              </div>
            </ExpandedFormCard>
          )}

          {addedEduList.length > 0 && (
            <AddedItemsList>
              {addedEduList.map((item, idx) => (
                <AddedItemPill key={idx}>
                  <span>✓ {item}</span>
                  <RiCheckLine size={14} />
                </AddedItemPill>
              ))}
            </AddedItemsList>
          )}
        </SectionBox>

        {/* 2. Add New Entrance Exam */}
        <SectionBox>
          <SectionTitle>Entrance Exams</SectionTitle>
          {!activeTab || activeTab !== 'exam' ? (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<RiAddLine size={14} />}
                onClick={() => setActiveTab('exam')}
              >
                + Add New Entrance Exam
              </Button>
            </div>
          ) : (
            <ExpandedFormCard>
              <ExpandedFormTitle>
                <span>+ ADD NEW ENTRANCE EXAM</span>
                <button
                  type="button"
                  onClick={() => setActiveTab(null)}
                  style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                >
                  <RiCloseLine size={18} />
                </button>
              </ExpandedFormTitle>
              <FormGrid $columns={2}>
                <Input
                  label="Exam Abbreviation"
                  placeholder="e.g. NID DAT"
                  value={examAbbr}
                  onChange={e => setExamAbbr(e.target.value)}
                />
                <Input
                  label="Exam Name *"
                  placeholder="e.g. National Institute of Design Admission Test"
                  value={examName}
                  onChange={e => setExamName(e.target.value)}
                />
                <Input
                  label="Conducted By / Level"
                  placeholder="e.g. NID · National"
                  value={examConductedBy}
                  onChange={e => setExamConductedBy(e.target.value)}
                />
                <Select
                  label="Mode"
                  value={examMode}
                  onChange={e => setExamMode(e.target.value)}
                  options={[
                    { value: 'Online / CBT', label: 'Online / CBT' },
                    { value: 'Offline / Paper', label: 'Offline / Paper' },
                    { value: 'Hybrid CBT + Studio Test', label: 'Hybrid CBT + Studio Test' },
                  ]}
                />
                <Input
                  label="Frequency"
                  placeholder="e.g. Once a year"
                  value={examFreq}
                  onChange={e => setExamFreq(e.target.value)}
                />
                <Input
                  label="12th Requirement"
                  placeholder="e.g. Any stream (course-specific)"
                  value={exam12thReq}
                  onChange={e => setExam12thReq(e.target.value)}
                />
              </FormGrid>
              <Input
                label="Applicable For"
                placeholder="Programmes this exam admits into..."
                value={examApplicableFor}
                onChange={e => setExamApplicableFor(e.target.value)}
              />
              <FormGrid $columns={2}>
                <Input
                  label="Exam Window"
                  placeholder="e.g. Jan–Feb window · May–Jun exam"
                  value={examWindow}
                  onChange={e => setExamWindow(e.target.value)}
                />
                <Input
                  label="Official Website"
                  placeholder="https://..."
                  value={examWebsite}
                  onChange={e => setExamWebsite(e.target.value)}
                />
              </FormGrid>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <Button variant="secondary" size="sm" onClick={() => setActiveTab(null)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleAddExam}>
                  Add Entrance Exam
                </Button>
              </div>
            </ExpandedFormCard>
          )}

          {addedExamsList.length > 0 && (
            <AddedItemsList>
              {addedExamsList.map((item, idx) => (
                <AddedItemPill key={idx}>
                  <span>✓ {item}</span>
                  <RiCheckLine size={14} />
                </AddedItemPill>
              ))}
            </AddedItemsList>
          )}
        </SectionBox>

        {/* 3. Add New Course */}
        <SectionBox>
          <SectionTitle>Courses</SectionTitle>
          {!activeTab || activeTab !== 'course' ? (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<RiAddLine size={14} />}
                onClick={() => setActiveTab('course')}
              >
                + Add New Course
              </Button>
            </div>
          ) : (
            <ExpandedFormCard>
              <ExpandedFormTitle>
                <span>+ ADD NEW COURSE</span>
                <button
                  type="button"
                  onClick={() => setActiveTab(null)}
                  style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                >
                  <RiCloseLine size={18} />
                </button>
              </ExpandedFormTitle>
              <FormGrid $columns={2}>
                <Input
                  label="Course Abbreviation"
                  placeholder="e.g. B.Voc"
                  value={courseAbbr}
                  onChange={e => setCourseAbbr(e.target.value)}
                />
                <Input
                  label="Course Name *"
                  placeholder="e.g. Bachelor of Vocation"
                  value={courseName}
                  onChange={e => setCourseName(e.target.value)}
                />
              </FormGrid>
              <Input
                label="12th Stream Requirement"
                placeholder="e.g. Any stream, min 50% aggregate"
                value={course12thReq}
                onChange={e => setCourse12thReq(e.target.value)}
              />
              <Input
                label="Relevant Entrance Exams"
                placeholder="e.g. NID DAT, UCEED, NIFT Entrance Exam"
                value={courseExams}
                onChange={e => setCourseExams(e.target.value)}
              />
              <FieldGroup>
                <FieldLabel>Programs Offered</FieldLabel>
                <StyledTextarea
                  placeholder="List specialisations offered..."
                  value={coursePrograms}
                  onChange={e => setCoursePrograms(e.target.value)}
                />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Top Colleges</FieldLabel>
                <StyledTextarea
                  placeholder="List leading institutions..."
                  value={courseColleges}
                  onChange={e => setCourseColleges(e.target.value)}
                />
              </FieldGroup>
              <Input
                label="Further Study Options"
                placeholder="e.g. M.Des, PhD, Design Residencies"
                value={courseFurtherStudy}
                onChange={e => setCourseFurtherStudy(e.target.value)}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <Button variant="secondary" size="sm" onClick={() => setActiveTab(null)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleAddCourse}>
                  Add Course
                </Button>
              </div>
            </ExpandedFormCard>
          )}

          {addedCoursesList.length > 0 && (
            <AddedItemsList>
              {addedCoursesList.map((item, idx) => (
                <AddedItemPill key={idx}>
                  <span>✓ {item}</span>
                  <RiCheckLine size={14} />
                </AddedItemPill>
              ))}
            </AddedItemsList>
          )}
        </SectionBox>

        {/* 4. Add New Institution */}
        <SectionBox>
          <SectionTitle>Institutions</SectionTitle>
          {!activeTab || activeTab !== 'inst' ? (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<RiAddLine size={14} />}
                onClick={() => setActiveTab('inst')}
              >
                + Add New Institution
              </Button>
            </div>
          ) : (
            <ExpandedFormCard>
              <ExpandedFormTitle>
                <span>+ ADD NEW INSTITUTION</span>
                <button
                  type="button"
                  onClick={() => setActiveTab(null)}
                  style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                >
                  <RiCloseLine size={18} />
                </button>
              </ExpandedFormTitle>
              <FormGrid $columns={2}>
                <Input
                  label="Institution Abbreviation"
                  placeholder="e.g. NIFT"
                  value={instAbbr}
                  onChange={e => setInstAbbr(e.target.value)}
                />
                <Input
                  label="Institution Name *"
                  placeholder="e.g. National Institute of Fashion Technology"
                  value={instName}
                  onChange={e => setInstName(e.target.value)}
                />
                <Input
                  label="Location"
                  placeholder="City, State"
                  value={instLocation}
                  onChange={e => setInstLocation(e.target.value)}
                />
                <Input
                  label="Entrance Exam Required"
                  placeholder="e.g. NID DAT (Prelims + Mains)"
                  value={instExamReq}
                  onChange={e => setInstExamReq(e.target.value)}
                />
              </FormGrid>
              <FieldGroup>
                <FieldLabel>Programs Offered</FieldLabel>
                <StyledTextarea
                  placeholder="List programmes..."
                  value={instPrograms}
                  onChange={e => setInstPrograms(e.target.value)}
                />
              </FieldGroup>
              <FormGrid $columns={2}>
                <Input
                  label="Ranking / Recognition"
                  placeholder="e.g. #1 in IIRF/Outlook-ICARE Design rankings"
                  value={instRanking}
                  onChange={e => setInstRanking(e.target.value)}
                />
                <Input
                  label="Official Website"
                  placeholder="https://..."
                  value={instWebsite}
                  onChange={e => setInstWebsite(e.target.value)}
                />
              </FormGrid>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <Button variant="secondary" size="sm" onClick={() => setActiveTab(null)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleAddInstitution}>
                  Add Institution
                </Button>
              </div>
            </ExpandedFormCard>
          )}

          {addedInstList.length > 0 && (
            <AddedItemsList>
              {addedInstList.map((item, idx) => (
                <AddedItemPill key={idx}>
                  <span>✓ {item}</span>
                  <RiCheckLine size={14} />
                </AddedItemPill>
              ))}
            </AddedItemsList>
          )}
        </SectionBox>
      </ModalScrollContainer>
    </Modal>
  );
};

export default AddToExistingJobRoleModal;
