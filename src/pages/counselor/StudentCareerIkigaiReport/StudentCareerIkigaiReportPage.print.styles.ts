import styled, { createGlobalStyle } from 'styled-components';
import coverBackground from '@/assets/report/cover-bg.webp';
import pageBackground from '@/assets/report/page-bg.webp';

// The page artwork used as CSS backgrounds below. PrintRoot is display:none on screen, so
// the browser wouldn't fetch these until the print layout — too late for the snapshot.
// PrintReportContent preloads them up front (see preloadPrintBackgrounds).
export const PRINT_BACKGROUND_IMAGES = [coverBackground, pageBackground];

// Everything in this file is for the printed/"Download as PDF" output only. It is rendered
// as a sibling of the on-screen report tree and stays display:none on screen at all times —
// the screen dashboard (StudentCareerIkigaiReportPage.styles.ts) is untouched by this file.
// Colors are hardcoded (not theme-driven) so the printed page looks the same regardless of
// the viewer's app theme, matching the reference "Design Destiny — kREATE Compass" PDF.

const PRINT_PURPLE = '#5D2384';
const PRINT_PURPLE_LIGHT = '#F3EAFB';
const PRINT_GREY_TEXT = '#6B6B6B';
const PRINT_BORDER = '#B9B9B9';
const PRINT_PURPLE_BRIGHT = '#7C3AED';
const PRINT_PURPLE_BORDER = '#E2D8EE';
const PRINT_GOLD = '#D9B95C';
// Counsellor's Insights palette, from the client's "Champions Profile" reference.
const PRINT_INSIGHT_BLUE = '#1F3A8A';
const PRINT_INSIGHT_ACCENTS = [PRINT_INSIGHT_BLUE, '#0F766E', '#C2620A'];

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
  /* Chrome drops background colors/images when printing unless told otherwise — the page
     artwork, banners and table headers all depend on them. */
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
  /* Anything wider than the sheet makes Chrome shrink EVERY page to fit, which pulls the
     page artwork in off the paper edges. Long unbroken strings (URLs, run-on counsellor
     input) are the usual culprit, so let them wrap anywhere — this also lets auto-layout
     tables narrow such a column instead of growing past the page. */
  overflow-wrap: anywhere;

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
// The header (Design Destiny logo + rule) and footer (rule + kREATE logo) are baked into
// the page artwork (page-bg.webp), so these clear its header rule at ~30mm and its footer
// rule at ~21mm from the bottom edge.
const PRINT_PAGE_PADDING_TOP_PX = 132;
// Gap between the page number and the paper's bottom edge — sits below the artwork's
// footer rule, level with its kREATE logo.
const PRINT_FOOTER_BOTTOM_PX = 38;
// Room kept clear above that for the artwork's footer, so page content never runs
// underneath its rule.
const PRINT_FOOTER_SPACE_PX = 66;
const PRINT_PAGE_PADDING_BOTTOM_PX = PRINT_FOOTER_BOTTOM_PX + PRINT_FOOTER_SPACE_PX;
const PRINT_PAGE_PADDING_X_PX = 68;
export const PRINT_PAGE_VERTICAL_PADDING_PX = PRINT_PAGE_PADDING_TOP_PX + PRINT_PAGE_PADDING_BOTTOM_PX;

// $singleSheet: a page that's guaranteed to fit on one sheet (the cover) — safe to lay out
// as a fixed-height flex column, which is what lets its footer sit at the bottom edge.
export const PrintPage = styled.section<{ $singleSheet?: boolean }>`
  position: relative;
  background: #ffffff url(${pageBackground}) no-repeat left top / ${PRINT_PAGE_WIDTH_MM}mm
    ${PRINT_PAGE_HEIGHT_MM}mm;
  color: #1a1a1a;
  padding: ${PRINT_PAGE_PADDING_TOP_PX}px ${PRINT_PAGE_PADDING_X_PX}px ${PRINT_PAGE_PADDING_BOTTOM_PX}px;
  /* Repeat the top/bottom padding — and the page artwork — on every physical page a long
     section spills onto, so continuation pages get the same header/footer and don't print
     flush against the paper edge (@page margin is 0). */
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
  page-break-after: always;
  break-after: page;
  counter-increment: printPage;
  /* Safety net for any other too-wide content (see PrintRoot): clip it at the sheet edge
     rather than let it trigger shrink-to-fit. "clip" (unlike hidden) makes no scroll
     container, so vertical overflow and page fragmentation are unaffected. */
  overflow-x: clip;
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

// Pinned to the bottom of its PrintPage (see PrintPage) rather than following the content,
// so it sits at the same height on every page instead of floating mid-page on short ones.
// Only the page number — the kREATE logo beside it comes from the page artwork.
export const PrintFooter = styled.div`
  position: absolute;
  left: ${PRINT_PAGE_PADDING_X_PX}px;
  right: ${PRINT_PAGE_PADDING_X_PX}px;
  bottom: ${PRINT_FOOTER_BOTTOM_PX}px;
  display: flex;
  justify-content: flex-end;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  color: ${PRINT_PURPLE};
