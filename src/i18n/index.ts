import { en } from './en'

const locales = { en }

type Locale = keyof typeof locales

type LocaleObject = Record<string, unknown>

let currentLocale: Locale = 'en'

export function setLocale(locale: Locale) {
  currentLocale = locale
}

export function t(path: string): string {
  const keys = path.split('.')
  let value: LocaleObject | string | undefined = locales[currentLocale]
  for (const key of keys) {
    if (typeof value === 'object' && value !== null) {
      value = value[key] as LocaleObject | string | undefined
    } else {
      return path
    }
    if (value === undefined) return path
  }
  return typeof value === 'string' ? value : path
}
