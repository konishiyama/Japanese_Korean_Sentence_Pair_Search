import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import GoogleAnalytics from './GoogleAnalytics';
import { i18n } from '../i18n'
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ja-Ko-Sentence-Pair-Search',
  description: 'Web App to search for Japanese-Korean sentence pairs.',
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default function RootLayout({
  children, params
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <html lang={params.lang}>
      <body className='flex flex-col min-h-screen flex-grow font-sans text-base'>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
            <GoogleAnalytics ga_id= 
            {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
          ) : null}        
          {children}
      </body>
    </html>
  );
}