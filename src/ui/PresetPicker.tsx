import { useState } from 'react';
import { useStairStore } from '../store/useStairStore';
import { PRESET_LIST, applyPreset } from '../config/presets';

export function PresetPicker() {
  const [open, setOpen] = useState(false);
  const applyPresetFn = useStairStore((s) => s.applyPreset);

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          padding: '8px 14px', background: '#2a2d32', color: '#eee',
          border: '1px solid #3a3d42', cursor: 'pointer', fontSize: 12,
          letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600,
        }}
      >
        Preset ▾
      </button>
      {open && (
        <div
          style={{
            position: 'absolute', top: '100%', right: 0, marginTop: 4,
            background: '#1a1d22', border: '1px solid #333', minWidth: 260, zIndex: 200,
          }}
        >
          {PRESET_LIST.map((p) => (
            <div
              key={p.id}
              style={{
                padding: '12px 16px', cursor: 'pointer', color: '#ddd',
                borderBottom: '1px solid #2a2d32', fontSize: 13,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#2a2d32')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              onClick={() => {
                const base = useStairStore.getState().config;
                const merged = applyPreset(base, p.id);
                applyPresetFn(merged);
                setOpen(false);
              }}
            >
              {p.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