`;

// Page number shown in each page's footer — driven by the CSS counter on PrintPage/PrintRoot
// above. PrintReportContent bumps each section's counter-increment by the number of
// physical pages it spans, so this reads the real page number the footer lands on.
export const PrintPageNumber = styled.span`
  &::before {
    content: '- ' counter(printPage) ' -';
  }
`;

// Cover page — the client's full-bleed "Pg 1_Cover" artwork (logos, signpost landscape and
// purple wave are all in the image) with the champion details card laid over its blank
// left side.
// The artwork is wider than A4, so `cover` crops its sides — biased right (65%) so the
// signposts stay whole while the kREATE logo keeps a margin on the left.
export const PrintCoverSheet = styled(PrintPage)`
  padding: 0;
  background: #ffffff url(${coverBackground}) no-repeat 65% center / cover;
`;

export const PrintCoverCard = styled.div`
  position: absolute;
  left: 6.5%;
  top: 51%;
  width: 50%;
  padding: 6px 18px;
  background: rgba(255, 255, 255, 0.94);
  border-radius: 10px;
  box-shadow: 0 4px 18px rgba(93, 35, 132, 0.16);
`;

export const PrintCoverRow = styled.div`
  display: grid;
  grid-template-columns: 22px 38% 1fr;
  align-items: center;
  gap: 10px;
  padding: 11px 0;
  font-size: 10.5px;

  & + & {
    border-top: 1px solid #e6e1ec;
  }

  svg {
    width: 18px;
    height: 18px;
    fill: ${PRINT_PURPLE};
  }

  span:nth-of-type(1) {
    padding-right: 10px;
    border-right: 1px solid #e6e1ec;
    color: #333333;
    letter-spacing: 0.4px;
    text-transform: uppercase;
  }

  span:nth-of-type(2) {
    font-weight: 700;
    color: #1a1a1a;
  }
`;

export const PrintCoverConfidential = styled.p`
  position: absolute;
  left: 6.5%;
  top: 70%;
  margin: 0;
  font-size: 9.5px;
  color: #333333;
`;

// Section heading block (used on every content page). A top-level h2 is the purple
// section banner from the client's "Champions Profile" reference, with the subtitle that
// follows it folded into the same banner; the `as="h3"` sub-headings inside a section get a
// gold accent bar instead.
export const PrintSectionSubtitle = styled.p`
  font-size: 11px;
  font-style: italic;
  color: #333333;
  margin: 0 0 10px 0;

  h2 + & {
    margin: 0;
    padding: 0 18px 14px;
    border-radius: 0 0 6px 6px;
    background: linear-gradient(90deg, ${PRINT_PURPLE}, ${PRINT_PURPLE_BRIGHT});
    color: rgba(255, 255, 255, 0.9);
  }
`;

export const PrintSectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 2px 0;

  &:is(h2) {
    margin: 0;
    padding: 14px 18px;
    border-radius: 6px;
    background: linear-gradient(90deg, ${PRINT_PURPLE}, ${PRINT_PURPLE_BRIGHT});
    color: #ffffff;
    font-size: 22px;
  }

  &:is(h2):has(+ ${PrintSectionSubtitle}) {
    padding-bottom: 4px;
    border-radius: 6px 6px 0 0;
  }

  &:is(h3) {
    color: ${PRINT_PURPLE};
    padding-left: 10px;
    border-left: 4px solid ${PRINT_GOLD};
    margin-bottom: 10px;
  }
`;

// Short gold accent under the section banner (echoes the gold rule on the cover logo).
export const PrintSectionRule = styled.hr`
  border: none;
  border-top: 3px solid ${PRINT_GOLD};
  width: 56px;
  margin: 10px 0 16px 0;
`;

export const PrintBody = styled.p`
  font-size: 11px;
  line-height: 1.55;
  color: #1a1a1a;
  margin: 0 0 12px 0;
`;

// TOC page — mirrors the client's "Pg 2_Table Of Contents" reference.
export const PrintTocTitle = styled.h2`
  font-size: 26px;
  font-weight: 800;
  color: ${PRINT_PURPLE};
  margin: 0;
  padding-bottom: 10px;
  border-bottom: 1.5px solid ${PRINT_PURPLE};
`;

export const PrintTocList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 22px;
`;

export const PrintTocRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 7px 12px;
  border: 1px solid ${PRINT_PURPLE_BORDER};
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(93, 35, 132, 0.08);
  font-size: 12px;
  font-weight: 700;
  color: #2b2b2b;

  &:nth-child(odd) {
    background: #f9f6fc;
  }
`;

export const PrintTocIndex = styled.span`
  flex: none;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border: 1px solid #cdbfe0;
  border-radius: 50%;
  background: #ffffff;
  font-size: 9px;
  color: ${PRINT_PURPLE};
`;

// Dotted leader between the section name and its page badge.
export const PrintTocLeader = styled.span`
  flex: 1;
  align-self: flex-end;
  margin-bottom: 9px;
  border-bottom: 2px dotted #cdbfe0;
`;

