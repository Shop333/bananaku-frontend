'use client';
import { useEffect, useRef, useState } from 'react';

const BENEFITS = [
  {
    icon: '🧬',
    title: 'Kaya Nutrisi',
    desc: 'Mengandung kalium, vitamin B6, vitamin C, magnesium, dan serat tinggi yang baik untuk kesehatan jantung dan pencernaan.',
    stat: '89 kkal', statLabel: 'per 100gr',
  },
  {
    icon: '⚡',
    title: 'Sumber Energi Alami',
    desc: 'Karbohidrat alami dalam pisang memberikan energi tahan lama tanpa lonjakan gula darah yang berbahaya.',
    stat: '3x', statLabel: 'lebih berenergi',
  },
  {
    icon: '🛡️',
    title: 'Meningkatkan Imun',
    desc: 'Antioksidan dan vitamin C dalam pisang membantu memperkuat sistem kekebalan tubuh secara alami.',
    stat: '33%', statLabel: 'vitamin C harian',
  },
  {
    icon: '🧠',
    title: 'Baik untuk Otak',
    desc: 'Kandungan triptofan membantu produksi serotonin yang meningkatkan mood dan fungsi kognitif.',
    stat: '20%', statLabel: 'vitamin B6 harian',
  },
  {
    icon: '💪',
    title: 'Mendukung Otot',
    desc: 'Kalium tinggi mencegah kram otot dan membantu pemulihan setelah olahraga intensif.',
    stat: '422mg', statLabel: 'kalium per buah',
  },
  {
    icon: '🌱',
    title: '100% Organik',
    desc: 'Tanpa pestisida kimia berbahaya. Ditanam secara alami untuk menjaga kualitas dan keamanan pangan.',
    stat: '0', statLabel: 'bahan kimia',
  },
];

export default function BenefitsSection() {
  const [visible, setVisible] = useState(false);
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
    <section id="benefits" ref={ref} style={{
      padding: '7rem 2rem',
      background: 'linear-gradient(180deg, #111111 0%, #0d1a0d 50%, #111111 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: '800px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(20,83,45,0.2) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: '5rem',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.7s ease',
        }}>
          <span style={{
            color: '#f59e0b', fontSize: '0.85rem',
            fontWeight: 600, letterSpacing: '3px',
            textTransform: 'uppercase',
          }}>Manfaat</span>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800, color: '#f5f5f5', marginTop: '0.75rem',
          }}>
            Kenapa Pisang{' '}
            <span style={{ color: '#f59e0b' }}>BananaKu?</span>
          </h2>
          <p style={{
            color: '#9ca3af', fontSize: '1.05rem',
            maxWidth: '550px', margin: '1.25rem auto 0', lineHeight: 1.8,
          }}>
            Bukan sekadar buah biasa — setiap pisang kami membawa manfaat
            luar biasa untuk kesehatan dan vitalitas Anda.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {BENEFITS.map((b, i) => (
            <div key={b.title} style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(245,158,11,0.08)',
              borderRadius: '1.25rem', padding: '2rem',
              display: 'flex', flexDirection: 'column', gap: '1rem',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(50px)',
              transition: `all 0.6s ease ${i * 0.08}s`,
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.background = 'rgba(245,158,11,0.05)';
              el.style.borderColor = 'rgba(245,158,11,0.25)';
              el.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.background = 'rgba(255,255,255,0.02)';
              el.style.borderColor = 'rgba(245,158,11,0.08)';
              el.style.transform = 'translateY(0)';
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '2.2rem' }}>{b.icon}</span>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.4rem', fontWeight: 800, color: '#f59e0b',
                  }}>{b.stat}</div>
                  <div style={{ color: '#6b7280', fontSize: '0.72rem' }}>{b.statLabel}</div>
                </div>
              </div>
              <h3 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.1rem', fontWeight: 700, color: '#f5f5f5',
              }}>{b.title}</h3>
              <p style={{ color: '#6b7280', fontSize: '0.88rem', lineHeight: 1.7 }}>{b.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
