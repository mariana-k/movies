'use client'
import React from 'react'
import { t } from '../i18n'

export default function SearchBar({
  value,
  onChange,
  className = '',
}: {
  value: string
  onChange: (value: string) => void
  className?: string
}) {
  return (
    <input
      type="text"
      placeholder={t('home.searchPlaceholder')}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full mb-12 p-3 rounded-xl border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${className}`}
    />
  )
}
