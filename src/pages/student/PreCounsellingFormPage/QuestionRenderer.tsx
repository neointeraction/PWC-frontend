import React, { useMemo } from 'react';
import { FormQuestion, McqOption, MatrixOptions, MatrixField } from '@/services/forms.service';
import {
  QuestionBox,
  QuestionTitle,
  OptionList,
  OptionLabel,
  OptionTextGroup,
  OptionTitle,
  CustomTextInput,
  TableInput,
  MarksTableContainer,
  MarksTable,
  SubjectCellText,
  OtherSubjectInput,
  InlineLabelRow,
  ReasonLabel,
  InlineReasonInput,
  RequiredMarker,
  QuestionErrorText,
} from './PreCounsellingFormPage.styles';

// ─────────────────────────────────────────────────────────────
// Generic, questionType-driven renderer shared by the student and parent
// pre-counselling forms. Every question, its section grouping, and its
// options come from the real GET /forms/{formType} template — nothing here
// is hardcoded per-question. See docs/db-design.md "Forms" section for the schema.
// ─────────────────────────────────────────────────────────────

const HELP_TEXT_STYLE: React.CSSProperties = {
  fontStyle: 'italic',
  color: '#64748B',
  fontSize: '13px',
  marginTop: 4,
  marginBottom: 16,
};

// By convention the seeded "Any Other" MCQ choice is identified by its label, not a flag
// on the option itself — allowOtherText/otherTextFieldKey just say the question *has* one.
const isOtherOption = (label: string): boolean => /any other|^other$/i.test(label.trim());

export const normalizeOptions = (options: unknown): McqOption[] => {
  if (!Array.isArray(options)) return [];
  return options.map(o => (typeof o === 'string' ? { value: o, label: o } : o));
};

const MAX_SELECT_WORDS: Record<string, number> = { one: 1, two: 2, three: 3, four: 4, five: 5 };
// Soft UX cap only ("Choose up to TWO") — not enforced by the backend, so best-effort parse.
const extractMaxSelections = (questionText: string): number => {
  const m = questionText.match(/up to (\w+)/i);
  if (!m) return Infinity;
  const word = m[1].toLowerCase();
  if (MAX_SELECT_WORDS[word]) return MAX_SELECT_WORDS[word];
  const n = parseInt(word, 10);
  return Number.isFinite(n) ? n : Infinity;
};

export const sectionHeading = (label: string | null | undefined): string =>
  (label || '').replace(/^Section\s*\d+\s*[—-]\s*/i, '').toUpperCase();

// ─────────────────────────────────────────────────────────────
// TEST-ONLY: random-answer generator for the "Fill Random Data" QA button.
// Not used in the real submit flow — safe to delete along with that button.
// ─────────────────────────────────────────────────────────────
const RANDOM_WORD_BANK = ['Reading', 'Coding', 'Sports', 'Music', 'Art', 'Science', 'Gaming', 'Writing', 'Design', 'Robotics'];
const RANDOM_SENTENCE_BANK = [
  'I enjoy exploring new ideas and solving problems creatively.',
  'This is a randomly generated test answer for QA purposes.',
  'I like working with others and learning new things.',
  'I am still exploring what excites me the most.',
  'I find this topic interesting because it connects to real life.',
];
const randomFrom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomMcqValue = (options: McqOption[]): string => (options.length ? randomFrom(options).value : '');

const randomMatrixFieldValue = (field: MatrixField): unknown => {
  switch (field.type) {
    case 'NUMBER':
      return String(Math.floor(Math.random() * 41) + 60);
    case 'MCQ_SINGLE':
      return randomMcqValue(normalizeOptions(field.options));
    case 'MCQ_MULTI':
      return [randomMcqValue(normalizeOptions(field.options))].filter(Boolean);
    case 'SHORT_TEXT':
    default:
      return randomFrom(RANDOM_WORD_BANK);
  }
};

