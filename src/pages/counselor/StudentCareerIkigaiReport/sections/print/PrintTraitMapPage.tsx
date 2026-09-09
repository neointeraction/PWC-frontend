import React from 'react';
import { StudentCareerIkigaiReportData } from '@/types/studentIkigaiReport.types';
import {
  PrintSectionTitle,
  PrintSectionSubtitle,
  PrintSectionRule,
  PrintTable,
  PrintBody,
} from '../../StudentCareerIkigaiReportPage.print.styles';
import { PrintPageChrome } from './PrintPageChrome';

interface PrintTraitMapPageProps {
  gradeClass: string;
  traits: StudentCareerIkigaiReportData['traitMap'];
}

export const PrintTraitMapPage: React.FC<PrintTraitMapPageProps> = ({ gradeClass, traits }) => (
  <PrintPageChrome gradeClass={gradeClass}>
    <PrintSectionTitle>My 4 Dimensional Strength Meter</PrintSectionTitle>
    <PrintSectionSubtitle>All Assessment Layers Combined</PrintSectionSubtitle>
    <PrintSectionRule />

    <PrintBody>
      Your assessment covers all {traits.length} traits across 4 dimensions. Here each trait is
      shown as a strength meter rather than a mark to chase. Any trait, like a skill, can still
      be built.
    </PrintBody>

    <PrintTable>
      <thead>
        <tr>
          <th style={{ width: '4%' }}>No</th>
          <th style={{ width: '18%' }}>Trait Name</th>
          <th>What It Means</th>
          <th style={{ width: '12%' }}>Current Level</th>
          <th style={{ width: '22%' }}>What It Means</th>
        </tr>
      </thead>
      <tbody>
        {traits.map(item => (
          <tr key={item.no}>
            <td>{item.no}</td>
            <td>{item.traitName}</td>
            <td>{item.whatItMeasures}</td>
            <td>{item.grade}</td>
            <td>{item.gradeMeaning}</td>
          </tr>
        ))}
      </tbody>
    </PrintTable>
  </PrintPageChrome>
);
