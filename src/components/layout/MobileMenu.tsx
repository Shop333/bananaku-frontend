'use client';
import { useState, useEffect } from 'react';
import { NAV_ITEMS, COMPANY_NAME } from '@/constants';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll saat menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Navbar Mobile */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '1rem 1.25rem',
        background: scrolled || open ? 'rgba(10,10,10,0.97)' : 'transparent',
        backdropFilter: scrolled || open ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(245,158,11,0.15)' : 'none',
        transition: 'all 0.3s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <a href="#hero" style={{ textDecoration: 'none' }} onClick={() => setOpen(false)}>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.4rem', fontWeight: 800, color: '#f59e0b',
          }}>
            🍌 {COMPANY_NAME}
          </span>
        </a>

        {/* Hamburger */}
        <button onClick={() => setOpen(!open)} style={{
          background: 'rgba(245,158,11,0.1)',
          border: '1px solid rgba(245,158,11,0.2)',
          borderRadius: '0.5rem',
          padding: '0.5rem 0.65rem',
          cursor: 'pointer',
          display: 'flex', flexDirection: 'column',
          gap: '4px', alignItems: 'center', justifyContent: 'center',
        }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block',
              width: '20px', height: '2px',
              background: '#f59e0b',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              transform: open
                ? i === 0 ? 'rotate(45deg) translate(4px, 4px)'
                : i === 2 ? 'rotate(-45deg) translate(4px, -4px)'
                : 'scaleX(0)'
                : 'none',
              opacity: open && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Overlay */}
      {open && (
        <div onClick={() => setOpen(false)} style={{
          position: 'fixed', inset: 0, zIndex: 98,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
        }} />
      )}

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0,
        width: '280px', height: '100vh',
        background: '#111111',
        borderLeft: '1px solid rgba(245,158,11,0.15)',
        zIndex: 99,
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        padding: '5rem 2rem 2rem',
        display: 'flex', flexDirection: 'column', gap: '0.5rem',
      }}>
        {/* Nav Links */}
        {NAV_ITEMS.map((item, i) => (
          <a key={item.href} href={item.href}
            onClick={() => setOpen(false)}
            style={{
              color: '#d1d5db', textDecoration: 'none',
              fontSize: '1.1rem', fontWeight: 500,
              padding: '0.85rem 1rem',
              borderRadius: '0.75rem',
              transition: 'all 0.2s ease',
              display: 'block',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              animationDelay: `${i * 0.05}s`,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.color = '#f59e0b';
              (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(245,158,11,0.06)';
              (e.currentTarget as HTMLAnchorElement).style.paddingLeft = '1.4rem';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.color = '#d1d5db';
              (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
              (e.currentTarget as HTMLAnchorElement).style.paddingLeft = '1rem';
            }}>
            {item.label}
          </a>
        ))}

        {/* CTA */}
        <a href="#contact" onClick={() => setOpen(false)} style={{
          marginTop: '1.5rem',
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          color: '#0a0a0a', padding: '0.9rem',
          borderRadius: '999px', fontWeight: 700,
          fontSize: '1rem', textDecoration: 'none',
          textAlign: 'center',
          boxShadow: '0 0 25px rgba(245,158,11,0.25)',
        }}>
          🛒 Pesan Sekarang
        </a>

        {/* Footer drawer */}
        <div style={{
          marginTop: 'auto',
          color: '#4b5563', fontSize: '0.8rem', textAlign: 'center',
        }}>
          © 2025 BananaKu
        </div>
      </div>
    </>
  );
}
