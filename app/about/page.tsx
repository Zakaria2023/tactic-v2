'use client';

import PageHero, { PageBreadcrumb } from '@/components/ui/PageHero';
import PageScene from '@/components/three/PageScene';
import { T } from '../contexts/LanguageContext';

const timeline = [
  { year: '2014', titleKey: 'tl.1.title', descKey: 'tl.1.desc' },
  { year: '2016', titleKey: 'tl.2.title', descKey: 'tl.2.desc' },
  { year: '2018', titleKey: 'tl.3.title', descKey: 'tl.3.desc' },
  { year: '2021', titleKey: 'tl.4.title', descKey: 'tl.4.desc' },
  { year: '2023', titleKey: 'tl.5.title', descKey: 'tl.5.desc' },
  { year: '2026', titleKey: 'tl.6.title', descKey: 'tl.6.desc' },
];

const team = [
  { initials: 'OK', nameKey: 'team.1.name', roleKey: 'team.1.role', bioKey: 'team.1.bio' },
  { initials: 'RA', nameKey: 'team.2.name', roleKey: 'team.2.role', bioKey: 'team.2.bio' },
  { initials: 'MH', nameKey: 'team.3.name', roleKey: 'team.3.role', bioKey: 'team.3.bio' },
  { initials: 'LA', nameKey: 'team.4.name', roleKey: 'team.4.role', bioKey: 'team.4.bio' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero canvas={<PageScene type="about" />}>
        <PageBreadcrumb current="nav.about" />
        <div className="page-title-wrap">
          <div className="page-eyebrow"><T k="about.eyebrow" /></div>
          <h1 className="page-title">
            <span><T k="about.h1.1" /></span>{' '}
            <span className="accent"><T k="about.h1.2" /></span>{' '}
            <span><T k="about.h1.3" /></span>
          </h1>
          <p className="page-subtitle"><T k="about.subtitle" /></p>
          <div className="page-meta-row">
            <div className="page-meta-item">
              <span className="page-meta-label"><T k="about.meta.1" /></span>
              <span className="page-meta-value gold">2014</span>
            </div>
            <div className="page-meta-item">
              <span className="page-meta-label"><T k="about.meta.2" /></span>
              <span className="page-meta-value">120+</span>
            </div>
            <div className="page-meta-item">
              <span className="page-meta-label"><T k="about.meta.3" /></span>
              <span className="page-meta-value">3</span>
            </div>
            <div className="page-meta-item">
              <span className="page-meta-label"><T k="about.meta.4" /></span>
              <span className="page-meta-value">500+</span>
            </div>
          </div>
        </div>
      </PageHero>

      <section className="about-story">
        <div className="about-story-grid">
          <div className="about-story-sticky">
            <span className="about-story-label"><T k="about.story.label" /></span>
            <h2 className="about-story-title"><T k="about.story.title" /></h2>
          </div>
          <div>
            <p className="about-story-text"><T k="about.story.p1" /></p>
            <p className="about-story-text"><T k="about.story.p2" /></p>
            <p className="about-story-text"><T k="about.story.p3" /></p>
            <p className="about-story-text"><T k="about.story.p4" /></p>
          </div>
        </div>
      </section>

      <div className="about-pillars">
        {[
          { num: '01', icon: 'V', titleKey: 'pillar.1.title', descKey: 'pillar.1.desc' },
          { num: '02', icon: 'M', titleKey: 'pillar.2.title', descKey: 'pillar.2.desc' },
          { num: '03', icon: 'C', titleKey: 'pillar.3.title', descKey: 'pillar.3.desc' },
        ].map((p) => (
          <div className="pillar-card" key={p.num}>
            <span className="pillar-num">{p.num}</span>
            <div className="pillar-icon">{p.icon}</div>
            <h3 className="pillar-title"><T k={p.titleKey} /></h3>
            <p className="pillar-desc"><T k={p.descKey} /></p>
          </div>
        ))}
      </div>

      <section className="about-timeline">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="section-num">// JOURNEY</span>
          <h2 className="section-title" style={{ fontSize: 44 }}>
            <span><T k="timeline.title" /></span>{' '}
            <span className="accent"><T k="timeline.title.accent" /></span>
          </h2>
        </div>
        <div className="timeline-wrap">
          <div className="timeline-line"></div>
          {timeline.map((item) => (
            <div className="timeline-item" key={item.year}>
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3 className="timeline-title"><T k={item.titleKey} /></h3>
                <p className="timeline-desc"><T k={item.descKey} /></p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-team">
        <div className="section-header" style={{ textAlign: 'center' }}>
          <span className="section-num">// LEADERSHIP</span>
          <h2 className="section-title" style={{ fontSize: 44 }}>
            <span><T k="team.title" /></span>{' '}
            <span className="accent"><T k="team.title.accent" /></span>
          </h2>
          <p className="section-subtitle"><T k="team.subtitle" /></p>
        </div>
        <div className="team-grid">
          {team.map((m) => (
            <div className="team-card" key={m.initials}>
              <div className="team-avatar">{m.initials}</div>
              <h4 className="team-name"><T k={m.nameKey} /></h4>
              <p className="team-role"><T k={m.roleKey} /></p>
              <p className="team-bio"><T k={m.bioKey} /></p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
