import styled, { createGlobalStyle } from 'styled-components';

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

// Zero page margin + fixed A4 size: with no margin box left, Chrome has nowhere to draw its
// own header/footer (date, page title, URL, "1/12"), so that stray text never shows up in
// the saved PDF. PrintPage's own padding provides the visual margin instead. A fixed size
// also lets PrintReportContent predict physical page breaks for the TOC/footer numbers.
export const PRINT_PAGE_HEIGHT_MM = 297;
export const PRINT_PAGE_WIDTH_MM = 210;
export const PrintPageSetup = createGlobalStyle`
  @page {
    size: A4;
    margin: 0;
  }
`;

export const PrintRoot = styled.div`
  display: none;
  counter-reset: printPage;

  @media print {
    display: block;
  }

  /* Set only while PrintReportContent measures section heights on screen before printing
     — 100vh there is the browser window, not the A4 page, so it would skew the count. */
  &[data-measuring='true'] > section {
    min-height: 0;
  }
`;

// Deliberately block layout, not flex: Chrome's print engine doesn't fragment a
// display:flex column across a page break — once a page's content (e.g. a long
// "Counsellor's Insights" notes list) grows past one physical page, the overflow gets
// silently clipped instead of flowing onto the next page. Block layout paginates
// correctly; PrintFooter is instead absolutely pinned to the section's bottom edge, and
// PrintReportContent sizes each section to a whole number of sheets so that edge is the
// bottom of the section's last sheet — every footer lands at the same spot on the page.
//
// The padding is the report's page margin (@page margin is 0 — see PrintPageSetup).
// PrintReportContent reads PRINT_PAGE_VERTICAL_PADDING_PX to count physical pages.
const PRINT_PAGE_PADDING_TOP_PX = 48;
// Gap between the footer and the paper's bottom edge.
const PRINT_FOOTER_BOTTOM_PX = 48;
// Room kept clear above that for the footer itself (rule + text + breathing space), so
// page content never runs underneath it.
const PRINT_FOOTER_SPACE_PX = 40;
const PRINT_PAGE_PADDING_BOTTOM_PX = PRINT_FOOTER_BOTTOM_PX + PRINT_FOOTER_SPACE_PX;
const PRINT_PAGE_PADDING_X_PX = 68;
export const PRINT_PAGE_VERTICAL_PADDING_PX = PRINT_PAGE_PADDING_TOP_PX + PRINT_PAGE_PADDING_BOTTOM_PX;

// $singleSheet: a page that's guaranteed to fit on one sheet (the cover) — safe to lay out
// as a fixed-height flex column, which is what lets its footer sit at the bottom edge.
export const PrintPage = styled.section<{ $singleSheet?: boolean }>`
  position: relative;
  background: #ffffff;
  color: #1a1a1a;
  padding: ${PRINT_PAGE_PADDING_TOP_PX}px ${PRINT_PAGE_PADDING_X_PX}px ${PRINT_PAGE_PADDING_BOTTOM_PX}px;
  /* Repeat the top/bottom padding on every physical page a long section spills onto, so
     continuation pages don't print flush against the paper edge (@page margin is 0). */
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
  page-break-after: always;
  break-after: page;
  counter-increment: printPage;
  /* One sheet by default; PrintReportContent raises this to the section's full page span
     once measured, which is what puts PrintFooter at the bottom of its last sheet. */
  min-height: ${PRINT_PAGE_HEIGHT_MM}mm;

  ${({ $singleSheet }) =>
    $singleSheet &&
    `
    display: flex;
    flex-direction: column;
    height: ${PRINT_PAGE_HEIGHT_MM}mm;
    overflow: hidden;
  `}

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

// Pinned to the bottom of its PrintPage (see PrintPage) rather than following the content,
// so it sits at the same height on every page instead of floating mid-page on short ones.
export const PrintFooter = styled.div`
  position: absolute;
  left: ${PRINT_PAGE_PADDING_X_PX}px;
  right: ${PRINT_PAGE_PADDING_X_PX}px;
  bottom: ${PRINT_FOOTER_BOTTOM_PX}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  border-top: 1px solid #cccccc;
  font-size: 9px;
  color: ${PRINT_GREY_TEXT};
`;

// Page number shown in each page's footer — driven by the CSS counter on PrintPage/PrintRoot
// above. PrintReportContent bumps each section's counter-increment by the number of
// physical pages it spans, so this reads the real page number the footer lands on.
export const PrintPageNumber = styled.span`
  &::before {
    content: 'Page ' counter(printPage);
  }
`;

// Cover page — mirrors the "Cover Page.pdf" reference: title + gold rule, kREATE logo
// beside "Career Compass", champion details table, full-width hero image, and the
// disclaimer sitting just above the page footer.
export const PrintCoverBody = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const PrintCoverTitle = styled.h1`
  font-size: 32px;
  font-weight: 800;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: ${PRINT_PURPLE};
  margin: 56px 0 0;
  padding-bottom: 28px;
  border-bottom: 1px solid #d9b95c;
  width: 100%;
`;

export const PrintCoverBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 48px 0;
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
`;

export const PrintCoverLogo = styled.img`
  height: 34px;
  width: auto;
  object-fit: contain;
`;

export const PrintCoverTable = styled.table`
  border-collapse: collapse;
  width: 68%;
  margin-bottom: 44px;

  td {
    border: 1px solid ${PRINT_BORDER};
    padding: 7px 10px;
    font-size: 11px;
    text-align: left;
    background: #f5f5f5;
  }

  td:first-child {
    background: ${PRINT_PURPLE};
    color: #ffffff;
    font-weight: 700;
    width: 37%;
  }
`;

// Full content width. Allowed to shrink (and crop via object-fit) if the cover is ever
// tight on space, so the disclaimer/footer below are never pushed off the sheet.
export const PrintCoverImage = styled.img`
  width: 100%;
  height: auto;
  min-height: 0;
  flex: 0 1 auto;
  object-fit: cover;
`;

export const PrintDisclaimer = styled.p`
  margin: auto 0 16px;
  padding-top: 24px;
  font-size: 10px;
  font-style: italic;
  color: #1a1a1a;
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
