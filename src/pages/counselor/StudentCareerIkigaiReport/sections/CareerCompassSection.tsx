import React from 'react';
import { RiCompassLine, RiBuildingLine, RiMoneyDollarCircleLine } from 'react-icons/ri';
import { CareerRecommendationCard as CardType } from '@/mocks/studentIkigaiReport.mock';
import { Badge } from '@/components/Badge';
import {
  ReportSectionBlock,
  SectionHeaderGroup,
  SectionTitle,
  SectionSubtitle,
  CareerCompassGrid,
  CareerCompassCard,
  CareerCardTitle,
  CareerMetaTagGroup,
  CareerMetaTag,
  CareerDetailRow,
  CareerDetailLabel,
  CareerDetailValue,
} from '../StudentCareerIkigaiReportPage.styles';

interface CareerCompassSectionProps {
  cards: CardType[];
}

export const CareerCompassSection: React.FC<CareerCompassSectionProps> = ({ cards }) => {
  return (
    <ReportSectionBlock id="career-compass">
      <SectionHeaderGroup>
        <SectionTitle>
          <RiCompassLine size={24} />
          My Career Compass — Top 6 Career Recommendations
        </SectionTitle>
        <SectionSubtitle>
          Curated top 6 career roles matched to student aptitude, interest, industry demand, AI resilience, and global salary potential.
        </SectionSubtitle>
      </SectionHeaderGroup>

      <CareerCompassGrid>
        {cards.map((card, idx) => (
          <CareerCompassCard key={card.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <CareerCardTitle>
                #{idx + 1} · {card.role}
              </CareerCardTitle>
              <Badge variant="success">
                {card.aiResilience}
              </Badge>
            </div>

            <CareerMetaTagGroup>
              <CareerMetaTag>{card.cluster}</CareerMetaTag>
              <CareerMetaTag>{card.industry}</CareerMetaTag>
              <CareerMetaTag>{card.domain}</CareerMetaTag>
            </CareerMetaTagGroup>

            <CareerDetailRow>
              <CareerDetailLabel>Why It Fits</CareerDetailLabel>
              <CareerDetailValue style={{ color: '#4F46E5', fontWeight: 600 }}>
                {card.whyItFits}
              </CareerDetailValue>
            </CareerDetailRow>

            <CareerDetailRow>
              <CareerDetailLabel>
                <RiBuildingLine size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                Top Employers
              </CareerDetailLabel>
              <CareerDetailValue>{card.topEmployers}</CareerDetailValue>
            </CareerDetailRow>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '4px' }}>
              <CareerDetailRow>
                <CareerDetailLabel>
                  <RiMoneyDollarCircleLine size={14} style={{ verticalAlign: 'middle', marginRight: '2px' }} />
                  Salary (India)
                </CareerDetailLabel>
                <CareerDetailValue style={{ fontWeight: 700 }}>{card.salaryIndia}</CareerDetailValue>
              </CareerDetailRow>

              <CareerDetailRow>
                <CareerDetailLabel>
                  <RiMoneyDollarCircleLine size={14} style={{ verticalAlign: 'middle', marginRight: '2px' }} />
                  Salary (Abroad)
                </CareerDetailLabel>
                <CareerDetailValue style={{ fontWeight: 700 }}>{card.salaryAbroad}</CareerDetailValue>
              </CareerDetailRow>
            </div>
          </CareerCompassCard>
        ))}
      </CareerCompassGrid>
    </ReportSectionBlock>
  );
};
