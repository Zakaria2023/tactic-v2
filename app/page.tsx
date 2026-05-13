'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { T, useLanguage } from './contexts/LanguageContext';
import HomeScene from '@/components/three/HomeScene';
import IndustriesSphere from '@/components/three/IndustriesSphere';
import WavingFlag from '@/components/three/WavingFlag';

// ============ DATA ============
const services = [
  { num: '01', mono: 'WD', titleKey: 'svc.1.title', descKey: 'svc.1.desc', features: ['svc.1.f1', 'svc.1.f2', 'svc.1.f3'], tagKey: 'svc.tag.popular' },
  { num: '02', mono: 'SaaS', titleKey: 'svc.2.title', descKey: 'svc.2.desc', features: ['svc.2.f1', 'svc.2.f2', 'svc.2.f3'], tagKey: 'svc.tag.new' },
  { num: '03', mono: 'ERP', titleKey: 'svc.3.title', descKey: 'svc.3.desc', features: ['svc.3.f1', 'svc.3.f2', 'svc.3.f3'], tagKey: 'svc.tag.enterprise' },
  { num: '04', mono: 'App', titleKey: 'svc.4.title', descKey: 'svc.4.desc', features: ['svc.4.f1', 'svc.4.f2', 'svc.4.f3'], tagRaw: 'iOS / Android' },
  { num: '05', mono: 'Sec', titleKey: 'svc.5.title', descKey: 'svc.5.desc', features: ['svc.5.f1', 'svc.5.f2', 'svc.5.f3'], tagKey: 'svc.tag.critical' },
  { num: '06', mono: 'Host', titleKey: 'svc.6.title', descKey: 'svc.6.desc', features: ['svc.6.f1', 'svc.6.f2', 'svc.6.f3'], tagRaw: '99.9% UPTIME' },
  { num: '07', mono: 'Desk', titleKey: 'svc.7.title', descKey: 'svc.7.desc', features: ['svc.7.f1', 'svc.7.f2', 'svc.7.f3'], tagRaw: 'WINDOWS' },
  { num: '08', mono: 'UX', titleKey: 'svc.8.title', descKey: 'svc.8.desc', features: ['svc.8.f1', 'svc.8.f2', 'svc.8.f3'], tagKey: 'svc.tag.creative' },
  { num: '09', mono: '24/7', titleKey: 'svc.9.title', descKey: 'svc.9.desc', features: ['svc.9.f1', 'svc.9.f2', 'svc.9.f3'], tagRaw: '24/7' },
];

const whyItems = [
  { num: '01', titleKey: 'why.1.title', descKey: 'why.1.desc', metaKey: 'why.1.meta' },
  { num: '02', titleKey: 'why.2.title', descKey: 'why.2.desc', metaKey: 'why.2.meta' },
  { num: '03', titleKey: 'why.3.title', descKey: 'why.3.desc', metaKey: 'why.3.meta' },
  { num: '04', titleKey: 'why.4.title', descKey: 'why.4.desc', metaKey: 'why.4.meta' },
  { num: '05', titleKey: 'why.5.title', descKey: 'why.5.desc', metaKey: 'why.5.meta' },
  { num: '06', titleKey: 'why.6.title', descKey: 'why.6.desc', metaKey: 'why.6.meta' },
];

const industries = [
  { code: 'H1', key: 'ind.1' }, { code: 'E2', key: 'ind.2' }, { code: 'R3', key: 'ind.3' },
  { code: 'R4', key: 'ind.4' }, { code: 'L5', key: 'ind.5' }, { code: 'R6', key: 'ind.6' },
  { code: 'F7', key: 'ind.7' }, { code: 'G8', key: 'ind.8' }, { code: 'S9', key: 'ind.9' },
];

const processSteps = [
  { num: '01', phaseKey: 'process.1.phase', titleKey: 'process.1.title', descKey: 'process.1.desc' },
  { num: '02', phaseKey: 'process.2.phase', titleKey: 'process.2.title', descKey: 'process.2.desc' },
  { num: '03', phaseKey: 'process.3.phase', titleKey: 'process.3.title', descKey: 'process.3.desc' },
  { num: '04', phaseKey: 'process.4.phase', titleKey: 'process.4.title', descKey: 'process.4.desc' },
];

