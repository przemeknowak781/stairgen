import { useStairStore } from '../store/useStairStore';
import { computeMetrics } from '../config/metrics';

export function StatusBar() {
  const cfg = useStairStore((s) => s.config);
  const m = computeMetrics(cfg);
  const items: [string, string | number][] = [
    ['H',         cfg.totalHeight + ' mm'],
    ['α',         cfg.sweepAngle + '°'],
    ['n',         cfg.stepCount],
    ['rise',      m.riseHeight.toFixed(0) + ' mm'],
    ['walkDepth', m.walklineDepth.toFixed(0) + ' mm'],
    ['width',     m.effectiveWidth.toFixed(0) + ' mm'],
    ['2h+s',      m.blondel.toFixed(0)],
  ];
  return (
    <div
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 280, height: 40,
        background: '#0f1114', color: '#ccc',
        display: 'flex', alignItems: 'center', gap: 20, padding: '0 16px',
        borderTop: '1px solid #333',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 12,
        zIndex: 60,
      }}
    >
      {items.map(([k, v]) => (
        <span key={k}>
          <span style={{ color: '#666' }}>{k}</span>{' '}
          <span style={{ color: '#eee' }}>{v}</span>
        </span>
      ))}
    </div>
  );
}
