'use client';

import Link from 'next/link';
import PageHero, { PageBreadcrumb } from '@/components/ui/PageHero';
import PageScene from '@/components/three/PageScene';
import { T } from '../contexts/LanguageContext';

const services = [
  { id: 'web', num: '01', mono: 'WD', tagKey: 'svc.tag.popular', titleKey: 'svc.1.title', leadKey: 'services.p.web.lead', whatKey: 'services.p.web.what', stackKey: 'services.p.web.stack', items: ['services.p.web.l1', 'services.p.web.l2', 'services.p.web.l3', 'services.p.web.l4', 'services.p.web.l5'], chips: ['Next.js', 'React', 'Vue.js', 'Laravel', 'Node.js', 'TypeScript'], price: '$5K', priceSub: 'services.p.timeline.short' },
  { id: 'saas', num: '02', mono: 'SaaS', tagKey: 'svc.tag.new', titleKey: 'svc.2.title', leadKey: 'services.p.saas.lead', whatKey: 'services.p.saas.what', stackKey: 'services.p.saas.stack', items: ['services.p.saas.l1', 'services.p.saas.l2', 'services.p.saas.l3', 'services.p.saas.l4', 'services.p.saas.l5'], chips: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Stripe'], price: '$30K', priceSub: 'services.p.timeline.med' },
  { id: 'erp', num: '03', mono: 'ERP', tagKey: 'svc.tag.enterprise', titleKey: 'svc.3.title', leadKey: 'services.p.erp.lead', whatKey: 'services.p.erp.what', stackKey: 'services.p.erp.stack', items: ['services.p.erp.l1', 'services.p.erp.l2', 'services.p.erp.l3', 'services.p.erp.l4', 'services.p.erp.l5'], chips: ['Laravel', 'Vue.js', '.NET', 'PostgreSQL', 'SQL Server'], price: '$50K', priceSub: 'services.p.timeline.long' },
  { id: 'mobile', num: '04', mono: 'App', tagKey: '', tagRaw: 'iOS / Android', titleKey: 'svc.4.title', leadKey: 'services.p.mob.lead', whatKey: 'services.p.mob.what', stackKey: 'services.p.mob.stack', items: ['services.p.mob.l1', 'services.p.mob.l2', 'services.p.mob.l3', 'services.p.mob.l4', 'services.p.mob.l5'], chips: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase'], price: '$20K', priceSub: 'services.p.timeline.med2' },
  { id: 'security', num: '05', mono: 'Sec', tagKey: 'svc.tag.critical', titleKey: 'svc.5.title', leadKey: 'services.p.sec.lead', whatKey: 'services.p.sec.what', stackKey: 'services.p.sec.stack', items: ['services.p.sec.l1', 'services.p.sec.l2', 'services.p.sec.l3', 'services.p.sec.l4', 'services.p.sec.l5'], chips: ['OWASP', 'ISO 27001', 'PCI-DSS', 'NIST', 'GDPR'], price: '$8K', priceSub: 'services.p.timeline.audit' },
  { id: 'hosting', num: '06', mono: 'Host', tagKey: '', tagRaw: '99.9% UPTIME', titleKey: 'svc.6.title', leadKey: 'services.p.host.lead', whatKey: 'services.p.host.what', stackKey: 'services.p.host.stack', items: ['services.p.host.l1', 'services.p.host.l2', 'services.p.host.l3', 'services.p.host.l4', 'services.p.host.l5'], chips: ['AWS', 'Azure', 'DigitalOcean', 'Cloudflare', 'Kubernetes'], price: '$200', priceSub: 'services.p.month', startingKey: 'services.p.starting.month' },
  { id: 'desktop', num: '07', mono: 'Desk', tagKey: '', tagRaw: 'WINDOWS / MAC', titleKey: 'svc.7.title', leadKey: 'services.p.desk.lead', whatKey: 'services.p.desk.what', stackKey: 'services.p.desk.stack', items: ['services.p.desk.l1', 'services.p.desk.l2', 'services.p.desk.l3', 'services.p.desk.l4', 'services.p.desk.l5'], chips: ['.NET / C#', 'WPF', 'Electron', 'Java', 'SQL Server'], price: '$15K', priceSub: 'services.p.timeline.med2' },
  { id: 'design', num: '08', mono: 'UX', tagKey: 'svc.tag.creative', titleKey: 'svc.8.title', leadKey: 'services.p.des.lead', whatKey: 'services.p.des.what', stackKey: 'services.p.des.stack', items: ['services.p.des.l1', 'services.p.des.l2', 'services.p.des.l3', 'services.p.des.l4', 'services.p.des.l5'], chips: ['Figma', 'Adobe Suite', 'Framer', 'After Effects'], price: '$3K', priceSub: 'services.p.timeline.des' },
  { id: 'support', num: '09', mono: '24/7', tagKey: '', tagRaw: 'SLA', titleKey: 'svc.9.title', leadKey: 'services.p.sup.lead', whatKey: 'services.p.sup.what', stackKey: 'services.p.sup.stack', items: ['services.p.sup.l1', 'services.p.sup.l2', 'services.p.sup.l3', 'services.p.sup.l4', 'services.p.sup.l5'], chips: ['Bronze · 8h response', 'Silver · 4h response', 'Gold · 15min critical'], price: '$500', priceSub: 'services.p.month' },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero canvas={<PageScene type="portfolio" />}>
        <PageBreadcrumb current="nav.services" />
        <div className="page-title-wrap">
          <div className="page-eyebrow"><T k="services.eyebrow" /></div>
          <h1 className="page-title">
            <span><T k="services.h1.1" /></span>{' '}
            <span className="accent"><T k="services.h1.2" /></span>
            <span><T k="services.h1.3" /></span>
          </h1>
          <p className="page-subtitle"><T k="services.subtitle" /></p>
        </div>
      </PageHero>

      <section className="services-page-grid">
        <div className="services-page-inner">
          {services.map((s) => (
            <div className="service-block" id={s.id} key={s.id}>
              <div className="service-block-head">
                <span className="service-block-num">{s.num}</span>
                <span className="service-block-mono">{s.mono}</span>
                <span className="service-block-tag">
                  {s.tagKey ? <T k={s.tagKey} /> : s.tagRaw}
                </span>
              </div>
              <h2 className="service-block-title"><T k={s.titleKey} /></h2>
              <p className="service-block-lead"><T k={s.leadKey} /></p>
              <div className="service-block-grid">
                <div className="service-block-col">
                  <h4 className="service-block-h4"><T k={s.whatKey} /></h4>
                  <ul className="service-block-list">
                    {s.items.map((k) => (<li key={k}><T k={k} /></li>))}
                  </ul>
                </div>
                <div className="service-block-col">
                  <h4 className="service-block-h4"><T k={s.stackKey} /></h4>
                  <div className="service-block-chips">
                    {s.chips.map((c) => (<span className="service-chip" key={c}>{c}</span>))}
                  </div>
                  <h4 className="service-block-h4" style={{ marginTop: 18 }}><T k="services.p.starting" /></h4>
                  <div className="service-block-price">
                    {s.price}
                    <span className="service-block-price-sub"><T k={s.priceSub} /></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="services-cta-section">
        <div className="cta-banner">
          <div className="cta-banner-content">
            <h2 className="cta-banner-title"><T k="services.cta.title" /></h2>
            <p className="cta-banner-desc"><T k="services.cta.desc" /></p>
          </div>
          <Link href="/contact" className="btn btn-primary btn-large">
            <span><T k="services.cta.btn" /></span>
            <span className="btn-arrow">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
