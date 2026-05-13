export default function Spinner({ size = 24 }: { size?: number }) {
  return (
    <div style={{
      width: size, height: size,
      border: '2px solid rgba(245,158,11,0.2)',
      borderTop: '2px solid #f59e0b',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
      display: 'inline-block',
    }} />
  );
}
