import React from 'react';
import { CollegesAfterItemJson, EntranceExamItemJson } from '@/types/counsellorChart.types';
import {
  PrintSectionTitle,
  PrintSectionSubtitle,
  PrintSectionRule,
  PrintTable,
  PrintKeyValueTable,
  PrintPlaceholderNote,
} from '../../StudentCareerIkigaiReportPage.print.styles';
import { PrintPageChrome } from './PrintPageChrome';
import { orCompilingData } from '../CompilingData';
import { PrintInsightsSection, NoteEntry } from './PrintInsightsSection';

interface PrintEducationPathwaysPageProps {
  gradeClass: string;
  colleges: CollegesAfterItemJson[] | null | undefined;
  exams: EntranceExamItemJson[] | null | undefined;
  notesE: NoteEntry[] | undefined;
}

export const PrintEducationPathwaysPage: React.FC<PrintEducationPathwaysPageProps> = ({
  gradeClass,
  colleges,
  exams,
  notesE,
}) => (
  <PrintPageChrome gradeClass={gradeClass}>
    <PrintSectionTitle>Education Pathways</PrintSectionTitle>
    <PrintSectionSubtitle>Indicative · Based on Graduation Stream Chosen</PrintSectionSubtitle>
    <PrintSectionRule />

    <PrintSectionTitle as="h3" style={{ fontSize: '14px' }}>
      Colleges Shortlisted after Class 11&amp;12
    </PrintSectionTitle>
    {colleges && colleges.length > 0 ? (
      <PrintTable>
        <thead>
          <tr>
            <th>College Name</th>
            <th>Location</th>
            <th>Course</th>
            <th>Entrance Exam</th>
            <th>Ranking</th>
            <th>Placement Salary</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {colleges.map(college => (
            <tr key={college.id}>
              <td>{orCompilingData(college.collegeName)}</td>
              <td>{orCompilingData(college.location)}</td>
              <td>{orCompilingData(college.course)}</td>
              <td>{orCompilingData(college.entranceExam)}</td>
              <td>{orCompilingData(college.ranking)}</td>
              <td>{orCompilingData(college.placementSalary)}</td>
              <td>{orCompilingData(college.website)}</td>
            </tr>
          ))}
        </tbody>
      </PrintTable>
    ) : (
      <PrintPlaceholderNote>
        The counsellor hasn&apos;t shortlisted colleges for this student yet.
      </PrintPlaceholderNote>
    )}

    <PrintSectionTitle as="h3" style={{ fontSize: '14px', marginTop: '10px' }}>
      Entrance Exams to Prepare
    </PrintSectionTitle>
    {exams && exams.length > 0 ? (
      exams.map((exam, idx) => (
        <PrintKeyValueTable key={exam.id}>
          <tbody>
            <tr>
              <td>Exam {idx + 1}</td>
              <td style={{ fontWeight: 700 }}>{orCompilingData(exam.fullName)}</td>
            </tr>
            <tr>
              <td>Conducting Body</td>
              <td>{orCompilingData(exam.conductingBody)}</td>
            </tr>
            <tr>
              <td>Level</td>
              <td>{orCompilingData(exam.level)}</td>
            </tr>
            <tr>
              <td>Applicable For</td>
              <td>{orCompilingData(exam.applicableFor)}</td>
            </tr>
            <tr>
              <td>Subject Requirements</td>
              <td>{orCompilingData(exam.subjectRequirements)}</td>
            </tr>
            <tr>
              <td>Exam Month</td>
              <td>{orCompilingData(exam.examMonth)}</td>
            </tr>
            <tr>
              <td>URL Link</td>
              <td>{orCompilingData(exam.urlLink)}</td>
            </tr>
          </tbody>
        </PrintKeyValueTable>
      ))
    ) : (
      <PrintPlaceholderNote>
        The counsellor hasn&apos;t listed entrance exams for this student yet.
      </PrintPlaceholderNote>
    )}

    <PrintInsightsSection groups={[{ heading: 'What to Keep in Mind', notes: notesE }]} />
  </PrintPageChrome>
);
