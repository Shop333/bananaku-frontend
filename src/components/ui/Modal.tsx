'use client';
import { useEffect } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function Modal({ open, onClose, children, title }: ModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!open) return null;

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 999,
      background: 'rgba(0,0,0,0.7)',
      backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#1a1a1a',
        border: '1px solid rgba(245,158,11,0.2)',
        borderRadius: '1.25rem',
        padding: '2rem',
        maxWidth: '500px', width: '100%',
        boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
      }}>
        {title && (
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: '1.5rem',
          }}>
            <h3 style={{
              fontFamily: 'Playfair Display, serif',
              color: '#f5f5f5', fontSize: '1.3rem', fontWeight: 700,
            }}>{title}</h3>
            <button onClick={onClose} style={{
              background: 'none', border: 'none',
              color: '#6b7280', fontSize: '1.5rem',
              cursor: 'pointer', lineHeight: 1,
            }}>×</button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
