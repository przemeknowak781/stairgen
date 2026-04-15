import { useMemo } from 'react';
import { useStairStore } from '../store/useStairStore';
import { validate } from '../config/validators';
import type { Severity } from '../config/types';

const COLORS: Record<Severity, string> = {
  error: '#ff4d4f',
  warn:  '#faad14',
  info:  '#6fb3ff',
};

export function ValidationPanel() {
  const cfg = useStairStore((s) => s.config);
  const issues = useMemo(() => validate(cfg), [cfg]);

  return (
    <div
      style={{
        position: 'fixed', top: 56, right: 0, width: 280, bottom: 40,
        background: '#22252b', color: '#eee', overflow: 'auto',
        padding: 12, borderLeft: '1px solid #333',
        fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 13,
        zIndex: 50,
      }}
    >
      <h3 style={{ marginTop: 0, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', color: '#888' }}>
        Zgodność (WT)
      </h3>
      {issues.length === 0 && (
        <div style={{ color: '#6ad19a', marginTop: 16 }}>✓ Wszystko zgodne</div>
      )}
      {issues.map((i) => (
        <div
          key={i.id}
          style={{
            borderLeft: `3px solid ${COLORS[i.severity]}`,
            paddingLeft: 10, marginBottom: 12, lineHeight: 1.4,
          }}
        >
          <div style={{ fontWeight: 600, color: COLORS[i.severity], fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {i.rule}
          </div>
          <div>{i.message}</div>
        </div>
      ))}
    </div>
  );
}
