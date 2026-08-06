import React from 'react';
import { RiEditBoxLine } from 'react-icons/ri';
import {
  SynthesisPanel,
  SynthesisPanelHeader,
  SynthesisRowList,
  SynthesisRow,
  SynthesisCodeLabel,
  SynthesisInput,
} from '../StudentFormChartPage.styles';

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
  return (
    <SynthesisPanel>
      <SynthesisPanelHeader>
        <RiEditBoxLine size={16} />
        {title}
      </SynthesisPanelHeader>

      <SynthesisRowList>
        {rows.map(rowDef => {
          const value = notes[rowDef.code] || '';
          return (
            <SynthesisRow key={rowDef.code}>
              <SynthesisCodeLabel>{rowDef.code}</SynthesisCodeLabel>
              <SynthesisInput
                value={value}
                onChange={e => onChangeNote(rowDef.code, e.target.value)}
                placeholder={rowDef.placeholder || `Enter counsellor synthesis for ${rowDef.code}...`}
              />
            </SynthesisRow>
          );
        })}
      </SynthesisRowList>
    </SynthesisPanel>
  );
};
