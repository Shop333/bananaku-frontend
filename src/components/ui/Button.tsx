'use client';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  fullWidth?: boolean;
  href?: string;
}

const styles = {
  primary: {
    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
    color: '#0a0a0a', border: 'none',
    boxShadow: '0 0 25px rgba(245,158,11,0.25)',
  },
  outline: {
    background: 'transparent',
    color: '#f59e0b', border: '1px solid rgba(245,158,11,0.4)',
  },
  ghost: {
    background: 'rgba(245,158,11,0.08)',
    color: '#f59e0b', border: '1px solid transparent',
  },
};

const sizes = {
  sm: { padding: '0.4rem 1rem', fontSize: '0.8rem' },
  md: { padding: '0.7rem 1.6rem', fontSize: '0.95rem' },
  lg: { padding: '0.9rem 2.2rem', fontSize: '1.05rem' },
};

export default function Button({
  children, onClick, variant = 'primary',
  size = 'md', disabled = false, fullWidth = false, href,
}: ButtonProps) {
  const base = {
    ...styles[variant],
    ...sizes[size],
    borderRadius: '999px',
    fontWeight: 700,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.25s ease',
    display: 'inline-block',
    textDecoration: 'none',
    width: fullWidth ? '100%' : 'auto',
    textAlign: 'center' as const,
    fontFamily: 'Plus Jakarta Sans, sans-serif',
  };

  if (href) return <a href={href} style={base}>{children}</a>;
  return <button onClick={onClick} disabled={disabled} style={base}>{children}</button>;
}
