// Grading bands from the Assessment Tool Construct (Class 9 & 10) PDF. A fit score
// (0-100) always maps to exactly one of these three bands; there is no per-row override,
// so grading level + explanation are computed from the score rather than read off a
// stored field.
export interface FitGrading {
  level: string;
  explanation: string;
}

interface FitGradingBand extends FitGrading {
  min: number;
}

const buildGradingLookup = (bands: FitGradingBand[]) => (fitScore: number | undefined): FitGrading | undefined => {
  if (fitScore === undefined) return undefined;
  const band = bands.find(b => fitScore >= b.min);
  return band ? { level: band.level, explanation: band.explanation } : undefined;
};

// "CAREER MATCHING FORMULA" section — grading for a Target Role's Career Fit Score.
const CAREER_FIT_GRADING_BANDS: FitGradingBand[] = [
  {
    min: 75,
    level: 'Strong Fit',
    explanation:
      "This career naturally suits your strengths, so it's likely to feel like a good match right from the start.",
  },
  {
    min: 60,
    level: 'Good Fit',
    explanation:
      'You have real potential here, with some skill building and experience, you can grow into this career comfortably.',
  },
  {
    min: -Infinity,
    level: 'Explore Carefully',
    explanation:
      "This particular career isn't a strong natural match today, so it's worth exploring with care and keeping other options open.",
  },
];

export const getCareerFitGrading = buildGradingLookup(CAREER_FIT_GRADING_BANDS);

// "STREAM RECOMMENDATION ENGINE" section — grading for a Sub-Stream's Fit Score.
const STREAM_FIT_GRADING_BANDS: FitGradingBand[] = [
  {
    min: 75,
    level: 'Strong Fit',
    explanation:
      "This stream lines up naturally with your strengths, so you're likely to enjoy it and do well with relatively less struggle.",
  },
  {
    min: 60,
    level: 'Good Fit',
    explanation:
      'You have a solid base for this stream, and with some focused effort and skill-building, you can do really well in it.',
  },
  {
    min: -Infinity,
    level: 'Explore Carefully',
    explanation:
      "This stream isn't a natural match for your current strengths, so it's worth exploring carefully and weighing other options before deciding.",
  },
];

export const getStreamFitGrading = buildGradingLookup(STREAM_FIT_GRADING_BANDS);
