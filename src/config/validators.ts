import type { StairConfig, Issue, BuildingType } from './types';
import { computeMetrics } from './metrics';

type Thresholds = {
  riseMax: number;
  walkMin: number;
  widthMin: number;
  railMin: number;
  barSpacingMax: number;
  stepAngleMax: number;
  headroomMin: number;
};

const T: Record<BuildingType, Thresholds> = {
  residential: { riseMax: 190, walkMin: 250, widthMin: 800,  railMin: 900,  barSpacingMax: 120, stepAngleMax: 30, headroomMin: 2000 },
  public:      { riseMax: 175, walkMin: 300, widthMin: 1200, railMin: 1100, barSpacingMax: 120, stepAngleMax: 30, headroomMin: 2000 },
  auxiliary:   { riseMax: 220, walkMin: 200, widthMin: 600,  railMin: 900,  barSpacingMax: 200, stepAngleMax: 45, headroomMin: 1900 },
};

type Rule = (c: StairConfig, t: Thresholds) => Issue | null;

const ruleRiseMax: Rule = (c, t) => {
  const { riseHeight } = computeMetrics(c);
  if (riseHeight > t.riseMax) {
    return {
      id: 'rise_max',
      rule: 'rise_max',
      severity: 'error',
      field: 'stepCount',
      message: `Wysokość stopnia ${riseHeight.toFixed(0)} mm > dopuszczalne ${t.riseMax} mm. Zwiększ liczbę stopni.`,
    };
  }
  return null;
};

const RULES: Rule[] = [ruleRiseMax];

export function validate(c: StairConfig): Issue[] {
  const t = T[c.buildingType];
  return RULES.map((r) => r(c, t)).filter((x): x is Issue => x !== null);
}
