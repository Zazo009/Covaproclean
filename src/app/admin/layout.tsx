import type { ReactNode } from 'react';
import '../globals.css';

export const metadata = { title: 'Cova Pro Clean — Admin', robots: { index: false, follow: false } };

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-sand-50 font-sans text-ink-950 antialiased">{children}</body>
    </html>
  );
}
