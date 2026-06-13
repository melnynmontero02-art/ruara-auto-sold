import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider'
import WelcomeModal from '@/components/ui/WelcomeModal'
import { SITE_URL, BUSINESS_NAME, BUSINESS_PHONE } from '@/lib/data'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'RUARA AUTO SOLD | Dealer Premium en Santo Domingo',
  description:
    'Vehículos japoneses y americanos importados con financiamiento flexible y aprobación rápida en República Dominicana. Toyota, Lexus, Honda, Ford, Nissan, Chevrolet y más.',
  keywords:
    'dealer autos Santo Domingo, carros financiados RD, Toyota Prado, financiamiento vehicular República Dominicana, importadora de carros RD',
  openGraph: {
    title: 'RUARA AUTO SOLD | Dealer Premium RD',
    description:
      'Tu dealer de confianza en Santo Domingo Este. Vehículos importados con financiamiento flexible.',
    type: 'website',
    locale: 'es_DO',
    url: SITE_URL,
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoDealer',
  name: BUSINESS_NAME,
  image: `${SITE_URL}/images/hero-banner.jpg`,
  url: SITE_URL,
  telephone: BUSINESS_PHONE,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calle Las Palmeras Orientales #1, Res. Los Triunfadores',
    addressLocality: 'Santo Domingo Este',
    addressRegion: 'Santo Domingo',
    addressCountry: 'DO',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,300;0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#06070A" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <WelcomeModal />
      </body>
    </html>
  )
}