export const generateRandomAnswer = (question: FormQuestion): unknown => {
  const opts = normalizeOptions(question.options as McqOption[] | string[] | undefined);
  switch (question.questionType) {
    case 'MCQ_SINGLE':
    case 'SCALE': {
      const val = randomMcqValue(opts);
      return question.allowOtherText ? { value: val, other: '' } : val;
    }
    case 'MCQ_MULTI': {
      const cap = Math.max(1, Math.min(extractMaxSelections(question.questionText), opts.length, 2));
      const selected = [...opts]
        .sort(() => Math.random() - 0.5)
        .slice(0, cap)
        .map(o => o.value);
      return question.allowOtherText ? { selected, other: '' } : selected;
    }
    case 'NUMBER':
      return String(Math.floor(Math.random() * 100) + 1);
    case 'MATRIX': {
      const matrix = question.options as MatrixOptions;
      const fields = matrix?.fields ?? [];
      const rows = matrix?.rows;
      const result: Record<string, unknown> = {};
      if (!rows || rows.length === 0) {
        fields.forEach(f => {
          result[f.key] = randomMatrixFieldValue(f);
        });
      } else {
        rows.forEach(row => {
          const rowData: Record<string, unknown> = {};
          fields.forEach(f => {
            rowData[f.key] = randomMatrixFieldValue(f);
          });
          result[row.key] = rowData;
        });
      }
      return result;
    }
    case 'SHORT_TEXT':
    case 'OPEN_TEXT':
    default:
      return randomFrom(RANDOM_SENTENCE_BANK);
  }
};

// Mirrors the backend's isAnswerEmpty (forms.service.ts on PWC-backend) exactly, so a
// question flagged as missing here is guaranteed to also be flagged in the 400
// { missingFieldKeys } response.
export const isAnswerEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value as object).length === 0;
  return false;
};

// ---- Single-select (radio) control — used for top-level MCQ_SINGLE and MATRIX sub-fields ----
const McqSingleControl: React.FC<{
  options: McqOption[];
  allowOtherText?: boolean;
  value: unknown;
  onChange: (v: unknown) => void;
}> = ({ options, allowOtherText, value, onChange }) => {
  const current = allowOtherText ? (value as { value?: string; other?: string } | undefined) : undefined;
  const selected = allowOtherText ? current?.value : (value as string | undefined);
  const otherText = current?.other ?? '';

  const selectValue = (val: string) => {
    if (allowOtherText) onChange({ value: val, other: otherText });
    else onChange(val);
  };
  const setOther = (text: string) => {
    const otherOpt = options.find(o => isOtherOption(o.label));
    onChange({ value: otherOpt?.value ?? selected ?? '', other: text });
  };

  return (
    <OptionList>
      {options.map(o => {
        const isOther = Boolean(allowOtherText) && isOtherOption(o.label);
        return (
          <OptionLabel key={o.value} $selected={selected === o.value} style={isOther ? { alignItems: 'center' } : undefined}>
            <input type="radio" checked={selected === o.value} onChange={() => selectValue(o.value)} />
            {isOther ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <OptionTitle>{o.label} :</OptionTitle>
                <InlineReasonInput placeholder="Specify..." value={otherText} onChange={e => setOther(e.target.value)} />
              </div>
            ) : (
              <OptionTextGroup>
                <OptionTitle>{o.label}</OptionTitle>
              </OptionTextGroup>
            )}
          </OptionLabel>
        );
      })}
    </OptionList>
  );
};

// ---- Multi-select (checkbox) control — used for top-level MCQ_MULTI and MATRIX sub-fields ----
const McqMultiControl: React.FC<{
  options: McqOption[];
  allowOtherText?: boolean;
  maxSelections?: number;
  value: unknown;
  onChange: (v: unknown) => void;
}> = ({ options, allowOtherText, maxSelections, value, onChange }) => {
  const current = allowOtherText ? (value as { selected?: string[]; other?: string } | undefined) : undefined;
  const selectedList: string[] = allowOtherText ? current?.selected ?? [] : (value as string[]) ?? [];
  const otherText = current?.other ?? '';
  const cap = maxSelections ?? Infinity;

  const toggle = (val: string) => {
    let next: string[];
    if (selectedList.includes(val)) {
      next = selectedList.filter(v => v !== val);
    } else {
      if (selectedList.length >= cap) return;
      next = [...selectedList, val];
    }
    if (allowOtherText) onChange({ selected: next, other: otherText });
    else onChange(next);
  };
  const setOther = (text: string) => {
    const otherOpt = options.find(o => isOtherOption(o.label));
    let next = selectedList;
    if (otherOpt && text && !next.includes(otherOpt.value) && next.length < cap) {
      next = [...next, otherOpt.value];
    }
    onChange({ selected: next, other: text });
  };

  return (
    <OptionList>
      {options.map(o => {
        const isOther = Boolean(allowOtherText) && isOtherOption(o.label);
        const checked = selectedList.includes(o.value);
        return (
          <OptionLabel key={o.value} $selected={checked} style={isOther ? { alignItems: 'center' } : undefined}>
            <input type="checkbox" checked={checked} onChange={() => toggle(o.value)} />
            {isOther ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <OptionTitle>{o.label} :</OptionTitle>
                <InlineReasonInput placeholder="Specify..." value={otherText} onChange={e => setOther(e.target.value)} />
              </div>
            ) : (
              <OptionTextGroup>
                <OptionTitle>{o.label}</OptionTitle>
              </OptionTextGroup>
            )}
          </OptionLabel>
        );
      })}
    </OptionList>
  );
};

