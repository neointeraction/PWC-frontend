import React from 'react';
import { ComparisonSubGroup } from '@/mocks/studentFormChart.mock';
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
              <CompResponseCell $type="student">{item.studentResponse}</CompResponseCell>
              <CompResponseCell $type="parent">{item.parentResponse}</CompResponseCell>
            </CompDataRow>
          ))}
        </React.Fragment>
      ))}
    </CompTableContainer>
  );
};
