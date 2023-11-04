import Header from './components/Header'
import Footer from './components/Footer'
import Search from './components/Search';
import Link from 'next/link';

export default function Home() {
  return (
    // <main classNameName="flex min-h-screen flex-col items-center justify-between p-24">
    <>
        <Header />
        <Search />
        <Footer />
    </>
    // </main>
  )
}
