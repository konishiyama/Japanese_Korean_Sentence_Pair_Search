import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import GoogleAnalytics from './GoogleAnalytics';
import Header from './components/Header';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ja-Ko-Sentence-Pair-Search',
  description: 'Web App to search for Japanese-Korean sentence pairs.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className='flex flex-col min-h-screen flex-grow font-sans text-base'>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
            <GoogleAnalytics ga_id= 
            {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
          ) : null}

        <Header />
        <div className='w-full mx-auto my-0 p-6 sm:max-w-4xl lg:w-2/3 lg:max-w-4xl'>
          {children}
        </div>
        {/* <Footer /> */}
      </body>
    </html>
  );
}