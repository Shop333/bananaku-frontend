'use client';
import { useEffect, useRef, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface PricingPlan {
  id: string;
  name: string;
  emoji: string;
  price: number;
  unit: string;
  description: string;
  features: string[];
  cta_text: string;
  is_highlight: boolean;
}

interface OrderForm {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  companyName: string;
  quantity: number;
  notes: string;
}

export default function PricingSection() {
  const [visible, setVisible] = useState(false);
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<PricingPlan | null>(null);
  const [ordering, setOrdering] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [form, setForm] = useState<OrderForm>({
    customerName: '', customerEmail: '',
    customerPhone: '', companyName: '',
    quantity: 1, notes: '',
  });
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/pricing/plans`)
      .then(r => r.json())
      .then(setPlans)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleOrder = async () => {
    if (!form.customerName || !form.customerEmail || !form.customerPhone) {
      setOrderError('Nama, email, dan WhatsApp wajib diisi!');
      return;
    }
    if (!selected) return;
    setOrderError('');
    setOrdering(true);
    try {
      const res = await fetch(`${API_URL}/pricing/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pricingId: selected.id,
          pricingName: selected.name,
          customerName: form.customerName,
          customerEmail: form.customerEmail,
          customerPhone: form.customerPhone,
          companyName: form.companyName || undefined,
          quantity: form.quantity,
          unit: selected.unit,
          totalPrice: selected.price * form.quantity,
          notes: form.notes || undefined,
        }),
      });
      if (!res.ok) throw new Error();
      setOrdered(true);
      setTimeout(() => {
        setOrdered(false);
        setSelected(null);
        setForm({ customerName: '', customerEmail: '', customerPhone: '', companyName: '', quantity: 1, notes: '' });
      }, 3000);
    } catch {
      setOrderError('Gagal mengirim order. Coba lagi!');
    } finally {
      setOrdering(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(245,158,11,0.2)',
    borderRadius: '0.65rem', color: '#f5f5f5',
    fontSize: '0.9rem', outline: 'none',
    fontFamily: 'Plus Jakarta Sans, sans-serif',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.2s',
  };

  return (
    <>
      <section id="pricing" ref={ref} style={{
        padding: '7rem 2rem',
        background: 'linear-gradient(180deg, #111111 0%, #0a0a0a 100%)',
      }}>
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
            }}>Harga</span>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800, color: '#f5f5f5', marginTop: '0.75rem',
            }}>
              Harga <span style={{ color: '#f59e0b' }}>Transparan</span>
            </h2>
            <p style={{
              color: '#9ca3af', marginTop: '1rem', fontSize: '1rem',
              maxWidth: '500px', margin: '1rem auto 0',
            }}>
              Pilih paket sesuai kebutuhan Anda. Harga terbaik dengan kualitas terjamin.
            </p>
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
              gap: '1.5rem', alignItems: 'start',
            }}>
              {plans.map((plan, i) => (
                <div key={plan.id} style={{
                  borderRadius: '1.5rem', overflow: 'hidden',
                  border: plan.is_highlight
                    ? '1px solid rgba(245,158,11,0.5)'
                    : '1px solid rgba(245,158,11,0.1)',
                  background: plan.is_highlight
                    ? 'linear-gradient(160deg, #1a1200, #2d1f00)'
                    : 'rgba(255,255,255,0.02)',
                  transform: plan.is_highlight ? 'translateY(-4px) scale(1.01)' : 'translateY(0)',
                  boxShadow: plan.is_highlight ? '0 0 40px rgba(245,158,11,0.15)' : 'none',
                  opacity: visible ? 1 : 0,
                  transition: `all 0.4s ease ${i * 0.1}s`,
                  position: 'relative',
                }}>

                  {plan.is_highlight && (
                    <div style={{
                      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                      color: '#0a0a0a', textAlign: 'center',
                      padding: '0.4rem', fontSize: '0.8rem', fontWeight: 700,
                    }}>⭐ PALING POPULER</div>
                  )}

                  <div style={{ padding: '2rem' }}>
                    <span style={{ fontSize: '2.5rem' }}>{plan.emoji}</span>
                    <h3 style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '1.4rem', fontWeight: 700,
                      color: '#f5f5f5', marginTop: '0.75rem',
                    }}>{plan.name}</h3>
                    <p style={{ color: '#6b7280', fontSize: '0.88rem', marginTop: '0.4rem' }}>
                      {plan.description}
                    </p>

                    {/* Price */}
                    <div style={{ margin: '1.5rem 0' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                        <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Rp</span>
                        <span style={{
                          fontFamily: 'Playfair Display, serif',
                          fontSize: '2.5rem', fontWeight: 800,
                          color: plan.is_highlight ? '#f59e0b' : '#f5f5f5',
                        }}>{plan.price.toLocaleString('id-ID')}</span>
                        <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>/{plan.unit}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {plan.features.map((f, j) => (
                        <li key={j} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                          <span style={{ color: '#f59e0b', flexShrink: 0 }}>✓</span>
                          <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <button onClick={() => setSelected(plan)} style={{
                      display: 'block', width: '100%', textAlign: 'center',
                      padding: '0.85rem', borderRadius: '999px',
                      fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
                      border: 'none', transition: 'all 0.3s ease',
                      background: plan.is_highlight
                        ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                        : 'transparent',
                      color: plan.is_highlight ? '#0a0a0a' : '#f59e0b',
                      outline: plan.is_highlight ? 'none' : '1px solid rgba(245,158,11,0.35)',
                      boxShadow: plan.is_highlight ? '0 0 25px rgba(245,158,11,0.3)' : 'none',
                    }}>
                      {plan.cta_text}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <p style={{
            textAlign: 'center', color: '#4b5563',
            fontSize: '0.85rem', marginTop: '2.5rem',
            opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease 0.5s',
          }}>
            Harga dapat berubah sesuai musim. Hubungi kami untuk penawaran khusus.
          </p>
        </div>
      </section>

      {/* Modal Order Pricing */}
      {selected && (
        <div onClick={() => !ordering && setSelected(null)} style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: '#1a1a1a',
            border: '1px solid rgba(245,158,11,0.25)',
            borderRadius: '1.5rem', padding: '2rem',
            maxWidth: '480px', width: '100%',
            maxHeight: '90vh', overflowY: 'auto',
            boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
          }}>

            {ordered ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                <h3 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.5rem', color: '#22c55e', fontWeight: 700,
                }}>Order Terkirim!</h3>
                <p style={{ color: '#9ca3af', marginTop: '0.75rem' }}>
                  Tim kami akan segera menghubungi Anda.
                </p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <div>
                    <h3 style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '1.3rem', color: '#f5f5f5', fontWeight: 700,
                    }}>Order Paket {selected.name}</h3>
                    <p style={{ color: '#f59e0b', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                      {selected.emoji} Rp {selected.price.toLocaleString('id-ID')}/{selected.unit}
                    </p>
                  </div>
                  <button onClick={() => setSelected(null)} style={{
                    background: 'none', border: 'none',
                    color: '#6b7280', fontSize: '1.5rem', cursor: 'pointer',
                  }}>×</button>
                </div>

                {/* Quantity */}
                <div style={{
                  background: 'rgba(245,158,11,0.06)',
                  border: '1px solid rgba(245,158,11,0.15)',
                  borderRadius: '0.75rem', padding: '1rem',
                  marginBottom: '1.5rem',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <div style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
                    Jumlah ({selected.unit})
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button onClick={() => setForm(f => ({ ...f, quantity: Math.max(1, f.quantity - 1) }))}
                      style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        background: 'rgba(245,158,11,0.1)',
                        border: '1px solid rgba(245,158,11,0.3)',
                        color: '#f59e0b', fontSize: '1.2rem', cursor: 'pointer',
                      }}>−</button>
                    <span style={{ color: '#f5f5f5', fontWeight: 700, minWidth: '30px', textAlign: 'center' }}>
                      {form.quantity}
                    </span>
                    <button onClick={() => setForm(f => ({ ...f, quantity: f.quantity + 1 }))}
                      style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        background: 'rgba(245,158,11,0.1)',
                        border: '1px solid rgba(245,158,11,0.3)',
                        color: '#f59e0b', fontSize: '1.2rem', cursor: 'pointer',
                      }}>+</button>
                  </div>
                </div>

                {/* Total */}
                <div style={{
                  textAlign: 'right', marginBottom: '1.5rem',
                  color: '#9ca3af', fontSize: '0.9rem',
                }}>
                  Total Estimasi:{' '}
                  <span style={{ color: '#f59e0b', fontWeight: 800, fontSize: '1.1rem' }}>
                    Rp {(selected.price * form.quantity).toLocaleString('id-ID')}
                  </span>
                </div>

                {/* Form */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <input placeholder="Nama Lengkap *" value={form.customerName}
                    onChange={e => setForm({ ...form, customerName: e.target.value })}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#f59e0b')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(245,158,11,0.2)')} />
                  <input placeholder="Email *" type="email" value={form.customerEmail}
                    onChange={e => setForm({ ...form, customerEmail: e.target.value })}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#f59e0b')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(245,158,11,0.2)')} />
                  <input placeholder="No. WhatsApp *" value={form.customerPhone}
                    onChange={e => setForm({ ...form, customerPhone: e.target.value })}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#f59e0b')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(245,158,11,0.2)')} />
                  <input placeholder="Nama Perusahaan (opsional)" value={form.companyName}
                    onChange={e => setForm({ ...form, companyName: e.target.value })}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#f59e0b')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(245,158,11,0.2)')} />
                  <textarea placeholder="Catatan tambahan (opsional)" rows={3}
                    value={form.notes}
                    onChange={e => setForm({ ...form, notes: e.target.value })}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={e => (e.target.style.borderColor = '#f59e0b')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(245,158,11,0.2)')} />

                  {orderError && (
                    <p style={{ color: '#ef4444', fontSize: '0.85rem' }}>⚠️ {orderError}</p>
                  )}

                  <button onClick={handleOrder} disabled={ordering} style={{
                    background: ordering
                      ? 'rgba(245,158,11,0.4)'
                      : 'linear-gradient(135deg, #f59e0b, #d97706)',
                    color: '#0a0a0a', border: 'none',
                    padding: '0.9rem', borderRadius: '0.75rem',
                    fontWeight: 700, fontSize: '1rem',
                    cursor: ordering ? 'not-allowed' : 'pointer',
                    boxShadow: ordering ? 'none' : '0 0 25px rgba(245,158,11,0.25)',
                  }}>
                    {ordering ? '⏳ Memproses...' : '📋 Kirim Order'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
