import { PresetPicker } from './PresetPicker';
import { ExportButton } from './ExportButton';

export function Topbar() {
  return (
    <div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 56,
        background: '#0f1114', borderBottom: '1px solid #333',
        color: '#eee', display: 'flex', alignItems: 'center', padding: '0 20px',
        zIndex: 100, gap: 12,
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div style={{ fontWeight: 800, letterSpacing: 3, fontSize: 14, color: '#eee' }}>STAIRGEN</div>
      <div style={{ color: '#555', fontSize: 11, marginLeft: 8 }}>schody kręcone · pełne z podniebieniem</div>
      <div style={{ flex: 1 }} />
      <PresetPicker />
      <ExportButton />
    </div>
  );
}
