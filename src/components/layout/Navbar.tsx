'use client';
import { useState, useEffect } from 'react';
import { NAV_ITEMS, COMPANY_NAME } from '@/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '1rem 2rem',
        background: scrolled || menuOpen ? 'rgba(10,10,10,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(245,158,11,0.2)' : 'none',
        transition: 'all 0.4s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <a href="#hero" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.6rem', fontWeight: 800, color: '#f59e0b',
          }}>🍌 {COMPANY_NAME}</span>
        </a>

        {/* Desktop Nav */}
        {!isMobile && (
          <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
            {NAV_ITEMS.map(item => (
              <li key={item.href}>
                <a href={item.href} style={{
                  color: '#d1d5db', textDecoration: 'none',
                  fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f59e0b')}
                onMouseLeave={e => (e.currentTarget.style.color = '#d1d5db')}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* Desktop CTA */}
        {!isMobile && (
          <a href="#contact" style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: '#0a0a0a', padding: '0.5rem 1.4rem',
            borderRadius: '999px', fontWeight: 700,
            fontSize: '0.85rem', textDecoration: 'none',
          }}>Pesan Sekarang</a>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: 'rgba(245,158,11,0.1)',
            border: '1px solid rgba(245,158,11,0.2)',
            borderRadius: '0.5rem', padding: '0.5rem 0.65rem',
            cursor: 'pointer', display: 'flex',
            flexDirection: 'column', gap: '4px',
          }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', width: '20px', height: '2px',
                background: '#f59e0b', borderRadius: '2px',
                transition: 'all 0.3s ease',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(4px, 4px)'
                  : i === 2 ? 'rotate(-45deg) translate(4px, -4px)'
                  : 'scaleX(0)' : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        )}
      </nav>

      {/* Mobile Overlay */}
      {isMobile && menuOpen && (
        <div onClick={() => setMenuOpen(false)} style={{
          position: 'fixed', inset: 0, zIndex: 98,
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
        }} />
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <div style={{
          position: 'fixed', top: 0, right: 0,
          width: '280px', height: '100vh',
          background: '#111111',
          borderLeft: '1px solid rgba(245,158,11,0.15)',
          zIndex: 99,
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          padding: '5rem 2rem 2rem',
          display: 'flex', flexDirection: 'column', gap: '0.5rem',
        }}>
          {NAV_ITEMS.map(item => (
            <a key={item.href} href={item.href}
              onClick={() => setMenuOpen(false)} style={{
                color: '#d1d5db', textDecoration: 'none',
                fontSize: '1.1rem', fontWeight: 500,
                padding: '0.85rem 1rem', borderRadius: '0.75rem',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                transition: 'all 0.2s ease', display: 'block',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = '#f59e0b';
                (e.currentTarget as HTMLAnchorElement).style.paddingLeft = '1.4rem';
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(245,158,11,0.06)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = '#d1d5db';
                (e.currentTarget as HTMLAnchorElement).style.paddingLeft = '1rem';
                (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
              }}>
              {item.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)} style={{
            marginTop: '1.5rem',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: '#0a0a0a', padding: '0.9rem',
            borderRadius: '999px', fontWeight: 700,
            textDecoration: 'none', textAlign: 'center',
          }}>🛒 Pesan Sekarang</a>
          <div style={{ marginTop: 'auto', color: '#4b5563', fontSize: '0.8rem', textAlign: 'center' }}>
            © 2025 BananaKu
          </div>
        </div>
      )}
    </>
  );
}
