'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const FEATURES = [
  { icon: '🌿', title: 'Organik Bersertifikat', desc: 'Seluruh kebun kami telah mendapat sertifikasi organik dari lembaga independen internasional.' },
  { icon: '🚚', title: 'Pengiriman Cepat', desc: 'Sistem logistik rantai dingin memastikan pisang tiba segar di tangan Anda.' },
  { icon: '🏆', title: 'Kualitas Ekspor', desc: 'Standar grading internasional untuk setiap produk yang kami hasilkan.' },
  { icon: '♻️', title: 'Ramah Lingkungan', desc: 'Pertanian berkelanjutan dengan zero-waste dan energi terbarukan.' },
];

export default function AboutSection() {
  const [visible, setVisible] = useState(false);
  const [imgError, setImgError] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} style={{
      padding: '7rem 2rem',
      background: 'linear-gradient(180deg, #0a0a0a 0%, #111111 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Layout 2 kolom */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem', alignItems: 'center',
          marginBottom: '5rem',
        }}>

          {/* Kiri — Gambar */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-50px)',
            transition: 'all 0.8s ease 0.1s',
          }}>
            <div style={{
              position: 'relative',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              height: '480px',
              border: '1px solid rgba(245,158,11,0.2)',
              boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
            }}>
              {/* Gambar utama */}
              {!imgError ? (
                <Image
                  src="/about/about-bg.webp"
                  alt="Kebun Pisang BananaKu"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                  onError={() => setImgError(true)}
                />
              ) : (
                /* Placeholder kalau foto belum ada */
                <div style={{
                  width: '100%', height: '100%',
                  background: 'linear-gradient(135deg, #0d1a0d, #1a3300, #2d4d00)',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '8rem',
                }}>
                  🌿
                </div>
              )}

              {/* Overlay gradient bawah */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
              }} />

              {/* Badge floating kiri bawah */}
              <div style={{
                position: 'absolute', bottom: '1.5rem', left: '1.5rem',
                background: 'rgba(10,10,10,0.85)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(245,158,11,0.3)',
                borderRadius: '1rem', padding: '0.85rem 1.25rem',
                display: 'flex', alignItems: 'center', gap: '0.75rem',
              }}>
                <span style={{ fontSize: '2rem' }}>🌿</span>
                <div>
                  <div style={{
                    color: '#f59e0b', fontWeight: 700, fontSize: '1rem',
                    fontFamily: 'Playfair Display, serif',
                  }}>100% Organik</div>
                  <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                    Bersertifikat Internasional
                  </div>
                </div>
              </div>

              {/* Badge floating kanan atas */}
              <div style={{
                position: 'absolute', top: '1.5rem', right: '1.5rem',
                background: 'rgba(245,158,11,0.15)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(245,158,11,0.4)',
                borderRadius: '0.75rem', padding: '0.6rem 1rem',
              }}>
                <div style={{
                  color: '#f59e0b', fontWeight: 800,
                  fontSize: '1.3rem', fontFamily: 'Playfair Display, serif',
                  textAlign: 'center',
                }}>15+</div>
                <div style={{ color: '#d1d5db', fontSize: '0.72rem', textAlign: 'center' }}>
                  Tahun Pengalaman
                </div>
              </div>
            </div>

            {/* Panduan upload */}
            <p style={{
              color: '#4b5563', fontSize: '0.78rem',
              marginTop: '0.75rem', textAlign: 'center',
            }}>
              📁 Letakkan foto di{' '}
              <code style={{ color: '#f59e0b' }}>public/about/about-bg.webp</code>
            </p>
          </div>

          {/* Kanan — Teks */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(50px)',
            transition: 'all 0.8s ease 0.2s',
          }}>
            <span style={{
              color: '#f59e0b', fontSize: '0.85rem',
              fontWeight: 600, letterSpacing: '3px',
              textTransform: 'uppercase',
            }}>Tentang Kami</span>

            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 800, color: '#f5f5f5',
              marginTop: '0.75rem', lineHeight: 1.2,
            }}>
              Lebih dari Sekadar{' '}
              <span style={{ color: '#f59e0b' }}>Pisang</span>
            </h2>

            <p style={{
              color: '#9ca3af', fontSize: '1rem',
              lineHeight: 1.85, marginTop: '1.25rem',
            }}>
              Sejak 2009, kami berkomitmen menghadirkan pisang terbaik Indonesia
              ke meja makan keluarga dan mitra bisnis di seluruh dunia. Berawal
              dari kebun kecil di Lampung, kini kami mengelola ribuan hektar
              perkebunan organik bersertifikat.
            </p>

            <p style={{
              color: '#9ca3af', fontSize: '1rem',
              lineHeight: 1.85, marginTop: '1rem',
            }}>
              Setiap pisang yang kami hasilkan melewati proses seleksi ketat
              untuk memastikan kualitas, keamanan pangan, dan kelestarian
              lingkungan tetap terjaga.
            </p>

            {/* Stats row */}
            <div style={{
              display: 'flex', gap: '2rem',
              marginTop: '2.5rem', flexWrap: 'wrap',
            }}>
              {[
                { value: '50+', label: 'Varietas Pisang' },
                { value: '10rb+', label: 'Pelanggan' },
                { value: '20+', label: 'Kota' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '2rem', fontWeight: 800, color: '#f59e0b',
                  }}>{s.value}</div>
                  <div style={{ color: '#6b7280', fontSize: '0.82rem' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature cards bawah */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
        }}>
          {FEATURES.map((f, i) => (
            <div key={f.title} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(245,158,11,0.1)',
              borderRadius: '1.25rem', padding: '1.75rem',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(40px)',
              transition: `all 0.6s ease ${0.3 + i * 0.1}s`,
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.background = 'rgba(245,158,11,0.06)';
              el.style.borderColor = 'rgba(245,158,11,0.3)';
              el.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.background = 'rgba(255,255,255,0.03)';
              el.style.borderColor = 'rgba(245,158,11,0.1)';
              el.style.transform = 'translateY(0)';
            }}>
              <div style={{ fontSize: '2.2rem', marginBottom: '0.85rem' }}>{f.icon}</div>
              <h3 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.1rem', fontWeight: 700,
                color: '#f5f5f5', marginBottom: '0.6rem',
              }}>{f.title}</h3>
              <p style={{ color: '#6b7280', fontSize: '0.88rem', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
