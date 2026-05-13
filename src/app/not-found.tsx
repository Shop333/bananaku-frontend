export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: '1rem', textAlign: 'center',
      fontFamily: 'Plus Jakarta Sans, sans-serif',
    }}>
      <div style={{ fontSize: '5rem' }}>🍌</div>
      <h1 style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: '3rem', color: '#f59e0b', fontWeight: 800,
      }}>404</h1>
      <p style={{ color: '#9ca3af', fontSize: '1rem' }}>
        Halaman tidak ditemukan
      </p>
      <a href="/" style={{
        marginTop: '1rem',
        background: 'linear-gradient(135deg, #f59e0b, #d97706)',
        color: '#0a0a0a', padding: '0.7rem 1.8rem',
        borderRadius: '999px', fontWeight: 700,
        textDecoration: 'none', fontSize: '0.9rem',
      }}>
        Kembali ke Beranda
      </a>
    </div>
  );
}
