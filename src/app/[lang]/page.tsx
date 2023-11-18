import Search from '../components/Search';
// import Results from './components/Results';
import Link from 'next/link';
import { Locale } from '../../i18n';
import { getDictionary } from '../components/Lang/dictionaries';
import LocaleSwitcher from '../components/Lang/local-switcher';

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale }
}){
  const dictionary = await getDictionary(lang)
  return (
    <main>
        <LocaleSwitcher />
        <Search />
    </main>
  )
}
