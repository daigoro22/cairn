import { css } from 'styled-system/css';
import './globals.css';
import Header from './_components/Header';
import { bizUDPGothic } from './fonts';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
  viewport: { width: 'device-width', initialScale: 1 },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={bizUDPGothic.className}>
      <body className={css({ bg: 'primary.bg' })}>
        <Header />
        <div className={css({ marginTop: 'header.height' })}> </div>
        {children}
      </body>
    </html>
  );
}
