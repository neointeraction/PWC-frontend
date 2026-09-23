import React from 'react';
import { ComparisonSubGroup } from '@/mocks/studentFormChart.mock';
import { STRENGTH_LINE_PATTERN } from '@/services/counsellorChart.service';
import {
  CompTableContainer,
  CompTableHeaderRow,
  CompTableHeaderCell,
  CompSubHeaderRow,
  CompDataRow,
  CompParamCell,
  CompResponseCell,
} from '../StudentFormChartPage.styles';

interface ComparisonTableProps {
  groups: ComparisonSubGroup[];
}

// Italicises the trait name in "<Layer> - <Trait> - <quality>" strength lines (B1.1/B1.2);
// every other response renders exactly as the plain string it is. Wrapped in one <span>
// because CompResponseCell is a flex column — loose text/<em> nodes would each become their
// own flex item and stack on separate lines.
const renderResponse = (response: string) => {
  if (!response) return response;
  const lines = response.split('\n');
  if (!lines.some(line => STRENGTH_LINE_PATTERN.test(line))) return response;
  return (
    <span>
      {lines.map((line, index) => {
        const match = line.match(STRENGTH_LINE_PATTERN);
        return (
          <React.Fragment key={index}>
            {index > 0 && '\n'}
            {match ? (
              <>
                {match[1] ?? ''}
                {match[2]} - <em>{match[3]}</em> - {match[4]}
              </>
            ) : (
              line
            )}
          </React.Fragment>
        );
      })}
    </span>
  );
};

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ groups }) => {
  return (
    <CompTableContainer>
      <CompTableHeaderRow>
        <CompTableHeaderCell>Parameter</CompTableHeaderCell>
        <CompTableHeaderCell $tint="student">Student Response</CompTableHeaderCell>
        <CompTableHeaderCell $tint="parent">Parent Response</CompTableHeaderCell>
      </CompTableHeaderRow>

      {groups.map(group => (
        <React.Fragment key={group.id}>
          <CompSubHeaderRow>{group.title}</CompSubHeaderRow>
          {group.items.map(item => (
            <CompDataRow key={item.id}>
              <CompParamCell>
                {item.code ? `${item.code} ${item.parameter}` : item.parameter}
              </CompParamCell>
              <CompResponseCell $type="student">
                {renderResponse(item.studentResponse)}
              </CompResponseCell>
              <CompResponseCell $type="parent">
                {renderResponse(item.parentResponse)}
              </CompResponseCell>
            </CompDataRow>
          ))}
        </React.Fragment>
      ))}
    </CompTableContainer>
  );
};
