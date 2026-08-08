import React from 'react';
import { RiEditBoxLine } from 'react-icons/ri';
import { Tooltip } from '@/components/Tooltip';
import {
  SynthesisPanel,
  SynthesisPanelHeader,
  SynthesisRowList,
  SynthesisRow,
  SynthesisCodeLabel,
} from '../StudentFormChartPage.styles';
import { AutoSizeTextarea } from './AutoSizeTextarea';

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
        {rows.map((rowDef, index) => {
          const value = notes[rowDef.code] || '';
          const placeholder = rowDef.placeholder || `Enter counsellor synthesis note ${index + 1}...`;
          return (
            <SynthesisRow key={rowDef.code}>
              <Tooltip content={placeholder} position="right">
                <SynthesisCodeLabel>{index + 1}</SynthesisCodeLabel>
              </Tooltip>
              <AutoSizeTextarea
                value={value}
                onChange={e => onChangeNote(rowDef.code, e.target.value)}
                placeholder={placeholder}
              />
            </SynthesisRow>
          );
        })}
      </SynthesisRowList>
    </SynthesisPanel>
  );
};
