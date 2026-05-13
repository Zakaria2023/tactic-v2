'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHero, { PageBreadcrumb } from '@/components/ui/PageHero';
import PageScene from '@/components/three/PageScene';
import MiniScene from '@/components/three/MiniScene';
import { T } from '../contexts/LanguageContext';

const projects = [
  { id: 1, cat: 'erp', mini: 0, year: '2026', sector: 'Retail', titleKey: 'proj.1.title', descKey: 'proj.1.desc', tags: ['Laravel', 'Vue.js', 'PostgreSQL'], badge: 'ERP' },
  { id: 2, cat: 'saas', mini: 1, year: '2025', sector: 'EdTech', titleKey: 'proj.2.title', descKey: 'proj.2.desc', tags: ['Next.js', 'Node.js', 'AWS'], badge: 'SaaS' },
  { id: 3, cat: 'mobile', mini: 2, year: '2025', sector: 'Healthcare', titleKey: 'proj.3.title', descKey: 'proj.3.desc', tags: ['Flutter', 'Firebase', 'WebRTC'], badge: 'MOBILE' },
  { id: 4, cat: 'web', mini: 3, year: '2025', sector: 'Real Estate', titleKey: 'proj.4.title', descKey: 'proj.4.desc', tags: ['React', 'Python', 'Three.js'], badge: 'WEB' },
  { id: 5, cat: 'security', mini: 4, year: '2025', sector: 'Finance', titleKey: 'proj.5.title', descKey: 'proj.5.desc', tags: ['Pentest', 'OWASP', 'ISO 27001'], badge: 'SECURITY' },
  { id: 6, cat: 'erp', mini: 5, year: '2024', sector: 'Logistics', titleKey: 'proj.6.title', descKey: 'proj.6.desc', tags: ['.NET', 'Angular', 'SQL Server'], badge: 'ERP' },
  { id: 7, cat: 'saas', mini: 0, year: '2024', sector: 'Restaurants', titleKey: 'proj.7.title', descKey: 'proj.7.desc', tags: ['Vue.js', 'Laravel', 'MySQL'], badge: 'SaaS' },
  { id: 8, cat: 'web', mini: 1, year: '2024', sector: 'Government', titleKey: 'proj.8.title', descKey: 'proj.8.desc', tags: ['Next.js', 'Django', 'Kubernetes'], badge: 'WEB' },
  { id: 9, cat: 'mobile', mini: 2, year: '2024', sector: 'Finance', titleKey: 'proj.9.title', descKey: 'proj.9.desc', tags: ['React Native', 'Node.js', 'PostgreSQL'], badge: 'MOBILE' },
];

const filters = ['all', 'web', 'saas', 'erp', 'mobile', 'security'];

export default function PortfolioPage() {
  const [filter, setFilter] = useState('all');

  return (
    <>
      <PageHero canvas={<PageScene type="portfolio" />}>
        <PageBreadcrumb current="nav.portfolio" />
        <div className="page-title-wrap">
          <div className="page-eyebrow"><T k="port.eyebrow" /></div>
          <h1 className="page-title">
            <span><T k="port.h1.1" /></span>{' '}
            <span className="accent"><T k="port.h1.2" /></span>
            <span><T k="port.h1.3" /></span>
          </h1>
          <p className="page-subtitle"><T k="port.subtitle" /></p>
        </div>
      </PageHero>

      <div className="portfolio-filters">
        {filters.map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            <T k={`filter.${f}`} />
          </button>
        ))}
      </div>

      <div className="portfolio-grid">
        {projects.filter((p) => filter === 'all' || p.cat === filter).map((p) => (
          <div className="portfolio-card" key={p.id}>
            <div className="portfolio-visual">
              <span className="portfolio-badge">{p.badge}</span>
              <MiniScene variant={p.mini} />
            </div>
            <div className="portfolio-info">
              <div className="portfolio-meta">
                <span>{p.year}</span>
                <span className="portfolio-meta-dot"></span>
                <span>{p.sector}</span>
              </div>
              <h3 className="portfolio-title"><T k={p.titleKey} /></h3>
              <p className="portfolio-desc"><T k={p.descKey} /></p>
              <div className="portfolio-tags">
                {p.tags.map((t) => (<span className="portfolio-tag" key={t}>{t}</span>))}
              </div>
              <Link href="#" className="portfolio-link"><T k="proj.case" /></Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
