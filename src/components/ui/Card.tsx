'use client';
import { useState } from 'react';

interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  padding?: string;
}

export default function Card({ children, hover = true, padding = '1.5rem' }: CardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      style={{
        background: hovered ? 'rgba(245,158,11,0.05)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? 'rgba(245,158,11,0.3)' : 'rgba(245,158,11,0.1)'}`,
        borderRadius: '1.25rem',
        padding,
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.3)' : 'none',
        transition: 'all 0.3s ease',
      }}>
      {children}
    </div>
  );
}
