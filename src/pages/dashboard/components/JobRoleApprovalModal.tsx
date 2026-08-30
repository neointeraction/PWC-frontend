import React, { useState } from 'react';
import {
  RiAddLine,
  RiCheckLine,
  RiCloseLine,
} from 'react-icons/ri';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Checkbox } from '@/components/Checkbox';
import { useToast } from '@/hooks';
import {
  ModalScrollContainer,
  SectionBox,
  SectionTitle,
  FormGrid,
  FieldGroup,
  FieldLabel,
  StyledTextarea,
  ResilienceCommentBox,
  ResilienceCommentLabel,
  ExistingEntriesList,
  EntryRow,
  EntryCheckboxWrapper,
  AutoPulledTag,
  ExpandedFormCard,
  ExpandedFormTitle,
} from './JobRoleApprovalModal.styles';

export interface JobRoleApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: (data: any) => void;
  onReject: () => void;
  initialItemName?: string;
  initialCategory?: string;
}

const AI_RESILIENCE_COMMENTS: Record<string, string> = {
  High: 'Centers on unique human creativity / emotional expression / cultural nuance / high stakes decision making & accountability / empathy & ethical judgment / physical dexterity in unpredictable environments.',
  Medium: 'AI handles bulk technical production / routine tasks, humans needed for framing & validation / strategy.',
  Low: 'Primary tasks involve repetitive data processing or routine service easily automated by AI.',
};

