import { AlignmentRating } from '@/types/counsellorChart.types';

// Single source of truth for the Academic × Career Alignment label + guidance text,
// shared between the counsellor chart (Step6SCRI) and the student report (KreateBlueprintSection
// + its print variant) so the two never drift out of sync.
export const ALIGNMENT_LABEL: Record<AlignmentRating, string> = {
  STRONGLY_ALIGNED: 'Strongly Aligned',
  PARTIALLY_ALIGNED: 'Partially Aligned',
  MISALIGNED: 'Misaligned',
  NOT_YET_ASSESSED: 'Not Yet Assessed',
};

export const ALIGNMENT_MEANING: Record<AlignmentRating, string> = {
  STRONGLY_ALIGNED:
    "The subject you enjoy the most and the career direction that suits you both come from the same set of strengths. In other words, what you love doing in class and what you'd be good at in your future career are pointing in the same direction, that's a strong, natural connection to build on.",
  PARTIALLY_ALIGNED:
    "There's a genuine connection between what you enjoy and where your strengths point but it's not a perfect match. Some parts line up nicely, while other parts of the recommended path may need a bit more exploring or a slightly different subject combination than what you'd naturally pick.",
  MISALIGNED:
    'Right now, the subject you enjoy most and the career direction your strengths point to seem to be pulling in two different directions. This isn\'t unusual, and it doesn\'t mean either one is "wrong" it just means this is worth talking through properly, so you understand why the gap exists and what your real options are.',
  NOT_YET_ASSESSED:
    "There isn't enough information yet to compare your favourite subject with a career direction. This usually just means a part of the assessment or conversation is still pending nothing to worry about, please explore further with details.",
};
