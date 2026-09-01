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
} from '../StudentCareerIkigaiReportPage.styles';

interface MyTraitMapSectionProps {
  traits: TraitMapItem[];
}

export const MyTraitMapSection: React.FC<MyTraitMapSectionProps> = ({ traits }) => {
  return (
    <ReportSectionBlock id="trait-map">
      <SectionHeaderGroup>
        <SectionTitle>
          <RiTableLine size={24} />
          My Trait Map — Top Ranked Career Traits
        </SectionTitle>
        <SectionSubtitle>
          Layer-wise psychometric breakdown evaluating core aptitude, personality structure, and intrinsic interest passion drivers.
        </SectionSubtitle>
      </SectionHeaderGroup>

      <TraitMapTableContainer>
        <TraitMapHeaderRow>
          <TraitCell>No</TraitCell>
          <TraitCell>Layer-Trait</TraitCell>
          <TraitCell>Trait Name</TraitCell>
          <TraitCell>What It Measures</TraitCell>
          <TraitCell>Grade</TraitCell>
          <TraitCell>Grade Meaning</TraitCell>
        </TraitMapHeaderRow>

        {traits.map(item => (
          <TraitMapDataRow key={item.no}>
            <TraitCell style={{ fontWeight: 700 }}>{item.no}</TraitCell>
            <TraitCell style={{ fontWeight: 600 }}>{item.layerTrait}</TraitCell>
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
    </ReportSectionBlock>
  );
};
