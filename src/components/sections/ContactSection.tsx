'use client';
import { useEffect, useRef, useState } from 'react';
import { COMPANY_EMAIL, COMPANY_PHONE, COMPANY_ADDRESS } from '@/constants';
import { sendContact } from '@/services/contactService';

export default function ContactSection() {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setError('Nama, email, dan pesan wajib diisi!');
      return;
    }
    setError('');
    setSending(true);
    try {
      await sendContact({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        message: form.message,
      });
      setSent(true);
      setForm({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    } catch {
      setError('Gagal mengirim pesan. Coba lagi!');
    } finally {
      setSending(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '0.85rem 1.1rem',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(245,158,11,0.15)',
    borderRadius: '0.75rem', color: '#f5f5f5',
    fontSize: '0.95rem', outline: 'none',
    fontFamily: 'Plus Jakarta Sans, sans-serif',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box' as const,
  };

  const INFO = [
    { icon: '📧', label: 'Email', value: COMPANY_EMAIL },
    { icon: '📱', label: 'WhatsApp', value: COMPANY_PHONE },
    { icon: '📍', label: 'Alamat', value: COMPANY_ADDRESS },
  ];

  return (
    <section id="contact" ref={ref} style={{ padding: '7rem 2rem', background: '#0a0a0a' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

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
          }}>Kontak</span>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800, color: '#f5f5f5', marginTop: '0.75rem',
          }}>
            Mari <span style={{ color: '#f59e0b' }}>Berkolaborasi</span>
          </h2>
          <p style={{ color: '#9ca3af', marginTop: '1rem', fontSize: '1rem' }}>
            Hubungi kami untuk pemesanan, kerjasama, atau pertanyaan apapun.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.7s ease 0.2s',
        }}>
          {/* Info */}
          <div>
            <h3 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.4rem', color: '#f5f5f5',
              marginBottom: '2rem', fontWeight: 700,
            }}>Informasi Kontak</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {INFO.map(item => (
                <div key={item.label} style={{
                  display: 'flex', gap: '1rem', alignItems: 'flex-start',
                  padding: '1.25rem',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(245,158,11,0.1)',
                  borderRadius: '0.75rem',
                }}>
                  <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                  <div>
                    <div style={{ color: '#f59e0b', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>
                      {item.label}
                    </div>
                    <div style={{ color: '#d1d5db', fontSize: '0.9rem' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div>
            <h3 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.4rem', color: '#f5f5f5',
              marginBottom: '2rem', fontWeight: 700,
            }}>Kirim Pesan</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input placeholder="Nama Lengkap *" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = '#f59e0b')}
                onBlur={e => (e.target.style.borderColor = 'rgba(245,158,11,0.15)')} />
              <input placeholder="Email *" type="email" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = '#f59e0b')}
                onBlur={e => (e.target.style.borderColor = 'rgba(245,158,11,0.15)')} />
              <input placeholder="No. WhatsApp" value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = '#f59e0b')}
                onBlur={e => (e.target.style.borderColor = 'rgba(245,158,11,0.15)')} />
              <textarea placeholder="Pesan Anda *" rows={4} value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={e => (e.target.style.borderColor = '#f59e0b')}
                onBlur={e => (e.target.style.borderColor = 'rgba(245,158,11,0.15)')} />

              {/* Error */}
              {error && (
                <p style={{ color: '#ef4444', fontSize: '0.85rem' }}>⚠️ {error}</p>
              )}

              <button onClick={handleSubmit} disabled={sending} style={{
                background: sending
                  ? 'rgba(245,158,11,0.4)'
                  : sent
                  ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                  : 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: '#0a0a0a', border: 'none',
                padding: '0.9rem', borderRadius: '0.75rem',
                fontWeight: 700, fontSize: '1rem',
                cursor: sending ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: sending || sent ? 'none' : '0 0 25px rgba(245,158,11,0.25)',
              }}>
                {sending ? '⏳ Mengirim...' : sent ? '✅ Pesan Terkirim!' : 'Kirim Pesan'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
