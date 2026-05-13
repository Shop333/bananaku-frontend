'use client';
import { COMPANY_NAME, COMPANY_EMAIL, COMPANY_PHONE, COMPANY_ADDRESS, NAV_ITEMS } from '@/constants';

export default function Footer() {
  return (
    <footer style={{
      background: '#0a0a0a',
      borderTop: '1px solid rgba(245,158,11,0.15)',
      padding: '4rem 2rem 2rem',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '3rem', marginBottom: '3rem',
      }}>
        {/* Brand */}
        <div>
          <div style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.8rem', fontWeight: 800,
            color: '#f59e0b', marginBottom: '1rem',
          }}>🍌 {COMPANY_NAME}</div>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.7 }}>
            Penghasil pisang premium berkualitas tinggi langsung dari kebun terbaik Indonesia.
          </p>
        </div>

        {/* Nav Links */}
        <div>
          <h4 style={{ color: '#f5f5f5', marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Menu</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {NAV_ITEMS.map(item => (
              <li key={item.href} style={{ marginBottom: '0.5rem' }}>
                <a href={item.href} style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.9rem' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#f59e0b')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ color: '#f5f5f5', marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Kontak</h4>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem' }}>📧 {COMPANY_EMAIL}</p>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem' }}>📱 {COMPANY_PHONE}</p>
          <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>📍 {COMPANY_ADDRESS}</p>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        paddingTop: '1.5rem', textAlign: 'center',
        color: '#4b5563', fontSize: '0.85rem',
      }}>
        © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