const techCats = [
  { titleKey: 'tech.frontend', tags: ['React', 'Vue.js', 'Next.js', 'Angular', 'Three.js', 'Tailwind'] },
  { titleKey: 'tech.backend', tags: ['Node.js', 'Laravel', 'Django', '.NET', 'Go', 'GraphQL'] },
  { titleKey: 'tech.mobile', tags: ['Flutter', 'React Native', 'Swift', 'Kotlin'] },
  { titleKey: 'tech.cloud', tags: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD'] },
  { titleKey: 'tech.db', tags: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis'] },
];

const testimonials = [
  { avatar: 'AK', quoteKey: 'test.1.quote', nameKey: 'test.1.name', roleKey: 'test.1.role' },
  { avatar: 'SM', quoteKey: 'test.2.quote', nameKey: 'test.2.name', roleKey: 'test.2.role' },
  { avatar: 'YH', quoteKey: 'test.3.quote', nameKey: 'test.3.name', roleKey: 'test.3.role' },
];

const offices = [
  { country: 'jordan' as const, code: 'HQ — 01', nameKey: 'office.amman', tagKey: 'office.amman.tag', addrKey: 'office.amman.addr', email: 'amman@takteeq.com', phone: '+962 6 500 0000', team: '80+', clients: '350+' },
  { country: 'syria' as const, code: 'BR — 02', nameKey: 'office.aleppo', tagKey: 'office.aleppo.tag', addrKey: 'office.aleppo.addr', email: 'aleppo@takteeq.com', phone: '+963 21 200 0000', team: '20+', clients: '60+' },
  { country: 'ksa' as const, code: 'BR — 03', nameKey: 'office.riyadh', tagKey: 'office.riyadh.tag', addrKey: 'office.riyadh.addr', email: 'riyadh@takteeq.com', phone: '+966 11 200 0000', team: '35+', clients: '120+' },
];

// ============ HELPERS ============
function StatCounter({ target, label }: { target: number; label: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let current = 0;
          const duration = 2000;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = Math.floor(current).toString();
          }, 16);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div className="stat">
      <p className="stat-num" ref={ref}>0</p>
      <p className="stat-label"><T k={label} /></p>
    </div>
  );
}

