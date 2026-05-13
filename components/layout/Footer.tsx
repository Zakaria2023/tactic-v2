'use client';

import Link from 'next/link';
import { T } from '@/app/contexts/LanguageContext';

const socialIcons = {
  linkedin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8 17v-7H6v7h2zM7 9a1 1 0 100-2 1 1 0 000 2zm11 8v-4c0-1.5-1-2-2-2s-2 .5-2 2v4h-2v-7h2v1c.5-.5 1-1 2-1 1.5 0 3 1 3 3v4h-1z" />
    </svg>
  ),
  instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  ),
  facebook: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 9h3V5h-3c-1.7 0-3 1.3-3 3v2H8v4h3v8h4v-8h3l1-4h-4V8c0-.5.5-1 1-1z" />
    </svg>
  ),
  github: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 00-3 19.5c.5 0 .5-.3.5-.6v-2c-2.7.6-3.3-1.3-3.3-1.3-.4-1-1-1.4-1-1.4-.8-.6.1-.6.1-.6 1 0 1.5 1 1.5 1 .9 1.4 2.3 1 2.8.8.1-.7.4-1.2.6-1.4-2.2-.3-4.5-1.1-4.5-5 0-1 .4-2 1-2.6-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.5-.3.8 0 1.7.1 2.5.3 1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.6 1 1.6 1 2.6 0 3.9-2.3 4.7-4.5 5 .3.3.6.9.6 1.8v2.7c0 .3 0 .6.5.6A10 10 0 0012 2z" />
    </svg>
  ),
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="nav-logo">
            <span className="logo-bracket">[</span>
            <span className="logo-text">TAKTEEQ</span>
            <span className="logo-bracket">]</span>
          </div>
          <p className="footer-brand-desc"><T k="footer.brand.desc" /></p>
          <div className="footer-social">
            <a href="#" className="social-link" aria-label="LinkedIn">{socialIcons.linkedin}</a>
            <a href="#" className="social-link" aria-label="Instagram">{socialIcons.instagram}</a>
            <a href="#" className="social-link" aria-label="Facebook">{socialIcons.facebook}</a>
            <a href="#" className="social-link" aria-label="GitHub">{socialIcons.github}</a>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-title"><T k="footer.quick" /></h4>
          <Link href="/" className="footer-link"><T k="nav.home" /></Link>
          <Link href="/about" className="footer-link"><T k="nav.about" /></Link>
          <Link href="/services" className="footer-link"><T k="nav.services" /></Link>
          <Link href="/portfolio" className="footer-link"><T k="nav.portfolio" /></Link>
          <Link href="/blog" className="footer-link"><T k="nav.blog" /></Link>
          <Link href="/careers" className="footer-link"><T k="nav.careers" /></Link>
          <Link href="/contact" className="footer-link"><T k="nav.contact" /></Link>
        </div>

        <div className="footer-col">
          <h4 className="footer-title"><T k="footer.services" /></h4>
          <Link href="/services#web" className="footer-link"><T k="svc.1.title" /></Link>
          <Link href="/services#erp" className="footer-link"><T k="svc.3.title" /></Link>
          <Link href="/services#saas" className="footer-link"><T k="svc.2.title" /></Link>
          <Link href="/services#mobile" className="footer-link"><T k="svc.4.title" /></Link>
          <Link href="/services#security" className="footer-link"><T k="svc.5.title" /></Link>
          <Link href="/services#hosting" className="footer-link"><T k="svc.6.title" /></Link>
        </div>

        <div className="footer-col">
          <h4 className="footer-title"><T k="footer.policies" /></h4>
          <Link href="/privacy" className="footer-link"><T k="footer.policy.1" /></Link>
          <Link href="/terms" className="footer-link"><T k="footer.policy.2" /></Link>
          <Link href="/cookies" className="footer-link"><T k="footer.policy.3" /></Link>
          <Link href="/faq" className="footer-link"><T k="footer.policy.6" /></Link>
          <Link href="/contact" className="footer-link"><T k="nav.contact" /></Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p><T k="footer.copyright" /></p>
        <p className="footer-meta"><T k="footer.meta" /></p>
      </div>
    </footer>
  );
}
