import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  RiAddLine,
  RiCloseLine,
  RiLock2Line,
} from 'react-icons/ri';
import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import {
  careerService,
  CareerEntryPayload,
  CareerEntryLinkRef,
  CareerEntryExamInput,
  CareerEntryCourseInput,
  CareerEntryInstitutionInput,
  CareerLinkOption,
  DomainEducationEntry,
  EducationLevel,
  EDUCATION_LEVELS,
  EDUCATION_LEVEL_LABEL,
} from '@/services/career.service';
import { Career } from '@/types';
import { useToast } from '@/hooks';
import { getApiErrorMessage } from '@/utils';
import * as S from './JobRoleFormModal.styles';

const GRADE_OPTIONS = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
  { value: 'VERY_HIGH', label: 'Very High' },
];

const LEVEL_OPTIONS = [
  { value: 'UG', label: 'UG' },
  { value: 'PG', label: 'PG' },
];

const GRADE_TO_API: Record<Career['aiResilienceGrading'], 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH'> = {
  Low: 'LOW',
  Medium: 'MEDIUM',
  High: 'HIGH',
  'Very High': 'VERY_HIGH',
};

// Suggested rationale auto-filled into the (editable) comment box when the grade changes.
const AI_RESILIENCE_COMMENTS: Record<string, string> = {
  LOW: 'Primary tasks involve repetitive data processing or routine service easily automated by AI.',
  MEDIUM:
    'AI handles bulk technical production / routine tasks; humans needed for framing, validation & strategy.',
  HIGH: 'Centers on unique human creativity / emotional expression / cultural nuance / high-stakes decision making & accountability / empathy & ethical judgment / physical dexterity in unpredictable environments.',
  VERY_HIGH:
    'Deeply human work — creativity, empathy, ethical judgment and accountability that automation cannot substitute.',
};

