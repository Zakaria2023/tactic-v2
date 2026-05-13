import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/layout/ChatWidget';
import Cursor from '@/components/layout/Cursor';

export const metadata: Metadata = {
  title: 'TAKTEEQ — Future Technology Solutions',
  description:
    'Leading digital solutions company. Web platforms, SaaS, ERP, mobile apps, cybersecurity & hosting across the Middle East.',
  keywords: ['software', 'web development', 'SaaS', 'ERP', 'mobile apps', 'Jordan', 'KSA', 'Syria'],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Cairo:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LanguageProvider>
          <Cursor />
          <Navbar />
          {children}
          <Footer />
          <ChatWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
