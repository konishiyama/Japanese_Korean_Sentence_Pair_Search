'use client'
import { usePathname } from 'next/navigation'
import { NextPage } from 'next';
import Link from 'next/link'
import { i18n } from '@components/i18n'
import { Locale } from '@components/i18n';
import ReactCountryFlag from "react-country-flag"

interface HeaderProps {
  lang: Locale;
}


const LocaleSwitcher: NextPage<HeaderProps> = ({ lang }) => {
  const pathName = usePathname()
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  const destination = lang === 'ko' ? 'ja' : 'ko';
  const countryCode = lang === 'ko' ? 'JP' : 'KR';

  return (
    <>
      <Link href={redirectedPathName(destination)}>
        <ReactCountryFlag countryCode={countryCode} />
      </Link>
    </>
  )
}

export default LocaleSwitcher;