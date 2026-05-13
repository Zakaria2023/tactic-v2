'use client';

import PageHero, { PageBreadcrumb } from '@/components/ui/PageHero';
import PageScene from '@/components/three/PageScene';
import { T } from '../contexts/LanguageContext';

const sections = [
  { id: 'c1', num: '01', titleKey: 'cookies.s1.title' },
  { id: 'c2', num: '02', titleKey: 'cookies.s2.title' },
  { id: 'c3', num: '03', titleKey: 'cookies.s3.title' },
  { id: 'c4', num: '04', titleKey: 'cookies.s4.title' },
  { id: 'c5', num: '05', titleKey: 'cookies.s5.title' },
];

export default function CookiesPage() {
  return (
    <>
      <PageHero canvas={<PageScene type="about" />} minHeight="40vh">
        <PageBreadcrumb current="footer.policy.3" />
        <div className="page-title-wrap">
          <div className="page-eyebrow"><T k="legal.eyebrow" /></div>
          <h1 className="page-title">
            <span><T k="cookies.h1.1" /></span>{' '}
            <span className="accent"><T k="cookies.h1.2" /></span>
            <span><T k="cookies.h1.3" /></span>
          </h1>
          <p className="page-subtitle"><T k="cookies.subtitle" /></p>
        </div>
      </PageHero>

      <article className="legal-article">
        <div className="legal-meta-bar">
          <div>
            <span className="legal-meta-label"><T k="legal.updated" /></span>
            <span className="legal-meta-val">April 15, 2026</span>
          </div>
          <div>
            <span className="legal-meta-label"><T k="legal.version" /></span>
            <span className="legal-meta-val">2.0</span>
          </div>
        </div>

        <div className="legal-toc">
          <p className="legal-toc-title"><T k="legal.toc" /></p>
          <ul className="legal-toc-list">
            {sections.map((s) => (
              <li key={s.id}><a href={`#${s.id}`}><T k={s.titleKey} /></a></li>
            ))}
          </ul>
        </div>

        <div className="legal-content">
          <section id="c1">
            <h2><span className="legal-num">01.</span> <T k="cookies.s1.title" /></h2>
            <p><T k="cookies.s1.p1" /></p>
            <p><T k="cookies.s1.p2" /></p>
          </section>

          <section id="c2">
            <h2><span className="legal-num">02.</span> <T k="cookies.s2.title" /></h2>
            <h3><T k="cookies.s2.h1" /></h3>
            <p><T k="cookies.s2.p1" /></p>
            <ul>
              <li><T k="cookies.s2.l1" /></li>
              <li><T k="cookies.s2.l2" /></li>
              <li><T k="cookies.s2.l3" /></li>
            </ul>
            <h3><T k="cookies.s2.h2" /></h3>
            <p><T k="cookies.s2.p2" /></p>
            <ul>
              <li><T k="cookies.s2.l4" /></li>
              <li><T k="cookies.s2.l5" /></li>
              <li><T k="cookies.s2.l6" /></li>
            </ul>
            <h3><T k="cookies.s2.h3" /></h3>
            <p><T k="cookies.s2.p3" /></p>
            <ul>
              <li><T k="cookies.s2.l7" /></li>
              <li><T k="cookies.s2.l8" /></li>
            </ul>
          </section>

          <section id="c3">
            <h2><span className="legal-num">03.</span> <T k="cookies.s3.title" /></h2>
            <p><T k="cookies.s3.p1" /></p>
          </section>

          <section id="c4">
            <h2><span className="legal-num">04.</span> <T k="cookies.s4.title" /></h2>
            <p><T k="cookies.s4.p1" /></p>
            <ul>
              <li><T k="cookies.s4.l1" /></li>
              <li><T k="cookies.s4.l2" /></li>
              <li><T k="cookies.s4.l3" /></li>
              <li><T k="cookies.s4.l4" /></li>
            </ul>
            <p><T k="cookies.s4.p2" /></p>
          </section>

          <section id="c5">
            <h2><span className="legal-num">05.</span> <T k="cookies.s5.title" /></h2>
            <p><T k="cookies.s5.p1" /></p>
            <p><T k="cookies.s5.p2" /></p>
          </section>
        </div>
      </article>
    </>
  );
}