export const JobRoleApprovalModal: React.FC<JobRoleApprovalModalProps> = ({
  isOpen,
  onClose,
  onApprove,
  onReject,
  initialItemName = 'UI/UX Designer',
}) => {
  const toast = useToast();

  // Cluster / Industry / Domain Hierarchy
  const [cluster, setCluster] = useState('Design & Creative Arts');
  const [industry, setIndustry] = useState('User Experience & Digital Media');
  const [domain, setDomain] = useState('UI/UX & Product Design');

  // Job Role Core Details
  const [title, setTitle] = useState(initialItemName);
  const [shortDesc, setShortDesc] = useState('Designs intuitive and delightful user experiences across web and mobile platforms.');
  const [aiResilience, setAiResilience] = useState('High');
  const [resilienceComment, setResilienceComment] = useState(AI_RESILIENCE_COMMENTS.High);
  const [salaryIndia, setSalaryIndia] = useState('₹4–15 LPA');
  const [salaryGlobal, setSalaryGlobal] = useState('$70k–$120k');
  const [topRecruiters, setTopRecruiters] = useState('Tech Firms, Design Agencies, Product Startups');
  const [roleOverview, setRoleOverview] = useState(
    'Conducts user research, creates wireframes, interactive prototypes, and high-fidelity interfaces. Collaborates closely with developers and product managers to ensure user-centric product experiences.'
  );
  const [keySkills, setKeySkills] = useState(
    'User Research & Usability Testing\nWireframing & Prototyping (Figma)\nDesign Systems & Typography\nInteraction & Visual Design'
  );

  const handleAiResilienceChange = (val: string) => {
    setAiResilience(val);
    setResilienceComment(AI_RESILIENCE_COMMENTS[val] || '');
  };

  // Education Path State
  const [educationList, setEducationList] = useState([
    { id: 'edu-1', text: '10+2: 12th — Any stream (Fine Arts / Computer Application, min 60%)', checked: true },
    { id: 'edu-2', text: 'Graduate: BDes / BFA / Relevant Degree', checked: true },
    { id: 'edu-3', text: 'Post-Graduate: MDes, MFA, Design Management', checked: true },
    { id: 'edu-4', text: 'Certification (Student Level): Adobe Photoshop Skills, Canva Design Mastery, Graphic Design Fundamentals', checked: true },
    { id: 'edu-5', text: 'Certification (Undergraduate Level): Adobe Certified Professional, UI/UX Design Specialization, Motion Graphics & After Effects, UX Tools', checked: true },
  ]);
  const [isAddingEdu, setIsAddingEdu] = useState(false);
  const [newEduLevel, setNewEduLevel] = useState('Graduate');
  const [newEduName, setNewEduName] = useState('');
  const [newEduDesc, setNewEduDesc] = useState('');

  const handleAddEdu = () => {
    if (!newEduName.trim()) return;
    const newEntry = {
      id: `edu-${Date.now()}`,
      text: `${newEduLevel}: ${newEduName.trim()}${newEduDesc.trim() ? ` — ${newEduDesc.trim()}` : ''}`,
      checked: true,
    };
    setEducationList(prev => [...prev, newEntry]);
    setNewEduName('');
    setNewEduDesc('');
    setIsAddingEdu(false);
    toast.success('Education Entry Added', 'New education pathway added to domain library.');
  };

  // Entrance Exams State
  const [examsList, setExamsList] = useState([
    { id: 'ex-1', text: 'CUET UG — Common University Entrance Test (NTA, National, Online)', checked: true },
    { id: 'ex-2', text: 'DUET — Delhi University Entrance Test (select routes only)', checked: true },
    { id: 'ex-3', text: 'IPU CET — Indraprastha University CET (GGSIPU, State)', checked: true },
  ]);
  const [isAddingExam, setIsAddingExam] = useState(false);
  const [newExamAbbr, setNewExamAbbr] = useState('');
  const [newExamName, setNewExamName] = useState('');
  const [newExamConductedBy, setNewExamConductedBy] = useState('');
  const [newExamMode, setNewExamMode] = useState('Online / CBT');
  const [newExamFreq, setNewExamFreq] = useState('Once a year');
  const [newExamApplicableFor, setNewExamApplicableFor] = useState('');
  const [newExam12thReq, setNewExam12thReq] = useState('Any stream');
  const [newExamWindow, setNewExamWindow] = useState('');
  const [newExamWebsite, setNewExamWebsite] = useState('');


  const handleAddExam = () => {
    if (!newExamName.trim() && !newExamAbbr.trim()) return;
    const displayName = `${newExamAbbr.trim() ? `${newExamAbbr.trim()} — ` : ''}${newExamName.trim()} (${newExamConductedBy || 'National'})`;
    setExamsList(prev => [...prev, { id: `ex-${Date.now()}`, text: displayName, checked: true }]);
    setNewExamAbbr('');
    setNewExamName('');
    setNewExamConductedBy('');
    setNewExamApplicableFor('');
    setNewExamWindow('');
    setNewExamWebsite('');
    setIsAddingExam(false);
    toast.success('Exam Added', 'New entrance exam added to domain library.');
  };

  // Courses State
  const [coursesList, setCoursesList] = useState([
    { id: 'cr-1', text: 'BFA — Bachelor of Fine Arts', checked: true },
    { id: 'cr-2', text: 'B.Des — Bachelor of Design', checked: true },
    { id: 'cr-3', text: 'M.Des — Master of Design', checked: true },
  ]);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [newCourseAbbr, setNewCourseAbbr] = useState('');
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourse12thReq, setNewCourse12thReq] = useState('Any stream, min 50% aggregate');
  const [newCourseExams, setNewCourseExams] = useState('');
  const [newCoursePrograms, setNewCoursePrograms] = useState('');
  const [newCourseTopColleges, setNewCourseTopColleges] = useState('');
  const [newCourseFurtherStudy, setNewCourseFurtherStudy] = useState('');

  const handleAddCourse = () => {
    if (!newCourseName.trim() && !newCourseAbbr.trim()) return;
    const displayName = `${newCourseAbbr.trim() ? `${newCourseAbbr.trim()} — ` : ''}${newCourseName.trim()}`;
    setCoursesList(prev => [...prev, { id: `cr-${Date.now()}`, text: displayName, checked: true }]);
    setNewCourseAbbr('');
    setNewCourseName('');
    setNewCourseExams('');
    setNewCoursePrograms('');
    setNewCourseTopColleges('');
    setNewCourseFurtherStudy('');
    setIsAddingCourse(false);
    toast.success('Course Added', 'New course degree added to domain library.');
  };

  // Institutions State
  const [institutionsList, setInstitutionsList] = useState([
    { id: 'inst-1', text: 'NID — National Institute of Design, Ahmedabad', checked: true },
    { id: 'inst-2', text: 'IDC School of Design, IIT Bombay', checked: true },
    { id: 'inst-3', text: 'MIT Institute of Design, Pune', checked: true },
    { id: 'inst-4', text: 'Srishti Manipal Inst. of Art, Design & Tech, Bengaluru', checked: false },
  ]);
  const [isAddingInst, setIsAddingInst] = useState(false);
  const [newInstAbbr, setNewInstAbbr] = useState('');
  const [newInstName, setNewInstName] = useState('');
  const [newInstLocation, setNewInstLocation] = useState('');
  const [newInstExamReq, setNewInstExamReq] = useState('');
  const [newInstPrograms, setNewInstPrograms] = useState('');
  const [newInstRanking, setNewInstRanking] = useState('');
  const [newInstWebsite, setNewInstWebsite] = useState('');


  const handleAddInst = () => {
    if (!newInstName.trim() && !newInstAbbr.trim()) return;
    const displayName = `${newInstAbbr.trim() ? `${newInstAbbr.trim()} — ` : ''}${newInstName.trim()}${newInstLocation.trim() ? `, ${newInstLocation.trim()}` : ''}`;
    setInstitutionsList(prev => [...prev, { id: `inst-${Date.now()}`, text: displayName, checked: true }]);
    setNewInstAbbr('');
    setNewInstName('');
    setNewInstLocation('');
    setNewInstExamReq('');
    setNewInstPrograms('');
    setNewInstRanking('');
    setNewInstWebsite('');
    setIsAddingInst(false);
    toast.success('Institution Added', 'New institute added to domain library.');
  };

  const handleSaveAndApprove = () => {
    onApprove({
      cluster,
      industry,
      domain,
      title,
      shortDesc,
      aiResilience,
      resilienceComment,
      salaryIndia,
      salaryGlobal,
      topRecruiters,
      roleOverview,
      keySkills,
      educationPath: educationList.filter(e => e.checked).map(e => e.text),
      entranceExams: examsList.filter(e => e.checked).map(e => e.text),
      courses: coursesList.filter(c => c.checked).map(c => c.text),
      institutions: institutionsList.filter(i => i.checked).map(i => i.text),
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add NEW Job Role"
      size="xl"
      footer={
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', width: '100%' }}>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onReject}>
            Reject
          </Button>
          <Button variant="primary" leftIcon={<RiCheckLine size={16} />} onClick={handleSaveAndApprove}>
            Save Job Role
          </Button>
        </div>
      }
    >
      <ModalScrollContainer>
        <SectionBox>
          <SectionTitle>Domain Hierarchy</SectionTitle>
          <FormGrid $columns={3}>
            <Select
              label="Career Cluster *"
              value={cluster}
              onChange={e => setCluster(e.target.value)}
              options={[
                { value: 'Design & Creative Arts', label: 'Design & Creative Arts' },
                { value: 'Technology & AI', label: 'Technology & AI' },
                { value: 'Business & Management', label: 'Business & Management' },
                { value: 'Healthcare & Life Sciences', label: 'Healthcare & Life Sciences' },
              ]}
            />
            <Select
              label="Industry *"
              value={industry}
              onChange={e => setIndustry(e.target.value)}
              options={[
                { value: 'User Experience & Digital Media', label: 'User Experience & Digital Media' },
                { value: 'Graphic Design & Communication', label: 'Graphic Design & Communication' },
                { value: 'Industrial & Product Design', label: 'Industrial & Product Design' },
              ]}
            />
            <Select
              label="Domain *"
              value={domain}
              onChange={e => setDomain(e.target.value)}
              options={[
                { value: 'UI/UX & Product Design', label: 'UI/UX & Product Design' },
                { value: 'Visual & Interaction Design', label: 'Visual & Interaction Design' },
                { value: 'Animation & VFX', label: 'Animation & VFX' },
              ]}
            />
          </FormGrid>
        </SectionBox>

        {/* Job Role Core Details */}
        <SectionBox>
          <SectionTitle>Job Role Details</SectionTitle>
          <FormGrid $columns={1}>
            <Input
              label="Title / Name *"
              placeholder="Enter item title..."
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <Input
              label="Short Description *"
              placeholder="Enter short description..."
              value={shortDesc}
              onChange={e => setShortDesc(e.target.value)}
            />
          </FormGrid>

          {/* AI Resilience */}
          <FieldGroup>
            <Select
              label="AI Resilience *"
              value={aiResilience}
              onChange={e => handleAiResilienceChange(e.target.value)}
              options={[
                { value: 'High', label: 'High' },
                { value: 'Medium', label: 'Medium' },
                { value: 'Low', label: 'Low' },
              ]}
            />
            <ResilienceCommentBox>
              <ResilienceCommentLabel>Auto-filled Comment (Editable):</ResilienceCommentLabel>
              <StyledTextarea
                style={{ minHeight: '55px' }}
                value={resilienceComment}
                onChange={e => setResilienceComment(e.target.value)}
              />
            </ResilienceCommentBox>
          </FieldGroup>

          <FormGrid $columns={2}>
            <Input
              label="Salary (India) *"
              placeholder="e.g. ₹4–15 LPA"
              value={salaryIndia}
              onChange={e => setSalaryIndia(e.target.value)}
            />
            <Input
              label="Salary (Global) *"
              placeholder="e.g. $70k–$120k"
              value={salaryGlobal}
              onChange={e => setSalaryGlobal(e.target.value)}
            />
          </FormGrid>

          <Input
            label="Top Recruiters *"
            placeholder="e.g. Tech Firms, Startups"
            value={topRecruiters}
            onChange={e => setTopRecruiters(e.target.value)}
          />

          <FieldGroup>
            <FieldLabel>Role Overview &amp; Scope *</FieldLabel>
            <StyledTextarea
              placeholder="Describe what this role does day-to-day and where it sits in the industry..."
              value={roleOverview}
              onChange={e => setRoleOverview(e.target.value)}
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>Key Skill Requirements *</FieldLabel>
            <StyledTextarea
              placeholder="List core skills, one per line..."
              value={keySkills}
              onChange={e => setKeySkills(e.target.value)}
            />
          </FieldGroup>
        </SectionBox>

        {/* Education Path Section */}
        <SectionBox>
          <SectionTitle>Education Path</SectionTitle>

          <FieldLabel>Existing entries pulled from this Domain (Tick / Untick to include):</FieldLabel>
          <ExistingEntriesList>
            {educationList.map(item => (
              <EntryRow key={item.id} $checked={item.checked}>
                <EntryCheckboxWrapper>
                  <Checkbox
                    checked={item.checked}
                    onChange={() =>
                      setEducationList(prev =>
                        prev.map(e => (e.id === item.id ? { ...e, checked: !e.checked } : e))
                      )
                    }
                  />
                  <span>{item.text}</span>
                  <AutoPulledTag>(auto-pulled from Domain library)</AutoPulledTag>
                </EntryCheckboxWrapper>
              </EntryRow>
            ))}
          </ExistingEntriesList>

          {!isAddingEdu ? (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<RiAddLine size={14} />}
                onClick={() => setIsAddingEdu(true)}
              >
                Add New Education Entry
              </Button>
            </div>
          ) : (
            <ExpandedFormCard>
              <ExpandedFormTitle>
                <span>+ ADD NEW EDUCATION ENTRY (Saves to Domain Library)</span>
                <button
                  type="button"
                  onClick={() => setIsAddingEdu(false)}
                  style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                >
                  <RiCloseLine size={18} />
                </button>
              </ExpandedFormTitle>
              <Select
                label="Level"
                value={newEduLevel}
                onChange={e => setNewEduLevel(e.target.value)}
                options={[
                  { value: '10+2', label: '10+2' },
                  { value: 'Graduate', label: 'Graduate' },
                  { value: 'Post-Graduate', label: 'Post-Graduate' },
                  { value: 'Certification – Student', label: 'Certification – Student' },
                  { value: 'Certification – UG', label: 'Certification – UG' },
                ]}
              />
              <Input
                label="Programme / Requirement Name"
                placeholder="e.g. B.Des – Communication Design"
                value={newEduName}
                onChange={e => setNewEduName(e.target.value)}
              />
              <FieldGroup>
                <FieldLabel>Description / Details</FieldLabel>
                <StyledTextarea
                  placeholder="Eligibility, focus area, notes..."
                  value={newEduDesc}
                  onChange={e => setNewEduDesc(e.target.value)}
                />
              </FieldGroup>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <Button variant="secondary" size="sm" onClick={() => setIsAddingEdu(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleAddEdu}>
                  Add to Education Path
                </Button>
              </div>
            </ExpandedFormCard>
          )}
        </SectionBox>

        {/* Entrance Exams Section */}
        <SectionBox>
          <SectionTitle>Entrance Exams</SectionTitle>

          <FieldLabel>Existing entries pulled from this Domain (Tick / Untick to include):</FieldLabel>
          <ExistingEntriesList>
            {examsList.map(item => (
              <EntryRow key={item.id} $checked={item.checked}>
                <EntryCheckboxWrapper>
                  <Checkbox
                    checked={item.checked}
                    onChange={() =>
                      setExamsList(prev =>
                        prev.map(e => (e.id === item.id ? { ...e, checked: !e.checked } : e))
                      )
                    }
                  />
                  <span>{item.text}</span>
                  <AutoPulledTag>(auto-pulled from Domain library)</AutoPulledTag>
                </EntryCheckboxWrapper>
              </EntryRow>
            ))}
          </ExistingEntriesList>

          {!isAddingExam ? (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<RiAddLine size={14} />}
                onClick={() => setIsAddingExam(true)}
              >
                Add New Exam
              </Button>
            </div>
          ) : (
            <ExpandedFormCard>
              <ExpandedFormTitle>
                <span>+ ADD NEW EXAM (Saves to Domain Library)</span>
                <button
                  type="button"
                  onClick={() => setIsAddingExam(false)}
                  style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                >
                  <RiCloseLine size={18} />
                </button>
              </ExpandedFormTitle>
              <FormGrid $columns={2}>
                <Input
                  label="Exam Abbreviation"
                  placeholder="e.g. NID DAT"
                  value={newExamAbbr}
                  onChange={e => setNewExamAbbr(e.target.value)}
                />
                <Input
                  label="Exam Name *"
                  placeholder="e.g. National Institute of Design Admission Test"
                  value={newExamName}
                  onChange={e => setNewExamName(e.target.value)}
                />
                <Input
                  label="Conducted By / Level"
                  placeholder="e.g. NID · National"
                  value={newExamConductedBy}
                  onChange={e => setNewExamConductedBy(e.target.value)}
                />
                <Select
                  label="Mode"
                  value={newExamMode}
                  onChange={e => setNewExamMode(e.target.value)}
                  options={[
                    { value: 'Online / CBT', label: 'Online / CBT' },
                    { value: 'Offline / Paper', label: 'Offline / Paper' },
                    { value: 'Hybrid CBT + Studio Test', label: 'Hybrid CBT + Studio Test' },
                  ]}
                />
                <Input
                  label="Frequency"
                  placeholder="e.g. Once a year"
                  value={newExamFreq}
                  onChange={e => setNewExamFreq(e.target.value)}
                />
                <Input
                  label="12th Requirement"
                  placeholder="e.g. Any stream (course-specific)"
                  value={newExam12thReq}
                  onChange={e => setNewExam12thReq(e.target.value)}
                />
              </FormGrid>
              <Input
                label="Applicable For"
                placeholder="Programmes this exam admits into..."
                value={newExamApplicableFor}
                onChange={e => setNewExamApplicableFor(e.target.value)}
              />
              <FormGrid $columns={2}>
                <Input
                  label="Exam Window"
                  placeholder="e.g. Jan–Feb window · May–Jun exam"
                  value={newExamWindow}
                  onChange={e => setNewExamWindow(e.target.value)}
                />
                <Input
                  label="Official Website"
                  placeholder="https://..."
                  value={newExamWebsite}
                  onChange={e => setNewExamWebsite(e.target.value)}
                />
              </FormGrid>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <Button variant="secondary" size="sm" onClick={() => setIsAddingExam(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleAddExam}>
                  Add Exam
                </Button>
              </div>
            </ExpandedFormCard>
          )}
        </SectionBox>

        {/* Courses Section */}
        <SectionBox>
          <SectionTitle>Courses</SectionTitle>

          <FieldLabel>Existing entries pulled from this Domain (Tick / Untick to include):</FieldLabel>
          <ExistingEntriesList>
            {coursesList.map(item => (
              <EntryRow key={item.id} $checked={item.checked}>
                <EntryCheckboxWrapper>
                  <Checkbox
                    checked={item.checked}
                    onChange={() =>
                      setCoursesList(prev =>
                        prev.map(c => (c.id === item.id ? { ...c, checked: !c.checked } : c))
                      )
                    }
                  />
                  <span>{item.text}</span>
                  <AutoPulledTag>(auto-pulled from Domain library)</AutoPulledTag>
                </EntryCheckboxWrapper>
              </EntryRow>
            ))}
          </ExistingEntriesList>

          {!isAddingCourse ? (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<RiAddLine size={14} />}
                onClick={() => setIsAddingCourse(true)}
              >
                Add New Course
              </Button>
            </div>
          ) : (
            <ExpandedFormCard>
              <ExpandedFormTitle>
                <span>+ ADD NEW COURSE (Saves to Domain Library)</span>
                <button
                  type="button"
                  onClick={() => setIsAddingCourse(false)}
                  style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                >
                  <RiCloseLine size={18} />
                </button>
              </ExpandedFormTitle>
              <FormGrid $columns={2}>
                <Input
                  label="Course Abbreviation"
                  placeholder="e.g. B.Voc"
                  value={newCourseAbbr}
                  onChange={e => setNewCourseAbbr(e.target.value)}
                />
                <Input
                  label="Course Name *"
                  placeholder="e.g. Bachelor of Vocation"
                  value={newCourseName}
                  onChange={e => setNewCourseName(e.target.value)}
                />
              </FormGrid>
              <Input
                label="12th Stream Requirement"
                placeholder="e.g. Any stream, min 50% aggregate"
                value={newCourse12thReq}
                onChange={e => setNewCourse12thReq(e.target.value)}
              />
              <Input
                label="Relevant Entrance Exams"
                placeholder="e.g. NID DAT, UCEED, NIFT Entrance Exam"
                value={newCourseExams}
                onChange={e => setNewCourseExams(e.target.value)}
              />
              <FieldGroup>
                <FieldLabel>Programs Offered</FieldLabel>
                <StyledTextarea
                  placeholder="List specialisations offered..."
                  value={newCoursePrograms}
                  onChange={e => setNewCoursePrograms(e.target.value)}
                />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Top Colleges</FieldLabel>
                <StyledTextarea
                  placeholder="List leading institutions..."
                  value={newCourseTopColleges}
                  onChange={e => setNewCourseTopColleges(e.target.value)}
                />
              </FieldGroup>
              <Input
                label="Further Study Options"
                placeholder="e.g. M.Des, PhD, Design Residencies"
                value={newCourseFurtherStudy}
                onChange={e => setNewCourseFurtherStudy(e.target.value)}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <Button variant="secondary" size="sm" onClick={() => setIsAddingCourse(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleAddCourse}>
                  Add Course
                </Button>
              </div>
            </ExpandedFormCard>
          )}
        </SectionBox>

        {/* Institutions Section */}
        <SectionBox>
          <SectionTitle>Institutions</SectionTitle>

          <FieldLabel>Existing entries pulled from this Domain (Tick / Untick to include):</FieldLabel>
          <ExistingEntriesList>
            {institutionsList.map(item => (
              <EntryRow key={item.id} $checked={item.checked}>
                <EntryCheckboxWrapper>
                  <Checkbox
                    checked={item.checked}
                    onChange={() =>
                      setInstitutionsList(prev =>
                        prev.map(i => (i.id === item.id ? { ...i, checked: !i.checked } : i))
                      )
                    }
                  />
                  <span>{item.text}</span>
                  <AutoPulledTag>(auto-pulled from Domain library)</AutoPulledTag>
                </EntryCheckboxWrapper>
              </EntryRow>
            ))}
          </ExistingEntriesList>

          {!isAddingInst ? (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<RiAddLine size={14} />}
                onClick={() => setIsAddingInst(true)}
              >
                Add New Institution
              </Button>
            </div>
          ) : (
            <ExpandedFormCard>
              <ExpandedFormTitle>
                <span>+ ADD NEW INSTITUTION (Saves to Domain Library)</span>
                <button
                  type="button"
                  onClick={() => setIsAddingInst(false)}
                  style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                >
                  <RiCloseLine size={18} />
                </button>
              </ExpandedFormTitle>
              <FormGrid $columns={2}>
                <Input
                  label="Institution Abbreviation"
                  placeholder="e.g. NIFT"
                  value={newInstAbbr}
                  onChange={e => setNewInstAbbr(e.target.value)}
                />
                <Input
                  label="Institution Name *"
                  placeholder="e.g. National Institute of Fashion Technology"
                  value={newInstName}
                  onChange={e => setNewInstName(e.target.value)}
                />
                <Input
                  label="Location"
                  placeholder="City, State"
                  value={newInstLocation}
                  onChange={e => setNewInstLocation(e.target.value)}
                />
                <Input
                  label="Entrance Exam Required"
                  placeholder="e.g. NID DAT (Prelims + Mains)"
                  value={newInstExamReq}
                  onChange={e => setNewInstExamReq(e.target.value)}
                />
              </FormGrid>
              <FieldGroup>
                <FieldLabel>Programs Offered</FieldLabel>
                <StyledTextarea
                  placeholder="List programmes..."
                  value={newInstPrograms}
                  onChange={e => setNewInstPrograms(e.target.value)}
                />
              </FieldGroup>
              <FormGrid $columns={2}>
                <Input
                  label="Ranking / Recognition"
                  placeholder="e.g. #1 in IIRF/Outlook-ICARE Design rankings"
                  value={newInstRanking}
                  onChange={e => setNewInstRanking(e.target.value)}
                />
                <Input
                  label="Official Website"
                  placeholder="https://..."
                  value={newInstWebsite}
                  onChange={e => setNewInstWebsite(e.target.value)}
                />
              </FormGrid>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <Button variant="secondary" size="sm" onClick={() => setIsAddingInst(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleAddInst}>
                  Add Institution
                </Button>
              </div>
            </ExpandedFormCard>
          )}
        </SectionBox>
      </ModalScrollContainer>
    </Modal>
  );
};

export default JobRoleApprovalModal;
