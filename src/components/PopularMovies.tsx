'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchPopularMovies } from '../api/tmdb'
import { t } from '../i18n'

export default function PopularMovies() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['popular-movies'],
    queryFn: ({ queryKey }) => fetchPopularMovies(),
  })

  if (isLoading) return <div>{t('home.loading')}</div>
  if (error) return <div>{t('home.noResults')}</div>

  if (!data) return <div>{t('home.noResults')}</div>
  if (!data.results || data.results.length === 0) return <div>{t('home.noResults')}</div>

  return (
    <ul>
      {data.results.map((movie: any) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  )
}