// Compact MCQ control for a MATRIX table cell alongside other columns (e.g. a Y/N field).
const CompactMcqSelect: React.FC<{
  options: McqOption[];
  multi?: boolean;
  value: unknown;
  onChange: (v: unknown) => void;
}> = ({ options, multi, value, onChange }) => {
  if (multi) {
    const selectedList = (value as string[]) ?? [];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {options.map(o => (
          <label key={o.value} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
            <input
              type="checkbox"
              checked={selectedList.includes(o.value)}
              onChange={() =>
                onChange(
                  selectedList.includes(o.value)
                    ? selectedList.filter(v => v !== o.value)
                    : [...selectedList, o.value]
                )
              }
            />
            {o.label}
          </label>
        ))}
      </div>
    );
  }
  return (
    <select
      value={(value as string) ?? ''}
      onChange={e => onChange(e.target.value)}
      style={{ width: '100%', padding: '6px 8px', borderRadius: 4, border: '1px solid #E2E8F0', fontSize: 13 }}
    >
      <option value="">—</option>
      {options.map(o => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
};

// ---- MATRIX (table/grid) question renderer ----
const MatrixQuestion: React.FC<{
  options: MatrixOptions;
  value: Record<string, unknown> | undefined;
  onChange: (v: Record<string, unknown>) => void;
}> = ({ options, value, onChange }) => {
  const data = value ?? {};
  const rows = options.rows;
  const fields = options.fields;

  const getCell = (rowKey: string | null, fieldKey: string): unknown =>
    rowKey ? (data[rowKey] as Record<string, unknown> | undefined)?.[fieldKey] : data[fieldKey];

  const setCell = (rowKey: string | null, fieldKey: string, val: unknown) => {
    if (rowKey) {
      const rowData = { ...((data[rowKey] as Record<string, unknown>) || {}), [fieldKey]: val };
      onChange({ ...data, [rowKey]: rowData });
    } else {
      onChange({ ...data, [fieldKey]: val });
    }
  };

  // No rows: a small block of standalone fields (e.g. "favourite subject" + "reason").
  if (!rows || rows.length === 0) {
    return (
      <>
        {fields.map(field => (
          <div key={field.key} style={{ marginBottom: 16 }}>
            {field.type === 'SHORT_TEXT' || field.type === 'NUMBER' ? (
              <InlineLabelRow>
                <label>{field.label} :</label>
                <CustomTextInput
                  style={{ flex: 1, minWidth: 260 }}
                  type={field.type === 'NUMBER' ? 'number' : 'text'}
                  value={(getCell(null, field.key) as string) ?? ''}
                  onChange={e => setCell(null, field.key, e.target.value)}
                />
              </InlineLabelRow>
            ) : (
              <>
                <ReasonLabel>{field.label} :</ReasonLabel>
                {field.type === 'MCQ_MULTI' ? (
                  <McqMultiControl
                    options={normalizeOptions(field.options)}
                    allowOtherText={field.allowOtherText}
                    value={getCell(null, field.key)}
                    onChange={v => setCell(null, field.key, v)}
                  />
                ) : (
                  <McqSingleControl
                    options={normalizeOptions(field.options)}
                    allowOtherText={field.allowOtherText}
                    value={getCell(null, field.key)}
                    onChange={v => setCell(null, field.key, v)}
                  />
                )}
              </>
            )}
          </div>
        ))}
      </>
    );
  }

  // A single MCQ_SINGLE field: render its options as grid columns (e.g. a rating scale).
  if (fields.length === 1 && fields[0].type === 'MCQ_SINGLE') {
    const field = fields[0];
    const opts = normalizeOptions(field.options);
    return (
      <MarksTableContainer>
        <MarksTable>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }} />
              {opts.map(o => (
                <th key={o.value} style={{ textAlign: 'center' }}>
                  {o.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.key}>
                <td>
                  <SubjectCellText>{row.label}</SubjectCellText>
                </td>
                {opts.map(o => (
                  <td key={o.value} style={{ textAlign: 'center' }}>
                    <input
                      type="radio"
                      name={row.key}
                      checked={getCell(row.key, field.key) === o.value}
                      onChange={() => setCell(row.key, field.key, o.value)}
                      style={{ accentColor: '#1E40AF', cursor: 'pointer', width: 16, height: 16 }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </MarksTable>
      </MarksTableContainer>
    );
  }

  // General case: one column per field.
  return (
    <MarksTableContainer>
      <MarksTable>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }} />
            {fields.map(f => (
              <th key={f.key} style={{ textAlign: 'center' }}>
                {f.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.key}>
              <td>
                {row.labelEditable ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <SubjectCellText>{row.label}:</SubjectCellText>
                    <OtherSubjectInput
                      placeholder="Specify..."
                      maxLength={50}
                      value={(getCell(row.key, '__label') as string) ?? ''}
                      onChange={e => setCell(row.key, '__label', e.target.value)}
                    />
                  </div>
                ) : (
                  <SubjectCellText>{row.label}</SubjectCellText>
                )}
              </td>
              {fields.map(field => (
                <td key={field.key}>
                  {field.type === 'MCQ_SINGLE' || field.type === 'MCQ_MULTI' ? (
                    <CompactMcqSelect
                      multi={field.type === 'MCQ_MULTI'}
                      options={normalizeOptions(field.options)}
                      value={getCell(row.key, field.key)}
                      onChange={v => setCell(row.key, field.key, v)}
                    />
                  ) : (
                    <TableInput
                      type={field.type === 'NUMBER' ? 'number' : 'text'}
                      placeholder={field.label}
                      maxLength={10}
                      value={(getCell(row.key, field.key) as string) ?? ''}
                      onChange={e => setCell(row.key, field.key, e.target.value)}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </MarksTable>
    </MarksTableContainer>
  );
};

// ---- One question box, dispatched by questionType ----
export const QuestionRenderer: React.FC<{
  question: FormQuestion;
  value: unknown;
  onChange: (v: unknown) => void;
  hasError?: boolean;
}> = ({ question, value, onChange, hasError }) => {
  const opts = useMemo(
    () => normalizeOptions(question.options as McqOption[] | string[] | undefined),
    [question.options]
  );

  return (
    <QuestionBox $hasError={hasError}>
      <QuestionTitle>
        {question.questionCode.replace(/^Q/i, '')}. {question.questionText}
        {question.isRequired && <RequiredMarker>*</RequiredMarker>}
      </QuestionTitle>
      {question.helpText && <p style={HELP_TEXT_STYLE}>{question.helpText}</p>}
      {hasError && <QuestionErrorText>This question is required.</QuestionErrorText>}

      {question.questionType === 'MATRIX' ? (
        <MatrixQuestion
          options={question.options as MatrixOptions}
          value={value as Record<string, unknown> | undefined}
          onChange={onChange}
        />
      ) : question.questionType === 'MCQ_MULTI' ? (
        <McqMultiControl
          options={opts}
          allowOtherText={question.allowOtherText}
          maxSelections={extractMaxSelections(question.questionText)}
          value={value}
          onChange={onChange}
        />
      ) : question.questionType === 'MCQ_SINGLE' || question.questionType === 'SCALE' ? (
        <McqSingleControl options={opts} allowOtherText={question.allowOtherText} value={value} onChange={onChange} />
      ) : (
        <CustomTextInput
          type={question.questionType === 'NUMBER' ? 'number' : 'text'}
          placeholder="Type your answer..."
          value={(value as string) ?? ''}
          onChange={e => onChange(e.target.value)}
        />
      )}
    </QuestionBox>
  );
};
