'use client';
import { useEffect, useRef, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  message: string;
  rating: number;
}

export default function TestimonialSection() {
  const [visible, setVisible] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/testimonials`)
      .then(r => r.json())
      .then(setTestimonials)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="testimonials" ref={ref} style={{
      padding: '7rem 2rem',
      background: 'linear-gradient(180deg, #111111 0%, #0a0a0a 100%)',
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
            fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase',
          }}>Testimoni</span>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800, color: '#f5f5f5', marginTop: '0.75rem',
          }}>
            Kata Mereka yang{' '}
            <span style={{ color: '#f59e0b' }}>Sudah Percaya</span>
          </h2>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
            <div style={{
              width: '40px', height: '40px',
              border: '3px solid rgba(245,158,11,0.2)',
              borderTop: '3px solid #f59e0b',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }} />
          </div>
        )}

        {/* Cards */}
        {!loading && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}>
            {testimonials.map((t, i) => (
              <div key={t.id} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(245,158,11,0.1)',
                borderRadius: '1.25rem', padding: '2rem',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.6s ease ${i * 0.12}s`,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(245,158,11,0.3)';
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(245,158,11,0.04)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(245,158,11,0.1)';
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)';
              }}>
                {/* Stars */}
                <div style={{ marginBottom: '1rem' }}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} style={{ color: '#f59e0b', fontSize: '1rem' }}>★</span>
                  ))}
                </div>

                {/* Message */}
                <p style={{
                  color: '#d1d5db', fontSize: '0.95rem',
                  lineHeight: 1.8, marginBottom: '1.5rem', fontStyle: 'italic',
                }}>"{t.message}"</p>

                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: '1rem', color: '#0a0a0a', flexShrink: 0,
                  }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ color: '#f5f5f5', fontWeight: 600, fontSize: '0.95rem' }}>
                      {t.name}
                    </div>
                    <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
