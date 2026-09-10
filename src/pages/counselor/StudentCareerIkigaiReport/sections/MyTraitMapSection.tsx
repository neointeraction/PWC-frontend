import React from 'react';
import { RiTableLine } from 'react-icons/ri';
import { TraitMapItem } from '@/types/studentIkigaiReport.types';
import { Badge } from '@/components/Badge';
import {
  ReportSectionBlock,
  SectionHeaderGroup,
  SectionTitle,
  SectionSubtitle,
  TraitMapTableContainer,
  TraitMapHeaderRow,
  TraitMapDataRow,
  TraitCell,
  TextCardTitle,
} from '../StudentCareerIkigaiReportPage.styles';

interface MyTraitMapSectionProps {
  traits: TraitMapItem[];
}

const TRAIT_MAP_GRID = '50px 200px 1fr 130px 1fr';

// item.layerTrait is "<category> - <layer>" (e.g. "RIASEC - REALISTIC", "BIG Five - OPENNESS").
// The category prefix groups traits into their own table; subtitles below give each
// category the same "what this table is about" framing as the design template.
const CATEGORY_SUBTITLES: Record<string, string> = {
  RIASEC: 'Career Traits — What You Are Drawn To',
  'BIG Five': 'Personality Traits — How You Show Up',
  'Cognitive & Decision': 'Thinking & Decision Traits — How You Process and Choose',
  Aptitude: 'Aptitude Traits — Your Natural Ability Areas',
};

const categoryOf = (layerTrait: string): string => layerTrait.split(' - ')[0];

export const MyTraitMapSection: React.FC<MyTraitMapSectionProps> = ({ traits }) => {
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
    <ReportSectionBlock id="trait-map">
      <SectionHeaderGroup>
        <SectionTitle>
          <RiTableLine size={24} />
          My 4 Dimensional Strength Meter
        </SectionTitle>
        <SectionSubtitle>
          Layer-wise psychometric breakdown evaluating core aptitude, personality structure, and intrinsic interest passion drivers.
        </SectionSubtitle>
      </SectionHeaderGroup>

      {categories.map(category => (
        <div key={category.name}>
          <TextCardTitle style={{ fontSize: '0.95rem', marginTop: '4px' }}>
            {CATEGORY_SUBTITLES[category.name] ?? category.name}
          </TextCardTitle>

          <TraitMapTableContainer>
            <TraitMapHeaderRow style={{ gridTemplateColumns: TRAIT_MAP_GRID }}>
              <TraitCell>No</TraitCell>
              <TraitCell>Trait Name</TraitCell>
              <TraitCell>What It Measures</TraitCell>
              <TraitCell>Grade</TraitCell>
              <TraitCell>Grade Meaning</TraitCell>
            </TraitMapHeaderRow>

            {category.items.map((item, idx) => (
              <TraitMapDataRow key={item.no} style={{ gridTemplateColumns: TRAIT_MAP_GRID }}>
                <TraitCell style={{ fontWeight: 700 }}>{idx + 1}</TraitCell>
                <TraitCell style={{ fontWeight: 700, color: '#4F46E5' }}>{item.traitName}</TraitCell>
                <TraitCell>{item.whatItMeasures}</TraitCell>
                <TraitCell>
                  <Badge variant="primary">
                    {item.grade}
                  </Badge>
                </TraitCell>
                <TraitCell style={{ fontWeight: 500 }}>{item.gradeMeaning}</TraitCell>
              </TraitMapDataRow>
            ))}
          </TraitMapTableContainer>
        </div>
      ))}
    </ReportSectionBlock>
  );
};
