import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Yeasin — Full-Stack Developer',
  description: 'Full-Stack Developer building scalable web applications with React, Node.js, and modern technologies.',
  openGraph: {
    title: 'Yeasin — Full-Stack Developer',
    description: 'Building scalable web apps with modern tech.',
    images: [{ url: '/yeasin-profile.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: '/yeasin-profile.jpg' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
