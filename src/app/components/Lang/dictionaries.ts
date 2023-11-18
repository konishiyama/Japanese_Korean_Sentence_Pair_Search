import 'server-only'
import type { Locale } from '@components/i18n';

const dictionaries = {
  ja: () => import('./dictionaries/ja.json').then((module) => module.default),
  ko: () => import('./dictionaries/ko.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.ja()