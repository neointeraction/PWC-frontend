import React from 'react';
import styled from 'styled-components';
import { TextCard, TextCardTitle, TextCardBody } from '../StudentCareerIkigaiReportPage.styles';

// One card per Stream Fit / Graduation Pathways row: the reasoning text pulled out of the
// table, plus an optional Career Outlook (stream fit only — the sheet's Career Feasibility).
export interface ReasoningCardItem {
  id: string;
  eyebrow: string;
  title: string;
  reasoning: string;
  careerOutlook?: string | null;
}

const ReasoningList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ReasoningHeading = styled.h3`
  font-size: 1rem;
  font-weight: 800;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
  margin: ${({ theme }) => theme.spacing.md} 0 0 0;
`;

const Eyebrow = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const OutlookTitle = styled(TextCardTitle)`
  font-size: 0.875rem;
  margin-top: 4px;
`;

export const ReasoningCards: React.FC<{ items: ReasoningCardItem[] }> = ({ items }) => {
  const cards = items.filter(i => i.reasoning || i.careerOutlook);
  if (cards.length === 0) return null;

  return (
    <>
      <ReasoningHeading>Reasoning</ReasoningHeading>
      <ReasoningList>
        {cards.map(item => (
          <TextCard key={item.id}>
            <TextCardTitle>
              {item.eyebrow && <Eyebrow>{item.eyebrow}</Eyebrow>}
              {item.title}
            </TextCardTitle>
            {item.reasoning && <TextCardBody>{item.reasoning}</TextCardBody>}
            {item.careerOutlook && (
              <>
                <OutlookTitle>Career Outlook</OutlookTitle>
                <TextCardBody>{item.careerOutlook}</TextCardBody>
              </>
            )}
          </TextCard>
        ))}
      </ReasoningList>
    </>
  );
};
