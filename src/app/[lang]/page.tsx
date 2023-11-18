import Search from '../components/Search';
// import Results from './components/Results';
import Link from 'next/link';
import { Locale } from '../../i18n';
import { getDictionary } from '../components/Lang/dictionaries';
import LocaleSwitcher from '../components/Lang/local-switcher';
import Header from '../components/Header';

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale }
}){
  const dictionary = await getDictionary(lang)
  return (
    <main>
        <Header header_props={dictionary.header_props} lang={lang} />
        <div className='w-full mx-auto my-0 p-6 sm:max-w-4xl lg:w-2/3 lg:max-w-4xl'>
          <Search search_props={dictionary.search_props}/>
        </div>
    </main>
  )
}
