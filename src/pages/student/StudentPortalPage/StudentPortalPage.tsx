import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RiUser3Line,
  RiFileTextLine,
  RiCalendarEventLine,
  RiCompass3Line,
  RiArrowRightLine,
  RiCheckDoubleLine,
  RiDownload2Line,
  RiBuilding4Line,
  RiGraduationCapLine,
} from 'react-icons/ri';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { useAuthStore } from '@/store';
import { ROUTES } from '@/constants';
import { PreCounsellingAnswersModal } from '@/pages/dashboard/components/PreCounsellingAnswersModal';
import {
  PortalContainer,
  WelcomeBanner,
  BannerText,
  BannerTitle,
  BannerSubtitle,
  BadgePill,
  GridContainer,
  CardHeader,
  CardTitleGroup,
  IconBox,
  CardTitle,
  CardDescription,
  InfoList,
  InfoRow,
  InfoLabel,
  InfoValue,
  RecommendedList,
  CareerTag,
  CareerName,
  MatchBadge,
} from './StudentPortalPage.styles';

export const StudentPortalPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const [isAnswersModalOpen, setIsAnswersModalOpen] = useState(false);

  return (
    <PortalContainer>
      <WelcomeBanner>
        <BannerText>
          <BannerTitle>Welcome back, {user?.name || 'Alex Johnson'}!</BannerTitle>
          <BannerSubtitle>
            <RiGraduationCapLine size={16} /> Grade 11 - Science
            <BadgePill>
              <RiBuilding4Line size={12} style={{ display: 'inline', marginRight: 4 }} />
              St. Xavier&apos;s Senior Secondary School
            </BadgePill>
          </BannerSubtitle>
        </BannerText>
        <Button
          variant="secondary"
          size="md"
          leftIcon={<RiCompass3Line size={18} />}
          onClick={() => navigate(ROUTES.CAREER_LIBRARY)}
          style={{ background: 'rgba(255, 255, 255, 0.95)', color: '#5D2384', border: 'none' }}
        >
          Explore Careers
        </Button>
      </WelcomeBanner>

      <GridContainer>
        {/* Pre-Counselling Assessment Card */}
        <Card>
          <CardHeader>
            <CardTitleGroup>
              <IconBox $color="#0284C7" $bg="rgba(2, 132, 199, 0.1)">
                <RiFileTextLine size={20} />
              </IconBox>
              <CardTitle>Pre-Counselling Assessment</CardTitle>
            </CardTitleGroup>
            <Badge variant="success" size="sm">
              <RiCheckDoubleLine size={12} style={{ marginRight: 4 }} /> Submitted
            </Badge>
          </CardHeader>
          <CardDescription>
            Your pre-counselling assessment questionnaire has been analyzed and paired with your student profile.
          </CardDescription>

          <InfoList>
            <InfoRow>
              <InfoLabel>Status</InfoLabel>
              <InfoValue>Completed & Reviewed</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Submitted Date</InfoLabel>
              <InfoValue>Aug 01, 2026</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Primary Interest</InfoLabel>
              <InfoValue>Computer Science & AI</InfoValue>
            </InfoRow>
          </InfoList>

          <Button
            variant="secondary"
            fullWidth
            size="md"
            rightIcon={<RiArrowRightLine size={16} />}
            onClick={() => setIsAnswersModalOpen(true)}
          >
            View Submitted Answers
          </Button>
        </Card>

        {/* Scheduled Session Card */}
        <Card>
          <CardHeader>
            <CardTitleGroup>
              <IconBox $color="#7C3AED" $bg="rgba(124, 58, 237, 0.1)">
                <RiCalendarEventLine size={20} />
              </IconBox>
              <CardTitle>Upcoming 1-on-1 Session</CardTitle>
            </CardTitleGroup>
            <Badge variant="primary" size="sm">
              Scheduled
            </Badge>
          </CardHeader>
          <CardDescription>
            Your next 1-on-1 career counselling session with your assigned senior career advisor.
          </CardDescription>

          <InfoList>
            <InfoRow>
              <InfoLabel>Counselor</InfoLabel>
              <InfoValue>Sarah Jenkins (M.Sc Psych)</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Date & Time</InfoLabel>
              <InfoValue>Aug 12, 2026 @ 10:00 AM</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Session Focus</InfoLabel>
              <InfoValue>Engineering Stream & Univ Fit</InfoValue>
            </InfoRow>
          </InfoList>

          <Button
            variant="primary"
            fullWidth
            size="md"
            leftIcon={<RiUser3Line size={16} />}
            onClick={() => navigate(ROUTES.SETTINGS)}
          >
            Manage Appointment
          </Button>
        </Card>

        {/* Ikigai & Career Assessment Report Card */}
        <Card>
          <CardHeader>
            <CardTitleGroup>
              <IconBox $color="#059669" $bg="rgba(5, 150, 105, 0.1)">
                <RiCompass3Line size={20} />
              </IconBox>
              <CardTitle>Ikigai Career Profile</CardTitle>
            </CardTitleGroup>
            <Badge variant="info" size="sm">
              94% Match
            </Badge>
          </CardHeader>
          <CardDescription>
            Your Ikigai matrix aligns strongly with STEM and Innovation fields based on your trait assessments.
          </CardDescription>

          <RecommendedList>
            <CareerTag>
              <CareerName>Artificial Intelligence Specialist</CareerName>
              <MatchBadge>96% Fit</MatchBadge>
            </CareerTag>
            <CareerTag>
              <CareerName>Software Systems Architect</CareerName>
              <MatchBadge>93% Fit</MatchBadge>
            </CareerTag>
            <CareerTag>
              <CareerName>Data Science & Analytics</CareerName>
              <MatchBadge>90% Fit</MatchBadge>
            </CareerTag>
          </RecommendedList>

          <div style={{ marginTop: '16px' }}>
            <Button
              variant="secondary"
              fullWidth
              size="md"
              leftIcon={<RiDownload2Line size={16} />}
              onClick={() => navigate(ROUTES.CAREER_LIBRARY)}
            >
              Browse Career Details
            </Button>
          </div>
        </Card>
      </GridContainer>

      {/* Pre-Counselling Answers Modal */}
      <PreCounsellingAnswersModal
        isOpen={isAnswersModalOpen}
        onClose={() => setIsAnswersModalOpen(false)}
        studentId={user?.id || 'user-student-alex'}
        studentName={user?.name || 'Alex Johnson'}
      />
    </PortalContainer>
  );
};

export default StudentPortalPage;
