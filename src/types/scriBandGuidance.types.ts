export interface ScriBandGuidance {
  band: number;
  score: { min: number | null; max: number | null };
  label: string;
  labelMeaning: string;
  forStudents: string;
  tipsForStudents: string;
  tipsForParent: string;
}
