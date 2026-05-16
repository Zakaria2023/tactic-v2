"use client";

import OdooScene from "@/components/three/OdooScene";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { T } from "../contexts/LanguageContext";

export default function OdooPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    subject: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <OdooScene />
      <div className="grid-overlay" />

      <main className="odoo-page">
        {/* HERO */}
        <section className="odoo-hero">
          <div className="odoo-hero-inner">
            {/* Left — images */}
            <div className="odoo-visuals">
              <div className="odoo-laptop-wrap">
                <Image
                  src="/erp-hero.png"
                  alt="Odoo ERP Dashboard"
                  width={780}
                  height={490}
                  className="odoo-laptop-img"
                  priority
                />
                <div className="odoo-phone-wrap">
                  <Image
                    src="/iphone_front_portrait.svg"
                    alt="Odoo Mobile"
                    width={160}
                    height={320}
                    className="odoo-phone-img"
                  />
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div className="odoo-form-col">
              <div className="odoo-form-card">
                <div className="odoo-form-header">
                  <span className="odoo-form-eyebrow">
                    <T k="odoo.form.eyebrow" />
                  </span>
                  <h3 className="odoo-form-title">
                    <T k="odoo.form.title" />
                  </h3>
                </div>

                {sent ? (
                  <div className="odoo-form-success">
                    <div className="odoo-success-icon">✓</div>
                    <p>
                      <T k="odoo.form.success" />
                    </p>
                    <Link
                      href="/contact"
                      className="btn btn-primary"
                      style={{ marginTop: 16 }}
                    >
                      <span>
                        <T k="odoo.form.success.cta" />
                      </span>
                    </Link>
                  </div>
                ) : (
                  <form className="odoo-form" onSubmit={handleSubmit}>
                    <div className="odoo-field">
                      <label className="odoo-label">
                        <T k="odoo.form.name" />{" "}
                        <span className="odoo-required">*</span>
                      </label>
                      <input
                        className="odoo-input"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="odoo-field">
                      <label className="odoo-label">
                        <T k="odoo.form.phone" />
                      </label>
                      <div className="odoo-phone-field">
                        <span className="odoo-phone-prefix">+962</span>
                        <input
                          className="odoo-input odoo-input-phone"
                          type="tel"
                          value={form.phone}
                          onChange={(e) =>
                            setForm({ ...form, phone: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="odoo-field">
                      <label className="odoo-label">
                        <T k="odoo.form.email" />{" "}
                        <span className="odoo-required">*</span>
                      </label>
                      <input
                        className="odoo-input"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="odoo-field">
                      <label className="odoo-label">
                        <T k="odoo.form.company" />
                      </label>
                      <input
                        className="odoo-input"
                        type="text"
                        value={form.company}
                        onChange={(e) =>
                          setForm({ ...form, company: e.target.value })
                        }
                      />
                    </div>
                    <div className="odoo-field">
                      <label className="odoo-label">
                        <T k="odoo.form.subject" />{" "}
                        <span className="odoo-required">*</span>
                      </label>
                      <input
                        className="odoo-input"
                        type="text"
                        required
                        value={form.subject}
                        onChange={(e) =>
                          setForm({ ...form, subject: e.target.value })
                        }
                      />
                    </div>
                    <button type="submit" className="odoo-submit-btn">
                      <span>
                        <T k="odoo.form.submit" />
                      </span>
                      <span className="btn-arrow">→</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Centered top heading */}
          <div className="odoo-hero-heading">
            <div className="odoo-brand-badge">
              <span className="odoo-brand-dot" />
              <span>TAKTEEQ × Odoo</span>
            </div>
            <h1 className="odoo-hero-title">
              <T k="odoo.hero.title" />
            </h1>
            <p className="odoo-hero-sub">
              <T k="odoo.hero.sub" />
            </p>
          </div>
        </section>

        {/* FEATURES STRIP */}
        <section className="odoo-features">
          {[
            { icon: "⚡", key: "odoo.feat.1" },
            { icon: "🔗", key: "odoo.feat.2" },
            { icon: "📊", key: "odoo.feat.3" },
            { icon: "🛡", key: "odoo.feat.4" },
          ].map((f) => (
            <div className="odoo-feat-item" key={f.key}>
              <span className="odoo-feat-icon">{f.icon}</span>
              <span className="odoo-feat-label">
                <T k={f.key} />
              </span>
            </div>
          ))}
        </section>

        {/* SEGMENTS */}
        <section className="odoo-segments">
          <div className="odoo-segments-inner">
            <div className="odoo-segments-header">
              <h2 className="odoo-segments-title">
                <T k="odoo.seg.title.1" />{" "}
                <span className="odoo-seg-accent">
                  <T k="odoo.seg.title.2" />
                </span>{" "}
                <T k="odoo.seg.title.3" />
              </h2>
            </div>
            <div className="odoo-segments-grid">
              {[
                {
                  num: "01",
                  titleKey: "odoo.seg.1.title",
                  descKey: "odoo.seg.1.desc",
                },
                {
                  num: "02",
                  titleKey: "odoo.seg.2.title",
                  descKey: "odoo.seg.2.desc",
                },
                {
                  num: "03",
                  titleKey: "odoo.seg.3.title",
                  descKey: "odoo.seg.3.desc",
                },
                {
                  num: "04",
                  titleKey: "odoo.seg.4.title",
                  descKey: "odoo.seg.4.desc",
                },
              ].map((seg) => (
                <div className="odoo-seg-card" key={seg.num}>
                  <span className="odoo-seg-num">{seg.num}</span>
                  <h3 className="odoo-seg-card-title">
                    <T k={seg.titleKey} />
                  </h3>
                  <p className="odoo-seg-card-desc">
                    <T k={seg.descKey} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MODULES */}
        <section className="odoo-modules">
          <div className="odoo-modules-inner">
            <div className="odoo-modules-header">
              <h2 className="odoo-modules-title">
                <T k="odoo.mod.title" />
              </h2>
            </div>
            <div className="odoo-modules-grid">
              {/* Accounting */}
              <div className="odoo-mod-card">
                <div className="odoo-mod-icon-wrap">
                  <svg
                    viewBox="0 0 120 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="odoo-mod-svg"
                  >
                    <circle cx="38" cy="42" r="22" fill="#F5A623" />
                    <rect
                      x="28"
                      y="28"
                      width="16"
                      height="64"
                      rx="8"
                      transform="rotate(-45 28 28)"
                      fill="#8A3B8F"
                    />
                    <circle cx="76" cy="72" r="20" fill="#00BFA5" />
                  </svg>
                </div>
                <span className="odoo-mod-label">
                  <T k="odoo.mod.1" />
                </span>
              </div>

              {/* Sales & CRM */}
              <div className="odoo-mod-card">
                <div className="odoo-mod-icon-wrap">
                  <svg
                    viewBox="0 0 120 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="odoo-mod-svg"
                  >
                    <rect
                      x="14"
                      y="54"
                      width="22"
                      height="52"
                      rx="4"
                      fill="#F5A623"
                    />
                    <rect
                      x="49"
                      y="36"
                      width="22"
                      height="70"
                      rx="4"
                      fill="#C2185B"
                    />
                    <rect
                      x="84"
                      y="16"
                      width="22"
                      height="90"
                      rx="4"
                      fill="#E91E63"
                    />
                  </svg>
                </div>
                <span className="odoo-mod-label">
                  <T k="odoo.mod.2" />
                </span>
              </div>

              {/* E-Commerce */}
              <div className="odoo-mod-card">
                <div className="odoo-mod-icon-wrap">
                  <svg
                    viewBox="0 0 120 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="odoo-mod-svg"
                  >
                    <path
                      d="M20 30 Q20 18 32 18 L88 18 Q100 18 100 30 L108 80 Q108 94 94 94 L26 94 Q12 94 12 80 Z"
                      fill="url(#bag-grad)"
                    />
                    <path
                      d="M42 40 Q42 20 60 20 Q78 20 78 40"
                      stroke="#fff"
                      strokeWidth="7"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.7"
                    />
                    <path
                      d="M20 18 L14 6"
                      stroke="#8A3B8F"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M100 18 L106 6"
                      stroke="#8A3B8F"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient
                        id="bag-grad"
                        x1="12"
                        y1="18"
                        x2="108"
                        y2="94"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0%" stopColor="#C2185B" />
                        <stop offset="100%" stopColor="#7B1FA2" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <span className="odoo-mod-label">
                  <T k="odoo.mod.3" />
                </span>
              </div>

              {/* Inventory */}
              <div className="odoo-mod-card">
                <div className="odoo-mod-icon-wrap">
                  <svg
                    viewBox="0 0 120 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="odoo-mod-svg"
                  >
                    <polygon
                      points="60,8 100,30 100,74 60,96 20,74 20,30"
                      fill="#F44336"
                      transform="translate(6,6)"
                    />
                    <polygon
                      points="60,8 100,30 100,74 60,96 20,74 20,30"
                      fill="#FF7043"
                      transform="translate(-4,4)"
                    />
                    <polygon
                      points="60,8 100,30 100,74 60,96 20,74 20,30"
                      fill="#8A3B8F"
                      transform="translate(0,-8)"
                    />
                  </svg>
                </div>
                <span className="odoo-mod-label">
                  <T k="odoo.mod.4" />
                </span>
              </div>

              {/* Projects */}
              <div className="odoo-mod-card">
                <div className="odoo-mod-icon-wrap">
                  <svg
                    viewBox="0 0 120 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="odoo-mod-svg"
                  >
                    <rect
                      x="10"
                      y="10"
                      width="100"
                      height="100"
                      rx="16"
                      fill="#1A2340"
                    />
                    <polyline
                      points="22,64 46,88 98,28"
                      stroke="url(#check-grad)"
                      strokeWidth="16"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <defs>
                      <linearGradient
                        id="check-grad"
                        x1="22"
                        y1="88"
                        x2="98"
                        y2="28"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0%" stopColor="#7B1FA2" />
                        <stop offset="100%" stopColor="#00BFA5" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <span className="odoo-mod-label">
                  <T k="odoo.mod.5" />
                </span>
              </div>

              {/* HR */}
              <div className="odoo-mod-card">
                <div className="odoo-mod-icon-wrap">
                  <svg
                    viewBox="0 0 120 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="odoo-mod-svg"
                  >
                    <circle cx="60" cy="30" r="20" fill="#9C27B0" />
                    <ellipse cx="60" cy="90" rx="36" ry="22" fill="#7B1FA2" />
                    <circle cx="20" cy="50" r="14" fill="#F5A623" />
                    <ellipse cx="18" cy="95" rx="22" ry="14" fill="#FF7043" />
                    <circle cx="100" cy="50" r="14" fill="#00BFA5" />
                    <ellipse cx="102" cy="95" rx="22" ry="14" fill="#00897B" />
                  </svg>
                </div>
                <span className="odoo-mod-label">
                  <T k="odoo.mod.6" />
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT IS ODOO */}
        <section className="odoo-what">
          <div className="odoo-what-inner">
            {/* Intro */}
            <div className="odoo-what-intro">
              <h2 className="odoo-what-title">
                <T k="odoo.what.title" />
              </h2>
              <p className="odoo-what-p">
                <T k="odoo.what.p1" />
              </p>
              <p className="odoo-what-p">
                <T k="odoo.what.p2" />
              </p>
            </div>

            {/* Module detail list */}
            <div className="odoo-what-list">
              {[
                {
                  num: "01",
                  titleKey: "odoo.mod.1",
                  descKey: "odoo.what.accounting",
                  svg: (
                    <svg
                      viewBox="0 0 120 120"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="odoo-what-svg"
                    >
                      <circle cx="38" cy="42" r="22" fill="#F5A623" />
                      <rect
                        x="28"
                        y="28"
                        width="16"
                        height="64"
                        rx="8"
                        transform="rotate(-45 28 28)"
                        fill="#8A3B8F"
                      />
                      <circle cx="76" cy="72" r="20" fill="#00BFA5" />
                    </svg>
                  ),
                },
                {
                  num: "02",
                  titleKey: "odoo.what.hr.title",
                  descKey: "odoo.what.hr",
                  svg: (
                    <svg
                      viewBox="0 0 120 120"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="odoo-what-svg"
                    >
                      <circle cx="60" cy="30" r="20" fill="#9C27B0" />
                      <ellipse cx="60" cy="90" rx="36" ry="22" fill="#7B1FA2" />
                      <circle cx="20" cy="50" r="14" fill="#F5A623" />
                      <ellipse cx="18" cy="95" rx="22" ry="14" fill="#FF7043" />
                      <circle cx="100" cy="50" r="14" fill="#00BFA5" />
                      <ellipse
                        cx="102"
                        cy="95"
                        rx="22"
                        ry="14"
                        fill="#00897B"
                      />
                    </svg>
                  ),
                },
                {
                  num: "03",
                  titleKey: "odoo.mod.4",
                  descKey: "odoo.what.inventory",
                  svg: (
                    <svg
                      viewBox="0 0 120 120"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="odoo-what-svg"
                    >
                      <polygon
                        points="60,8 100,30 100,74 60,96 20,74 20,30"
                        fill="#F44336"
                        transform="translate(6,6)"
                      />
                      <polygon
                        points="60,8 100,30 100,74 60,96 20,74 20,30"
                        fill="#FF7043"
                        transform="translate(-4,4)"
                      />
                      <polygon
                        points="60,8 100,30 100,74 60,96 20,74 20,30"
                        fill="#8A3B8F"
                        transform="translate(0,-8)"
                      />
                    </svg>
                  ),
                },
                {
                  num: "04",
                  titleKey: "odoo.what.sales.title",
                  descKey: "odoo.what.sales",
                  svg: (
                    <svg
                      viewBox="0 0 120 120"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="odoo-what-svg"
                    >
                      <rect
                        x="14"
                        y="54"
                        width="22"
                        height="52"
                        rx="4"
                        fill="#F5A623"
                      />
                      <rect
                        x="49"
                        y="36"
                        width="22"
                        height="70"
                        rx="4"
                        fill="#C2185B"
                      />
                      <rect
                        x="84"
                        y="16"
                        width="22"
                        height="90"
                        rx="4"
                        fill="#E91E63"
                      />
                    </svg>
                  ),
                },
                {
                  num: "05",
                  titleKey: "odoo.mod.5",
                  descKey: "odoo.what.projects",
                  svg: (
                    <svg
                      viewBox="0 0 120 120"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="odoo-what-svg"
                    >
                      <rect
                        x="10"
                        y="10"
                        width="100"
                        height="100"
                        rx="16"
                        fill="#1A2340"
                      />
                      <polyline
                        points="22,64 46,88 98,28"
                        stroke="url(#wcheck)"
                        strokeWidth="16"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                      <defs>
                        <linearGradient
                          id="wcheck"
                          x1="22"
                          y1="88"
                          x2="98"
                          y2="28"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0%" stopColor="#7B1FA2" />
                          <stop offset="100%" stopColor="#00BFA5" />
                        </linearGradient>
                      </defs>
                    </svg>
                  ),
                },
                {
                  num: "06",
                  titleKey: "odoo.mod.3",
                  descKey: "odoo.what.ecommerce",
                  svg: (
                    <svg
                      viewBox="0 0 120 120"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="odoo-what-svg"
                    >
                      <path
                        d="M20 30 Q20 18 32 18 L88 18 Q100 18 100 30 L108 80 Q108 94 94 94 L26 94 Q12 94 12 80 Z"
                        fill="url(#wbag)"
                      />
                      <path
                        d="M42 40 Q42 20 60 20 Q78 20 78 40"
                        stroke="#fff"
                        strokeWidth="7"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.7"
                      />
                      <defs>
                        <linearGradient
                          id="wbag"
                          x1="12"
                          y1="18"
                          x2="108"
                          y2="94"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0%" stopColor="#C2185B" />
                          <stop offset="100%" stopColor="#7B1FA2" />
                        </linearGradient>
                      </defs>
                    </svg>
                  ),
                },
              ].map((item) => (
                <div className="odoo-what-item" key={item.num}>
                  <div className="odoo-what-item-icon">{item.svg}</div>
                  <div className="odoo-what-item-body">
                    <div className="odoo-what-item-top">
                      <span className="odoo-what-num">{item.num}</span>
                      <h3 className="odoo-what-item-title">
                        <T k={item.titleKey} />
                      </h3>
                    </div>
                    <p className="odoo-what-item-desc">
                      <T k={item.descKey} />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTEGRATIONS */}
        <section className="odoo-integrations">
          <div className="odoo-integrations-inner">
            <div className="odoo-integrations-header">
              <h2 className="odoo-integrations-title">
                <T k="odoo.int.title.1" />{" "}
                <span className="odoo-seg-accent">
                  <T k="odoo.int.title.2" />
                </span>{" "}
                <T k="odoo.int.title.3" />
              </h2>
              <p className="odoo-integrations-sub">
                <T k="odoo.int.sub" />
              </p>
            </div>

            <div className="odoo-int-grid">
              {/* Payment Gateway */}
              <div className="odoo-int-card">
                <div className="odoo-int-icon">
                  <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="6" y="14" width="52" height="36" rx="5" />
                    <line x1="6" y1="24" x2="58" y2="24" />
                    <line x1="14" y1="36" x2="26" y2="36" />
                    <circle cx="46" cy="38" r="8" strokeWidth="2" />
                    <polyline points="42,38 45,41 50,35" />
                  </svg>
                </div>
                <h3 className="odoo-int-title">
                  <T k="odoo.int.1.title" />
                </h3>
                <p className="odoo-int-desc">
                  <T k="odoo.int.1.desc" />
                </p>
              </div>

              {/* SMS Gateway */}
              <div className="odoo-int-card">
                <div className="odoo-int-icon">
                  <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="16" y="4" width="32" height="44" rx="5" />
                    <line x1="22" y1="38" x2="42" y2="38" />
                    <circle
                      cx="32"
                      cy="44"
                      r="2"
                      fill="currentColor"
                      stroke="none"
                    />
                    <path
                      d="M6 16 Q4 16 4 20 L4 34 Q4 38 8 38 L12 38 L12 44 L18 38 L28 38 Q32 38 32 34"
                      strokeWidth="1.8"
                    />
                    <line x1="8" y1="24" x2="26" y2="24" />
                    <line x1="8" y1="30" x2="20" y2="30" />
                  </svg>
                </div>
                <h3 className="odoo-int-title">
                  <T k="odoo.int.2.title" />
                </h3>
                <p className="odoo-int-desc">
                  <T k="odoo.int.2.desc" />
                </p>
              </div>

              {/* Social Media */}
              <div className="odoo-int-card">
                <div className="odoo-int-icon">
                  <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="50" cy="14" r="6" />
                    <circle cx="14" cy="32" r="6" />
                    <circle cx="50" cy="50" r="6" />
                    <line x1="20" y1="29" x2="44" y2="17" />
                    <line x1="20" y1="35" x2="44" y2="47" />
                  </svg>
                </div>
                <h3 className="odoo-int-title">
                  <T k="odoo.int.3.title" />
                </h3>
                <p className="odoo-int-desc">
                  <T k="odoo.int.3.desc" />
                </p>
              </div>

              {/* E-commerce */}
              <div className="odoo-int-card">
                <div className="odoo-int-icon">
                  <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 10 L14 10 L20 38 L52 38 L58 20 L18 20" />
                    <circle cx="26" cy="46" r="4" />
                    <circle cx="46" cy="46" r="4" />
                    <path d="M40 8 L48 8 M44 4 L44 12" strokeWidth="2.5" />
                    <path d="M52 14 L58 8" strokeWidth="2" />
                  </svg>
                </div>
                <h3 className="odoo-int-title">
                  <T k="odoo.int.4.title" />
                </h3>
                <p className="odoo-int-desc">
                  <T k="odoo.int.4.desc" />
                </p>
              </div>

              {/* Shipping */}
              <div className="odoo-int-card">
                <div className="odoo-int-icon">
                  <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="4" y="18" width="36" height="28" rx="3" />
                    <path d="M40 26 L52 26 L58 36 L58 46 L40 46 Z" />
                    <circle cx="16" cy="50" r="5" />
                    <circle cx="48" cy="50" r="5" />
                    <line x1="4" y1="30" x2="40" y2="30" />
                    <line x1="16" y1="18" x2="16" y2="30" />
                    <line x1="28" y1="18" x2="28" y2="30" />
                  </svg>
                </div>
                <h3 className="odoo-int-title">
                  <T k="odoo.int.5.title" />
                </h3>
                <p className="odoo-int-desc">
                  <T k="odoo.int.5.desc" />
                </p>
              </div>

              {/* Biometric */}
              <div className="odoo-int-card">
                <div className="odoo-int-icon">
                  <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 8 Q10 8 10 18 L10 22" />
                    <path d="M44 8 Q54 8 54 18 L54 22" />
                    <path d="M10 42 L10 46 Q10 56 20 56" />
                    <path d="M54 42 L54 46 Q54 56 44 56" />
                    <path d="M22 32 Q22 24 32 24 Q42 24 42 32 Q42 40 36 42" />
                    <path d="M28 32 Q28 28 32 28 Q36 28 36 32 Q36 36 34 38" />
                    <circle
                      cx="32"
                      cy="38"
                      r="2"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                </div>
                <h3 className="odoo-int-title">
                  <T k="odoo.int.6.title" />
                </h3>
                <p className="odoo-int-desc">
                  <T k="odoo.int.6.desc" />
                </p>
              </div>

              {/* Amazon */}
              <div className="odoo-int-card">
                <div className="odoo-int-icon">
                  <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="12" y="14" width="40" height="32" rx="4" />
                    <path d="M20 46 L14 56 L50 56 L44 46" />
                    <path
                      d="M22 30 Q22 24 32 24 Q42 24 42 30 Q42 36 32 36 Q26 36 24 40"
                      strokeWidth="1.8"
                    />
                    <path d="M38 40 Q44 38 46 34" strokeWidth="1.8" />
                    <path d="M20 44 Q32 48 44 44" strokeWidth="1.8" />
                  </svg>
                </div>
                <h3 className="odoo-int-title">
                  <T k="odoo.int.7.title" />
                </h3>
                <p className="odoo-int-desc">
                  <T k="odoo.int.7.desc" />
                </p>
              </div>

              {/* Shopify */}
              <div className="odoo-int-card">
                <div className="odoo-int-icon">
                  <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 10 L12 50 L52 50 L48 10 Z" />
                    <path d="M24 10 Q24 4 32 4 Q40 4 40 10" />
                    <line x1="20" y1="28" x2="44" y2="28" />
                    <line x1="22" y1="38" x2="42" y2="38" />
                    <circle cx="28" cy="50" r="4" />
                    <circle cx="40" cy="50" r="4" />
                  </svg>
                </div>
                <h3 className="odoo-int-title">
                  <T k="odoo.int.8.title" />
                </h3>
                <p className="odoo-int-desc">
                  <T k="odoo.int.8.desc" />
                </p>
              </div>

              {/* Multi-Platform */}
              <div className="odoo-int-card">
                <div className="odoo-int-icon">
                  <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="4" y="8" width="30" height="22" rx="3" />
                    <rect x="38" y="8" width="22" height="16" rx="3" />
                    <rect x="38" y="30" width="22" height="16" rx="3" />
                    <rect x="4" y="36" width="30" height="20" rx="3" />
                    <line x1="34" y1="16" x2="38" y2="16" />
                    <line x1="34" y1="38" x2="38" y2="38" />
                    <line x1="34" y1="19" x2="34" y2="38" />
                  </svg>
                </div>
                <h3 className="odoo-int-title">
                  <T k="odoo.int.9.title" />
                </h3>
                <p className="odoo-int-desc">
                  <T k="odoo.int.9.desc" />
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES ALTERNATING */}
        <section className="odoo-services-alt">
          <div className="odoo-services-alt-inner">
            {/* Row 1 — text left, image right */}
            <div className="odoo-svc-row">
              <div className="odoo-svc-text">
                <span className="odoo-svc-eyebrow">01</span>
                <h2 className="odoo-svc-title">
                  <T k="odoo.svc.1.title" />
                </h2>
                <p className="odoo-svc-p">
                  <T k="odoo.svc.1.p1" />
                </p>
                <p className="odoo-svc-p">
                  <T k="odoo.svc.1.p2" />
                </p>
                <p className="odoo-svc-p">
                  <T k="odoo.svc.1.p3" />
                </p>
              </div>
              <div className="odoo-svc-image">
                <Image
                  src="/oddo-service-1.png"
                  alt="Why You Need Odoo Integration"
                  width={520}
                  height={380}
                  className="odoo-svc-img"
                />
              </div>
            </div>

            {/* Row 2 — image left, text right */}
            <div className="odoo-svc-row odoo-svc-row-reverse">
              <div className="odoo-svc-text">
                <span className="odoo-svc-eyebrow">02</span>
                <h2 className="odoo-svc-title">
                  <T k="odoo.svc.2.title" />
                </h2>
                <p className="odoo-svc-p">
                  <T k="odoo.svc.2.p1" />
                </p>
                <p className="odoo-svc-p">
                  <T k="odoo.svc.2.p2" />
                </p>
              </div>
              <div className="odoo-svc-image">
                <Image
                  src="/oddo-service-2.png"
                  alt="Odoo ERP Integration Services"
                  width={520}
                  height={380}
                  className="odoo-svc-img"
                />
              </div>
            </div>

            {/* Row 3 — text left, image right */}
            <div className="odoo-svc-row">
              <div className="odoo-svc-text">
                <span className="odoo-svc-eyebrow">03</span>
                <h2 className="odoo-svc-title">
                  <T k="odoo.svc.3.title" />
                </h2>
                <p className="odoo-svc-p">
                  <T k="odoo.svc.3.p1" />
                </p>
                <p className="odoo-svc-p">
                  <T k="odoo.svc.3.p2" />
                </p>
                <p className="odoo-svc-p">
                  <T k="odoo.svc.3.p3" />
                </p>
              </div>
              <div className="odoo-svc-image">
                <Image
                  src="/oddo-service-3.png"
                  alt="Odoo CRM Integration Services"
                  width={520}
                  height={380}
                  className="odoo-svc-img"
                />
              </div>
            </div>

            {/* Row 4 — image left, text right */}
            <div className="odoo-svc-row odoo-svc-row-reverse">
              <div className="odoo-svc-text">
                <span className="odoo-svc-eyebrow">04</span>
                <h2 className="odoo-svc-title">
                  <T k="odoo.svc.4.title" />
                </h2>
                <p className="odoo-svc-p">
                  <T k="odoo.svc.4.p1" />
                </p>
                <p className="odoo-svc-p">
                  <T k="odoo.svc.4.p2" />
                </p>
                <p className="odoo-svc-p">
                  <T k="odoo.svc.4.p3" />
                </p>
              </div>
              <div className="odoo-svc-image">
                <Image
                  src="/oddo-service-4.png"
                  alt="Odoo Third-party API Integration"
                  width={520}
                  height={380}
                  className="odoo-svc-img"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
