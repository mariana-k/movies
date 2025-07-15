import React from 'react'
import { t } from '../i18n'

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-6">{t('home.title')}</h1>
      {/* Search Bar */}
      <div className="mb-6">
        {/* TODO: SearchBar component */}
        <input
          type="text"
          placeholder={t('home.searchPlaceholder')}
          className="w-full p-2 border rounded"
          disabled
        />
      </div>
      {/* Movie List */}
      <div>
        {/* TODO: MovieList component */}
        <div className="text-gray-500">{t('home.loading')}</div>
      </div>
    </main>
  )
}
