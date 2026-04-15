export function ExportButton() {
  const onClick = () => window.dispatchEvent(new CustomEvent('stairgen:export'));
  return (
    <button
      onClick={onClick}
      style={{
        padding: '8px 16px', background: '#d6a85a', color: '#1a1d22',
        border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: 12,
        letterSpacing: 1, textTransform: 'uppercase',
      }}
    >
      Export GLB ⬇
    </button>
  );
}
