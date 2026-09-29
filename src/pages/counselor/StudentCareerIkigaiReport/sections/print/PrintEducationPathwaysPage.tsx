import React from 'react';
import styled from 'styled-components';
import { CollegesAfterItemJson, EntranceExamItemJson } from '@/types/counsellorChart.types';
import {
  PrintSectionTitle,
  PrintSectionSubtitle,
  PrintSectionRule,
  PrintTable,
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

// Entrance exam cards — the print twin of EducationPathwaysSection's on-screen ExamCard grid
// (lavender header with the exam name, then label: value lines), in the report's print
// palette. 3 across fits the A4 content width; each card stays whole on one sheet.
const PrintExamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 16px;
`;

const PrintExamCard = styled.div`
  border: 1px solid #e2d8ee;
  border-radius: 4px;
  overflow: hidden;
  background: #ffffff;
  break-inside: avoid;
`;

const PrintExamHeader = styled.div`
  background: #ece8f6;
  padding: 7px 10px;
  border-bottom: 1px solid #e2d8ee;
  font-size: 11px;
  font-weight: 700;
  color: #5d2384;
`;

const PrintExamBody = styled.div`
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 9.5px;
  line-height: 1.4;
  color: #1a1a1a;
  overflow-wrap: anywhere;

  strong {
    font-weight: 700;
  }
`;

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
      <PrintExamGrid>
        {exams.map(exam => (
          <PrintExamCard key={exam.id}>
            <PrintExamHeader>{orCompilingData(exam.fullName)}</PrintExamHeader>
            <PrintExamBody>
              <div>
                <strong>Conducted by:</strong> {orCompilingData(exam.conductingBody)}
              </div>
              <div>
                <strong>Level:</strong> {orCompilingData(exam.level)}
              </div>
              <div>
                <strong>Applicable For:</strong> {orCompilingData(exam.applicableFor)}
              </div>
              <div>
                <strong>Subject Requirements:</strong> {orCompilingData(exam.subjectRequirements)}
              </div>
              <div>
                <strong>Exam Month:</strong> {orCompilingData(exam.examMonth)}
              </div>
              <div>
                <strong>Website:</strong> {orCompilingData(exam.urlLink)}
              </div>
            </PrintExamBody>
          </PrintExamCard>
        ))}
      </PrintExamGrid>
    ) : (
      <PrintPlaceholderNote>
        The counsellor hasn&apos;t listed entrance exams for this student yet.
      </PrintPlaceholderNote>
    )}

    <PrintInsightsSection groups={[{ heading: 'What to Keep in Mind', notes: notesE }]} />
  </PrintPageChrome>
);
