import { en } from './en'

const locales = { en }

type Locale = keyof typeof locales

let currentLocale: Locale = 'en'

export function setLocale(locale: Locale) {
  currentLocale = locale
}

export function t(path: string): string {
  const keys = path.split('.')
  let value: any = locales[currentLocale]
  for (const key of keys) {
    value = value?.[key]
    if (value === undefined) return path
  }
  return value
}
