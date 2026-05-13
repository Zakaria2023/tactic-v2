'use client';

import { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0,
      mouseY = 0,
      fx = 0,
      fy = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    };

    const animate = () => {
      fx += (mouseX - fx) * 0.15;
      fy += (mouseY - fy) * 0.15;
      follower.style.left = fx + 'px';
      follower.style.top = fy + 'px';
      rafId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove);
    animate();

    // Hover effects on interactive elements (delegated via document)
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, .nav-link, [data-cursor-hover]')) {
        cursor.classList.add('hover');
        follower.classList.add('hover');
      }
    };
    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, .nav-link, [data-cursor-hover]')) {
        cursor.classList.remove('hover');
        follower.classList.remove('hover');
      }
    };
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-follower" ref={followerRef} />
    </>
  );
}
