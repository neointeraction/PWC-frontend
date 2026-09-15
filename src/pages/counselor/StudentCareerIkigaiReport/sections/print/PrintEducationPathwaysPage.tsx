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
            <th>Type</th>
            <th>Course</th>
            <th>Entrance Exam</th>
            <th>Ranking</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {colleges.map(college => (
            <tr key={college.id}>
              <td>{college.collegeName}</td>
              <td>{college.location}</td>
              <td>{college.type}</td>
              <td>{college.course}</td>
              <td>{college.entranceExam}</td>
              <td>{college.ranking}</td>
              <td>{college.website}</td>
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
              <td style={{ fontWeight: 700 }}>{exam.fullName}</td>
            </tr>
            <tr>
              <td>Conducting Body</td>
              <td>{exam.conductingBody}</td>
            </tr>
            <tr>
              <td>Level</td>
              <td>{exam.level}</td>
            </tr>
            <tr>
              <td>Applicable For</td>
              <td>{exam.applicableFor}</td>
            </tr>
            <tr>
              <td>Subject Requirements</td>
              <td>{exam.subjectRequirements}</td>
            </tr>
            <tr>
              <td>Exam Month</td>
              <td>{exam.examMonth}</td>
            </tr>
            <tr>
              <td>URL Link</td>
              <td>{exam.urlLink}</td>
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
