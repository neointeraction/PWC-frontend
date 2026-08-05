import React from 'react';
import styled from 'styled-components';
import { CourseDetail } from '@/types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const CourseCard = styled.div`
  background-color: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  min-height: 420px;
`;

const BadgePill = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  border-radius: 20px;
  padding: 6px 20px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 700;
  width: fit-content;
`;

const CourseTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing.xs} 0;
`;

const DetailsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
`;

const DetailItem = styled.div`
  p {
    margin: 0;
  }
  strong {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 700;
  }
`;



interface CoursesTabProps {
  courses: CourseDetail[];
}

export const CoursesTab: React.FC<CoursesTabProps> = ({ courses }) => {
  return (
    <Container>
      <Grid>
        {courses.map(course => (
          <CourseCard key={course.id}>
            <BadgePill>{course.badge}</BadgePill>
            <CourseTitle>{course.title}</CourseTitle>
            <Divider />

            <DetailsList>
              <DetailItem>
                <p>
                  <strong>12th Stream:</strong> {course.streamRequirement}
                </p>
              </DetailItem>

              <DetailItem>
                <p>
                  <strong>Entrance Exams:</strong> {course.entranceExams}
                </p>
              </DetailItem>

              <DetailItem>
                <p>
                  <strong>Programs Offered:</strong> {course.programsOffered}
                </p>
              </DetailItem>

              <DetailItem>
                <p>
                  <strong>Top Colleges:</strong> {course.topColleges}
                </p>
              </DetailItem>

              <DetailItem>
                <p>
                  <strong>FURTHER STUDY OPTIONS:</strong> {course.furtherStudyOptions}
                </p>
              </DetailItem>
            </DetailsList>
          </CourseCard>
        ))}
      </Grid>
    </Container>
  );
};
