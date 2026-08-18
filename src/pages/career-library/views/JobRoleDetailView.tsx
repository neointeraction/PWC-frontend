import React, { useState } from 'react';
import styled from 'styled-components';
import { Career, EntranceExam, CourseDetail, InstitutionDetail } from '@/types';
import { Tooltip } from '@/components/Tooltip';
import { Card } from '@/components/Card';
import {
  RiStarLine,
  RiStarFill,
  RiEditLine,
  RiFileTextLine,
  RiGraduationCapLine,
  RiFilePaperLine,
  RiBookOpenLine,
  RiBuilding4Line,
  RiShieldCheckLine,
  RiMoneyDollarCircleLine,
  RiGlobalLine,
} from 'react-icons/ri';
import { EducationPathTab } from '../tabs/EducationPathTab';
import { EntranceExamsTab } from '../tabs/EntranceExamsTab';
import { CoursesTab } from '../tabs/CoursesTab';
import { InstitutionsTab } from '../tabs/InstitutionsTab';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const BannerCard = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${
  ({ theme }) => theme.colors.primaryHover
} 100%);
  color: #ffffff;
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  position: relative;
  box-shadow: 0 12px 28px -6px rgba(93, 35, 132, 0.35);
`;

const BannerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ShortlistButton = styled.button<{ $shortlisted?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 18px;
  border-radius: 4px;
  border: none;
  background-color: ${({ $shortlisted }) => ($shortlisted ? '#C49419' : '#D99F26')};
  color: #ffffff;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(217, 159, 38, 0.35);
  transition: all ${({ theme }) => theme.transition.fast};

  &:hover {
    background-color: #b38510;
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(217, 159, 38, 0.45);
  }
`;

const GlassEditButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4px);
  color: #ffffff;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};

  &:hover {
    background-color: rgba(255, 255, 255, 0.28);
    border-color: rgba(255, 255, 255, 0.6);
    transform: translateY(-1px);
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1fr 1fr 1.4fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const MetricCard = styled.div<{ $variant?: 'green' | 'purple' | 'blue' | 'grey' }>`
  background-color: ${({ $variant }) =>
    $variant === 'green' ? '#E8F8EE' : '#FFFFFF'};
  border: 1px solid
    ${({ $variant }) =>
      $variant === 'green'
        ? '#C2EBD0'
        : $variant === 'purple'
        ? '#E2D1EE'
        : $variant === 'blue'
        ? '#DBEAFE'
        : '#E2E8F0'};
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  transition: all ${({ theme }) => theme.transition.fast};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }
`;

const MetricCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const MetricLabel = styled.span<{ $variant?: string }>`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${({ $variant, theme }) =>
    $variant === 'green'
      ? '#1E7E48'
      : $variant === 'purple'
      ? theme.colors.primary
      : $variant === 'blue'
      ? '#1D4ED8'
      : theme.colors.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MetricValue = styled.span<{ $variant?: string }>`
  font-size: 15px;
  font-weight: 700;
  color: ${({ $variant, theme }) =>
    $variant === 'green' ? '#135930' : theme.colors.text};
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RationaleBox = styled.div`
  background-color: #e8f8ee;
  border: 1px solid #c2ebd0;
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  color: #135930;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MainLayout = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: flex-start;
  margin-top: ${({ theme }) => theme.spacing.xs};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const VerticalTabsContainer = styled.div`
  position: sticky;
  top: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 240px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing.sm};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  z-index: 5;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: static;
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
  }
`;

const VerticalTabButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: 4px;
  border: none;
  border-left: 3px solid
    ${({ theme, $active }) => ($active ? theme.colors.primary : 'transparent')};
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primaryLight : 'transparent'};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.textSecondary)};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme, $active }) =>
    $active ? theme.fontWeight.semibold : theme.fontWeight.medium};
  cursor: pointer;
  white-space: nowrap;
  transition: all ${({ theme }) => theme.transition.fast};
  text-align: left;
  width: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const TabContentArea = styled.div`
  flex: 1;
  min-width: 0;
`;

const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const SectionCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SectionText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
  margin: 0;
`;

interface JobRoleDetailViewProps {
  role: Career;
  entranceExams: EntranceExam[];
  courses: CourseDetail[];
  institutions: InstitutionDetail[];
  onToggleShortlist: () => void;
  onToggleExamShortlist: (id: string) => void;
  onToggleInstitutionShortlist: (id: string) => void;
  onEditRole?: (role: Career) => void;
}

type TabType = 'overview' | 'education' | 'exams' | 'courses' | 'institutions';

