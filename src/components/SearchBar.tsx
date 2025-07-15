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
      className={`w-full p-2 border rounded ${className}`}
    />
  )
}