export default function HomePage() {
  // Reveal sections on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('revealed');
      }),
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    );
    document.querySelectorAll('.section').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const onReset = () => {
    window.dispatchEvent(new CustomEvent('takteeq-reset-letters'));
  };

  return (
    <>
      <HomeScene />
      <div className="grid-overlay" />

      <main>
        {/* HERO */}
        <section id="home" className="section hero">
          <div className="hero-content">
            <div className="hero-label">
              <span className="label-dot"></span>
              <span><T k="hero.label" /></span>
            </div>
            <div className="hero-3d-space" id="hero3dSpace">
              <p className="hero-3d-hint"><T k="hero.hint" /></p>
            </div>
            <div className="hero-slogan">
              <div className="slogan-line"></div>
              <p className="slogan-text"><T k="hero.slogan" /></p>
              <p className="slogan-sub"><T k="hero.sub" /></p>
              <div className="slogan-line"></div>
            </div>
            <button className="reset-btn" type="button" onClick={onReset}>
              <span className="reset-icon">↺</span>
              <span><T k="hero.reset" /></span>
            </button>
            <div className="hero-actions">
              <Link href="#services" className="btn btn-primary">
                <span><T k="hero.cta1" /></span>
                <span className="btn-arrow">→</span>
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                <span><T k="hero.cta2" /></span>
              </Link>
            </div>
            <div className="hero-stats">
              <StatCounter target={500} label="stats.projects" />
              <StatCounter target={300} label="stats.clients" />
              <StatCounter target={15} label="stats.countries" />
              <StatCounter target={10} label="stats.years" />
            </div>
          </div>
          <div className="scroll-indicator">
            <span><T k="hero.scroll" /></span>
            <div className="scroll-line"></div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section about">
          <div className="section-header">
            <span className="section-num">// 02</span>
            <h2 className="section-title">
              <span><T k="about.title" /></span>{' '}
              <span className="accent"><T k="about.title.accent" /></span>
            </h2>
          </div>
          <div className="about-grid">
            <div className="about-text">
              <p className="about-lead"><T k="about.lead" /></p>
              <p><T k="about.p1" /></p>
              <p><T k="about.p2" /></p>
              <div className="about-tags">
                <span className="tag">Web</span>
                <span className="tag">SaaS</span>
                <span className="tag">ERP</span>
                <span className="tag">Mobile</span>
                <span className="tag">Cloud</span>
                <span className="tag">Security</span>
              </div>
            </div>
            <div className="about-visual">
              <div className="hud-frame">
                <div className="hud-line"><span><T k="about.hud.1" /></span><span className="hud-value">2014</span></div>
                <div className="hud-line"><span><T k="about.hud.2" /></span><span className="hud-value">120+</span></div>
                <div className="hud-line"><span><T k="about.hud.3" /></span><span className="hud-value active">3</span></div>
                <div className="hud-line"><span><T k="about.hud.4" /></span><span className="hud-value active"><T k="about.hud.4.v" /></span></div>
                <div className="hud-line"><span><T k="about.hud.5" /></span><span className="hud-value">98%</span></div>
                <p className="hud-label"><T k="about.hud.label" /></p>
                <div className="hud-bar"><div className="hud-bar-fill"></div></div>
                <p className="hud-label"><T k="about.hud.label2" /></p>
                <div className="hud-bar"><div className="hud-bar-fill" style={{ width: '96%' }}></div></div>
                <p className="hud-label"><T k="about.hud.label3" /></p>
                <div className="hud-bar"><div className="hud-bar-fill" style={{ width: '99%' }}></div></div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="section services">
          <div className="section-header">
            <span className="section-num">// 03</span>
            <h2 className="section-title">
              <span><T k="services.title" /></span>{' '}
              <span className="accent"><T k="services.title.accent" /></span>
            </h2>
            <p className="section-subtitle"><T k="services.subtitle" /></p>
          </div>
          <div className="features-grid">
            {services.map((s) => (
              <div className="feature-card" key={s.num}>
                <div className="card-head">
                  <span className="card-num">{s.num}</span>
                  <span className="card-mono">{s.mono}</span>
                </div>
                <h3 className="card-title"><T k={s.titleKey} /></h3>
                <p className="card-desc"><T k={s.descKey} /></p>
                <ul className="card-features">
                  {s.features.map((f) => (<li key={f}><T k={f} /></li>))}
                </ul>
                <div className="card-footer">
                  <span className="card-tag">{s.tagKey ? <T k={s.tagKey} /> : s.tagRaw}</span>
                  <span className="card-arrow">→</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section id="why" className="section why-us">
          <div className="section-header">
            <span className="section-num">// 04</span>
            <h2 className="section-title">
              <span><T k="why.title" /></span>{' '}
              <span className="accent"><T k="why.title.accent" /></span>
            </h2>
            <p className="section-subtitle"><T k="why.subtitle" /></p>
          </div>
          <div className="why-grid">
            {whyItems.map((w) => (
              <div className="why-item" key={w.num}>
                <div className="why-number">{w.num}</div>
                <div className="why-content">
                  <h3 className="why-title"><T k={w.titleKey} /></h3>
                  <p className="why-desc"><T k={w.descKey} /></p>
                </div>
                <div className="why-meta"><T k={w.metaKey} /></div>
              </div>
            ))}
          </div>
        </section>

        {/* INDUSTRIES */}
        <section id="industries" className="section industries">
          <div className="section-header">
            <span className="section-num">// 05</span>
            <h2 className="section-title">
              <span><T k="industries.title" /></span>{' '}
              <span className="accent"><T k="industries.title.accent" /></span>
            </h2>
            <p className="section-subtitle"><T k="industries.subtitle" /></p>
          </div>
          <div className="industries-layout">
            <div className="industries-canvas-wrap">
              <IndustriesSphere />
              <div className="industries-canvas-label">
                <span><T k="industries.canvas" /></span>
              </div>
            </div>
            <div className="industries-grid">
              {industries.map((ind) => (
                <div className="industry-item" key={ind.code}>
                  <span className="industry-code">{ind.code}</span>
                  <span><T k={ind.key} /></span>
                  <span className="industry-arrow">→</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="section process">
          <div className="section-header">
            <span className="section-num">// 06</span>
            <h2 className="section-title">
              <span><T k="process.title" /></span>{' '}
              <span className="accent"><T k="process.title.accent" /></span>
            </h2>
            <p className="section-subtitle"><T k="process.subtitle" /></p>
          </div>
          <div className="process-timeline">
            <div className="process-line"></div>
            {processSteps.map((step) => (
              <div className="process-step" key={step.num}>
                <div className="process-marker">{step.num}</div>
                <div className="process-content">
                  <span className="process-phase"><T k={step.phaseKey} /></span>
                  <h3 className="process-title"><T k={step.titleKey} /></h3>
                  <p className="process-desc"><T k={step.descKey} /></p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TECH STACK */}
        <section id="tech" className="section tech-stack">
          <div className="section-header">
            <span className="section-num">// 07</span>
            <h2 className="section-title">
              <span><T k="tech.title" /></span>{' '}
              <span className="accent"><T k="tech.title.accent" /></span>
            </h2>
            <p className="section-subtitle"><T k="tech.subtitle" /></p>
          </div>
          <div className="tech-categories">
            {techCats.map((cat) => (
              <div className="tech-cat" key={cat.titleKey}>
                <h4 className="tech-cat-title"><T k={cat.titleKey} /></h4>
                <div className="tech-tags">
                  {cat.tags.map((t) => (<span className="tech-tag" key={t}>{t}</span>))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="section testimonials">
          <div className="section-header">
            <span className="section-num">// 08</span>
            <h2 className="section-title">
              <span><T k="test.title" /></span>{' '}
              <span className="accent"><T k="test.title.accent" /></span>
            </h2>
            <p className="section-subtitle"><T k="test.subtitle" /></p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <div className="testimonial" key={t.avatar}>
                <div className="test-rating">
                  <span className="rating-stars">★ ★ ★ ★ ★</span>
                  <span className="rating-value">5.0</span>
                </div>
                <p className="test-quote"><T k={t.quoteKey} /></p>
                <div className="test-author">
                  <div className="test-avatar">{t.avatar}</div>
                  <div className="test-author-info">
                    <p className="test-name"><T k={t.nameKey} /></p>
                    <p className="test-role"><T k={t.roleKey} /></p>
                  </div>
                  <span className="test-verified"><T k="test.verified" /></span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* OFFICES */}
        <section id="offices" className="section offices-section">
          <div className="section-header">
            <span className="section-num">// 09</span>
            <h2 className="section-title">
              <span><T k="offices.title" /></span>{' '}
              <span className="accent"><T k="offices.title.accent" /></span>
            </h2>
            <p className="section-subtitle"><T k="offices.subtitle" /></p>
          </div>

          <div className="offices-3d-grid">
            {offices.map((o) => (
              <div className="office-3d-card" key={o.country}>
                <div className="office-3d-flag">
                  <WavingFlag country={o.country} />
                </div>
                <div className="office-3d-body">
                  <div className="office-3d-head">
                    <div className="office-3d-meta">
                      <span className="office-3d-code">{o.code}</span>
                      <span className="office-3d-pulse"></span>
                      <span className="office-3d-status"><T k="offices.status" /></span>
                    </div>
                    <h3 className="office-3d-name"><T k={o.nameKey} /></h3>
                    <p className="office-3d-tagline"><T k={o.tagKey} /></p>
                  </div>

                  <div className="office-3d-divider"></div>

                  <div className="office-3d-info">
                    <div className="office-3d-row">
                      <span className="office-3d-label"><T k="offices.l.address" /></span>
                      <span className="office-3d-value"><T k={o.addrKey} /></span>
                    </div>
                    <div className="office-3d-row">
                      <span className="office-3d-label"><T k="offices.l.email" /></span>
                      <a href={`mailto:${o.email}`} className="office-3d-link">{o.email}</a>
                    </div>
                    <div className="office-3d-row">
                      <span className="office-3d-label"><T k="offices.l.phone" /></span>
                      <a href={`tel:${o.phone.replace(/\s/g, '')}`} className="office-3d-link">{o.phone}</a>
                    </div>
                  </div>

                  <div className="office-3d-stats">
                    <div className="office-3d-stat">
                      <span className="office-3d-stat-num">{o.team}</span>
                      <span className="office-3d-stat-label"><T k="offices.team" /></span>
                    </div>
                    <div className="office-3d-stat">
                      <span className="office-3d-stat-num">{o.clients}</span>
                      <span className="office-3d-stat-label"><T k="offices.clients" /></span>
                    </div>
                  </div>

                  <Link href="/contact" className="office-3d-cta">
                    <span><T k="offices.visit" /></span>
                    <span className="office-3d-arrow">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="section cta-banner-section">
          <div className="cta-banner">
            <div className="cta-banner-content">
              <h2 className="cta-banner-title"><T k="cta.title" /></h2>
              <p className="cta-banner-desc"><T k="cta.desc" /></p>
            </div>
            <Link href="/contact" className="btn btn-primary btn-large">
              <span><T k="cta.btn" /></span>
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
