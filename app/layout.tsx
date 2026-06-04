import type { Metadata } from 'next'
import './globals.css'
import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider'

export const metadata: Metadata = {
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
      </head>
      <body>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
