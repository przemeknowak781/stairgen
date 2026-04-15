import { describe, it, expect } from 'vitest';
import { validate } from './validators';
import { DEFAULT_CONFIG } from './defaults';

describe('rule: riseHeight max', () => {
  it('residential: rise > 190 → error', () => {
    const issues = validate({
      ...DEFAULT_CONFIG, totalHeight: 3500, stepCount: 16, buildingType: 'residential',
    });
    expect(issues.find((i) => i.rule === 'rise_max')?.severity).toBe('error');
  });

  it('residential: rise = 180 → no rise_max issue', () => {
    const issues = validate({
      ...DEFAULT_CONFIG, totalHeight: 2880, stepCount: 16, buildingType: 'residential',
    });
    expect(issues.find((i) => i.rule === 'rise_max')).toBeUndefined();
  });

  it('public: threshold is tighter (175)', () => {
    const issues = validate({
      ...DEFAULT_CONFIG, totalHeight: 2880, stepCount: 16, buildingType: 'public',
    });
    expect(issues.find((i) => i.rule === 'rise_max')?.severity).toBe('error');
  });
});
