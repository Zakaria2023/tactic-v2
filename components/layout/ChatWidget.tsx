'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { T } from '@/app/contexts/LanguageContext';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (open && widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [open]);

  return (
    <div className={`chat-widget ${open ? 'open' : ''}`} ref={widgetRef}>
      <button
        className="chat-fab"
        type="button"
        aria-label="Chat"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((p) => !p);
        }}
      >
        <svg className="chat-fab-icon chat-fab-open" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
        <svg className="chat-fab-icon chat-fab-close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
        <span className="chat-fab-pulse"></span>
      </button>

      <div className="chat-panel">
        <div className="chat-panel-head">
          <div className="chat-avatar">
            <span className="chat-avatar-pulse"></span>
            T
          </div>
          <div className="chat-panel-info">
            <h4 className="chat-panel-title"><T k="chat.title" /></h4>
            <p className="chat-panel-sub"><T k="chat.sub" /></p>
          </div>
        </div>

        <div className="chat-options">
          <a href="tel:+96265000000" className="chat-option">
            <span className="chat-option-icon chat-option-icon-call">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </span>
            <span className="chat-option-text">
              <span className="chat-option-title"><T k="chat.call.title" /></span>
              <span className="chat-option-desc"><T k="chat.call.desc" /></span>
            </span>
            <span className="chat-option-arrow">→</span>
          </a>

          <a href="https://wa.me/962795000000" target="_blank" rel="noopener noreferrer" className="chat-option">
            <span className="chat-option-icon chat-option-icon-wa">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.5 14.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.9-1.7.1-.2.1-.4 0-.5 0-.2-.7-1.7-.9-2.2-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4S5 7.8 5 9.3s1.1 3 1.2 3.2c.2.2 2.2 3.3 5.2 4.6 2 .8 2.7.9 3.7.7.6-.1 1.8-.7 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.7.5 3.3 1.3 4.7L2 22l5.5-1.4c1.4.7 2.9 1.1 4.5 1.1 5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
              </svg>
            </span>
            <span className="chat-option-text">
              <span className="chat-option-title"><T k="chat.wa.title" /></span>
              <span className="chat-option-desc"><T k="chat.wa.desc" /></span>
            </span>
            <span className="chat-option-arrow">→</span>
          </a>

          <Link href="/contact" className="chat-option" onClick={() => setOpen(false)}>
            <span className="chat-option-icon chat-option-icon-msg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </span>
            <span className="chat-option-text">
              <span className="chat-option-title"><T k="chat.msg.title" /></span>
              <span className="chat-option-desc"><T k="chat.msg.desc" /></span>
            </span>
            <span className="chat-option-arrow">→</span>
          </Link>
        </div>

        <div className="chat-panel-foot">
          <span><T k="chat.foot" /></span>
        </div>
      </div>
    </div>
  );
}
