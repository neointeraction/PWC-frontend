import React from 'react';
import { PrintInsightsBlock, PrintInsightsHeading, PrintInsightGroup } from '../../StudentCareerIkigaiReportPage.print.styles';

export interface NoteEntry {
  code: string;
  body: string;
}

interface InsightGroup {
  heading: string;
  notes: NoteEntry[] | undefined;
}

interface PrintInsightsSectionProps {
  groups: InsightGroup[];
}

// Renders the "COUNSELLOR'S INSIGHTS" block that appears near the bottom of most PDF pages,
// built from the counsellor chart's note-code groups (e.g. A1-A5 -> "How You Learn and
// Engage"). Renders nothing if none of the groups have any notes.
export const PrintInsightsSection: React.FC<PrintInsightsSectionProps> = ({ groups }) => {
  const populated = groups.filter(g => g.notes && g.notes.length > 0);
  if (populated.length === 0) return null;

  return (
    <PrintInsightsBlock>
      <PrintInsightsHeading>Counsellor&apos;s Insights</PrintInsightsHeading>
      {populated.map(g => (
        <PrintInsightGroup key={g.heading}>
          <h4>{g.heading}:</h4>
          <ol>
            {g.notes!.map(n => (
              <li key={n.code}>{n.body}</li>
            ))}
          </ol>
        </PrintInsightGroup>
      ))}
    </PrintInsightsBlock>
  );
};
