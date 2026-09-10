import React from 'react';
import { RiChat3Line } from 'react-icons/ri';
import { EmptyState } from '@/components/EmptyState';
import {
  ReportSectionBlock,
  SectionHeaderGroup,
  SectionTitle,
  SectionSubtitle,
  TextCard,
  TextCardTitle,
  TextCardBody,
} from '../StudentCareerIkigaiReportPage.styles';

interface CounselorCommentsSectionProps {
  notes: Record<string, string>;
}

// Notes are keyed by the synthesis note code the counsellor filled in on the Counsellor
// Chart. Per the Design Destiny "Career kREATE Report" template, every lettered code has
// its own report section and is now shown inline there instead of here: A/B/C in
// StudentProfileSection, D in CareerCompassSection, E in GraduationPathwaysSection, F in
// ReliabilityDashboardSection (page.tsx excludes all of those from the `notes` passed to
// this section). Only G ("My kREATE Blueprint" / Parting Notes) has no report section yet,
// so it still lands here. There is no "H" code in the template.
const SECTION_TOPICS: Record<string, string> = {
  G: "My kREATE Blueprint",
};

const topicForCode = (code: string): string => SECTION_TOPICS[code.charAt(0)] ?? "General Notes";

export const CounselorCommentsSection: React.FC<CounselorCommentsSectionProps> = ({ notes }) => {
  const entries = Object.entries(notes)
    .filter(([, body]) => body && body.trim().length > 0)
    .sort(([a], [b]) => a.localeCompare(b));

  const groups = new Map<string, string[]>();
  entries.forEach(([code, body]) => {
    const topic = topicForCode(code);
    if (!groups.has(topic)) groups.set(topic, []);
    groups.get(topic)!.push(body);
  });

  return (
    <ReportSectionBlock id="counselor-comments">
      <SectionHeaderGroup>
        <SectionTitle>
          <RiChat3Line size={24} />
          Counsellor’s Comments
        </SectionTitle>
        <SectionSubtitle>
          Notes your counsellor recorded during your sessions, grouped by topic.
        </SectionSubtitle>
      </SectionHeaderGroup>

      {groups.size === 0 ? (
        <EmptyState
          title="No counsellor comments yet"
          description="Your counsellor hasn't added any notes for you yet."
        />
      ) : (
        Array.from(groups.entries()).map(([topic, bodies]) => (
          <TextCard key={topic}>
            <TextCardTitle>{topic}</TextCardTitle>
            {bodies.map((body, index) => (
              <TextCardBody key={index}>{body}</TextCardBody>
            ))}
          </TextCard>
        ))
      )}
    </ReportSectionBlock>
  );
};
