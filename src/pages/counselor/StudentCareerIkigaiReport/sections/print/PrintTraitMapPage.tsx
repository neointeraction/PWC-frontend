import React from 'react';
import { TraitMapItem, StudentCareerIkigaiReportData } from '@/types/studentIkigaiReport.types';
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

// item.layerTrait is "<category> - <layer>" (e.g. "RIASEC - REALISTIC", "BIG Five - OPENNESS").
// Mirrors the on-screen MyTraitMapSection.tsx split — one table per category instead of
// one long combined table.
const CATEGORY_SUBTITLES: Record<string, string> = {
  RIASEC: 'Career Traits — What You Are Drawn To',
  'BIG Five': 'Personality Traits — How You Show Up',
  'Cognitive & Decision': 'Thinking & Decision Traits — How You Process and Choose',
  Aptitude: 'Aptitude Traits — Your Natural Ability Areas',
};

const categoryOf = (layerTrait: string): string => layerTrait.split(' - ')[0];

export const PrintTraitMapPage: React.FC<PrintTraitMapPageProps> = ({ gradeClass, traits }) => {
  const categories: { name: string; items: TraitMapItem[] }[] = [];
  traits.forEach(item => {
    const name = categoryOf(item.layerTrait);
    let group = categories.find(c => c.name === name);
    if (!group) {
      group = { name, items: [] };
      categories.push(group);
    }
    group.items.push(item);
  });

  return (
    <PrintPageChrome gradeClass={gradeClass}>
      <PrintSectionTitle>My 4 Dimensional Strength Meter</PrintSectionTitle>
      <PrintSectionSubtitle>All Assessment Layers Combined</PrintSectionSubtitle>
      <PrintSectionRule />

      <PrintBody>
        Your assessment covers all {traits.length} traits across 4 dimensions. Here each trait is
        shown as a strength meter rather than a mark to chase. Any trait, like a skill, can still
        be built.
      </PrintBody>

      {categories.map(category => (
        <div key={category.name}>
          <PrintSectionTitle as="h3" style={{ fontSize: '14px', marginTop: '10px' }}>
            {CATEGORY_SUBTITLES[category.name] ?? category.name}
          </PrintSectionTitle>

          <PrintTable>
            <thead>
              <tr>
                <th style={{ width: '4%' }}>No</th>
                <th style={{ width: '18%' }}>Trait Name</th>
                <th>What It Measures</th>
                <th style={{ width: '12%' }}>Current Level</th>
                <th style={{ width: '22%' }}>What It Means</th>
              </tr>
            </thead>
            <tbody>
              {category.items.map((item, idx) => (
                <tr key={item.no}>
                  <td>{idx + 1}</td>
                  <td>{item.traitName}</td>
                  <td>{item.whatItMeasures}</td>
                  <td>{item.grade}</td>
                  <td>{item.gradeMeaning}</td>
                </tr>
              ))}
            </tbody>
          </PrintTable>
        </div>
      ))}
    </PrintPageChrome>
  );
};