export const JobRoleDetailView: React.FC<JobRoleDetailViewProps> = ({
  role,
  entranceExams,
  courses,
  institutions,
  onToggleShortlist,
  onToggleExamShortlist,
  onToggleInstitutionShortlist,
  onEditRole,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const topRecruitersStr = Array.isArray(role.topCompaniesRecruiting)
    ? role.topCompaniesRecruiting.join(', ')
    : role.topCompaniesRecruiting || 'Tech Firms, Startups';

  return (
    <Container>
      <BannerCard>
        <BannerHeader>
          <HeaderActions>
            <ShortlistButton
              $shortlisted={role.isShortlisted}
              onClick={onToggleShortlist}
            >
              {role.isShortlisted ? <RiStarFill size={16} /> : <RiStarLine size={16} />}
              {role.isShortlisted ? 'Shortlisted' : 'Save to shortlist'}
            </ShortlistButton>
            {onEditRole && (
              <Tooltip content="Edit Role Specification">
                <GlassEditButton onClick={() => onEditRole(role)}>
                  <RiEditLine size={16} /> Edit Role
                </GlassEditButton>
              </Tooltip>
            )}
          </HeaderActions>
        </BannerHeader>

        <MetricsGrid>
          <MetricCard $variant="green">
            <MetricCardHeader>
              <RiShieldCheckLine size={18} color="#1E7E48" />
              <MetricLabel $variant="green">AI Resilience</MetricLabel>
            </MetricCardHeader>
            <MetricValue $variant="green">{role.aiResilienceGrading || 'High'}</MetricValue>
          </MetricCard>

          <MetricCard $variant="purple">
            <MetricCardHeader>
              <RiMoneyDollarCircleLine size={18} color="#5D2384" />
              <MetricLabel $variant="purple">Salary (India)</MetricLabel>
            </MetricCardHeader>
            <MetricValue $variant="purple">
              {role.approxSalaryRangeIndia || '₹4–15 LPA'}
            </MetricValue>
          </MetricCard>

          <MetricCard $variant="blue">
            <MetricCardHeader>
              <RiGlobalLine size={18} color="#1D4ED8" />
              <MetricLabel $variant="blue">Salary (Global)</MetricLabel>
            </MetricCardHeader>
            <MetricValue $variant="blue">{role.globalSalaryRange || '$70k–$120k'}</MetricValue>
          </MetricCard>

          <MetricCard $variant="grey">
            <MetricCardHeader>
              <RiBuilding4Line size={18} color="#64748B" />
              <MetricLabel $variant="grey">Top Recruiters</MetricLabel>
            </MetricCardHeader>
            <Tooltip content={topRecruitersStr}>
              <MetricValue $variant="grey">{topRecruitersStr}</MetricValue>
            </Tooltip>
          </MetricCard>
        </MetricsGrid>

        <RationaleBox>
          <RiShieldCheckLine size={18} />
          <div>
            <strong>Why "{role.aiResilienceGrading || 'High'}":</strong>{' '}
            {role.aiResilienceComment ||
              'Centers on unique human creativity, emotional expression, and cultural nuance.'}
          </div>
        </RationaleBox>
      </BannerCard>

      <MainLayout>
        <VerticalTabsContainer>
          <VerticalTabButton
            $active={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
          >
            <RiFileTextLine size={18} /> Overview
          </VerticalTabButton>
          <VerticalTabButton
            $active={activeTab === 'education'}
            onClick={() => setActiveTab('education')}
          >
            <RiGraduationCapLine size={18} /> Education Path
          </VerticalTabButton>
          <VerticalTabButton
            $active={activeTab === 'exams'}
            onClick={() => setActiveTab('exams')}
          >
            <RiFilePaperLine size={18} /> Entrance Exams
          </VerticalTabButton>
          <VerticalTabButton
            $active={activeTab === 'courses'}
            onClick={() => setActiveTab('courses')}
          >
            <RiBookOpenLine size={18} /> Courses
          </VerticalTabButton>
          <VerticalTabButton
            $active={activeTab === 'institutions'}
            onClick={() => setActiveTab('institutions')}
          >
            <RiBuilding4Line size={18} /> Institutions
          </VerticalTabButton>
        </VerticalTabsContainer>

        <TabContentArea>
          {activeTab === 'overview' && (
            <SectionGrid>
              <SectionCard title="Role Overview & Scope">
                <SectionText>{role.oneLineDescription}</SectionText>
                <SectionText>
                  Applied UI Designers focus on crafting intuitive digital interfaces, maintaining visual component systems, and bridging product design with frontend engineering.
                </SectionText>
              </SectionCard>

              <SectionCard title="Key Skill Requirements">
                <SectionText>
                  • Figma, Visual System Architecture, Micro-Interactions<br />
                  • User Research Synthesis & Prototyping<br />
                  • Responsive Design & Accessibility (WCAG Compliance)
                </SectionText>
              </SectionCard>
            </SectionGrid>
          )}

          {activeTab === 'education' && <EducationPathTab role={role} />}

          {activeTab === 'exams' && (
            <EntranceExamsTab
              exams={entranceExams}
              onToggleShortlist={onToggleExamShortlist}
            />
          )}

          {activeTab === 'courses' && <CoursesTab courses={courses} />}

          {activeTab === 'institutions' && (
            <InstitutionsTab
              institutions={institutions}
              onToggleShortlist={onToggleInstitutionShortlist}
            />
          )}
        </TabContentArea>
      </MainLayout>
    </Container>
  );
};
