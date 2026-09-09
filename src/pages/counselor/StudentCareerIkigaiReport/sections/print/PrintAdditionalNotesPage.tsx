import React from 'react';
import { PrintSectionTitle, PrintSectionRule, PrintBody } from '../../StudentCareerIkigaiReportPage.print.styles';
import { PrintPageChrome } from './PrintPageChrome';
import { NoteEntry } from './PrintInsightsSection';

interface PrintAdditionalNotesPageProps {
  gradeClass: string;
  notes: NoteEntry[];
}

// Fallback page for any counsellor note codes not claimed by one of the PDF-mapped pages
// above (e.g. H-series notes). Only rendered by the orchestrator when notes is non-empty.
export const PrintAdditionalNotesPage: React.FC<PrintAdditionalNotesPageProps> = ({
  gradeClass,
  notes,
}) => (
  <PrintPageChrome gradeClass={gradeClass}>
    <PrintSectionTitle>Additional Notes</PrintSectionTitle>
    <PrintSectionRule />
    {notes.map(n => (
      <PrintBody key={n.code}>
        <strong>{n.code}:</strong> {n.body}
      </PrintBody>
    ))}
  </PrintPageChrome>
);
