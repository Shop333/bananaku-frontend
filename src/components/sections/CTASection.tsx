'use client';
import { useEffect, useRef, useState } from 'react';
import { COMPANY_NAME, COMPANY_PHONE } from '@/constants';

export default function CTASection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} style={{
      padding: '7rem 2rem',
      background: '#0a0a0a',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Glow effects */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(245,158,11,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '10%', left: '5%',
        width: '150px', height: '150px',
        border: '1px solid rgba(245,158,11,0.06)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '5%',
        width: '250px', height: '250px',
        border: '1px solid rgba(245,158,11,0.06)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '750px', margin: '0 auto',
        textAlign: 'center', position: 'relative',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(50px)',
        transition: 'all 0.8s ease',
      }}>
        {/* Emoji */}
        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🍌</div>

        {/* Heading */}
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800, color: '#f5f5f5',
          lineHeight: 1.15, marginBottom: '1.5rem',
        }}>
          Siap Rasakan Pisang
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #f59e0b, #fde68a)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Terbaik Indonesia?
          </span>
        </h2>

        <p style={{
          color: '#9ca3af', fontSize: '1.1rem',
          lineHeight: 1.8, marginBottom: '3rem',
          maxWidth: '520px', margin: '0 auto 3rem',
        }}>
          Pesan sekarang dan dapatkan pengiriman gratis untuk pembelian
          pertama Anda. Segar dijamin atau uang kembali!
        </p>

        {/* Buttons */}
        <div style={{
          display: 'flex', gap: '1rem',
          justifyContent: 'center', flexWrap: 'wrap',
        }}>
          <a href="#products" style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: '#0a0a0a', padding: '1rem 2.5rem',
            borderRadius: '999px', fontWeight: 800,
            fontSize: '1.05rem', textDecoration: 'none',
            boxShadow: '0 0 40px rgba(245,158,11,0.35)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 60px rgba(245,158,11,0.5)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 40px rgba(245,158,11,0.35)';
          }}>
            🛒 Pesan Sekarang
          </a>

          <a href={`https://wa.me/${COMPANY_PHONE.replace(/\D/g, '')}`}
          target="_blank" rel="noopener noreferrer" style={{
            background: 'transparent',
            color: '#f59e0b', padding: '1rem 2.5rem',
            borderRadius: '999px', fontWeight: 700,
            fontSize: '1.05rem', textDecoration: 'none',
            border: '1px solid rgba(245,158,11,0.35)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(245,158,11,0.08)';
            (e.currentTarget as HTMLAnchorElement).style.borderColor = '#f59e0b';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
            (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(245,158,11,0.35)';
          }}>
            💬 Chat WhatsApp
          </a>
        </div>

        {/* Trust badges */}
        <div style={{
          display: 'flex', gap: '2rem', justifyContent: 'center',
          marginTop: '3rem', flexWrap: 'wrap',
        }}>
          {['✅ Garansi Segar', '🚚 Gratis Ongkir', '⭐ 5.0 Rating', '🔒 Pembayaran Aman'].map(badge => (
            <span key={badge} style={{
              color: '#6b7280', fontSize: '0.85rem', fontWeight: 500,
            }}>{badge}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
