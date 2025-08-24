// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import GlobalAudioPlayer from '@/components/GlobalAudioPlayer';
import { LanguageProvider } from '@/i18n/languageContext';
import ClientProtections from './ClientProtections';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Egyptian Marvels',
  description: 'Explore the marvels of ancient Egyptian civilization through interactive 3D models.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={`${inter.className} relative`}>
        {/* Global Audio Player - will persist across all routes */}
        <GlobalAudioPlayer />
        <ClientProtections />

        {/* Main content */}
        <LanguageProvider>{children}</LanguageProvider>
        <footer className="text-center text-sm p-4">
          © {new Date().getFullYear()} Egyptian Wonders. Created by Mark Albert for history enthusiasts. All rights reserved.
        </footer>
      </body>
    </html>
  );
}