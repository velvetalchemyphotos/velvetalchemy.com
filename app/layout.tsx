import type { Metadata } from 'next'
import { Cormorant_Garamond, Poppins, Instrument_Serif } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import EmailPopup from '@/components/ui/EmailPopup'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
})

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
})

const instrument = Instrument_Serif({
  variable: '--font-instrument',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'Velvet Alchemy Photography',
  description: 'Luxury wedding and portrait photography',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      style={
        {
          '--font-mattone': "'Mattone', sans-serif",
        } as React.CSSProperties
      }
      className={`${cormorant.variable} ${poppins.variable} ${instrument.variable}`}
    >
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
        <EmailPopup />
      </body>
    </html>
  )
}
