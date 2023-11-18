export const i18n = {
  defaultLocale: 'ja',
  locales: ['ja', 'ko'],
} as const

export type Locale = (typeof i18n)['locales'][number]