// The five NOT NULL columns on the entry (see docs/api-list.md -> POST /career-library)
// are the required ones here; everything else is nullable server-side and stays optional.
// Labels match the field labels so the "fix these first" toast reads sensibly.
const schema = z.object({
  jobRole: z.string().trim().min(2, 'Title must be at least 2 characters').max(120, 'Title is too long (120 characters max)'),
  oneLineDescription: z
    .string()
    .trim()
    .min(10, 'Short description must be at least 10 characters')
    .max(300, 'Short description is too long (300 characters max)'),
  aiResilienceGrade: z.enum(['LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH'], {
    errorMap: () => ({ message: 'Select an AI resilience grade' }),
  }),
  aiResilienceComment: z.string().trim().min(1, 'A rationale for the grade is required'),
  salaryIndiaRangeText: z.string().max(120, 'Salary (India) is too long').optional(),
  salaryGlobalRangeText: z.string().max(120, 'Salary (Global) is too long').optional(),
  topCompanies: z.string().optional(),
  roleOverview: z.string().optional(),
  keySkills: z.string().optional(),
  certificationsStudent: z.string().optional(),
  certificationsUG: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

// Order the "fix these first" message follows — the visual order of the form, so the
// message names the topmost problem rather than whichever key zod happened to report.
const FIELD_ORDER: (keyof FormData)[] = [
  'jobRole',
  'oneLineDescription',
  'aiResilienceGrade',
  'aiResilienceComment',
  'salaryIndiaRangeText',
  'salaryGlobalRangeText',
];

// A row in a linked-reference list: either an existing canonical record (`id`) or a new
// one to find-or-create, in which case `newRecord` holds the complete payload the subform
// collected — every field the API accepts is sent, not just the name.
type NewRecord = CareerEntryExamInput | CareerEntryCourseInput | CareerEntryInstitutionInput;

interface IncludedItem {
  key: string;
  id?: string;
  label: string;
  isNew?: boolean;
  newRecord?: NewRecord;
  level?: 'UG' | 'PG';
  checked: boolean;
}

// Trims to undefined so a blank subform input is omitted rather than sent as '' (which
// the API rejects).
const opt = (v: string): string | undefined => v.trim() || undefined;

const splitList = (s?: string): string[] =>
  (s ?? '')
    .split(/[,\n;]/)
    .map(x => x.trim())
    .filter(Boolean);

const buildLinks = <T extends NewRecord>(items: IncludedItem[]): (CareerEntryLinkRef | T)[] =>
  items
    .filter(i => i.checked && (i.id || i.newRecord))
    .map(i => (i.id ? { id: i.id } : (i.newRecord as T)));

// ============================================================================
// Generic linked-reference section: tick-list + typeahead select-existing +
// expandable add-new subform (subform passed as a render prop, since the fields
// differ per record type).
// ============================================================================
interface LinkedSectionProps {
  title: string;
  items: IncludedItem[];
  onToggle: (key: string) => void;
  onAddNew: (item: IncludedItem) => void;
  addButtonLabel: string;
  emptyHint: string;
  renderSubform: (helpers: {
    addNew: (item: IncludedItem) => void;
    close: () => void;
  }) => React.ReactNode;
}

const LinkedSection: React.FC<LinkedSectionProps> = ({
  title,
  items,
  onToggle,
  onAddNew,
  addButtonLabel,
  emptyHint,
  renderSubform,
}) => {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <S.SectionBox>
      <S.SectionTitle>{title}</S.SectionTitle>

      <S.FieldLabel>Included with this role (tick / untick):</S.FieldLabel>
      {items.length === 0 ? (
        <S.EmptyListHint>{emptyHint}</S.EmptyListHint>
      ) : (
        <S.ExistingEntriesList>
          {items.map(item => (
            <S.EntryRow key={item.key} $checked={item.checked}>
              <S.EntryCheckboxWrapper>
                <Checkbox checked={item.checked} onChange={() => onToggle(item.key)} />
                <span>{item.label}</span>
                {item.isNew ? (
                  <S.NewTag>new</S.NewTag>
                ) : (
                  <S.LinkedTag>(existing library record)</S.LinkedTag>
                )}
              </S.EntryCheckboxWrapper>
            </S.EntryRow>
          ))}
        </S.ExistingEntriesList>
      )}

      {!isAdding ? (
        <S.AddRowWrapper>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            leftIcon={<RiAddLine size={14} />}
            onClick={() => setIsAdding(true)}
          >
            {addButtonLabel}
          </Button>
        </S.AddRowWrapper>
      ) : (
        renderSubform({
          addNew: item => {
            onAddNew(item);
            setIsAdding(false);
          },
          close: () => setIsAdding(false),
        })
      )}
    </S.SectionBox>
  );
};


// ---- Education Path -------------------------------------------------------------
// The domain's education entries, ticked per job role. Anything added here is saved to
// the domain library (POST /career-taxonomy/domains/{id}/education), so every future
// role in the domain inherits it — hence the wording on the add button.
// The domain-scoped list is only pulled in edit mode (`pullDomainEntries`): a new role
// starts with an empty path and picks its own entries by search, the same way the
// exam / course / institution sections work.


// Validation for a new education-path entry. Returns the problem, or null when valid.
// Pure and exported so the edge cases can be exercised without rendering the form.
export const validateEducationEntry = (
  input: { level: EducationLevel; programme: string; description?: string },
  existing: { level: EducationLevel; programme: string }[]
): string | null => {
  const programme = (input.programme ?? '').trim();
  if (!programme) return 'Enter the programme / requirement name.';
  if (programme.length > 200) return 'The programme name is too long (200 characters max).';
  if (!EDUCATION_LEVELS.includes(input.level)) return 'Select a level for this entry.';
  // The backend rejects a duplicate level+programme with a 409; catching it here names
  // the clash instead of surfacing a raw conflict error.
  const clash = existing.some(
    e =>
      e.level === input.level &&
      e.programme.trim().toLowerCase() === programme.toLowerCase()
  );
  if (clash) return `"${programme}" is already in the education path at this level.`;
  if ((input.description ?? '').trim().length > 1000) {
    return 'The description is too long (1000 characters max).';
  }
  return null;
};

const EducationPathSection: React.FC<{
  domainId?: string;
  pullDomainEntries: boolean;
  entries: DomainEducationEntry[];
  checkedIds: Set<string>;
  onToggle: (id: string) => void;
  onAdd: (entry: DomainEducationEntry) => void;
  onEntriesLoaded: (entries: DomainEducationEntry[]) => void;
}> = ({ domainId, pullDomainEntries, entries, checkedIds, onToggle, onAdd, onEntriesLoaded }) => {
  const toast = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [level, setLevel] = useState<EducationLevel>('GRADUATE');
  const [programme, setProgramme] = useState('');
  const [description, setDescription] = useState('');

  // Entries already linked to job roles in this domain — the "pulled from this Domain"
  // list. Approved rows only; the endpoint defaults to that.
  const { data: domainEntries, isLoading } = useQuery({
    queryKey: ['education-entries', 'domain', domainId],
    queryFn: () => careerService.listEducationEntries({ domainId }),
    enabled: Boolean(domainId) && pullDomainEntries,
    staleTime: 60_000,
  });

  useEffect(() => {
    if (domainEntries) onEntriesLoaded(domainEntries);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domainEntries]);

  const ordered = useMemo(
    () =>
      [...entries].sort((a, b) => {
        const byLevel = EDUCATION_LEVELS.indexOf(a.level) - EDUCATION_LEVELS.indexOf(b.level);
        return byLevel !== 0 ? byLevel : a.programme.localeCompare(b.programme);
      }),
    [entries]
  );

  // Only rows that actually came back from the domain-scoped fetch are "pulled from this
  // Domain"; anything added via search or created here is a plain addition.
  const pulledIds = useMemo(
    () => new Set((domainEntries ?? []).map(e => e.id)),
    [domainEntries]
  );

  const resetForm = () => {
    setLevel('GRADUATE');
    setProgramme('');
    setDescription('');
    setIsAdding(false);
  };

  const addMutation = useMutation({
    mutationFn: () =>
      careerService.createEducationEntry({
        level,
        programme: programme.trim(),
        description: description.trim() || undefined,
      }),
    onSuccess: entry => {
      onAdd(entry);
      resetForm();
      toast.success('Education Entry Added', `"${entry.programme}" was added to the education path.`);
    },
    onError: err => {
      toast.error(
        'Could Not Add Entry',
        getApiErrorMessage(err, 'Failed to save the education entry.')
      );
    },
  });

  const handleAdd = () => {
    const problem = validateEducationEntry({ level, programme, description }, entries);
    if (problem) {
      toast.error('Check the entry', problem);
      return;
    }
    addMutation.mutate();
  };

  return (
    <S.SectionBox>
      <S.SectionTitle>Education Path</S.SectionTitle>

      {!domainId ? (
        <S.EmptyListHint>Select a domain first to see its education path.</S.EmptyListHint>
      ) : (
        <>
          {pullDomainEntries && (
            <S.FieldLabel>
              Existing entries pulled from this Domain (Tick / Untick to include):
            </S.FieldLabel>
          )}

          {isLoading ? (
            <S.EmptyListHint>Loading the education path…</S.EmptyListHint>
          ) : ordered.length === 0 ? (
            pullDomainEntries ? (
              <S.EmptyListHint>
                No education entries linked yet. Add a new entry below.
              </S.EmptyListHint>
            ) : null
          ) : (
            <S.ExistingEntriesList>
              {ordered.map(entry => (
                <S.EducationEntryRow key={entry.id}>
                  <Checkbox checked={checkedIds.has(entry.id)} onChange={() => onToggle(entry.id)} />
                  <S.EducationEntryText>
                    <S.EducationLevelName>
                      {EDUCATION_LEVEL_LABEL[entry.level]}:
                    </S.EducationLevelName>{' '}
                    {entry.programme}
                    {pulledIds.has(entry.id) ? (
                      <S.LinkedTag>(auto-pulled from Domain library)</S.LinkedTag>
                    ) : (
                      <S.NewTag>added</S.NewTag>
                    )}
                  </S.EducationEntryText>
                </S.EducationEntryRow>
              ))}
            </S.ExistingEntriesList>
          )}

          {!isAdding ? (
            <S.AddRowWrapper>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                leftIcon={<RiAddLine size={14} />}
                onClick={() => setIsAdding(true)}
              >
                Add New Education Entry
              </Button>
            </S.AddRowWrapper>
          ) : (
            <S.ExpandedFormCard>
              <SubformHeader label="ADD NEW EDUCATION ENTRY" onClose={resetForm} />

              <S.FieldGroup>
                <S.FieldLabel>Level</S.FieldLabel>
                <Select
                  value={level}
                  onChange={e => setLevel(e.target.value as EducationLevel)}
                  options={EDUCATION_LEVELS.map(value => ({
                    value,
                    label: EDUCATION_LEVEL_LABEL[value],
                  }))}
                />
              </S.FieldGroup>

              <S.FieldGroup>
                <S.FieldLabel>Programme / Requirement Name</S.FieldLabel>
                <Input
                  placeholder="e.g. B.Des – Communication Design"
                  value={programme}
                  onChange={e => setProgramme(e.target.value)}
                />
              </S.FieldGroup>

              <S.FieldGroup>
                <S.FieldLabel>Description / Details</S.FieldLabel>
                <S.StyledTextarea
                  placeholder="Eligibility, focus area, notes…"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </S.FieldGroup>

              <S.FormActions>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={resetForm}
                  disabled={addMutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={handleAdd}
                  isLoading={addMutation.isPending}
                >
                  Add to Education Path
                </Button>
              </S.FormActions>
            </S.ExpandedFormCard>
          )}
        </>
      )}
    </S.SectionBox>
  );
};

// ---- Add-new subforms (fields per record type; only name/level/city/state persist) ----

const SubformHeader: React.FC<{ label: string; onClose: () => void }> = ({ label, onClose }) => (
  <S.ExpandedFormTitle>
    <span>+ {label}</span>
    <S.CloseFormButton type="button" onClick={onClose} aria-label="Close">
      <RiCloseLine size={18} />
    </S.CloseFormButton>
  </S.ExpandedFormTitle>
);

const ExamSubform: React.FC<{ addNew: (i: IncludedItem) => void; close: () => void }> = ({
  addNew,
  close,
}) => {
  const [abbr, setAbbr] = useState('');
  const [name, setName] = useState('');
  const [level, setLevel] = useState<'UG' | 'PG'>('UG');
  const [conductedBy, setConductedBy] = useState('');
  const [mode, setMode] = useState('Online / CBT');
  const [freq, setFreq] = useState('');
  const [req12th, setReq12th] = useState('');
  const [applicableFor, setApplicableFor] = useState('');
  const [examWindow, setExamWindow] = useState('');
  const [website, setWebsite] = useState('');

  const canAdd = name.trim() || abbr.trim();
  const submit = () => {
    if (!canAdd) return;
    // Canonical `name` is the abbreviation, `fullForm` the expansion — that pair is the
    // uniqueness key, so sending the long title as `name` would duplicate a seeded row.
    const canonicalName = (abbr.trim() || name.trim()).trim();
    const label = `${abbr.trim() ? `${abbr.trim()} — ` : ''}${name.trim() || abbr.trim()}${
      conductedBy.trim() ? ` (${conductedBy.trim()})` : ''
    }`;
    addNew({
      key: `new-exam-${Date.now()}`,
      isNew: true,
      label,
      level,
      checked: true,
      newRecord: {
        name: canonicalName,
        level,
        fullForm: abbr.trim() ? opt(name) : undefined,
        conductingBody: opt(conductedBy),
        examMode: opt(mode),
        frequency: opt(freq),
        subjectRequirements12th: opt(req12th),
        applicableFor: opt(applicableFor),
        applicationWindow: opt(examWindow),
        officialWebsite: opt(website),
      },
    });
  };

  return (
    <S.ExpandedFormCard>
      <SubformHeader label="ADD NEW EXAM" onClose={close} />
      <S.FormGrid $columns={2}>
        <Input label="Exam Abbreviation" placeholder="e.g. NID DAT" value={abbr} onChange={e => setAbbr(e.target.value)} />
        <Input label="Exam Name *" placeholder="e.g. National Institute of Design Admission Test" value={name} onChange={e => setName(e.target.value)} />
        <Select label="Level" value={level} onChange={e => setLevel(e.target.value as 'UG' | 'PG')} options={LEVEL_OPTIONS} />
        <Input label="Conducted By / Level" placeholder="e.g. NID · National" value={conductedBy} onChange={e => setConductedBy(e.target.value)} />
        <Select
          label="Mode"
          value={mode}
          onChange={e => setMode(e.target.value)}
          options={[
            { value: 'Online / CBT', label: 'Online / CBT' },
            { value: 'Offline / Paper', label: 'Offline / Paper' },
            { value: 'Hybrid', label: 'Hybrid' },
          ]}
        />
        <Input label="Frequency" placeholder="e.g. Once a year" value={freq} onChange={e => setFreq(e.target.value)} />
        <Input label="12th Requirement" placeholder="e.g. Any stream" value={req12th} onChange={e => setReq12th(e.target.value)} />
        <Input label="Exam Window" placeholder="e.g. Jan–Feb window" value={examWindow} onChange={e => setExamWindow(e.target.value)} />
      </S.FormGrid>
      <Input label="Applicable For" placeholder="Programmes this exam admits into…" value={applicableFor} onChange={e => setApplicableFor(e.target.value)} />
      <Input label="Official Website" placeholder="https://…" value={website} onChange={e => setWebsite(e.target.value)} />
      <S.FormActions>
        <Button type="button" variant="secondary" size="sm" onClick={close}>
          Cancel
        </Button>
        <Button type="button" variant="primary" size="sm" disabled={!canAdd} onClick={submit}>
          Add Exam
        </Button>
      </S.FormActions>
    </S.ExpandedFormCard>
  );
};

const CourseSubform: React.FC<{ addNew: (i: IncludedItem) => void; close: () => void }> = ({
  addNew,
  close,
}) => {
  const [abbr, setAbbr] = useState('');
  const [name, setName] = useState('');
  const [req12th, setReq12th] = useState('');
  const [exams, setExams] = useState('');
  const [programs, setPrograms] = useState('');
  const [colleges, setColleges] = useState('');
  const [furtherStudy, setFurtherStudy] = useState('');

  const canAdd = name.trim() || abbr.trim();
  const submit = () => {
    if (!canAdd) return;
    // Same abbreviation-as-`name` convention as exams ("B.Des" + "Bachelor of Design").
    const canonicalName = (abbr.trim() || name.trim()).trim();
    const label = `${abbr.trim() ? `${abbr.trim()} — ` : ''}${name.trim() || abbr.trim()}`;
    addNew({
      key: `new-course-${Date.now()}`,
      isNew: true,
      label,
      checked: true,
      newRecord: {
        name: canonicalName,
        fullForm: abbr.trim() ? opt(name) : undefined,
        stream12thRequirements: opt(req12th),
        relevantEntranceExams: opt(exams),
        programmesOffered: opt(programs),
        topColleges: opt(colleges),
        furtherStudyOptions: opt(furtherStudy),
      },
    });
  };

  return (
    <S.ExpandedFormCard>
      <SubformHeader label="ADD NEW COURSE" onClose={close} />
      <S.FormGrid $columns={2}>
        <Input label="Course Abbreviation" placeholder="e.g. B.Des" value={abbr} onChange={e => setAbbr(e.target.value)} />
        <Input label="Course Name *" placeholder="e.g. Bachelor of Design" value={name} onChange={e => setName(e.target.value)} />
      </S.FormGrid>
      <Input label="12th Stream Requirement" placeholder="e.g. Any stream, min 50%" value={req12th} onChange={e => setReq12th(e.target.value)} />
      <Input label="Relevant Entrance Exams" placeholder="e.g. NID DAT, UCEED" value={exams} onChange={e => setExams(e.target.value)} />
      <S.FieldGroup>
        <S.FieldLabel>Programs Offered</S.FieldLabel>
        <S.StyledTextarea placeholder="List specialisations offered…" value={programs} onChange={e => setPrograms(e.target.value)} />
      </S.FieldGroup>
      <S.FieldGroup>
        <S.FieldLabel>Top Colleges</S.FieldLabel>
        <S.StyledTextarea placeholder="List leading institutions…" value={colleges} onChange={e => setColleges(e.target.value)} />
      </S.FieldGroup>
      <Input label="Further Study Options" placeholder="e.g. M.Des, PhD" value={furtherStudy} onChange={e => setFurtherStudy(e.target.value)} />
      <S.FormActions>
        <Button type="button" variant="secondary" size="sm" onClick={close}>
          Cancel
        </Button>
        <Button type="button" variant="primary" size="sm" disabled={!canAdd} onClick={submit}>
          Add Course
        </Button>
      </S.FormActions>
    </S.ExpandedFormCard>
  );
};

const InstitutionSubform: React.FC<{ addNew: (i: IncludedItem) => void; close: () => void }> = ({
  addNew,
  close,
}) => {
  const [abbr, setAbbr] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [examReq, setExamReq] = useState('');
  const [programs, setPrograms] = useState('');
  const [ranking, setRanking] = useState('');
  const [website, setWebsite] = useState('');

  const canAdd = name.trim() || abbr.trim();
  const submit = () => {
    if (!canAdd) return;
    const canonicalName = (name.trim() || abbr.trim()).trim();
    const [city, ...restState] = location
      .split(',')
      .map(x => x.trim())
      .filter(Boolean);
    const label = `${abbr.trim() ? `${abbr.trim()} — ` : ''}${name.trim() || abbr.trim()}${
      location.trim() ? `, ${location.trim()}` : ''
    }`;
    addNew({
      key: `new-inst-${Date.now()}`,
      isNew: true,
      label,
      checked: true,
      // Inverted from exams/courses: `name` is the full institution name (unique on its
      // own) and the abbreviation goes in `shortName`.
      newRecord: {
        name: canonicalName,
        shortName: opt(abbr),
        city: city || undefined,
        state: restState.length ? restState.join(', ') : undefined,
        entranceExamsRequired: opt(examReq),
        programmesOffered: opt(programs),
        ranking: opt(ranking),
        website: opt(website),
      },
    });
  };

  return (
    <S.ExpandedFormCard>
      <SubformHeader label="ADD NEW INSTITUTION" onClose={close} />
      <S.FormGrid $columns={2}>
        <Input label="Institution Abbreviation" placeholder="e.g. NIFT" value={abbr} onChange={e => setAbbr(e.target.value)} />
        <Input label="Institution Name *" placeholder="e.g. National Institute of Fashion Technology" value={name} onChange={e => setName(e.target.value)} />
        <Input label="Location" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
        <Input label="Entrance Exam Required" placeholder="e.g. NID DAT" value={examReq} onChange={e => setExamReq(e.target.value)} />
      </S.FormGrid>
      <S.FieldGroup>
        <S.FieldLabel>Programs Offered</S.FieldLabel>
        <S.StyledTextarea placeholder="List programmes…" value={programs} onChange={e => setPrograms(e.target.value)} />
      </S.FieldGroup>
      <S.FormGrid $columns={2}>
        <Input label="Ranking / Recognition" placeholder="e.g. #1 NIRF Design" value={ranking} onChange={e => setRanking(e.target.value)} />
        <Input label="Official Website" placeholder="https://…" value={website} onChange={e => setWebsite(e.target.value)} />
      </S.FormGrid>
      <S.FormActions>
        <Button type="button" variant="secondary" size="sm" onClick={close}>
          Cancel
        </Button>
        <Button type="button" variant="primary" size="sm" disabled={!canAdd} onClick={submit}>
          Add Institution
        </Button>
      </S.FormActions>
    </S.ExpandedFormCard>
  );
};

// ============================================================================

interface JobRoleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Receives the saved entry so the list can show it immediately instead of waiting on
  // the refetch that follows.
  onSaved: (saved: Career, savedMode: 'add' | 'edit') => void;
  mode: 'add' | 'edit';
  entity?: Career;
  domainId?: string; // required for add
  domainLabel?: string;
  clusterLabel?: string;
  industryLabel?: string;
}

export const JobRoleFormModal: React.FC<JobRoleFormModalProps> = ({
  isOpen,
  onClose,
  onSaved,
  mode,
  entity,
  domainId,
  domainLabel,
  clusterLabel,
  industryLabel,
}) => {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      aiResilienceGrade: 'MEDIUM',
      aiResilienceComment: AI_RESILIENCE_COMMENTS.MEDIUM,
    },
  });

  const [exams, setExams] = useState<IncludedItem[]>([]);
  const [courses, setCourses] = useState<IncludedItem[]>([]);
  const [institutions, setInstitutions] = useState<IncludedItem[]>([]);
  // Domain education entries ticked for this role. A new role starts empty and picks
  // its own entries by search; an edit is re-seeded from the entry's own links.
  const [educationIds, setEducationIds] = useState<Set<string>>(new Set());
  const [domainEducation, setDomainEducation] = useState<DomainEducationEntry[]>([]);

  const toggleEducation = (id: string) =>
    setEducationIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  // Hierarchy shown read-only. Add mode reads it from the browsing context; edit mode
  // reads it off the entry. It is never editable once entered.
  const cluster = mode === 'edit' ? entity?.careerCluster : clusterLabel;
  const industry = mode === 'edit' ? entity?.industry : industryLabel;
  const domain = mode === 'edit' ? entity?.domain : domainLabel;
  const effectiveDomainId = mode === 'edit' ? entity?.domainId : domainId;

  // On edit, pull the entry's currently-linked canonical records to pre-tick the lists.
  const { data: detail } = useQuery({
    queryKey: ['career-entry-detail', entity?.id],
    queryFn: () => careerService.getById(entity!.id),
    enabled: isOpen && mode === 'edit' && !!entity?.id,
    staleTime: 30_000,
  });

  // Prefill values for a role. `entity` comes from the list; once the detail fetch lands
  // we re-apply from it (see below) so nothing the list response trimmed is lost.
  const toFormValues = (c: Career): FormData => ({
    jobRole: c.jobRole,
    oneLineDescription: c.oneLineDescription,
    aiResilienceGrade: GRADE_TO_API[c.aiResilienceGrading] ?? 'MEDIUM',
    aiResilienceComment:
      c.aiResilienceComment || AI_RESILIENCE_COMMENTS[GRADE_TO_API[c.aiResilienceGrading]] || '',
    salaryIndiaRangeText: c.approxSalaryRangeIndia || '',
    salaryGlobalRangeText: c.globalSalaryRange || '',
    topCompanies: (c.topCompaniesRecruiting || []).join(', '),
    roleOverview: c.roleOverview || '',
    keySkills: (c.keySkills || []).join('\n'),
    certificationsStudent: c.certificationsStudents || '',
    certificationsUG: c.certificationsUG || '',
  });

  useEffect(() => {
    if (!isOpen) return;
    // Linked lists always start empty: in edit mode they are re-seeded from the detail
    // fetch below. Leaving the previous role's links in state would otherwise carry them
    // onto the next role opened, and PATCH replaces whatever array it is given.
    setExams([]);
    setCourses([]);
    setInstitutions([]);
    setEducationIds(new Set());
    setDomainEducation([]);
    if (mode === 'edit' && entity) {
      reset(toFormValues(entity));
    } else {
      reset({
        jobRole: '',
        oneLineDescription: '',
        aiResilienceGrade: 'MEDIUM',
        aiResilienceComment: AI_RESILIENCE_COMMENTS.MEDIUM,
        salaryIndiaRangeText: '',
        salaryGlobalRangeText: '',
        topCompanies: '',
        roleOverview: '',
        keySkills: '',
        certificationsStudent: '',
        certificationsUG: '',
      });
    }
  }, [isOpen, mode, entity, reset]);

  // Seed the linked lists once the entry detail arrives (edit mode).
  useEffect(() => {
    if (!isOpen || mode !== 'edit' || !detail) return;
    const toItems = (opts: CareerLinkOption[]): IncludedItem[] =>
      opts.map(o => ({ key: `existing-${o.id}`, id: o.id, label: o.label, level: o.level, checked: true }));
    setExams(toItems(detail.linkedEntranceExams));
    setCourses(toItems(detail.linkedCourses));
    setInstitutions(toItems(detail.linkedInstitutions));
    setEducationIds(new Set(detail.linkedEducationEntries.map(e => e.id)));
    setDomainEducation(prev => {
      const merged = [...prev];
      for (const e of detail.linkedEducationEntries) {
        if (!merged.some(m => m.id === e.id)) merged.push(e);
      }
      return merged;
    });
    // The detail response is the authoritative record; re-apply it over the list-derived
    // prefill, but never on top of edits the user has already started making.
    if (!isDirty) reset(toFormValues(detail.career));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, mode, detail]);

  // Edit mode replaces the entry's links with whatever is in state, so saving before the
  // detail fetch resolves would wipe every link the role already has.
  const linksReady = mode !== 'edit' || Boolean(detail);

  const toggle = (setter: React.Dispatch<React.SetStateAction<IncludedItem[]>>) => (key: string) =>
    setter(prev => prev.map(i => (i.key === key ? { ...i, checked: !i.checked } : i)));

  const addNew = (setter: React.Dispatch<React.SetStateAction<IncludedItem[]>>) => (item: IncludedItem) =>
    setter(prev => [...prev, item]);

  // On PATCH, omitting a field leaves the old value and '' is rejected — so an emptied
  // input has to be sent as an explicit `null` (lists as `[]`) for the clear to stick.
  // On create there is nothing to clear, so blanks are simply omitted.
  const clearing = mode === 'edit';
  // The free-text qualification columns are no longer typed on this form — the domain
  // education path is the input. They're still NOT NULL / rendered on the career detail
  // tab, so a new role derives them from whatever it ticked: programmes become the
  // recommended-subjects line, their descriptions the explanation/defined-pathway note.
  const tickedEducation = domainEducation.filter(e => educationIds.has(e.id));
  const programmesAt = (level: EducationLevel) =>
    tickedEducation
      .filter(e => e.level === level)
      .map(e => e.programme.trim())
      .filter(Boolean)
      .join(', ');
  const notesAt = (level: EducationLevel) =>
    tickedEducation
      .filter(e => e.level === level)
      .map(e => (e.description || '').trim())
      .filter(Boolean)
      .join(' ');

  const optText = (v?: string) => v?.trim() || (clearing ? null : undefined);
  const optList = (v?: string) => {
    const items = splitList(v);
    return items.length ? items : clearing ? [] : undefined;
  };

  // Live gate on Save. These are exactly the rules `onSubmit` enforces, but evaluated as
  // the user types so the button is disabled rather than rejecting the click with a toast.
  // The zod schema itself is re-run over the watched values, so this can never drift from
  // the resolver's own verdict on the same form.
  const watched = watch();
  const parsed = schema.safeParse(watched);
  const requiredFilled = parsed.success;
  // Names the specific unmet rule (e.g. "Short Description must be at least 10
  // characters") rather than a generic "fill in the required fields" — the generic
  // version left users unable to tell which field, or why, was still blocking Save.
  const firstZodIssueMessage = !parsed.success
    ? FIELD_ORDER.map(f => parsed.error.issues.find(i => i.path[0] === f)?.message).find(Boolean) ??
      parsed.error.issues[0]?.message
    : undefined;
  const saveBlockedReason = !linksReady
    ? "Loading this role's linked references..."
    : !requiredFilled
      ? firstZodIssueMessage
      : mode === 'add' && !domainId
        ? 'Open a domain first, then add a job role within it.'
        : undefined;

  // Education Path / Entrance Exams / Courses / Institutions are optional on this form
  // now, so on create an untouched section's list stays `[]` in local state — sending
  // that as `"entranceExams": []` etc. is noise the API doesn't need (omitting the key
  // is equivalent to an empty list on create). On edit, though, an emptied list is a
  // real edit — PATCH replaces the entry's links with whatever array it's given, so an
  // intentionally-unticked section still has to send `[]` to clear it.
  const linkField = <T,>(items: T[]): T[] | undefined =>
    mode === 'add' && items.length === 0 ? undefined : items;

  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      const base: Omit<CareerEntryPayload, 'domainId' | 'qualification10th12th'> = {
        jobRole: data.jobRole.trim(),
        aiResilienceGrade: data.aiResilienceGrade,
        aiResilienceComment: data.aiResilienceComment.trim(),
        oneLineDescription: data.oneLineDescription.trim(),
        roleOverview: optText(data.roleOverview),
        keySkills: optList(data.keySkills),
        topCompanies: optList(data.topCompanies),
        salaryIndiaRangeText: optText(data.salaryIndiaRangeText),
        salaryGlobalRangeText: optText(data.salaryGlobalRangeText),
        // Clear the imported numeric columns — the mapper prefers them over the text
        // range, so leaving them set makes an edited salary look like it never saved.
        // Only meaningful on edit; a new entry has nothing to clear, so the keys are
        // left out of the create payload entirely rather than sent as `null`.
        ...(clearing
          ? {
              salaryIndiaMinLPA: null,
              salaryIndiaMaxLPA: null,
              salaryGlobalMinUSD: null,
              salaryGlobalMaxUSD: null,
            }
          : {}),
        certificationsStudent: optList(data.certificationsStudent),
        certificationsUG: optList(data.certificationsUG),
        entranceExams: linkField(buildLinks<CareerEntryExamInput>(exams)),
        courses: linkField(buildLinks<CareerEntryCourseInput>(courses)),
        institutions: linkField(buildLinks<CareerEntryInstitutionInput>(institutions)),
        educationEntries: linkField(Array.from(educationIds).map(id => ({ id }))),
      };
      if (mode === 'add') {
        // No Status field on the form — a role added by a super admin goes live at once.
        return careerService.createEntry({
          ...base,
          domainId: domainId!,
          status: 'ACTIVE',
          qualification10th12th: optText(programmesAt('CLASS_10_PLUS_2')) || undefined,
          qualification10th12thExplanation: optText(notesAt('CLASS_10_PLUS_2')),
          qualificationGraduation: optText(programmesAt('GRADUATE')),
          qualificationGraduationDefined: optText(notesAt('GRADUATE')),
          qualificationPG: optText(programmesAt('POST_GRADUATE')),
          qualificationPGDefined: optText(notesAt('POST_GRADUATE')),
        });
      }
      // Edit deliberately omits them: PATCH leaves an omitted scalar alone, and the
      // imported roles carry descriptive prose a comma-joined list would destroy.
      return careerService.updateEntry(entity!.id, base);
    },
    onSuccess: saved => {
      toast.success(
        `Job Role ${mode === 'add' ? 'Created' : 'Updated'}`,
        `${saved.jobRole} was saved successfully.`
      );
      onSaved(saved, mode);
      onClose();
    },
    onError: (err: unknown) => {
      toast.error('Error', getApiErrorMessage(err, 'Failed to save job role.'));
    },
  });

  const onSubmit = (data: FormData) => {
    if (mode === 'add' && !domainId) {
      toast.error('Missing domain', 'Open a domain first, then add a job role within it.');
      return;
    }
    mutation.mutate(data);
  };

  // The form is taller than the modal's scroll area and two of its required fields (the
  // grade select and the auto-filled rationale) can't take focus, so react-hook-form's
  // built-in focus-the-first-error does nothing for them and Save looks like a no-op.
  // Name the topmost problem in a toast and scroll its field into view instead.
  const onInvalid = (formErrors: typeof errors) => {
    const firstField =
      FIELD_ORDER.find(f => formErrors[f]) ?? (Object.keys(formErrors)[0] as keyof FormData | undefined);
    const message = firstField ? formErrors[firstField]?.message : undefined;
    toast.error(
      'Check the highlighted fields',
      (message as string | undefined) || 'Some required details are missing or invalid.'
    );
    if (firstField) {
      document
        .querySelector(`[name="${firstField}"]`)
        ?.closest('div')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const gradeReg = register('aiResilienceGrade');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'add' ? 'Add New Job Role' : 'Edit Job Role'}
      subtitle={
        mode === 'add'
          ? 'Create a new career specification.'
          : `Update the specification for ${entity?.jobRole || 'this role'}`
      }
      size="2xl"
      footer={
        <>
          {saveBlockedReason && <S.SaveHint>{saveBlockedReason}</S.SaveHint>}
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="career-job-role-form"
            variant="primary"
            disabled={Boolean(saveBlockedReason)}
            title={saveBlockedReason}
            isLoading={mutation.isPending}
          >
            Save Job Role
          </Button>
        </>
      }
    >
      <form id="career-job-role-form" onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <S.ModalScrollContainer>
          {/* Domain Hierarchy — read-only, never editable once entered */}
          <S.SectionBox>
            <S.SectionTitle>Domain Hierarchy</S.SectionTitle>
            <S.FormGrid $columns={3}>
              <S.LockedField>
                <S.FieldLabel>Career Cluster</S.FieldLabel>
                <S.LockedValue>
                  <span>{cluster || '—'}</span>
                  <RiLock2Line size={14} />
                </S.LockedValue>
              </S.LockedField>
              <S.LockedField>
                <S.FieldLabel>Industry</S.FieldLabel>
                <S.LockedValue>
                  <span>{industry || '—'}</span>
                  <RiLock2Line size={14} />
                </S.LockedValue>
              </S.LockedField>
              <S.LockedField>
                <S.FieldLabel>Domain</S.FieldLabel>
                <S.LockedValue>
                  <span>{domain || '—'}</span>
                  <RiLock2Line size={14} />
                </S.LockedValue>
              </S.LockedField>
            </S.FormGrid>
            <S.HierarchyHint>
              The cluster, industry and domain are fixed to the location this role sits in and cannot be changed here.
            </S.HierarchyHint>
          </S.SectionBox>

          {/* Job Role Details */}
          <S.SectionBox>
            <S.SectionTitle>Job Role Details</S.SectionTitle>
            <Input label="Title / Name *" placeholder="e.g. UI/UX Designer" error={errors.jobRole?.message} {...register('jobRole')} />
            <S.FieldGroup>
              <S.FieldLabel>Short Description *</S.FieldLabel>
              <S.StyledTextarea placeholder="Designs intuitive user experiences across web and mobile." {...register('oneLineDescription')} />
              {errors.oneLineDescription ? (
                <S.ErrorText>{errors.oneLineDescription.message}</S.ErrorText>
              ) : (
                <S.HierarchyHint>Minimum 10 characters.</S.HierarchyHint>
              )}
            </S.FieldGroup>

            <S.FormGrid $columns={2}>
              <Select
                label="AI Resilience *"
                options={GRADE_OPTIONS}
                error={errors.aiResilienceGrade?.message}
                {...gradeReg}
                // Select keeps its own display state, so without this it shows the
                // placeholder instead of the form's value — the default on add, and the
                // role's saved grade on edit (which then re-saves as something else).
                value={watch('aiResilienceGrade')}
                onChange={e => {
                  gradeReg.onChange(e);
                  setValue('aiResilienceComment', AI_RESILIENCE_COMMENTS[e.target.value] ?? '', {
                    shouldValidate: true,
                  });
                }}
              />
            </S.FormGrid>

            <S.ResilienceCommentBox>
              <S.ResilienceCommentText>{watch('aiResilienceComment')}</S.ResilienceCommentText>
              <input type="hidden" {...register('aiResilienceComment')} />
              {errors.aiResilienceComment && <S.ErrorText>{errors.aiResilienceComment.message}</S.ErrorText>}
            </S.ResilienceCommentBox>

            <S.FormGrid $columns={2}>
              <Input label="Salary (India)" placeholder="e.g. ₹4–15 LPA" {...register('salaryIndiaRangeText')} />
              <Input label="Salary (Global)" placeholder="e.g. $70k–$120k" {...register('salaryGlobalRangeText')} />
            </S.FormGrid>
            <Input label="Top Recruiters" placeholder="Comma-separated, e.g. Tech Firms, Startups" {...register('topCompanies')} />

            <S.FieldGroup>
              <S.FieldLabel>Role Overview &amp; Scope</S.FieldLabel>
              <S.StyledTextarea placeholder="Describe what this role does day-to-day and where it sits in the industry…" {...register('roleOverview')} />
            </S.FieldGroup>
            <S.FieldGroup>
              <S.FieldLabel>Key Skill Requirements</S.FieldLabel>
              <S.StyledTextarea placeholder="List core skills, one per line…" {...register('keySkills')} />
            </S.FieldGroup>
          </S.SectionBox>

          {/* Certifications — free-text lists kept on the entry itself. */}
          <S.SectionBox>
            <S.SectionTitle>Certifications</S.SectionTitle>
            <S.FormGrid $columns={2}>
              <Input label="Certifications (Student)" placeholder="Comma-separated" {...register('certificationsStudent')} />
              <Input label="Certifications (UG)" placeholder="Comma-separated" {...register('certificationsUG')} />
            </S.FormGrid>
          </S.SectionBox>

          {/* Education Path. The tick-list is the input — the entry's own free-text
              qualification columns are derived from it on create (see the mutation). */}
          <EducationPathSection
            domainId={effectiveDomainId}
            pullDomainEntries={mode === 'edit'}
            entries={domainEducation}
            checkedIds={educationIds}
            onToggle={toggleEducation}
            onAdd={entry => {
              setDomainEducation(prev =>
                prev.some(e => e.id === entry.id) ? prev : [...prev, entry]
              );
              setEducationIds(prev => new Set(prev).add(entry.id));
            }}
            onEntriesLoaded={loaded => {
              // Merge rather than replace: entries pulled in by search, or already
              // linked to the role from another domain, must survive a refetch.
              setDomainEducation(prev => {
                const merged = [...loaded];
                for (const e of prev) if (!merged.some(m => m.id === e.id)) merged.push(e);
                return merged;
              });
            }}
          />

          {/* Linked references */}
          <LinkedSection
            title="Entrance Exams"
            items={exams}
            onToggle={toggle(setExams)}
            onAddNew={addNew(setExams)}
            addButtonLabel="Add New Exam"
            emptyHint="No entrance exams linked yet. Add a new exam."
            renderSubform={({ addNew: a, close }) => <ExamSubform addNew={a} close={close} />}
          />

          <LinkedSection
            title="Courses"
            items={courses}
            onToggle={toggle(setCourses)}
            onAddNew={addNew(setCourses)}
            addButtonLabel="Add New Course"
            emptyHint="No courses linked yet. Add a new course."
            renderSubform={({ addNew: a, close }) => <CourseSubform addNew={a} close={close} />}
          />

          <LinkedSection
            title="Institutions"
            items={institutions}
            onToggle={toggle(setInstitutions)}
            onAddNew={addNew(setInstitutions)}
            addButtonLabel="Add New Institution"
            emptyHint="No institutions linked yet. Add a new institution."
            renderSubform={({ addNew: a, close }) => <InstitutionSubform addNew={a} close={close} />}
          />
        </S.ModalScrollContainer>
      </form>
    </Modal>
  );
};
