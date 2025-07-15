import React from 'react'
import SearchBar from './SearchBar'
import Link from 'next/link'
import { t } from '../i18n'

export default function Header() {
  return (
    <header className="w-full bg-white shadow p-4 flex items-center justify-between mb-8">
      <div className="text-2xl font-bold">
        <Link href="/">{t('app.title')}</Link>
      </div>
      <div className="w-1/2"></div>
    </header>
  )
}
