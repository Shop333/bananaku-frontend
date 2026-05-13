'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { getProducts } from '@/services/productService';
import { createOrder } from '@/services/orderService';
import { formatPrice } from '@/lib/utils';

type Category = 'semua' | 'segar' | 'olahan' | 'ekspor';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  stock: number;
  is_featured: boolean;
  image: string | null;
}

interface OrderForm {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  quantity: number;
}

export default function ProductSection() {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<Category>('semua');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderForm, setOrderForm] = useState<OrderForm>({
    customerName: '', customerEmail: '',
    customerPhone: '', address: '', quantity: 1,
  });
  const [ordering, setOrdering] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [orderError, setOrderError] = useState('');
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
    setLoading(true);
    getProducts(activeTab)
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeTab]);

  const handleOrder = async () => {
    if (!orderForm.customerName || !orderForm.customerEmail || !orderForm.customerPhone || !orderForm.address) {
      setOrderError('Semua field wajib diisi!');
      return;
    }
    if (!selectedProduct) return;
    setOrderError('');
    setOrdering(true);
    try {
      await createOrder({
        customerName: orderForm.customerName,
        customerEmail: orderForm.customerEmail,
        customerPhone: orderForm.customerPhone,
        address: orderForm.address,
        items: [{
          productId: selectedProduct.id,
          productName: selectedProduct.name,
          quantity: orderForm.quantity,
          price: selectedProduct.price,
        }],
        totalPrice: selectedProduct.price * orderForm.quantity,
      });
      setOrdered(true);
      setTimeout(() => {
        setOrdered(false);
        setSelectedProduct(null);
        setOrderForm({ customerName: '', customerEmail: '', customerPhone: '', address: '', quantity: 1 });
      }, 3000);
    } catch {
      setOrderError('Gagal membuat order. Coba lagi!');
    } finally {
      setOrdering(false);
    }
  };

  const tabs: { key: Category; label: string }[] = [
    { key: 'semua', label: 'Semua' },
    { key: 'segar', label: '🍌 Segar' },
    { key: 'olahan', label: '🍟 Olahan' },
    { key: 'ekspor', label: '✈️ Ekspor' },
  ];

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
      <section id="products" ref={ref} style={{ padding: '7rem 2rem', background: '#111111' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Header */}
          <div style={{
            textAlign: 'center', marginBottom: '3rem',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.7s ease',
          }}>
            <span style={{
              color: '#f59e0b', fontSize: '0.85rem',
              fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase',
            }}>Produk Kami</span>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800, color: '#f5f5f5', marginTop: '0.75rem',
            }}>
              Pilihan <span style={{ color: '#f59e0b' }}>Terbaik</span> untuk Anda
            </h2>
          </div>

          {/* Tabs */}
          <div style={{
            display: 'flex', justifyContent: 'center',
            gap: '0.75rem', marginBottom: '3rem', flexWrap: 'wrap',
            opacity: visible ? 1 : 0, transition: 'all 0.7s ease 0.2s',
          }}>
            {tabs.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
                padding: '0.5rem 1.4rem', borderRadius: '999px',
                border: 'none', cursor: 'pointer',
                fontWeight: 600, fontSize: '0.9rem', transition: 'all 0.25s ease',
                background: activeTab === tab.key
                  ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                  : 'rgba(255,255,255,0.05)',
                color: activeTab === tab.key ? '#0a0a0a' : '#9ca3af',
                boxShadow: activeTab === tab.key ? '0 0 20px rgba(245,158,11,0.3)' : 'none',
              }}>{tab.label}</button>
            ))}
          </div>

          {/* Loading */}
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', gap: '1rem' }}>
              <div style={{
                width: '40px', height: '40px',
                border: '3px solid rgba(245,158,11,0.2)',
                borderTop: '3px solid #f59e0b',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }} />
              <span style={{ color: '#6b7280' }}>Memuat produk...</span>
            </div>
          )}

          {/* Grid */}
          {!loading && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
              gap: '1.5rem',
            }}>
              {products.map((product, i) => (
                <div key={product.id} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(245,158,11,0.1)',
                  borderRadius: '1.25rem', overflow: 'hidden',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(40px)',
                  transition: `all 0.5s ease ${i * 0.08}s`,
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = 'rgba(245,158,11,0.4)';
                  el.style.transform = 'translateY(-6px)';
                  el.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = 'rgba(245,158,11,0.1)';
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                }}>
                  <div style={{
                    height: '200px', position: 'relative',
                    background: 'linear-gradient(135deg, #1a1a0a, #2a2000)',
                    overflow: 'hidden',
                  }}>
                    {product.image ? (
                      <Image src={product.image} alt={product.name} fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: 'cover' }} />
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
                    }}>{product.category}</span>
                  </div>

                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '1.1rem', fontWeight: 700,
                      color: '#f5f5f5', marginBottom: '0.5rem',
                    }}>{product.name}</h3>
                    <p style={{
                      color: '#6b7280', fontSize: '0.85rem',
                      lineHeight: 1.6, marginBottom: '1.25rem',
                    }}>{product.description}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <span style={{ color: '#f59e0b', fontWeight: 800, fontSize: '1.2rem' }}>
                          {formatPrice(product.price)}
                        </span>
                        <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>/{product.unit}</span>
                      </div>
                      <button onClick={() => setSelectedProduct(product)} style={{
                        background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                        color: '#0a0a0a', border: 'none',
                        padding: '0.5rem 1.2rem', borderRadius: '999px',
                        fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
                      }}>Pesan</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && products.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍌</div>
              <p>Produk tidak ditemukan</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal Order */}
      {selectedProduct && (
        <div onClick={() => !ordering && setSelectedProduct(null)} style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: '#1a1a1a',
            border: '1px solid rgba(245,158,11,0.25)',
            borderRadius: '1.5rem', padding: '2rem',
            maxWidth: '480px', width: '100%',
            boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
            maxHeight: '90vh', overflowY: 'auto',
          }}>

            {ordered ? (
              /* Success state */
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                <h3 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.5rem', color: '#22c55e', fontWeight: 700,
                }}>Order Berhasil!</h3>
                <p style={{ color: '#9ca3af', marginTop: '0.75rem' }}>
                  Pesanan Anda telah diterima. Kami akan segera menghubungi Anda.
                </p>
              </div>
            ) : (
              <>
                {/* Header modal */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <div>
                    <h3 style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '1.3rem', color: '#f5f5f5', fontWeight: 700,
                    }}>Form Pemesanan</h3>
                    <p style={{ color: '#f59e0b', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                      {selectedProduct.name}
                    </p>
                  </div>
                  <button onClick={() => setSelectedProduct(null)} style={{
                    background: 'none', border: 'none',
                    color: '#6b7280', fontSize: '1.5rem', cursor: 'pointer',
                  }}>×</button>
                </div>

                {/* Ringkasan produk */}
                <div style={{
                  background: 'rgba(245,158,11,0.06)',
                  border: '1px solid rgba(245,158,11,0.15)',
                  borderRadius: '0.75rem', padding: '1rem',
                  marginBottom: '1.5rem',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <div>
                    <div style={{ color: '#f5f5f5', fontWeight: 600, fontSize: '0.9rem' }}>
                      {selectedProduct.name}
                    </div>
                    <div style={{ color: '#f59e0b', fontWeight: 800, marginTop: '0.25rem' }}>
                      {formatPrice(selectedProduct.price)}/{selectedProduct.unit}
                    </div>
                  </div>
                  {/* Quantity */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button onClick={() => setOrderForm(f => ({ ...f, quantity: Math.max(1, f.quantity - 1) }))}
                      style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        background: 'rgba(245,158,11,0.1)',
                        border: '1px solid rgba(245,158,11,0.3)',
                        color: '#f59e0b', fontSize: '1.2rem', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>−</button>
                    <span style={{ color: '#f5f5f5', fontWeight: 700, minWidth: '24px', textAlign: 'center' }}>
                      {orderForm.quantity}
                    </span>
                    <button onClick={() => setOrderForm(f => ({ ...f, quantity: f.quantity + 1 }))}
                      style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        background: 'rgba(245,158,11,0.1)',
                        border: '1px solid rgba(245,158,11,0.3)',
                        color: '#f59e0b', fontSize: '1.2rem', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>+</button>
                  </div>
                </div>

                {/* Total */}
                <div style={{
                  textAlign: 'right', marginBottom: '1.5rem',
                  color: '#9ca3af', fontSize: '0.9rem',
                }}>
                  Total:{' '}
                  <span style={{ color: '#f59e0b', fontWeight: 800, fontSize: '1.1rem' }}>
                    {formatPrice(selectedProduct.price * orderForm.quantity)}
                  </span>
                </div>

                {/* Form fields */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <input placeholder="Nama Lengkap *" value={orderForm.customerName}
                    onChange={e => setOrderForm({ ...orderForm, customerName: e.target.value })}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#f59e0b')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(245,158,11,0.2)')} />
                  <input placeholder="Email *" type="email" value={orderForm.customerEmail}
                    onChange={e => setOrderForm({ ...orderForm, customerEmail: e.target.value })}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#f59e0b')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(245,158,11,0.2)')} />
                  <input placeholder="No. WhatsApp *" value={orderForm.customerPhone}
                    onChange={e => setOrderForm({ ...orderForm, customerPhone: e.target.value })}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#f59e0b')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(245,158,11,0.2)')} />
                  <textarea placeholder="Alamat Pengiriman *" rows={3}
                    value={orderForm.address}
                    onChange={e => setOrderForm({ ...orderForm, address: e.target.value })}
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
                    marginTop: '0.5rem',
                    boxShadow: ordering ? 'none' : '0 0 25px rgba(245,158,11,0.25)',
                  }}>
                    {ordering ? '⏳ Memproses...' : '🛒 Konfirmasi Order'}
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
