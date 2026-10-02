import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata = {
  title: 'Copa Crack Perú | Torneo de Fútbol Menores',
  description:
    'Inscripciones abiertas para la Copa Crack Perú - Temporada Enero 2027. Categorías Sub-6 a Sub-16.',
  // Descomenta y pon tu dominio real al desplegar: WhatsApp exige URL absoluta
  // para la vista previa de la imagen.
  // metadataBase: new URL('https://www.tudominio.pe'),
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
