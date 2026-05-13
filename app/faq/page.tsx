'use client';

import { useState } from 'react';
import PageHero, { PageBreadcrumb } from '@/components/ui/PageHero';
import PageScene from '@/components/three/PageScene';
import { T } from '../contexts/LanguageContext';

const categories = ['all', 'general', 'pricing', 'process', 'support'];

const faqs = [
  { cat: 'general', qKey: 'faq.q.1', aKey: 'faq.a.1' },
  { cat: 'general', qKey: 'faq.q.2', aKey: 'faq.a.2' },
  { cat: 'process', qKey: 'faq.q.3', aKey: 'faq.a.3' },
  { cat: 'pricing', qKey: 'faq.q.4', aKey: 'faq.a.4' },
  { cat: 'pricing', qKey: 'faq.q.5', aKey: 'faq.a.5' },
  { cat: 'process', qKey: 'faq.q.6', aKey: 'faq.a.6' },
  { cat: 'support', qKey: 'faq.q.7', aKey: 'faq.a.7' },
  { cat: 'support', qKey: 'faq.q.8', aKey: 'faq.a.8' },
  { cat: 'process', qKey: 'faq.q.9', aKey: 'faq.a.9' },
  { cat: 'general', qKey: 'faq.q.10', aKey: 'faq.a.10' },
  { cat: 'general', qKey: 'faq.q.11', aKey: 'faq.a.11' },
  { cat: 'general', qKey: 'faq.q.12', aKey: 'faq.a.12' },
];

export default function FAQPage() {
  const [filter, setFilter] = useState('all');
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const filtered = faqs.filter((f) => filter === 'all' || f.cat === filter);

  return (
    <>
      <PageHero canvas={<PageScene type="about" />} minHeight="45vh">
        <PageBreadcrumb current="footer.policy.6" />
        <div className="page-title-wrap">
          <div className="page-eyebrow"><T k="faq.eyebrow" /></div>
          <h1 className="page-title"><T k="faq.h1.1" /><T k="faq.h1.3" /></h1>
          <p className="page-subtitle"><T k="faq.subtitle" /></p>
        </div>
      </PageHero>

      <div className="faq-wrap">
        <div className="faq-categories">
          {categories.map((c) => (
            <button
              key={c}
              className={`faq-cat ${filter === c ? 'active' : ''}`}
              onClick={() => { setFilter(c); setOpenIdx(null); }}
            >
              <T k={`faq.cat.${c}`} />
            </button>
          ))}
        </div>

        <div className="faq-list">
          {filtered.map((f, i) => (
            <div className={`faq-item ${openIdx === i ? 'open' : ''}`} key={f.qKey}>
              <button className="faq-question" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                <span><T k={f.qKey} /></span>
                <span className="faq-toggle">+</span>
              </button>
              <div className="faq-answer">
                <p><T k={f.aKey} /></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
