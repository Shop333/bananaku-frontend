type BadgeVariant = 'default' | 'success' | 'warning' | 'info';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

const variants = {
  default: { background: 'rgba(245,158,11,0.12)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)' },
  success: { background: 'rgba(34,197,94,0.12)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.3)' },
  warning: { background: 'rgba(239,68,68,0.12)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' },
  info: { background: 'rgba(59,130,246,0.12)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)' },
};

export default function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span style={{
      ...variants[variant],
      padding: '0.25rem 0.85rem',
      borderRadius: '999px',
      fontSize: '0.75rem',
      fontWeight: 600,
      display: 'inline-block',
      letterSpacing: '0.5px',
    }}>
      {children}
    </span>
  );
}
