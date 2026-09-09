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
// Chart (e.g. "A1", "D3"). The code's leading letter maps to the Chart section it was
// written under; students only see the topic, never the internal code.
const SECTION_TOPICS: Record<string, string> = {
  A: "Academics & Interests",
  B: "Strengths & Personality",
  D: "Career Direction",
  E: "Stream Fit & Pathways",
  F: "Assessment Reliability",
  G: "Career Readiness",
  H: "Counselling Goals",
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
