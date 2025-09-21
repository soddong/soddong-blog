import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ThemeProvider from '@/components/theme/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Soddong',
    template: '%s | Soddong',
  },
  description: 'A blog to share learning and projects by Soddong',
  keywords: ['development', 'programming', 'technology', 'learning'],
  authors: [{ name: 'Soddong' }],
  creator: 'Soddong',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: 'Soddong',
    description: 'A blog to share learning and projects by Soddong',
    siteName: 'Soddong',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soddong',
    description: 'A blog to share learning and projects by Soddong',
    creator: '@yourusername',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100`}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}