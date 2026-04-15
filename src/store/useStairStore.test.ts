import { describe, it, expect, beforeEach } from 'vitest';
import { useStairStore } from './useStairStore';
import { DEFAULT_CONFIG } from '../config/defaults';

describe('useStairStore', () => {
  beforeEach(() => useStairStore.getState().reset());

  it('has DEFAULT_CONFIG initially', () => {
    expect(useStairStore.getState().config).toEqual(DEFAULT_CONFIG);
  });

  it('update() changes a single field', () => {
    useStairStore.getState().update({ totalHeight: 3000 });
    expect(useStairStore.getState().config.totalHeight).toBe(3000);
  });

  it('applyPreset() merges partial into config', () => {
    useStairStore.getState().applyPreset({ stepCount: 20, outerRadius: 900 });
    const c = useStairStore.getState().config;
    expect(c.stepCount).toBe(20);
    expect(c.outerRadius).toBe(900);
    expect(c.totalHeight).toBe(DEFAULT_CONFIG.totalHeight);
  });
});
