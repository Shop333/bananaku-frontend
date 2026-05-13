'use client';
import { useState } from 'react';

interface InputProps {
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  multiline?: boolean;
  rows?: number;
}

export default function Input({
  placeholder, value, onChange,
  type = 'text', multiline = false, rows = 4,
}: InputProps) {
  const [focused, setFocused] = useState(false);

  const base = {
    width: '100%',
    padding: '0.85rem 1.1rem',
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${focused ? '#f59e0b' : 'rgba(245,158,11,0.15)'}`,
    borderRadius: '0.75rem',
    color: '#f5f5f5',
    fontSize: '0.95rem',
    outline: 'none',
    fontFamily: 'Plus Jakarta Sans, sans-serif',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box' as const,
    resize: 'vertical' as const,
  };

  if (multiline) return (
    <textarea
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={base}
    />
  );

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={base}
    />
  );
}
