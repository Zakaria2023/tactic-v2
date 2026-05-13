'use client';

import Link from 'next/link';
import PageHero, { PageBreadcrumb } from '@/components/ui/PageHero';
import PageScene from '@/components/three/PageScene';
import MiniScene from '@/components/three/MiniScene';
import { T, useLanguage } from '@/app/contexts/LanguageContext';

const related = [
  { mini: 3, tag: 'CYBER SECURITY', titleKey: 'rel.1.title', meta: 'May 2 · 8 min' },
  { mini: 4, tag: 'CLOUD', titleKey: 'rel.2.title', meta: 'Apr 22 · 6 min' },
  { mini: 5, tag: 'AI', titleKey: 'rel.3.title', meta: 'Apr 15 · 10 min' },
];

export default function BlogPostPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero canvas={<PageScene type="blog" />} minHeight="55vh">
        <PageBreadcrumb intermediate={{ label: 'nav.blog', href: '/blog' }} current="post.crumb" />
        <div className="page-title-wrap">
          <div className="page-eyebrow"><T k="post.tag" /></div>
          <h1 className="page-title" dangerouslySetInnerHTML={{ __html: t('post.title') }} />
          <p className="page-subtitle"><T k="post.subtitle" /></p>
          <div className="page-meta-row">
            <div className="page-meta-item">
              <span className="page-meta-label"><T k="post.meta.author" /></span>
              <span className="page-meta-value">Reem Awad</span>
            </div>
            <div className="page-meta-item">
              <span className="page-meta-label"><T k="post.meta.date" /></span>
              <span className="page-meta-value">Apr 28, 2026</span>
            </div>
            <div className="page-meta-item">
              <span className="page-meta-label"><T k="post.meta.read" /></span>
              <span className="page-meta-value gold">12 min</span>
            </div>
          </div>
        </div>
      </PageHero>

      <article className="post-article">
        <div className="post-content">
          <p><T k="post.lead" /></p>
          <p><T k="post.p1" /></p>
          <h2><T k="post.h2.1" /></h2>
          <p><T k="post.p2" /></p>
          <p><T k="post.p3" /></p>
          <blockquote><T k="post.quote.1" /></blockquote>
          <h3><T k="post.h3.1" /></h3>
          <p><T k="post.p4" /></p>
          <p><T k="post.p5" /></p>
          <pre><code>{`-- The pattern that actually works
SET LOCAL app.current_tenant = '<?= $tenantId ?>';
-- Use SET LOCAL inside a transaction
-- so the variable is automatically cleared`}</code></pre>
          <h2><T k="post.h2.2" /></h2>
          <p><T k="post.p6" /></p>
          <p><T k="post.p7" /></p>
          <ul>
            <li><T k="post.list.1" /></li>
            <li><T k="post.list.2" /></li>
            <li><T k="post.list.3" /></li>
          </ul>
          <h2><T k="post.h2.3" /></h2>
          <p><T k="post.p8" /></p>
          <ul>
            <li><T k="post.list.4" /></li>
            <li><T k="post.list.5" /></li>
            <li><T k="post.list.6" /></li>
            <li><T k="post.list.7" /></li>
          </ul>
          <p><T k="post.p9" /></p>
          <h2><T k="post.h2.4" /></h2>
          <p><T k="post.p10" /></p>
          <p><T k="post.p11" /></p>
          <h3><T k="post.h3.2" /></h3>
          <p><T k="post.p12" /></p>
          <p><T k="post.p13" /></p>
        </div>

        <div className="post-share">
          <span className="post-share-label"><T k="post.share" /></span>
          <div className="post-share-buttons">
            <a href="#" className="share-btn">LinkedIn</a>
            <a href="#" className="share-btn">Twitter</a>
            <a href="#" className="share-btn"><T k="post.share.copy" /></a>
          </div>
        </div>
      </article>

      <section className="post-related">
        <h2 className="related-title"><T k="post.related" /></h2>
        <div className="blog-list" style={{ maxWidth: 1200, margin: '0 auto' }}>
          {related.map((r, i) => (
            <Link key={i} href="/blog/multi-tenant-saas" className="blog-card">
              <div className="blog-card-visual"><MiniScene variant={r.mini} /></div>
              <div className="blog-card-content">
                <span className="blog-card-tag">{r.tag}</span>
                <h3 className="blog-card-title"><T k={r.titleKey} /></h3>
                <p className="blog-card-meta">{r.meta}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
