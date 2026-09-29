import React from 'react';
import {
  PrintBody,
  PrintReasoningHeading,
  PrintReasoningCard,
  PrintReasoningEyebrow,
  PrintReasoningTitle,
  PrintReasoningSubheading,
} from '../../StudentCareerIkigaiReportPage.print.styles';
import type { ReasoningCardItem } from '../ReasoningCards';

export const PrintReasoningCards: React.FC<{ items: ReasoningCardItem[] }> = ({ items }) => {
  const cards = items.filter(i => i.reasoning || i.careerOutlook);
  if (cards.length === 0) return null;

  return (
    <>
      <PrintReasoningHeading>Reasoning</PrintReasoningHeading>
      {cards.map(item => (
        <PrintReasoningCard key={item.id}>
          <PrintReasoningTitle>
            {item.eyebrow && <PrintReasoningEyebrow>{item.eyebrow}</PrintReasoningEyebrow>}
            {item.title}
          </PrintReasoningTitle>
          {item.reasoning && <PrintBody style={{ margin: 0 }}>{item.reasoning}</PrintBody>}
          {item.careerOutlook && (
            <>
              <PrintReasoningSubheading>Career Outlook</PrintReasoningSubheading>
              <PrintBody style={{ margin: 0 }}>{item.careerOutlook}</PrintBody>
            </>
          )}
        </PrintReasoningCard>
      ))}
    </>
  );
};
