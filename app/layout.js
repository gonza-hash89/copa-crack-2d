import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Copa Crack Perú | Torneo de Fútbol Menores',
  description:
    'Inscripciones abiertas para la Copa Crack Perú - Temporada Enero 2027. Categorías Sub-6 a Sub-16.',
  verification: {
    // Solo el token: Next genera la etiqueta <meta> automáticamente.
    google: 'aq_QrbF_TJjDlPOh8j3PF0g7dwX5r1K-GsSto8GIMfI',
  },
  openGraph: {
    title: 'Copa Crack Perú | Torneo de Fútbol Menores',
    description:
      'Inscripciones abiertas para la Copa Crack Perú - Temporada Enero 2027. Categorías Sub-6 a Sub-16.',
    type: 'website',
    locale: 'es_PE',
    images: [{ url: '/logo.png', width: 600, height: 600, alt: 'Escudo Copa Crack Perú' }],
  },
};

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning: ignora el lang reescrito por extensiones
    // (traductor) solo en <html>, sin ocultar errores reales del resto
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
