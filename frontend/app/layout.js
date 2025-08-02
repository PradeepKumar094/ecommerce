import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'E-Commerce Platform - Your Ultimate Shopping Destination',
  description: 'Discover amazing products from trusted sellers. Shop the latest trends in electronics, fashion, home & garden, and more. Secure payments, fast delivery, and excellent customer service.',
  keywords: 'ecommerce, online shopping, electronics, fashion, home & garden, secure payments, fast delivery',
  authors: [{ name: 'E-Commerce Team' }],
  creator: 'E-Commerce Platform',
  publisher: 'E-Commerce Platform',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'E-Commerce Platform - Your Ultimate Shopping Destination',
    description: 'Discover amazing products from trusted sellers. Shop the latest trends in electronics, fashion, home & garden, and more.',
    url: 'http://localhost:3000',
    siteName: 'E-Commerce Platform',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'E-Commerce Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-Commerce Platform - Your Ultimate Shopping Destination',
    description: 'Discover amazing products from trusted sellers. Shop the latest trends in electronics, fashion, home & garden, and more.',
    images: ['/og-image.jpg'],
  },
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
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`${inter.className} h-full bg-gray-50`}>
        <Providers>
          <div className="min-h-full flex flex-col">
            {/* We don't include Header here as it should be included in each page component */}
            {children}
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}