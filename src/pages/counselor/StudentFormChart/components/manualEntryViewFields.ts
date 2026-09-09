import { AddRowFieldConfig } from './AddRowModal';

// Read-only field configs for the AddRowModal in `mode="view"`, keyed by the exact
// `ManualEntryRow.tableLabel` strings (see docs/compass-tables-manual-entry-backend-prompt.md
// and SuperAdminDashboard.tsx's TABLE_LABEL_TO_SUBLINK_ID). Labels are copied verbatim from
// Step3SectionC's getFieldsForTable — no dbSource/derivedOnly here, those only matter while
// adding a row, not while viewing an already-saved one.
export const MANUAL_ENTRY_VIEW_FIELDS: Record<string, AddRowFieldConfig[]> = {
  'Career Compass (Indicative Clusters)': [
    { key: 'cluster', label: 'Cluster' },
    { key: 'industry', label: 'Industry' },
    { key: 'domain', label: 'Domain' },
    { key: 'streamRequirement', label: 'Stream Requirement' },
    { key: 'gradingLevel', label: 'Grading Level' },
    { key: 'meaning', label: 'Meaning', multiline: true },
  ],
  'Career Compass (Target Roles & Compensation)': [
    { key: 'domain', label: 'Domain' },
    { key: 'role', label: 'Target Role' },
    { key: 'whyItFits', label: 'Why It Fits', multiline: true },
    { key: 'topEmployers', label: 'Top Employers' },
    { key: 'aiResilience', label: 'AI Resilience' },
    { key: 'salaryIndia', label: 'Salary (India)' },
    { key: 'salaryAbroad', label: 'Salary (Abroad)' },
  ],
  'Assessment Result View — Stream Fit & Pathways': [
    { key: 'mainStream', label: 'Main Stream' },
    { key: 'subStream', label: 'Sub-Streams' },
    { key: 'coreSubjects', label: 'Core Subjects Usually Offered', multiline: true },
    { key: 'electives', label: 'Optional / Elective Subjects', multiline: true },
    { key: 'explanation', label: 'Student & Parent-Friendly Explanation', multiline: true },
  ],
  'Graduation Fit': [
    { key: 'mainStream', label: 'Main Stream' },
    { key: 'subStream', label: 'Sub-Stream' },
    { key: 'cluster', label: 'Cluster' },
    { key: 'specialization', label: 'Specialization' },
    { key: 'reasoning', label: 'Reasoning', multiline: true },
    { key: 'keyExams', label: 'Key Exams' },
  ],
  'Colleges After Class 11&12': [
    { key: 'collegeName', label: 'College Name' },
    { key: 'location', label: 'Location' },
    { key: 'type', label: 'Type' },
    { key: 'course', label: 'Course' },
    { key: 'entranceExam', label: 'Entrance Exam' },
    { key: 'ranking', label: 'Ranking' },
    { key: 'website', label: 'Website' },
  ],
  'Entrance Exams': [
    { key: 'fullName', label: 'Exam Name' },
    { key: 'conductingBody', label: 'Conducting Body' },
    { key: 'level', label: 'Level' },
    { key: 'applicableFor', label: 'Applicable For' },
    { key: 'subjectRequirements', label: 'Subject Requirements', multiline: true },
    { key: 'examMonth', label: 'Exam Month' },
    { key: 'urlLink', label: 'Website' },
  ],
};
