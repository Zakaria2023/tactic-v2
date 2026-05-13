'use client';

import PageHero, { PageBreadcrumb } from '@/components/ui/PageHero';
import PageScene from '@/components/three/PageScene';
import { T } from '../contexts/LanguageContext';

const positions = [
  { num: 1, location: 'Amman', type: 'Full-time', dept: 'Engineering' },
  { num: 2, location: 'Riyadh', type: 'Full-time', dept: 'Mobile' },
  { num: 3, location: 'Remote', type: 'Full-time', dept: 'Design' },
  { num: 4, location: 'Amman', type: 'Full-time', dept: 'Security' },
  { num: 5, location: 'Remote', type: 'Full-time', dept: 'Infrastructure' },
  { num: 6, location: 'Riyadh', type: 'Full-time', dept: 'Sales' },
];

export default function CareersPage() {
  return (
    <>
      <PageHero canvas={<PageScene type="portfolio" />}>
        <PageBreadcrumb current="nav.careers" />
        <div className="page-title-wrap">
          <div className="page-eyebrow"><T k="careers.eyebrow" /></div>
          <h1 className="page-title">
            <span><T k="careers.h1.1" /></span>{' '}
            <span className="accent"><T k="careers.h1.2" /></span>
            <span><T k="careers.h1.3" /></span>
          </h1>
          <p className="page-subtitle"><T k="careers.subtitle" /></p>
        </div>
      </PageHero>

      <section className="careers-list-wrap">
        <div className="careers-list">
          {positions.map((p) => (
            <div className="career-card" key={p.num}>
              <div className="career-meta">
                <span className="career-dept">{p.dept}</span>
                <span className="career-pill"><T k={`pos.${p.num}.type`} /></span>
                <span className="career-pill"><T k={`pos.${p.num}.loc`} /></span>
              </div>
              <h3 className="career-title"><T k={`pos.${p.num}.title`} /></h3>
              <p className="career-desc"><T k={`pos.${p.num}.desc`} /></p>
              <a
                href={`mailto:careers@takteeq.com?subject=Application for Position ${p.num}`}
                className="career-apply"
              >
                <span><T k="pos.apply" /></span>
                <span>→</span>
              </a>
            </div>
          ))}
        </div>

        <div className="careers-cta">
          <h3 className="careers-cta-title"><T k="careers.cta.title" /></h3>
          <p className="careers-cta-desc"><T k="careers.cta.desc" /></p>
          <a href="mailto:careers@takteeq.com" className="btn btn-primary">
            <span><T k="careers.cta.btn" /></span>
            <span className="btn-arrow">→</span>
          </a>
        </div>
      </section>
    </>
  );
}
