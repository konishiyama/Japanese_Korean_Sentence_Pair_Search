import { Locale } from '@components/i18n';
import { getDictionary } from '@components/app/components/Lang/dictionaries';
import Header from '@components/app/components/Header';

export default async function About({
    params: { lang },
  }: {
    params: { lang: Locale }
  }) {
    const dictionary = await getDictionary(lang)

    return (
      <main>
        <Header header_props={dictionary.header_props} lang={lang} />
        <div className='w-full mx-auto my-0 p-6 sm:max-w-4xl lg:w-2/3 lg:max-w-4xl'>
          <div className="justify-center items-center mx-auto text-base sm:w-4/5">
            <h1 className='text-center font-thin text-4xl my-10 sm:my-16'>About</h1>
            <div className='text-light'>
              <p className='mb-6 sm:mb-8'>{dictionary.about_props.p_1}</p>
              <p className='mb-6 sm:mb-8'>{dictionary.about_props.p_2}</p>
              <p className='mb-6 sm:mb-8'>{dictionary.about_props.p_3}</p>
              <p className='mb-6 sm:mb-8'>{dictionary.about_props.p_4}</p>
            </div>
            <div className='text-light text-center mt-10 mb-10 sm:mt-16 sm:mb-16'>
              <a 
                href="mailto:ko.nishiyama.0420@gmail.com"
                className="font-semibold hover:text-indigo-shade"> ko.nishiyama.0420@gmail.com
                </a>
            </div>
          </div>
        </div>
      </main>
    )
}

