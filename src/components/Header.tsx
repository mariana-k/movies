import React from 'react'
import { t } from '../i18n'
import { Film } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full bg-white shadow p-4 flex items-center justify-between mb-8">
      <div className="container mx-auto">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
          <Film size={28} className="text-blue-500" />
          {t('app.title')}
        </Link>
      </div>
    </header>
  )
}
