import React from 'react';
import { RiLightbulbLine } from 'react-icons/ri';
import { TextCard, TextCardTitle, BulletList } from '../StudentCareerIkigaiReportPage.styles';

export interface InsightGroupDef {
  prefix: string;
  title: string;
}

interface CounsellorInsightsCardProps {
  notes: Record<string, string>;
  groups: readonly InsightGroupDef[];
}

// Shared "Counsellor's Insights" card used inline within a report section — filters the
// flat synthesis-notes map (see counsellorChart.service.ts) down to the code prefixes that
// belong to this section, per the Design Destiny "Career kREATE Report" template, and
// renders nothing if none of them have been filled in yet.
export const CounsellorInsightsCard: React.FC<CounsellorInsightsCardProps> = ({ notes, groups }) => {
  const filledGroups = groups
    .map(group => ({
      ...group,
      entries: Object.entries(notes)
        .filter(([code, body]) => code.startsWith(group.prefix) && body.trim().length > 0)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([, body]) => body),
    }))
    .filter(group => group.entries.length > 0);

  if (filledGroups.length === 0) return null;

  return (
    <TextCard style={{ borderLeft: '3px solid #F59E0B', backgroundColor: 'rgba(245, 158, 11, 0.03)' }}>
      <TextCardTitle style={{ color: '#F59E0B' }}>
        <RiLightbulbLine size={18} />
        Counsellor&rsquo;s Insights
      </TextCardTitle>
      {filledGroups.map(group => (
        <div key={group.prefix} style={{ marginTop: '10px' }}>
          <TextCardTitle style={{ fontSize: '0.9rem' }}>{group.title}</TextCardTitle>
          <BulletList as="ol" style={{ listStyle: 'decimal' }}>
            {group.entries.map((entry, idx) => (
              <li key={idx}>{entry}</li>
            ))}
          </BulletList>
        </div>
      ))}
    </TextCard>
  );
};
