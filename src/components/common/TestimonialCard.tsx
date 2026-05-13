'use client';
import { useState } from 'react';

interface TestimonialCardProps {
  name: string;
  role: string;
  message: string;
  rating: number;
}

export default function TestimonialCard({
  name, role, message, rating,
}: TestimonialCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(245,158,11,0.04)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? 'rgba(245,158,11,0.3)' : 'rgba(245,158,11,0.1)'}`,
        borderRadius: '1.25rem', padding: '2rem',
        transition: 'all 0.3s ease',
      }}>

      {/* Stars */}
      <div style={{ marginBottom: '1rem' }}>
        {'★'.repeat(rating).split('').map((s, i) => (
          <span key={i} style={{ color: '#f59e0b', fontSize: '1rem' }}>{s}</span>
        ))}
      </div>

      {/* Message */}
      <p style={{
        color: '#d1d5db', fontSize: '0.95rem',
        lineHeight: 1.8, marginBottom: '1.5rem',
        fontStyle: 'italic',
      }}>"{message}"</p>

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: '1rem', color: '#0a0a0a', flexShrink: 0,
        }}>
          {name.charAt(0)}
        </div>
        <div>
          <div style={{ color: '#f5f5f5', fontWeight: 600, fontSize: '0.95rem' }}>{name}</div>
          <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>{role}</div>
        </div>
      </div>
    </div>
  );
}