export const PrintTocPageBadge = styled.span`
  flex: none;
  display: grid;
  place-items: center;
  min-width: 30px;
  height: 26px;
  border-radius: 6px;
  background: ${PRINT_PURPLE};
  color: #ffffff;
  font-size: 10.5px;
`;

// Discover / Decide / Design strip under the TOC.
export const PrintPillars = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 26px 0 20px;
  text-align: center;
`;

export const PrintPillar = styled.div<{ $color: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #333333;

  svg {
    width: 58px;
    height: 58px;
    margin-bottom: 6px;
  }

  strong {
    font-size: 16px;
    font-weight: 800;
    letter-spacing: 0.4px;
    color: ${({ $color }) => $color};
  }
`;

export const PrintDisclaimer = styled.p`
  margin: 0;
  padding-top: 12px;
  border-top: 1px solid #dddddd;
  font-size: 9px;
  font-style: italic;
  text-align: center;
  color: #444444;
  line-height: 1.5;
`;

// Champion's Profile trait cards (Career Style / Personal Signature / Thinking Mode).
export const PrintTraitCard = styled.div`
  border: 1px solid ${PRINT_PURPLE_BORDER};
  border-left: 5px solid ${PRINT_PURPLE_BRIGHT};
  border-radius: 4px;
  padding: 12px 16px;
  margin-bottom: 14px;
  background: #ffffff;
  break-inside: avoid;
  page-break-inside: avoid;

  h3 {
    margin: 0 0 6px 0;
    font-size: 15px;
    font-weight: 800;
    color: #1a1a1a;
  }

  h3 span {
    margin-right: 8px;
    font-size: 9.5px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: ${PRINT_GREY_TEXT};
  }
`;

// Generic formal document table — purple header row with lightly striped body rows.
export const PrintTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
  font-size: 10.5px;

  th,
  td {
    border: 1px solid ${PRINT_PURPLE_BORDER};
    padding: 6px 8px;
    text-align: left;
    vertical-align: top;
  }

  th {
    background: ${PRINT_PURPLE};
    border-color: ${PRINT_PURPLE};
    color: #ffffff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 9.5px;
    letter-spacing: 0.2px;
  }

  tbody tr:nth-child(even) td {
    background: #faf7fd;
  }
`;

// "COUNSELLOR'S INSIGHTS" — one accent-bordered card per note group, cycling blue / teal /
// orange like the client's "Champions Profile" reference.
export const PrintInsightsBlock = styled.div`
  margin-top: 24px;
`;

export const PrintInsightsHeading = styled.h3`
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  color: ${PRINT_INSIGHT_BLUE};
  margin: 0 0 10px 0;
`;

export const PrintInsightGroup = styled.div`
  margin-bottom: 14px;
  padding: 12px 16px;
  border: 1px solid #d8dee9;
  border-left: 4px solid ${PRINT_INSIGHT_ACCENTS[0]};
  border-radius: 4px;
  counter-reset: insight;

  ${PRINT_INSIGHT_ACCENTS.map(
    (color, index) => `
    &:nth-of-type(${PRINT_INSIGHT_ACCENTS.length}n + ${index + 1}) {
      border-left-color: ${color};
    }
  `,
  ).join('')}

  h4 {
    font-size: 12.5px;
    font-weight: 700;
    color: ${PRINT_INSIGHT_BLUE};
    margin: 0 0 8px 0;
  }

  h4::before {
    content: '▶';
    margin-right: 6px;
    font-size: 10px;
  }

  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    font-size: 10.5px;
    line-height: 1.5;
    color: #3f4652;
    margin-bottom: 5px;
  }

  li::before {
    counter-increment: insight;
    content: counter(insight) '. ';
    font-weight: 700;
    color: #1a1a1a;
  }
`;

// Purple banner used for job-role option cards / metric group headers
export const PrintBanner = styled.div`
  background: linear-gradient(90deg, ${PRINT_PURPLE}, ${PRINT_PURPLE_BRIGHT});
  border-radius: 4px 4px 0 0;
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

// Reasoning cards below the Stream Fit / Graduation Pathways tables — one per row, with
// the row's reasoning text (and, for streams, the Career Outlook) pulled out of the table.
export const PrintReasoningHeading = styled.h3`
  font-size: 15px;
  font-weight: 800;
  text-transform: uppercase;
  color: ${PRINT_PURPLE};
  margin: 20px 0 10px 0;
`;

export const PrintReasoningCard = styled.div`
  border: 1px solid ${PRINT_BORDER};
  border-left: 4px solid ${PRINT_PURPLE};
  padding: 10px 14px;
  margin-bottom: 12px;
  break-inside: avoid;
  page-break-inside: avoid;
`;

export const PrintReasoningEyebrow = styled.span`
  font-size: 9.5px;
  font-weight: 700;
  color: ${PRINT_GREY_TEXT};
  margin-right: 6px;
`;

export const PrintReasoningTitle = styled.h4`
  font-size: 13px;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 4px 0;
`;

export const PrintReasoningSubheading = styled.h5`
  font-size: 12px;
  font-weight: 800;
  color: #1a1a1a;
  margin: 10px 0 4px 0;
`;
