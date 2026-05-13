'use client';

import PageHero, { PageBreadcrumb } from '@/components/ui/PageHero';
import PageScene from '@/components/three/PageScene';
import { T } from '../contexts/LanguageContext';

const sections = [
  { id: 'p1', num: '01', titleKey: 'privacy.s1.title' },
  { id: 'p2', num: '02', titleKey: 'privacy.s2.title' },
  { id: 'p3', num: '03', titleKey: 'privacy.s3.title' },
  { id: 'p4', num: '04', titleKey: 'privacy.s4.title' },
  { id: 'p5', num: '05', titleKey: 'privacy.s5.title' },
  { id: 'p6', num: '06', titleKey: 'privacy.s6.title' },
  { id: 'p7', num: '07', titleKey: 'privacy.s7.title' },
  { id: 'p8', num: '08', titleKey: 'privacy.s8.title' },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero canvas={<PageScene type="about" />} minHeight="40vh">
        <PageBreadcrumb current="footer.policy.1" />
        <div className="page-title-wrap">
          <div className="page-eyebrow"><T k="legal.eyebrow" /></div>
          <h1 className="page-title">
            <span><T k="privacy.h1.1" /></span>{' '}
            <span className="accent"><T k="privacy.h1.2" /></span>
            <span><T k="privacy.h1.3" /></span>
          </h1>
          <p className="page-subtitle"><T k="privacy.subtitle" /></p>
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
            <span className="legal-meta-val">3.2</span>
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
          <section id="p1">
            <h2><span className="legal-num">01.</span> <T k="privacy.s1.title" /></h2>
            <p><T k="privacy.s1.p1" /></p>
            <h3><T k="privacy.s1.h1" /></h3>
            <ul>
              {['l1', 'l2', 'l3', 'l4'].map((l) => (<li key={l}><T k={`privacy.s1.${l}`} /></li>))}
            </ul>
            <h3><T k="privacy.s1.h2" /></h3>
            <ul>
              {['l5', 'l6', 'l7'].map((l) => (<li key={l}><T k={`privacy.s1.${l}`} /></li>))}
            </ul>
          </section>

          <section id="p2">
            <h2><span className="legal-num">02.</span> <T k="privacy.s2.title" /></h2>
            <p><T k="privacy.s2.p1" /></p>
            <ul>
              {['l1', 'l2', 'l3', 'l4'].map((l) => (<li key={l}><T k={`privacy.s2.${l}`} /></li>))}
            </ul>
            <p><T k="privacy.s2.p2" /></p>
          </section>

          <section id="p3">
            <h2><span className="legal-num">03.</span> <T k="privacy.s3.title" /></h2>
            <p><T k="privacy.s3.p1" /></p>
            <ul>
              {['l1', 'l2', 'l3'].map((l) => (<li key={l}><T k={`privacy.s3.${l}`} /></li>))}
            </ul>
          </section>

          <section id="p4">
            <h2><span className="legal-num">04.</span> <T k="privacy.s4.title" /></h2>
            <p><T k="privacy.s4.p1" /></p>
          </section>

          <section id="p5">
            <h2><span className="legal-num">05.</span> <T k="privacy.s5.title" /></h2>
            <p><T k="privacy.s5.p1" /></p>
            <ul>
              {['l1', 'l2', 'l3', 'l4', 'l5'].map((l) => (<li key={l}><T k={`privacy.s5.${l}`} /></li>))}
            </ul>
          </section>

          <section id="p6">
            <h2><span className="legal-num">06.</span> <T k="privacy.s6.title" /></h2>
            <p><T k="privacy.s6.p1" /></p>
            <ul>
              {['l1', 'l2', 'l3', 'l4', 'l5'].map((l) => (<li key={l}><T k={`privacy.s6.${l}`} /></li>))}
            </ul>
            <p><T k="privacy.s6.p2" /></p>
          </section>

          <section id="p7">
            <h2><span className="legal-num">07.</span> <T k="privacy.s7.title" /></h2>
            <p><T k="privacy.s7.p1" /></p>
          </section>

          <section id="p8">
            <h2><span className="legal-num">08.</span> <T k="privacy.s8.title" /></h2>
            <p><T k="privacy.s8.p1" /></p>
            <ul>
              <li>Email: <a href="mailto:privacy@takteeq.com">privacy@takteeq.com</a></li>
              <li><T k="privacy.s8.l2" /></li>
            </ul>
          </section>
        </div>
      </article>
    </>
  );
}
