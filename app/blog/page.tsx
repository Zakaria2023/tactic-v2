'use client';

import Link from 'next/link';
import PageHero, { PageBreadcrumb } from '@/components/ui/PageHero';
import PageScene from '@/components/three/PageScene';
import MiniScene from '@/components/three/MiniScene';
import { T } from '../contexts/LanguageContext';

const sideArticles = [
  { tagKey: 'blog.side.1.tag', titleKey: 'blog.side.1.title', metaKey: 'blog.side.1.meta' },
  { tagKey: 'blog.side.2.tag', titleKey: 'blog.side.2.title', metaKey: 'blog.side.2.meta' },
  { tagKey: 'blog.side.3.tag', titleKey: 'blog.side.3.title', metaKey: 'blog.side.3.meta' },
];

const articles = [
  { mini: 0, tagKey: 'blog.c.1.tag', titleKey: 'blog.c.1.title', meta: 'Apr 12 · 7 min' },
  { mini: 1, tagKey: 'blog.c.2.tag', titleKey: 'blog.c.2.title', meta: 'Apr 5 · 11 min' },
  { mini: 3, tagKey: 'blog.c.3.tag', titleKey: 'blog.c.3.title', meta: 'Mar 28 · 9 min' },
  { mini: 4, tagKey: 'blog.c.4.tag', titleKey: 'blog.c.4.title', meta: 'Mar 21 · 8 min' },
  { mini: 5, tagKey: 'blog.c.5.tag', titleKey: 'blog.c.5.title', meta: 'Mar 14 · 6 min' },
  { mini: 2, tagKey: 'blog.c.6.tag', titleKey: 'blog.c.6.title', meta: 'Mar 7 · 5 min' },
];

export default function BlogPage() {
  return (
    <>
      <PageHero canvas={<PageScene type="blog" />}>
        <PageBreadcrumb current="nav.blog" />
        <div className="page-title-wrap">
          <div className="page-eyebrow"><T k="blog.eyebrow" /></div>
          <h1 className="page-title">
            <span><T k="blog.h1.1" /></span>{' '}
            <span className="accent"><T k="blog.h1.2" /></span>
            <span><T k="blog.h1.3" /></span>
          </h1>
          <p className="page-subtitle"><T k="blog.subtitle" /></p>
        </div>
      </PageHero>

      <div className="blog-grid-wrap">
        <div className="blog-featured">
          <Link href="/blog/multi-tenant-saas" className="blog-featured-card">
            <div className="blog-featured-visual"><MiniScene variant={2} /></div>
            <div className="blog-featured-content">
              <span className="blog-tag"><T k="blog.featured.tag" /></span>
              <h2 className="blog-featured-title"><T k="blog.featured.title" /></h2>
              <p className="blog-featured-desc"><T k="blog.featured.desc" /></p>
              <div className="blog-meta">
                <div className="blog-meta-author">
                  <span className="blog-meta-avatar">RA</span>
                  <span><T k="blog.featured.author" /></span>
                </div>
                <span>•</span>
                <span><T k="blog.featured.date" /></span>
                <span>•</span>
                <span><T k="blog.featured.read" /></span>
              </div>
            </div>
          </Link>

          <div className="blog-side-list">
            {sideArticles.map((a, i) => (
              <Link key={i} href="/blog/multi-tenant-saas" className="blog-side-card">
                <span className="blog-side-tag"><T k={a.tagKey} /></span>
                <h3 className="blog-side-title"><T k={a.titleKey} /></h3>
                <p className="blog-side-meta"><T k={a.metaKey} /></p>
              </Link>
            ))}
          </div>
        </div>

        <div className="blog-list">
          {articles.map((a, i) => (
            <Link key={i} href="/blog/multi-tenant-saas" className="blog-card">
              <div className="blog-card-visual"><MiniScene variant={a.mini} /></div>
              <div className="blog-card-content">
                <span className="blog-card-tag"><T k={a.tagKey} /></span>
                <h3 className="blog-card-title"><T k={a.titleKey} /></h3>
                <p className="blog-card-meta">{a.meta}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
