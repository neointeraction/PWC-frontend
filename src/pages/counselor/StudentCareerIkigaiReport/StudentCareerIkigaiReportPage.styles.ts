import styled from 'styled-components';

export const ReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 70px);
  background-color: ${({ theme }) => theme.colors.background};

  @media print {
    background-color: #ffffff;
  }
`;

// Top Header / Action Bar
export const ReportTopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  z-index: 20;

  @media print {
    display: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 12px 16px;
  }
`;

export const TopBarTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const TopBarMainTitle = styled.h1`
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const TopBarSubText = styled.span`
  font-size: 0.825rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`;

export const TopBarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

// Layout Area
export const ReportBodyLayout = styled.div`
  display: flex;
  flex: 1;
  gap: 24px;
  position: relative;
  align-items: flex-start;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

// Persistent Sticky Left Sidebar TOC
export const TocSidebar = styled.aside<{ $isOpenOnMobile?: boolean }>`
  width: 280px;
  min-width: 280px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 20px 14px;
  position: sticky;
  top: 24px;
  align-self: flex-start;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  z-index: 10;

  @media print {
    display: none;
  }

  @media (max-width: 900px) {
    width: 100%;
    min-width: 100%;
    height: auto;
    max-height: none;
    position: relative;
    top: 0;
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    display: ${({ $isOpenOnMobile }) => ($isOpenOnMobile ? 'flex' : 'none')};
  }
`;

// Student Details Profile Card prominently displayed above TOC
export const StudentProfileSidebarCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 16px 14px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
`;

export const StudentAvatarCircle = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primaryLight || 'rgba(79, 70, 229, 0.1)'};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 700;
  border: 2px solid ${({ theme }) => theme.colors.primary};
`;

export const StudentNameTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const StudentDetailSubtext = styled.span`
  font-size: 0.775rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.35;
`;

export const TocHeader = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 12px;
  padding-left: 8px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 14px;
`;

export const TocList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const TocItemLink = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid ${({ $active, theme }) => ($active ? theme.colors.primary : 'transparent')};
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.primaryLight || 'rgba(79, 70, 229, 0.08)' : 'transparent'};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.text)};
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  font-size: 0.85rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ $active, theme }) =>
      $active
        ? theme.colors.primaryLight || 'rgba(79, 70, 229, 0.08)'
        : theme.colors.primaryLight || 'rgba(79, 70, 229, 0.04)'};
  }
`;

// Right Main Content Panel
export const ReportMainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;
  min-width: 0;

  @media print {
    gap: 24px;
    width: 100%;
  }

  @media (max-width: 768px) {
    gap: 24px;
  }
`;

export const ReportSectionBlock = styled.section`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  scroll-margin-top: 80px;

  @media print {
    box-shadow: none;
    border: 1px solid #e5e7eb;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  @media (max-width: 768px) {
    padding: 18px 16px;
    gap: 16px;
  }
`;

export const SectionHeaderGroup = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.colors.primaryLight || 'rgba(79, 70, 229, 0.15)'};
  padding-bottom: 12px;
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0 4px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SectionSubtitle = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

// Text Card Container (PDF Document Seamless Style without double heavy borders)
export const TextCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-left: 3px solid ${({ theme }) => theme.colors.primary};
  border-top: none;
  border-right: none;
  border-bottom: none;
  border-radius: 0 4px 4px 0;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TextCardTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TextCardBody = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  margin: 0;
`;

// Grid layouts
export const ReportGrid = styled.div<{ $cols?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols || 2}, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Trait Map Table
export const TraitMapTableContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  overflow-x: auto;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const TraitMapHeaderRow = styled.div`
  display: grid;
  grid-template-columns: 50px 180px 180px 1fr 90px 180px;
  min-width: 850px;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-weight: 700;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const TraitMapDataRow = styled.div`
  display: grid;
  grid-template-columns: 50px 180px 180px 1fr 90px 180px;
  min-width: 850px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.85rem;

  &:last-child {
    border-bottom: none;
  }
`;

export const TraitCell = styled.div`
  padding: 10px 14px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
`;

// Reliability Dashboard Metrics
export const ReliabilityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export const ReliabilityMetricCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MetricCode = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
`;

export const MetricValue = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

export const MetricName = styled.div`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const MetricGuidance = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;
`;

// Career Compass Cards
export const CareerCompassGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`;

export const CareerCompassCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const CareerCardTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

export const CareerMetaTagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const CareerMetaTag = styled.span`
  padding: 3px 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const CareerDetailRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 0.85rem;
`;

export const CareerDetailLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const CareerDetailValue = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

// Roadmap Timeline Grid
export const RoadmapPhaseCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const PhaseBadge = styled.div`
  padding: 4px 10px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primaryLight || 'rgba(79, 70, 229, 0.1)'};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.8rem;
  font-weight: 800;
  width: fit-content;
  text-transform: uppercase;
`;

export const BulletList = styled.ul`
  margin: 0;
  padding-left: 18px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
