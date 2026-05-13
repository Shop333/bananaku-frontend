'use client';
import { useEffect, useRef, useState } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
}

export default function AnimatedSection({
  children, delay = 0, direction = 'up',
}: AnimatedSectionProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const transforms = {
    up: visible ? 'translateY(0)' : 'translateY(40px)',
    left: visible ? 'translateX(0)' : 'translateX(-40px)',
    right: visible ? 'translateX(0)' : 'translateX(40px)',
  };

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: transforms[direction],
      transition: `all 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}
