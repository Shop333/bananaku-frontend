'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const GALLERY = [
  {
    id: 1,
    title: 'Kebun Cavendish',
    subtitle: 'Lampung, Indonesia',
    file: '/gallery/kebun.webp',
    gridCol: '1 / 6', gridRow: '1 / 3',
    fontSize: '6rem',
  },
  {
    id: 2,
    title: 'Panen Raya',
    subtitle: 'Musim panen terbaik',
    file: '/gallery/panen.webp',
    gridCol: '6 / 10', gridRow: '1 / 2',
    fontSize: '3.5rem',
  },
  {
    id: 3,
    title: 'Proses Sortir',
    subtitle: 'Quality control ketat',
    file: '/gallery/sortir.webp',
    gridCol: '10 / 13', gridRow: '1 / 2',
    fontSize: '3rem',
  },
  {
    id: 4,
    title: 'Pisang Organik',
    subtitle: 'Sertifikat internasional',
    file: '/gallery/organik.webp',
    gridCol: '6 / 10', gridRow: '2 / 3',
    fontSize: '3.5rem',
  },
  {
    id: 5,
    title: 'Siap Ekspor',
    subtitle: 'Packaging premium',
    file: '/gallery/ekspor.webp',
    gridCol: '10 / 13', gridRow: '2 / 3',
    fontSize: '3rem',
  },
  {
    id: 6,
    title: 'Fresh Delivery',
    subtitle: 'Langsung ke tangan Anda',
    file: '/gallery/delivery.webp',
    gridCol: '1 / 13', gridRow: '3 / 4',
    fontSize: '4rem',
  },
];

const EMOJIS: Record<number, string> = {
  1: '🌿', 2: '🍌', 3: '⚖️', 4: '🌱', 5: '📦', 6: '🚚',
};

function GalleryCard({ item, hovered, onEnter, onLeave }: {
  item: typeof GALLERY[0];
  hovered: number | null;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const isHovered = hovered === item.id;

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        gridColumn: item.gridCol,
        gridRow: item.gridRow,
        borderRadius: '1.25rem',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        border: `1px solid ${isHovered ? 'rgba(245,158,11,0.4)' : 'rgba(245,158,11,0.12)'}`,
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        transition: 'all 0.4s ease',
        boxShadow: isHovered ? '0 25px 50px rgba(0,0,0,0.6)' : 'none',
        background: '#111',
      }}>

      {/* Gambar atau Placeholder */}
      {!imgError ? (
        <Image
          src={item.file}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{
            objectFit: 'cover',
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.5s ease',
          }}
          onError={() => setImgError(true)}
        />
      ) : (
        /* Placeholder kalau foto belum ada */
        <div style={{
          width: '100%', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: item.fontSize,
          background: 'linear-gradient(135deg, #1a1500, #2d2000)',
        }}>
          {EMOJIS[item.id]}
        </div>
      )}

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
        opacity: isHovered ? 1 : 0.65,
        transition: 'opacity 0.3s ease',
      }} />

      {/* Label */}
      <div style={{
        position: 'absolute', bottom: '1.25rem', left: '1.25rem',
        transform: isHovered ? 'translateY(0)' : 'translateY(6px)',
        transition: 'transform 0.3s ease',
      }}>
        <div style={{
          color: '#f59e0b', fontSize: '0.7rem',
          fontWeight: 700, letterSpacing: '2px',
          textTransform: 'uppercase', marginBottom: '0.2rem',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}>
          BananaKu Gallery
        </div>
        <div style={{
          fontFamily: 'Playfair Display, serif',
          color: '#f5f5f5',
          fontSize: item.gridCol === '1 / 13' ? '1.3rem' : item.gridCol === '1 / 6' ? '1.4rem' : '1rem',
          fontWeight: 700,
        }}>{item.title}</div>
        <div style={{ color: '#9ca3af', fontSize: '0.8rem', marginTop: '0.1rem' }}>
          {item.subtitle}
        </div>
      </div>
    </div>
  );
}

export default function GallerySection() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="gallery" ref={ref} style={{
      padding: '7rem 2rem',
      background: 'linear-gradient(180deg, #0a0a0a 0%, #111111 100%)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: '4rem',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.7s ease',
        }}>
          <span style={{
            color: '#f59e0b', fontSize: '0.85rem',
            fontWeight: 600, letterSpacing: '3px',
            textTransform: 'uppercase',
          }}>Galeri</span>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800, color: '#f5f5f5', marginTop: '0.75rem',
          }}>
            Dari Kebun ke{' '}
            <span style={{ color: '#f59e0b' }}>Meja Makan</span>
          </h2>
          <p style={{
            color: '#9ca3af', fontSize: '1rem',
            maxWidth: '500px', margin: '1rem auto 0',
          }}>
            Dokumentasi perjalanan pisang premium kami dari perkebunan organik hingga ke tangan Anda.
          </p>
        </div>

        {/* Masonry Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridTemplateRows: 'repeat(3, 220px)',
          gap: '1rem',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease 0.2s',
        }}>
          {GALLERY.map(item => (
            <GalleryCard
              key={item.id}
              item={item}
              hovered={hovered}
              onEnter={() => setHovered(item.id)}
              onLeave={() => setHovered(null)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
