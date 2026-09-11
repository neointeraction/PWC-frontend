import styled from 'styled-components';

// Everything in this file is for the printed/"Download as PDF" output only. It is rendered
// as a sibling of the on-screen report tree and stays display:none on screen at all times —
// the screen dashboard (StudentCareerIkigaiReportPage.styles.ts) is untouched by this file.
// Colors are hardcoded (not theme-driven) so the printed page looks the same regardless of
// the viewer's app theme, matching the reference "Design Destiny — kREATE Compass" PDF.

const PRINT_PURPLE = '#5D2384';
const PRINT_PURPLE_LIGHT = '#F3EAFB';
const PRINT_GREY_TEXT = '#6B6B6B';
const PRINT_BORDER = '#B9B9B9';
const PRINT_HEADER_BG = '#EDEDED';

export const PrintRoot = styled.div`
  display: none;
  counter-reset: printPage;

  @media print {
    display: block;
  }
`;

export const PrintPage = styled.section`
  background: #ffffff;
  color: #1a1a1a;
  padding: 32px 40px 40px;
  page-break-after: always;
  break-after: page;
  counter-increment: printPage;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &:last-child {
    page-break-after: auto;
    break-after: auto;
  }
`;

export const PrintRunningHeader = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  font-size: 9px;
  letter-spacing: 0.3px;
  color: ${PRINT_GREY_TEXT};
  text-transform: uppercase;
  border-bottom: 1px solid #333333;
  padding-bottom: 6px;
  margin-bottom: 24px;

  span + span::before {
    content: '|';
    margin-right: 8px;
    color: ${PRINT_BORDER};
  }
`;

export const PrintFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 8px;
  border-top: 1px solid #cccccc;
  font-size: 9px;
  color: ${PRINT_GREY_TEXT};
`;

// Page number shown in each page's footer — driven entirely by the CSS counter on
// PrintPage/PrintRoot above, so it stays correct however many pages the report has.
export const PrintPageNumber = styled.span`
  &::before {
    content: 'Page ' counter(printPage);
  }
`;

// Cover page
export const PrintCoverBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 620px;
  justify-content: center;
  gap: 22px;
`;

export const PrintCoverLogo = styled.img`
  width: 150px;
  height: auto;
  object-fit: contain;
`;

export const PrintCoverImagePlaceholder = styled.div`
  width: 320px;
  height: 190px;
  border: 1px dashed ${PRINT_BORDER};
  border-radius: 4px;
  background: ${PRINT_PURPLE_LIGHT};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${PRINT_GREY_TEXT};
  font-size: 11px;
  font-style: italic;
`;

export const PrintCoverTitle = styled.h1`
  font-size: 34px;
  font-weight: 800;
  color: ${PRINT_PURPLE};
  margin: 0;
  border-bottom: 2px solid #d9b95c;
  padding-bottom: 16px;
  width: 100%;
`;

export const PrintCoverSubtitle = styled.p`
  font-size: 18px;
  font-style: italic;
  color: #333333;
  margin: 0;
`;

export const PrintCoverTable = styled.table`
  border-collapse: collapse;
  width: 420px;

  td {
    border: 1px solid ${PRINT_BORDER};
    padding: 8px 14px;
    font-size: 12px;
    text-align: left;
  }

  td:first-child {
    background: ${PRINT_PURPLE};
    color: #ffffff;
    font-weight: 700;
    width: 40%;
  }
`;

export const PrintDisclaimer = styled.p`
  font-size: 10px;
  font-style: italic;
  color: ${PRINT_GREY_TEXT};
  max-width: 620px;
  line-height: 1.5;
`;

// Section heading block (used on every content page)
export const PrintSectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 2px 0;
`;

export const PrintSectionSubtitle = styled.p`
  font-size: 11px;
  font-style: italic;
  color: #333333;
  margin: 0 0 10px 0;
`;

export const PrintSectionRule = styled.hr`
  border: none;
  border-top: 1px solid #1a1a1a;
  margin: 0 0 16px 0;
`;

export const PrintBody = styled.p`
  font-size: 11px;
  line-height: 1.55;
  color: #1a1a1a;
  margin: 0 0 12px 0;
`;

// TOC page
export const PrintTocList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`;

export const PrintTocRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  border-bottom: 1px dotted ${PRINT_BORDER};
  padding-bottom: 4px;
`;

// Generic formal document table
export const PrintTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
  font-size: 10.5px;

  th,
  td {
    border: 1px solid ${PRINT_BORDER};
    padding: 6px 8px;
    text-align: left;
    vertical-align: top;
  }

  th {
    background: ${PRINT_HEADER_BG};
    font-weight: 700;
    text-transform: uppercase;
    font-size: 9.5px;
    letter-spacing: 0.2px;
  }
`;

export const PrintInsightsBlock = styled.div`
  margin-top: 18px;
`;

export const PrintInsightsHeading = styled.h3`
  font-size: 13px;
  font-weight: 700;
  text-decoration: underline;
  margin: 0 0 10px 0;
`;

export const PrintInsightGroup = styled.div`
  margin-bottom: 12px;

  h4 {
    font-size: 11px;
    font-weight: 700;
    margin: 0 0 4px 0;
  }

  ol {
    margin: 0;
    padding-left: 18px;
    list-style: decimal;
  }

  li {
    font-size: 10.5px;
    line-height: 1.5;
    margin-bottom: 3px;
  }
`;

// Purple banner used for job-role option cards / metric group headers
export const PrintBanner = styled.div`
  background: ${PRINT_PURPLE};
  color: #ffffff;
  font-weight: 700;
  font-size: 11px;
  padding: 6px 10px;
  margin-top: 14px;
`;

export const PrintKeyValueTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 14px;
  font-size: 10.5px;

  td {
    border: 1px solid ${PRINT_BORDER};
    padding: 6px 10px;
    vertical-align: top;
  }

  td:first-child {
    font-weight: 700;
    width: 26%;
    background: ${PRINT_PURPLE_LIGHT};
  }
`;

export const PrintPlaceholderNote = styled.p`
  font-size: 10.5px;
  font-style: italic;
  color: ${PRINT_GREY_TEXT};
  border: 1px dashed ${PRINT_BORDER};
  padding: 10px 12px;
  margin: 6px 0 16px;
`;

export const PrintTwoColGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;
