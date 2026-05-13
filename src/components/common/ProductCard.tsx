'use client';
import { useState } from 'react';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  image: string | null;
  onOrder?: () => void;
}

export default function ProductCard({
  name, description, price, unit, category, image, onOrder,
}: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(245,158,11,0.04)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? 'rgba(245,158,11,0.4)' : 'rgba(245,158,11,0.1)'}`,
        borderRadius: '1.25rem', overflow: 'hidden',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.4)' : 'none',
        transition: 'all 0.3s ease',
      }}>

      {/* Image */}
      <div style={{
        height: '200px', position: 'relative',
        background: 'linear-gradient(135deg, #1a1a0a, #2a2000)',
        overflow: 'hidden',
      }}>
        {image && !imgError ? (
          <Image
            src={image} alt={name} fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{
              objectFit: 'cover',
              transform: hovered ? 'scale(1.07)' : 'scale(1)',
              transition: 'transform 0.4s ease',
            }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '4rem',
          }}>🍌</div>
        )}
        <span style={{
          position: 'absolute', top: '1rem', right: '1rem',
          background: 'rgba(245,158,11,0.15)',
          border: '1px solid rgba(245,158,11,0.3)',
          color: '#f59e0b', fontSize: '0.7rem',
          fontWeight: 700, padding: '0.25rem 0.75rem',
          borderRadius: '999px', textTransform: 'uppercase',
          letterSpacing: '1px',
        }}>{category}</span>
      </div>

      {/* Info */}
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.1rem', fontWeight: 700,
          color: '#f5f5f5', marginBottom: '0.5rem',
        }}>{name}</h3>
        <p style={{
          color: '#6b7280', fontSize: '0.85rem',
          lineHeight: 1.6, marginBottom: '1.25rem',
        }}>{description}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ color: '#f59e0b', fontWeight: 800, fontSize: '1.2rem' }}>
              {formatPrice(price)}
            </span>
            <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>/{unit}</span>
          </div>
          <button onClick={onOrder} style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: '#0a0a0a', border: 'none',
            padding: '0.5rem 1.2rem', borderRadius: '999px',
            fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            Pesan
          </button>
        </div>
      </div>
    </div>
  );
}
