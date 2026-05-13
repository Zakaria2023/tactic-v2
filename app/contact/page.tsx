'use client';

import { useState } from 'react';
import PageHero, { PageBreadcrumb } from '@/components/ui/PageHero';
import PageScene from '@/components/three/PageScene';
import { T, useLanguage } from '../contexts/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <PageHero canvas={<PageScene type="portfolio" />} minHeight="50vh">
        <PageBreadcrumb current="nav.contact" />
        <div className="page-title-wrap">
          <div className="page-eyebrow"><T k="contact.eyebrow" /></div>
          <h1 className="page-title">
            <span><T k="contact.h1.1" /></span>{' '}
            <span className="accent"><T k="contact.h1.2" /></span>
            <span><T k="contact.h1.3" /></span>
          </h1>
          <p className="page-subtitle"><T k="contact.subtitle" /></p>
        </div>
      </PageHero>

      <div className="contact-page-wrap">
        <div className="contact-grid">
          <div className="contact-form-wrap">
            <h2 className="contact-form-title"><T k="contact.form.title" /></h2>
            <p className="contact-form-sub"><T k="contact.form.sub" /></p>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label"><T k="contact.form.fname" /></label>
                  <input className="form-input" type="text" required placeholder={t('contact.form.fname.ph')} />
                </div>
                <div className="form-group">
                  <label className="form-label"><T k="contact.form.lname" /></label>
                  <input className="form-input" type="text" required placeholder={t('contact.form.lname.ph')} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label"><T k="contact.form.email" /></label>
                  <input className="form-input" type="email" required placeholder="you@company.com" />
                </div>
                <div className="form-group">
                  <label className="form-label"><T k="contact.form.phone" /></label>
                  <input className="form-input" type="tel" placeholder="+962 7 ..." />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label"><T k="contact.form.company" /></label>
                <input className="form-input" type="text" placeholder={t('contact.form.company.ph')} />
              </div>

              <div className="form-group">
                <label className="form-label"><T k="contact.form.service" /></label>
                <select className="form-select">
                  <option>{t('contact.form.opt.select')}</option>
                  <option>{t('svc.1.title')}</option>
                  <option>{t('svc.2.title')}</option>
                  <option>{t('svc.3.title')}</option>
                  <option>{t('svc.4.title')}</option>
                  <option>{t('svc.5.title')}</option>
                  <option>{t('svc.6.title')}</option>
                  <option>{t('svc.8.title')}</option>
                  <option>{t('contact.form.opt.other')}</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label"><T k="contact.form.budget" /></label>
                <select className="form-select">
                  <option>{t('contact.form.opt.budget')}</option>
                  <option>Under $10K</option>
                  <option>$10K - $50K</option>
                  <option>$50K - $100K</option>
                  <option>$100K - $500K</option>
                  <option>$500K+</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label"><T k="contact.form.message" /></label>
                <textarea className="form-textarea" required placeholder={t('contact.form.message.ph')} />
              </div>

              <button type="submit" className="form-submit">
                <span><T k="contact.form.submit" /></span>
                <span>→</span>
              </button>

              {submitted && (
                <p style={{
                  marginTop: 8, padding: '14px 18px',
                  background: 'rgba(74,222,128,0.1)',
                  border: '1px solid rgba(74,222,128,0.3)',
                  borderRadius: 12, color: '#4ADE80', fontSize: 14,
                }}>
                  <T k="contact.form.success" />
                </p>
              )}
            </form>
          </div>

          <div className="contact-aside">
            <div className="contact-info-card">
              <span className="contact-info-label"><T k="contact.aside.1.label" /></span>
              <h3 className="contact-info-title"><T k="contact.aside.1.title" /></h3>
              <p className="contact-info-text"><T k="contact.aside.1.text" /></p>
              <div className="contact-info-links">
                <a href="mailto:hello@takteeq.com" className="contact-info-link">hello@takteeq.com</a>
                <a href="mailto:sales@takteeq.com" className="contact-info-link">sales@takteeq.com</a>
                <a href="mailto:careers@takteeq.com" className="contact-info-link">careers@takteeq.com</a>
              </div>
            </div>

            <div className="contact-info-card">
              <span className="contact-info-label"><T k="contact.aside.2.label" /></span>
              <h3 className="contact-info-title"><T k="contact.aside.2.title" /></h3>
              <p className="contact-info-text"><T k="contact.aside.2.text" /></p>
              <div className="contact-info-links">
                <a href="tel:+96265000000" className="contact-info-link">+962 6 500 0000 · <T k="office.amman" /></a>
                <a href="tel:+963212000000" className="contact-info-link">+963 21 200 0000 · <T k="office.aleppo" /></a>
                <a href="tel:+966112000000" className="contact-info-link">+966 11 200 0000 · <T k="office.riyadh" /></a>
              </div>
            </div>

            <div className="contact-info-card">
              <span className="contact-info-label"><T k="contact.aside.3.label" /></span>
              <h3 className="contact-info-title"><T k="contact.aside.3.title" /></h3>
              <p className="contact-info-text"><T k="contact.aside.3.text" /></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
