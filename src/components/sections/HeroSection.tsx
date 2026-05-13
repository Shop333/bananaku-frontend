'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { COMPANY_NAME, COMPANY_TAGLINE } from '@/constants';

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '6rem 2rem 4rem',
    }}>

      {/* ===== BACKGROUND IMAGE ===== */}
      {!imgError ? (
        <Image
          src="/hero/hero-bg.webp"
          alt="Hero Background"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          onError={() => setImgError(true)}
        />
      ) : (
        /* Fallback gradient kalau foto belum ada */
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #0a0a0a 0%, #111811 50%, #0a0a0a 100%)',
        }} />
      )}

      {/* ===== OVERLAY LAYERS ===== */}
      {/* Layer 1 — gelap keseluruhan */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.65)',
      }} />

      {/* Layer 2 — gradient bawah ke atas */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.4) 40%, rgba(10,10,10,0.1) 100%)',
      }} />

      {/* Layer 3 — glow amber tengah */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%',
        transform: 'translateX(-50%)',
        width: '700px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(245,158,11,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Decorative circles */}
      <div style={{
        position: 'absolute', top: '10%', right: '8%',
        width: '300px', height: '300px',
        border: '1px solid rgba(245,158,11,0.1)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '15%', left: '5%',
        width: '200px', height: '200px',
        border: '1px solid rgba(245,158,11,0.07)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      {/* ===== CONTENT ===== */}
      <div style={{
        maxWidth: '900px', textAlign: 'center',
        position: 'relative', zIndex: 1,
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-block',
          background: 'rgba(245,158,11,0.12)',
          border: '1px solid rgba(245,158,11,0.3)',
          borderRadius: '999px', padding: '0.4rem 1.2rem',
          marginBottom: '2rem',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease 0.1s',
        }}>
          <span style={{ color: '#f59e0b', fontSize: '0.85rem', fontWeight: 600 }}>
            🌿 100% Organik & Segar Langsung dari Kebun
          </span>
        </div>

        {/* Heading */}
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
          fontWeight: 800, lineHeight: 1.1,
          marginBottom: '1.5rem', color: '#f5f5f5',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.7s ease 0.2s',
          textShadow: '0 2px 20px rgba(0,0,0,0.5)',
        }}>
          Pisang Premium
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #f59e0b, #fde68a)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {COMPANY_NAME}
          </span>
        </h1>

        {/* Tagline */}
        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
          color: '#d1d5db',
          maxWidth: '600px', margin: '0 auto 3rem',
          lineHeight: 1.8,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.7s ease 0.35s',
          textShadow: '0 1px 10px rgba(0,0,0,0.5)',
        }}>
          {COMPANY_TAGLINE}. Kualitas terbaik dari perkebunan organik
          bersertifikat untuk kebutuhan rumah tangga hingga ekspor internasional.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.7s ease 0.5s',
        }}>
          <a href="#products" style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: '#0a0a0a', padding: '0.9rem 2.2rem',
            borderRadius: '999px', fontWeight: 700,
            fontSize: '1rem', textDecoration: 'none',
            boxShadow: '0 0 30px rgba(245,158,11,0.4)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 50px rgba(245,158,11,0.6)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 30px rgba(245,158,11,0.4)';
          }}>
            Lihat Produk Kami
          </a>
          <a href="#contact" style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(10px)',
            color: '#f5f5f5', padding: '0.9rem 2.2rem',
            borderRadius: '999px', fontWeight: 600,
            fontSize: '1rem', textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.2)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.15)';
            (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.4)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.08)';
            (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.2)';
          }}>
            Hubungi Kami
          </a>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', gap: '3rem', justifyContent: 'center',
          marginTop: '5rem', flexWrap: 'wrap',
          opacity: visible ? 1 : 0,
          transition: 'all 0.7s ease 0.7s',
        }}>
          {[
            { value: '50+', label: 'Varietas Pisang' },
            { value: '10rb+', label: 'Pelanggan Puas' },
            { value: '15th', label: 'Pengalaman' },
            { value: '20+', label: 'Kota' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '2rem', fontWeight: 800,
                color: '#f59e0b', lineHeight: 1,
                textShadow: '0 0 20px rgba(245,158,11,0.4)',
              }}>{stat.value}</div>
              <div style={{ color: '#9ca3af', fontSize: '0.85rem', marginTop: '0.3rem' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        opacity: visible ? 0.7 : 0, transition: 'opacity 1s ease 1s',
        zIndex: 1,
      }}>
        <span style={{ color: '#9ca3af', fontSize: '0.72rem', letterSpacing: '3px' }}>SCROLL</span>
        <div style={{
          width: '1px', height: '40px',
          background: 'linear-gradient(to bottom, #f59e0b, transparent)',
        }} />
      </div>

    </section>
  );
}
