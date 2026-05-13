'use client';

import PageHero, { PageBreadcrumb } from '@/components/ui/PageHero';
import PageScene from '@/components/three/PageScene';
import { T } from '../contexts/LanguageContext';

const sections = [
  { id: 't1', num: '01', titleKey: 'terms.s1.title' },
  { id: 't2', num: '02', titleKey: 'terms.s2.title' },
  { id: 't3', num: '03', titleKey: 'terms.s3.title' },
  { id: 't4', num: '04', titleKey: 'terms.s4.title' },
  { id: 't5', num: '05', titleKey: 'terms.s5.title' },
  { id: 't6', num: '06', titleKey: 'terms.s6.title' },
  { id: 't7', num: '07', titleKey: 'terms.s7.title' },
  { id: 't8', num: '08', titleKey: 'terms.s8.title' },
];

export default function TermsPage() {
  return (
    <>
      <PageHero canvas={<PageScene type="about" />} minHeight="40vh">
        <PageBreadcrumb current="footer.policy.2" />
        <div className="page-title-wrap">
          <div className="page-eyebrow"><T k="legal.eyebrow" /></div>
          <h1 className="page-title">
            <span><T k="terms.h1.1" /></span>{' '}
            <span className="accent"><T k="terms.h1.2" /></span>
            <span><T k="terms.h1.3" /></span>
          </h1>
          <p className="page-subtitle"><T k="terms.subtitle" /></p>
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
            <span className="legal-meta-val">4.1</span>
          </div>
          <div>
            <span className="legal-meta-label"><T k="legal.jurisdiction" /></span>
            <span className="legal-meta-val">Jordan / KSA / Syria</span>
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
          <section id="t1">
            <h2><span className="legal-num">01.</span> <T k="terms.s1.title" /></h2>
            <p><T k="terms.s1.p1" /></p>
            <p><T k="terms.s1.p2" /></p>
          </section>
          <section id="t2">
            <h2><span className="legal-num">02.</span> <T k="terms.s2.title" /></h2>
            <p><T k="terms.s2.p1" /></p>
            <p><T k="terms.s2.p2" /></p>
          </section>
          <section id="t3">
            <h2><span className="legal-num">03.</span> <T k="terms.s3.title" /></h2>
            <p><T k="terms.s3.p1" /></p>
            <ul>
              <li><T k="terms.s3.l1" /></li>
              <li><T k="terms.s3.l2" /></li>
              <li><T k="terms.s3.l3" /></li>
            </ul>
            <p><T k="terms.s3.p2" /></p>
          </section>
          <section id="t4">
            <h2><span className="legal-num">04.</span> <T k="terms.s4.title" /></h2>
            <p><T k="terms.s4.p1" /></p>
            <p><T k="terms.s4.p2" /></p>
          </section>
          <section id="t5">
            <h2><span className="legal-num">05.</span> <T k="terms.s5.title" /></h2>
            <p><T k="terms.s5.p1" /></p>
          </section>
          <section id="t6">
            <h2><span className="legal-num">06.</span> <T k="terms.s6.title" /></h2>
            <p><T k="terms.s6.p1" /></p>
            <p><T k="terms.s6.p2" /></p>
          </section>
          <section id="t7">
            <h2><span className="legal-num">07.</span> <T k="terms.s7.title" /></h2>
            <p><T k="terms.s7.p1" /></p>
            <ul>
              <li><T k="terms.s7.l1" /></li>
              <li><T k="terms.s7.l2" /></li>
              <li><T k="terms.s7.l3" /></li>
            </ul>
          </section>
          <section id="t8">
            <h2><span className="legal-num">08.</span> <T k="terms.s8.title" /></h2>
            <p><T k="terms.s8.p1" /></p>
            <p><T k="terms.s8.p2" /></p>
          </section>
        </div>
      </article>
    </>
  );
}
