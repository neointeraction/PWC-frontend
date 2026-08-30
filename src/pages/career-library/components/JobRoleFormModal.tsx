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
  // Education path -> qualification fields on the entry (not a separate table).
  qualification10th12th: z.string().trim().min(1, '10th / 12th recommended subjects are required'),
  qualification10th12thExplanation: z.string().optional(),
  qualificationGraduation: z.string().optional(),
  qualificationGraduationDefined: z.string().optional(),
  qualificationPG: z.string().optional(),
  qualificationPGDefined: z.string().optional(),
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
  'qualification10th12th',
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

type LinkKind = 'exam' | 'course' | 'institution';

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

// ---- small debounce for typeahead ----
function useDebounced<T>(value: T, ms = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return debounced;
}

// ============================================================================
// Generic linked-reference section: tick-list + typeahead select-existing +
// expandable add-new subform (subform passed as a render prop, since the fields
// differ per record type).
// ============================================================================
interface LinkedSectionProps {
  title: string;
  kind: LinkKind;
  items: IncludedItem[];
  onToggle: (key: string) => void;
  onAddExisting: (opt: CareerLinkOption) => void;
  onAddNew: (item: IncludedItem) => void;
  searchFn: (q: string) => Promise<CareerLinkOption[]>;
  addButtonLabel: string;
  emptyHint: string;
  renderSubform: (helpers: {
    addNew: (item: IncludedItem) => void;
    close: () => void;
  }) => React.ReactNode;
}

const LinkedSection: React.FC<LinkedSectionProps> = ({
  title,
  kind,
  items,
  onToggle,
  onAddExisting,
  onAddNew,
  searchFn,
  addButtonLabel,
  emptyHint,
  renderSubform,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounced(query, 300);

  const includedIds = useMemo(
    () => new Set(items.filter(i => i.id).map(i => i.id as string)),
    [items]
  );

  const { data: results = [], isFetching } = useQuery({
    queryKey: ['career-link-search', kind, debouncedQuery],
    queryFn: () => searchFn(debouncedQuery.trim()),
    enabled: debouncedQuery.trim().length >= 2,
    staleTime: 60_000,
  });

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

      {/* Search existing canonical records */}
      <S.SearchWrapper>
        <Input
          placeholder="Search the library to add an existing record…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {debouncedQuery.trim().length >= 2 && (
          <>
            {isFetching && <S.SearchStatus>Searching…</S.SearchStatus>}
            {!isFetching && results.length === 0 && (
              <S.SearchStatus>No matches — use “{addButtonLabel}” to create one.</S.SearchStatus>
            )}
            {!isFetching && results.length > 0 && (
              <S.SearchResults>
                {results.map(opt => {
                  const already = includedIds.has(opt.id);
                  return (
                    <S.SearchResultRow
                      key={opt.id}
                      type="button"
                      disabled={already}
                      onClick={() => {
                        onAddExisting(opt);
                        setQuery('');
                      }}
                    >
                      {opt.label}
                      {opt.level ? ` · ${opt.level}` : ''}
                      {already ? ' — added' : ''}
                    </S.SearchResultRow>
                  );
                })}
              </S.SearchResults>
            )}
          </>
        )}
      </S.SearchWrapper>

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

// ---- Add-new subforms (fields per record type; only name/level/city/state persist) ----

