import Header from './components/Header'
import Footer from './components/Footer'
import Test from './components/Test';
import Link from 'next/link';

export default function Home() {
  return (
    // <main classNameName="flex min-h-screen flex-col items-center justify-between p-24">
    <>
        <Header />
        <Test />
        <Footer />
    </>
    // </main>
  )
}
