import React from 'react';
import { RiEditBoxLine } from 'react-icons/ri';
import { Tooltip } from '@/components/Tooltip';
import {
  SynthesisPanel,
  SynthesisPanelHeader,
  SynthesisRowList,
  SynthesisRow,
  SynthesisCodeLabel,
  SynthesisPrintEmpty,
} from '../StudentFormChartPage.styles';
import { AutoSizeTextarea } from './AutoSizeTextarea';
import { useIsReadOnly } from '../ReadOnlyContext';

export interface SynthesisNoteRowDef {
  code: string;
  label?: string;
  placeholder?: string;
}

interface SynthesisNotesPanelProps {
  title?: string;
  rows: SynthesisNoteRowDef[];
  notes: Record<string, string>;
  onChangeNote: (code: string, value: string) => void;
}

export const SynthesisNotesPanel: React.FC<SynthesisNotesPanelProps> = ({
  title = 'Counsellor Synthesis Notes',
  rows,
  notes,
  onChangeNote,
}) => {
  const isReadOnly = useIsReadOnly();
  // A read-only print skips blank note slots — they'd only add "No notes added" lines.
  const hasAnyNote = rows.some(rowDef => (notes[rowDef.code] || '').trim());

  return (
    <SynthesisPanel $readOnly={isReadOnly}>
      <SynthesisPanelHeader $readOnly={isReadOnly}>
        <RiEditBoxLine size={16} />
        {title}
      </SynthesisPanelHeader>

      <SynthesisRowList>
        {rows.map((rowDef, index) => {
          const value = notes[rowDef.code] || '';
          const guidance = rowDef.placeholder || `Enter counsellor synthesis note ${index + 1}...`;
          const placeholder = isReadOnly && !value ? 'No notes added' : guidance;
          return (
            <SynthesisRow key={rowDef.code} $printHidden={isReadOnly && !value.trim()}>
              <Tooltip content={guidance} position="right">
                <SynthesisCodeLabel $readOnly={isReadOnly}>{index + 1}</SynthesisCodeLabel>
              </Tooltip>
              <AutoSizeTextarea
                value={value}
                onChange={e => onChangeNote(rowDef.code, e.target.value)}
                placeholder={placeholder}
                readOnly={isReadOnly}
              />
            </SynthesisRow>
          );
        })}
        {isReadOnly && !hasAnyNote && <SynthesisPrintEmpty>No notes added</SynthesisPrintEmpty>}
      </SynthesisRowList>
    </SynthesisPanel>
  );
};
