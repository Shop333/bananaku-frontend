import { useEffect, useState } from 'react';

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setScrollDirection(current > prevScrollY ? 'down' : 'up');
      setPrevScrollY(current);
      setScrollY(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [prevScrollY]);

  return { scrollY, scrollDirection, isScrolled: scrollY > 50 };
}
