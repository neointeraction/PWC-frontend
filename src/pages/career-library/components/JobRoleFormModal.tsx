import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  RiAddLine,
  RiCloseLine,
  RiLock2Line,
  RiAlertLine,
  RiInformationLine,
} from 'react-icons/ri';
import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import {
  careerService,
  CareerEntryPayload,
  CareerEntryLinkItem,
  CareerLinkOption,
} from '@/services/career.service';
import { Career } from '@/types';
import { useToast } from '@/hooks';
import { getApiErrorMessage } from '@/utils';
import * as S from './JobRoleFormModal.styles';

// Max linked exams / institutions recommended for the student Compass report — a soft
// warning only, never blocks saving.
const COMPASS_CAP = 3;

const GRADE_OPTIONS = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
  { value: 'VERY_HIGH', label: 'Very High' },
];

const STATUS_OPTIONS = [
  { value: 'DRAFT', label: 'Draft (not published)' },
  { value: 'ACTIVE', label: 'Active (published)' },
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

const schema = z.object({
  jobRole: z.string().trim().min(1, 'Title is required'),
  oneLineDescription: z.string().trim().min(1, 'Short description is required'),
  aiResilienceGrade: z.enum(['LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH']),
  aiResilienceComment: z.string().trim().min(1, 'A rationale for the grade is required'),
  status: z.enum(['DRAFT', 'ACTIVE']),
  salaryIndiaRangeText: z.string().optional(),
  salaryGlobalRangeText: z.string().optional(),
  topCompanies: z.string().optional(),
  roleOverview: z.string().optional(),
  keySkills: z.string().optional(),
  // Education path -> qualification fields on the entry (not a separate table).
  qualification10th12th: z.string().trim().min(1, '10th / 12th subjects are required'),
  qualification10th12thExplanation: z.string().optional(),
  qualificationGraduation: z.string().optional(),
  qualificationGraduationDefined: z.string().optional(),
  qualificationPG: z.string().optional(),
  qualificationPGDefined: z.string().optional(),
  certificationsStudent: z.string().optional(),
  certificationsUG: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

// A row in a linked-reference list: an existing canonical record (`id`) or a brand-new
// one added by name (`isNew`). Only backend-confirmed fields (name/level/city/state) are
// persisted; the richer subform inputs feed the display label for now.
interface IncludedItem {
  key: string;
  id?: string;
  label: string;
  isNew?: boolean;
  name?: string;
  level?: 'UG' | 'PG';
  city?: string;
  state?: string;
  checked: boolean;
}

type LinkKind = 'exam' | 'course' | 'institution';

const splitList = (s?: string): string[] =>
  (s ?? '')
    .split(/[,\n;]/)
    .map(x => x.trim())
    .filter(Boolean);

const toArr = (s?: string): string[] | undefined => {
  const items = splitList(s);
  return items.length ? items : undefined;
};

const buildLinks = (items: IncludedItem[], kind: LinkKind): CareerEntryLinkItem[] =>
  items
    .filter(i => i.checked)
    .map(i => {
      if (i.id) return { id: i.id };
      const link: CareerEntryLinkItem = { name: (i.name || i.label).trim() };
      if (kind === 'exam') link.level = i.level || 'UG';
      if (kind === 'institution') {
        if (i.city) link.city = i.city;
        if (i.state) link.state = i.state;
      }
      return link;
    });

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
  showCap?: boolean;
  capNoun?: string;
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
  showCap,
  capNoun,
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

  const selectedCount = items.filter(i => i.checked).length;

  return (
    <S.SectionBox>
      <S.SectionTitle>{title}</S.SectionTitle>

      {showCap && (
        <S.CapWarningBanner $isOverCap={selectedCount > COMPASS_CAP}>
          {selectedCount > COMPASS_CAP ? (
            <>
              <RiAlertLine size={14} /> Selected: {selectedCount} (exceeds the recommended {COMPASS_CAP} for
              the Compass report)
            </>
          ) : (
            <>
              <RiInformationLine size={14} /> Selected for Compass: {selectedCount} / {COMPASS_CAP} recommended{' '}
              {capNoun}
            </>
          )}
        </S.CapWarningBanner>
      )}

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
    const canonicalName = (name.trim() || abbr.trim()).trim();
    const label = `${abbr.trim() ? `${abbr.trim()} — ` : ''}${name.trim() || abbr.trim()}${
      conductedBy.trim() ? ` (${conductedBy.trim()})` : ''
    }`;
    addNew({ key: `new-exam-${Date.now()}`, isNew: true, name: canonicalName, level, label, checked: true });
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
    const canonicalName = (name.trim() || abbr.trim()).trim();
    const label = `${abbr.trim() ? `${abbr.trim()} — ` : ''}${name.trim() || abbr.trim()}`;
    addNew({ key: `new-course-${Date.now()}`, isNew: true, name: canonicalName, label, checked: true });
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
      name: canonicalName,
      city: city || undefined,
      state: restState.length ? restState.join(', ') : undefined,
      label,
      checked: true,
    });
  };

  return (
    <S.ExpandedFormCard>
      <SubformHeader label="ADD NEW INSTITUTION" onClose={close} />
      <S.FormGrid $columns={2}>
        <Input label="Institution Abbreviation" placeholder="e.g. NIFT" value={abbr} onChange={e => setAbbr(e.target.value)} />
        <Input label="Institution Name *" placeholder="e.g. National Institute of Fashion Technology" value={name} onChange={e => setName(e.target.value)} />
        <Input label="Location" placeholder="City, State" value={location} onChange={e => setLocation(e.target.value)} />
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
  onSaved: () => void;
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
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { aiResilienceGrade: 'MEDIUM', status: 'DRAFT' },
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

  useEffect(() => {
    if (!isOpen) return;
    if (mode === 'edit' && entity) {
      reset({
        jobRole: entity.jobRole,
        oneLineDescription: entity.oneLineDescription,
        aiResilienceGrade: GRADE_TO_API[entity.aiResilienceGrading] ?? 'MEDIUM',
        aiResilienceComment: entity.aiResilienceComment,
        status: entity.status === 'active' ? 'ACTIVE' : 'DRAFT',
        salaryIndiaRangeText: entity.approxSalaryRangeIndia || '',
        salaryGlobalRangeText: entity.globalSalaryRange || '',
        topCompanies: (entity.topCompaniesRecruiting || []).join(', '),
        roleOverview: entity.roleOverview || '',
        keySkills: (entity.keySkills || []).join('\n'),
        qualification10th12th: entity.minQual10th12thRecommendedSubjects,
        qualification10th12thExplanation: entity.qualification10th12thExplanation || '',
        qualificationGraduation: entity.minQualGradRecommendedSubjects || '',
        qualificationGraduationDefined: entity.qualificationGraduationDefined || '',
        qualificationPG: entity.minQualPGRecommendedSubjects || '',
        qualificationPGDefined: entity.qualificationPGDefined || '',
        certificationsStudent: entity.certificationsStudents || '',
        certificationsUG: entity.certificationsUG || '',
      });
    } else {
      reset({
        jobRole: '',
        oneLineDescription: '',
        aiResilienceGrade: 'MEDIUM',
        aiResilienceComment: '',
        status: 'DRAFT',
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
      setExams([]);
      setCourses([]);
      setInstitutions([]);
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
  }, [isOpen, mode, detail]);

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

  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      const base: Omit<CareerEntryPayload, 'domainId'> = {
        jobRole: data.jobRole.trim(),
        aiResilienceGrade: data.aiResilienceGrade,
        aiResilienceComment: data.aiResilienceComment.trim(),
        oneLineDescription: data.oneLineDescription.trim(),
        roleOverview: data.roleOverview?.trim() || undefined,
        keySkills: toArr(data.keySkills),
        topCompanies: toArr(data.topCompanies),
        salaryIndiaRangeText: data.salaryIndiaRangeText?.trim() || undefined,
        salaryGlobalRangeText: data.salaryGlobalRangeText?.trim() || undefined,
        qualification10th12th: data.qualification10th12th.trim(),
        qualification10th12thExplanation: data.qualification10th12thExplanation?.trim() || undefined,
        qualificationGraduation: data.qualificationGraduation?.trim() || undefined,
        qualificationGraduationDefined: data.qualificationGraduationDefined?.trim() || undefined,
        qualificationPG: data.qualificationPG?.trim() || undefined,
        qualificationPGDefined: data.qualificationPGDefined?.trim() || undefined,
        certificationsStudent: toArr(data.certificationsStudent),
        certificationsUG: toArr(data.certificationsUG),
        status: data.status,
        entranceExams: buildLinks(exams, 'exam'),
        courses: buildLinks(courses, 'course'),
        institutions: buildLinks(institutions, 'institution'),
      };
      if (mode === 'add') {
        return careerService.createEntry({ ...base, domainId: domainId! });
      }
      return careerService.updateEntry(entity!.id, base);
    },
    onSuccess: saved => {
      toast.success(
        `Job Role ${mode === 'add' ? 'Created' : 'Updated'}`,
        `${saved.jobRole} was saved successfully.`
      );
      onSaved();
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

  const gradeReg = register('aiResilienceGrade');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'add' ? 'Add New Job Role' : 'Edit Job Role'}
      subtitle={
        mode === 'add'
          ? 'Create a new career specification. New entries default to Draft.'
          : `Update the specification for ${entity?.jobRole || 'this role'}`
      }
      size="2xl"
      footer={
        <>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="career-job-role-form" variant="primary" isLoading={mutation.isPending}>
            Save Job Role
          </Button>
        </>
      }
    >
      <form id="career-job-role-form" onSubmit={handleSubmit(onSubmit)}>
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
                onChange={e => {
                  gradeReg.onChange(e);
                  setValue('aiResilienceComment', AI_RESILIENCE_COMMENTS[e.target.value] ?? '', {
                    shouldValidate: true,
                  });
                }}
              />
              <Select label="Status" options={STATUS_OPTIONS} error={errors.status?.message} {...register('status')} />
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
            showCap
            capNoun="exams"
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
            showCap
            capNoun="institutions"
            renderSubform={({ addNew: a, close }) => <InstitutionSubform addNew={a} close={close} />}
          />
        </S.ModalScrollContainer>
      </form>
    </Modal>
  );
};
