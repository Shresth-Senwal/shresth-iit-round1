import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import Header from '@/components/navigation/Header'
import Footer from '@/components/navigation/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DataFlow - Intelligent Data Solutions',
  description: 'Empowering businesses with intelligent data solutions, carbon footprint management, and advanced analytics dashboards.',
  keywords: ['data management', 'carbon footprint', 'analytics', 'dashboard', 'business intelligence', 'sustainability', 'Next.js', 'Tailwind CSS'],
  authors: [{ name: 'DataFlow Team' }],
  openGraph: {
    title: 'DataFlow - Intelligent Data Solutions',
    description: 'Empowering businesses with intelligent data solutions and carbon footprint management.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider defaultTheme="dark" storageKey="dataflow-theme">
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pt-16 lg:pt-20">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
} 