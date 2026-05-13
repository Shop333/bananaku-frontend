export default function Loading() {
  return (
    <div style={{
      minHeight: '100vh', background: '#0a0a0a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ fontSize: '3rem', animation: 'pulse 1s infinite' }}>🍌</div>
    </div>
  );
}
