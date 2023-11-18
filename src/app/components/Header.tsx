'use client';

import { Fragment, useState } from 'react'
import { NextPage } from 'next';
import Image from 'next/image'
import { Dialog, Popover, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import ReactCountryFlag from "react-country-flag"
import { Locale } from '@components/i18n';
import LocaleSwitcher from './Lang/local-switcher';


interface Dictionary {
    header_title: string;
}

interface HeaderProps {
  header_props: Dictionary;
  lang: Locale;
}

const Header: NextPage<HeaderProps> = ({ header_props, lang }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between pt-6 px-6 lg:pt-8 px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Switch Language</span>
            <LocaleSwitcher lang={lang}/>
          </Link>
        </div>
        <h1 className='text-xl font-semibold'>
          <Link href={`/${lang}`}>{header_props.header_title}</Link>
        </h1>
        <div className="lg:flex lg:flex-1 lg:justify-end">
          <Link href="/about" className="text-sm text-base font-semibold leading-6 ">
            About
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header;