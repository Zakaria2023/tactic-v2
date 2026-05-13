'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLanguage, T } from '@/app/contexts/LanguageContext';

const services = [
  { col: 'mega.development', items: [
    { key: 'svc.1.title', href: '/services#web' },
    { key: 'svc.2.title', href: '/services#saas' },
    { key: 'svc.4.title', href: '/services#mobile' },
    { key: 'svc.7.title', href: '/services#desktop' },
  ]},
  { col: 'mega.enterprise', items: [
    { key: 'svc.3.title', href: '/services#erp' },
    { key: 'svc.5.title', href: '/services#security' },
    { key: 'svc.6.title', href: '/services#hosting' },
    { key: 'svc.9.title', href: '/services#support' },
  ]},
  { col: 'mega.creative', items: [
    { key: 'svc.8.title', href: '/services#design' },
    { key: 'mega.branding', href: '/services#design' },
    { key: 'mega.motion', href: '/services#design' },
    { key: 'mega.content', href: '/services#design' },
  ]},
];

const solutions = ['sol.1', 'sol.2', 'sol.3', 'sol.4', 'sol.5', 'sol.6'];
const industries = ['ind.1', 'ind.2', 'ind.3', 'ind.4', 'ind.5', 'ind.6', 'ind.7', 'ind.8', 'ind.9'];

export default function Navbar() {
  const pathname = usePathname();
  const { toggle, lang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    handler();
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    // Close mobile menu on route change
    setMobileOpen(false);
    setOpenDropdown(null);
    document.body.classList.remove('nav-open');
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle('nav-open', mobileOpen);
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  const handleDropdownClick = (e: React.MouseEvent, name: string) => {
    if (window.innerWidth <= 1024) {
      e.preventDefault();
      setOpenDropdown(openDropdown === name ? null : name);
    }
  };

  const handleLinkClick = () => {
    if (window.innerWidth <= 1024) {
      setMobileOpen(false);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link href="/" className="nav-logo" style={{ textDecoration: 'none' }}>
        <span className="logo-bracket">[</span>
        <span className="logo-text">TAKTEEQ</span>
        <span className="logo-bracket">]</span>
      </Link>

      <ul className={`nav-links ${mobileOpen ? 'open' : ''}`}>
        <li>
          <Link href="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={handleLinkClick}>
            <T k="nav.home" />
          </Link>
        </li>
        <li>
          <Link href="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`} onClick={handleLinkClick}>
            <T k="nav.about" />
          </Link>
        </li>

        <li className={`nav-dropdown nav-mega-parent ${openDropdown === 'services' ? 'mobile-open' : ''}`}>
          <Link
            href="/services"
            className={`nav-link ${isActive('/services') ? 'active' : ''}`}
            onClick={(e) => handleDropdownClick(e, 'services')}
          >
            <span><T k="nav.services" /></span>
            <span className="nav-caret">▾</span>
          </Link>
          <div className="dropdown-menu mega-menu">
            <div className="mega-grid">
              {services.map((col) => (
                <div className="mega-col" key={col.col}>
                  <span className="mega-title"><T k={col.col} /></span>
                  {col.items.map((item) => (
                    <Link key={item.key + item.href} href={item.href} className="mega-link" onClick={handleLinkClick}>
                      <T k={item.key} />
                    </Link>
                  ))}
                </div>
              ))}
            </div>
            <div className="mega-footer">
              <span className="mega-footer-text"><T k="mega.footer" /></span>
              <Link href="/services" className="mega-cta" onClick={handleLinkClick}>
                <span><T k="mega.all" /></span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </li>

        <li className={`nav-dropdown ${openDropdown === 'solutions' ? 'mobile-open' : ''}`}>
          <a href="#" className="nav-link" onClick={(e) => handleDropdownClick(e, 'solutions')}>
            <span><T k="nav.solutions" /></span>
            <span className="nav-caret">▾</span>
          </a>
          <div className="dropdown-menu">
            {solutions.map((key) => (
              <Link key={key} href="/services" className="dropdown-link" onClick={handleLinkClick}>
                <T k={key} />
              </Link>
            ))}
          </div>
        </li>

        <li className={`nav-dropdown ${openDropdown === 'industries' ? 'mobile-open' : ''}`}>
          <a href="#" className="nav-link" onClick={(e) => handleDropdownClick(e, 'industries')}>
            <span><T k="nav.industries" /></span>
            <span className="nav-caret">▾</span>
          </a>
          <div className="dropdown-menu">
            {industries.map((key) => (
              <Link key={key} href="/#industries" className="dropdown-link" onClick={handleLinkClick}>
                <T k={key} />
              </Link>
            ))}
          </div>
        </li>

        <li>
          <Link href="/portfolio" className={`nav-link ${isActive('/portfolio') ? 'active' : ''}`} onClick={handleLinkClick}>
            <T k="nav.portfolio" />
          </Link>
        </li>
        <li>
          <Link href="/blog" className={`nav-link ${isActive('/blog') ? 'active' : ''}`} onClick={handleLinkClick}>
            <T k="nav.blog" />
          </Link>
        </li>
      </ul>

      <div className="nav-actions">
        <button className="lang-toggle" onClick={toggle} type="button">
          <span className="lang-current">{lang === 'en' ? 'EN' : 'عربي'}</span>
          <span className="lang-divider">/</span>
          <span className="lang-other">{lang === 'en' ? 'عربي' : 'EN'}</span>
        </button>
        <Link href="/contact" className="nav-cta">
          <span><T k="nav.contact" /></span>
          <span className="nav-cta-arrow">→</span>
        </Link>
        <button
          className={`nav-mobile-toggle ${mobileOpen ? 'active' : ''}`}
          onClick={() => setMobileOpen((p) => !p)}
          type="button"
          aria-label="Menu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}
