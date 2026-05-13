'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { T } from '@/app/contexts/LanguageContext';

interface BreadcrumbProps {
  current: string;
  intermediate?: { label: string; href: string };
}

export function PageBreadcrumb({ current, intermediate }: BreadcrumbProps) {
  return (
    <div className="page-breadcrumb">
      <Link href="/"><T k="nav.home" /></Link>
      {intermediate && (
        <>
          <span className="page-breadcrumb-sep">/</span>
          <Link href={intermediate.href}><T k={intermediate.label} /></Link>
        </>
      )}
      <span className="page-breadcrumb-sep">/</span>
      <span className="page-breadcrumb-current"><T k={current} /></span>
    </div>
  );
}

interface PageHeroProps {
  children: ReactNode;
  canvas?: ReactNode;
  minHeight?: string;
}

export default function PageHero({ children, canvas, minHeight }: PageHeroProps) {
  return (
    <section className="page-hero" style={minHeight ? { minHeight } : undefined}>
      <div className="page-hero-canvas-wrap">{canvas}</div>
      <div className="page-hero-content">{children}</div>
    </section>
  );
}
