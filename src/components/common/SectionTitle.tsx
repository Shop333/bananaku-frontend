interface SectionTitleProps {
  label: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionTitle({
  label, title, highlight, subtitle, align = 'center',
}: SectionTitleProps) {
  return (
    <div style={{ textAlign: align, marginBottom: '4rem' }}>
      <span style={{
        color: '#f59e0b', fontSize: '0.85rem',
        fontWeight: 600, letterSpacing: '3px',
        textTransform: 'uppercase',
      }}>{label}</span>
      <h2 style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: 800, color: '#f5f5f5',
        marginTop: '0.75rem', lineHeight: 1.2,
      }}>
        {title}{' '}
        {highlight && (
          <span style={{ color: '#f59e0b' }}>{highlight}</span>
        )}
      </h2>
      {subtitle && (
        <p style={{
          color: '#9ca3af', fontSize: '1.05rem',
          maxWidth: '560px',
          margin: align === 'center' ? '1.25rem auto 0' : '1.25rem 0 0',
          lineHeight: 1.8,
        }}>{subtitle}</p>
      )}
    </div>
  );
}