const SubformHeader: React.FC<{ label: string; onClose: () => void }> = ({ label, onClose }) => (
  <S.ExpandedFormTitle>
    <span>+ {label} (saved to the library on approval)</span>
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
    defaultValues: {
      aiResilienceGrade: 'MEDIUM',
      aiResilienceComment: AI_RESILIENCE_COMMENTS.MEDIUM,
    },
  });

  const [exams, setExams] = useState<IncludedItem[]>([]);
  const [courses, setCourses] = useState<IncludedItem[]>([]);
  const [institutions, setInstitutions] = useState<IncludedItem[]>([]);

  // Hierarchy shown read-only. Add mode reads it from the browsing context; edit mode
  // reads it off the entry. It is never editable once entered.
  const cluster = mode === 'edit' ? entity?.careerCluster : clusterLabel;
  const industry = mode === 'edit' ? entity?.industry : industryLabel;
  const domain = mode === 'edit' ? entity?.domain : domainLabel;

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
    qualification10th12th: c.minQual10th12thRecommendedSubjects,
    qualification10th12thExplanation: c.qualification10th12thExplanation || '',
    qualificationGraduation: c.minQualGradRecommendedSubjects || '',
    qualificationGraduationDefined: c.qualificationGraduationDefined || '',
    qualificationPG: c.minQualPGRecommendedSubjects || '',
    qualificationPGDefined: c.qualificationPGDefined || '',
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
        qualification10th12th: '',
        qualification10th12thExplanation: '',
        qualificationGraduation: '',
        qualificationGraduationDefined: '',
        qualificationPG: '',
        qualificationPGDefined: '',
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

  const addExisting = (setter: React.Dispatch<React.SetStateAction<IncludedItem[]>>) => (opt: CareerLinkOption) =>
    setter(prev =>
      prev.some(i => i.id === opt.id)
        ? prev
        : [...prev, { key: `existing-${opt.id}`, id: opt.id, label: opt.label, level: opt.level, checked: true }]
    );

  const addNew = (setter: React.Dispatch<React.SetStateAction<IncludedItem[]>>) => (item: IncludedItem) =>
    setter(prev => [...prev, item]);

  // On PATCH, omitting a field leaves the old value and '' is rejected — so an emptied
  // input has to be sent as an explicit `null` (lists as `[]`) for the clear to stick.
  // On create there is nothing to clear, so blanks are simply omitted.
  const clearing = mode === 'edit';
  const optText = (v?: string) => v?.trim() || (clearing ? null : undefined);
  const optList = (v?: string) => {
    const items = splitList(v);
    return items.length ? items : clearing ? [] : undefined;
  };

  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      const base: Omit<CareerEntryPayload, 'domainId'> = {
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
        // Only meaningful on edit; a new entry has nothing to clear.
        salaryIndiaMinLPA: clearing ? null : undefined,
        salaryIndiaMaxLPA: clearing ? null : undefined,
        salaryGlobalMinUSD: clearing ? null : undefined,
        salaryGlobalMaxUSD: clearing ? null : undefined,
        qualification10th12th: data.qualification10th12th.trim(),
        qualification10th12thExplanation: optText(data.qualification10th12thExplanation),
        qualificationGraduation: optText(data.qualificationGraduation),
        qualificationGraduationDefined: optText(data.qualificationGraduationDefined),
        qualificationPG: optText(data.qualificationPG),
        qualificationPGDefined: optText(data.qualificationPGDefined),
        certificationsStudent: optList(data.certificationsStudent),
        certificationsUG: optList(data.certificationsUG),
        entranceExams: buildLinks<CareerEntryExamInput>(exams),
        courses: buildLinks<CareerEntryCourseInput>(courses),
        institutions: buildLinks<CareerEntryInstitutionInput>(institutions),
      };
      if (mode === 'add') {
        // No Status field on the form — a role added by a super admin goes live at once.
        return careerService.createEntry({ ...base, domainId: domainId!, status: 'ACTIVE' });
      }
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
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="career-job-role-form"
            variant="primary"
            disabled={!linksReady}
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
              {errors.oneLineDescription && <S.ErrorText>{errors.oneLineDescription.message}</S.ErrorText>}
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

          {/* Education Path -> qualification fields */}
          <S.SectionBox>
            <S.SectionTitle>Education Path</S.SectionTitle>
            <S.FieldGroup>
              <S.FieldLabel>10th / 12th — Recommended Subjects *</S.FieldLabel>
              <S.StyledTextarea placeholder="Subjects / stream recommended at school level" {...register('qualification10th12th')} />
              {errors.qualification10th12th && <S.ErrorText>{errors.qualification10th12th.message}</S.ErrorText>}
            </S.FieldGroup>
            <S.FieldGroup>
              <S.FieldLabel>10+2 Explanation</S.FieldLabel>
              <S.StyledTextarea placeholder="Explanation note for the 10+2 requirement" {...register('qualification10th12thExplanation')} />
            </S.FieldGroup>
            <S.FormGrid $columns={2}>
              <S.FieldGroup>
                <S.FieldLabel>Graduation — Recommended Subjects</S.FieldLabel>
                <S.StyledTextarea placeholder="Degree / subjects recommended at UG level" {...register('qualificationGraduation')} />
              </S.FieldGroup>
              <S.FieldGroup>
                <S.FieldLabel>Graduation — Defined Pathway</S.FieldLabel>
                <S.StyledTextarea placeholder="Defined graduation pathway / detail" {...register('qualificationGraduationDefined')} />
              </S.FieldGroup>
              <S.FieldGroup>
                <S.FieldLabel>Post-graduation — Recommended Subjects</S.FieldLabel>
                <S.StyledTextarea placeholder="Specialisations recommended at PG level" {...register('qualificationPG')} />
              </S.FieldGroup>
              <S.FieldGroup>
                <S.FieldLabel>Post-graduation — Defined Pathway</S.FieldLabel>
                <S.StyledTextarea placeholder="Defined post-graduation pathway / detail" {...register('qualificationPGDefined')} />
              </S.FieldGroup>
            </S.FormGrid>
            <S.FormGrid $columns={2}>
              <Input label="Certifications (Student)" placeholder="Comma-separated" {...register('certificationsStudent')} />
              <Input label="Certifications (UG)" placeholder="Comma-separated" {...register('certificationsUG')} />
            </S.FormGrid>
          </S.SectionBox>

          {/* Linked references */}
          <LinkedSection
            title="Entrance Exams"
            kind="exam"
            items={exams}
            onToggle={toggle(setExams)}
            onAddExisting={addExisting(setExams)}
            onAddNew={addNew(setExams)}
            searchFn={q => careerService.searchEntranceExams(q)}
            addButtonLabel="Add New Exam"
            emptyHint="No entrance exams linked yet. Search to add existing ones, or add a new exam."
            renderSubform={({ addNew: a, close }) => <ExamSubform addNew={a} close={close} />}
          />

          <LinkedSection
            title="Courses"
            kind="course"
            items={courses}
            onToggle={toggle(setCourses)}
            onAddExisting={addExisting(setCourses)}
            onAddNew={addNew(setCourses)}
            searchFn={q => careerService.searchCourses(q)}
            addButtonLabel="Add New Course"
            emptyHint="No courses linked yet. Search to add existing ones, or add a new course."
            renderSubform={({ addNew: a, close }) => <CourseSubform addNew={a} close={close} />}
          />

          <LinkedSection
            title="Institutions"
            kind="institution"
            items={institutions}
            onToggle={toggle(setInstitutions)}
            onAddExisting={addExisting(setInstitutions)}
            onAddNew={addNew(setInstitutions)}
            searchFn={q => careerService.searchInstitutions(q)}
            addButtonLabel="Add New Institution"
            emptyHint="No institutions linked yet. Search to add existing ones, or add a new institution."
            renderSubform={({ addNew: a, close }) => <InstitutionSubform addNew={a} close={close} />}
          />
        </S.ModalScrollContainer>
      </form>
    </Modal>
  );
};
