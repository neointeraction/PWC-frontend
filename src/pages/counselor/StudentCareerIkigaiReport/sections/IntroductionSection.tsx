import React from 'react';
import { RiBookOpenLine, RiHeartPulseLine, RiUserHeartLine, RiCompass3Line } from 'react-icons/ri';
import { StudentCareerIkigaiReportData } from '@/mocks/studentIkigaiReport.mock';
import {
  ReportSectionBlock,
  SectionHeaderGroup,
  SectionTitle,
  SectionSubtitle,
  TextCard,
  TextCardTitle,
  TextCardBody,
  ReportGrid,
} from '../StudentCareerIkigaiReportPage.styles';

interface IntroductionSectionProps {
  data: StudentCareerIkigaiReportData['introduction'];
}

export const IntroductionSection: React.FC<IntroductionSectionProps> = ({ data }) => {
  return (
    <ReportSectionBlock id="introduction">
      <SectionHeaderGroup>
        <SectionTitle>
          <RiCompass3Line size={24} />
          1. Introduction — Career IKIGAI Framework
        </SectionTitle>
        <SectionSubtitle>
          Understanding the 4 pillars of Career IKIGAI, diagnostic methodology, and guidance for parents & students.
        </SectionSubtitle>
      </SectionHeaderGroup>

      <ReportGrid $cols={2}>
        <TextCard style={{ borderLeft: '3px solid #4F46E5' }}>
          <TextCardTitle>
            <RiBookOpenLine size={18} />
            What is Career IKIGAI Report
          </TextCardTitle>
          <TextCardBody>{data.whatIsIkigai}</TextCardBody>
        </TextCard>

        <TextCard style={{ borderLeft: '3px solid #6366F1' }}>
          <TextCardTitle>
            <RiHeartPulseLine size={18} />
            How Each Component Relates to Career
          </TextCardTitle>
          <TextCardBody>{data.howEachComponentRelates}</TextCardBody>
        </TextCard>
      </ReportGrid>

      <ReportGrid $cols={2}>
        <TextCard style={{ borderLeft: '3px solid #4F46E5', backgroundColor: 'rgba(79, 70, 229, 0.03)' }}>
          <TextCardTitle style={{ color: '#4F46E5' }}>
            <RiUserHeartLine size={18} />
            TO THE PARENT
          </TextCardTitle>
          <TextCardBody>{data.toParent}</TextCardBody>
        </TextCard>

        <TextCard style={{ borderLeft: '3px solid #10B981', backgroundColor: 'rgba(16, 185, 129, 0.03)' }}>
          <TextCardTitle style={{ color: '#10B981' }}>
            <RiUserHeartLine size={18} />
            TO THE STUDENT
          </TextCardTitle>
          <TextCardBody>{data.toStudent}</TextCardBody>
        </TextCard>
      </ReportGrid>
    </ReportSectionBlock>
  );
};
