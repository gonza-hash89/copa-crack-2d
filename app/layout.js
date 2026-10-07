import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://copa-crack-oficial.vercel.app';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Copa Crack | Torneo de Fútbol Formativo',
    template: '%s | Copa Crack',
  },
  description: 'Torneo de fútbol formativo. Donde los futuros cracks juegan, aprenden y sueñan bajo las luces del estadio. Inscribe a tu academia.',
  keywords: ['Copa Crack', 'fútbol formativo', 'torneo fútbol', 'academias fútbol', 'Lima Perú', 'Sub-6', 'Sub-8', 'Sub-10', 'Sub-12', 'Sub-14', 'Sub-16'],
  authors: [{ name: 'Copa Crack Oficial' }],
  creator: 'Copa Crack Oficial',
  publisher: 'Copa Crack Oficial',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'aq_QrbF_TJjDlPOh8j3PF0g7dwX5r1K-GsSto8GIMfI',
  },
  openGraph: {
    title: 'Copa Crack | Torneo de Fútbol Formativo',
    description: 'Torneo de fútbol formativo. Donde los futuros cracks juegan, aprenden y sueñan bajo las luces del estadio. Inscribe a tu academia.',
    type: 'website',
    locale: 'es_PE',
    url: siteUrl,
    siteName: 'Copa Crack Oficial',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Copa Crack Oficial - Torneo de Fútbol Formativo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Copa Crack | Torneo de Fútbol Formativo',
    description: 'Torneo de fútbol formativo. Donde los futuros cracks juegan, aprenden y sueñan bajo las luces del estadio. Inscribe a tu academia.',
    images: ['/logo.png'],
    creator: '@copacrackoficial',
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="sitemap" href="/sitemap.xml" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}