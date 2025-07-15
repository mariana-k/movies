'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchPopularMovies } from '../api/tmdb'
import { t } from '../i18n'
import MoviesList from './MoviesList'

export default function PopularMovies() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['popular-movies'],
    queryFn: ({ queryKey }) => fetchPopularMovies(),
  })

  if (isLoading) return <div>{t('home.loading')}</div>
  if (error)
    return (
      <div className="text-red-500 text-center py-8">
        {t('home.error') || 'Failed to load movies. Please try again later.'}
      </div>
    )
  if (!data || !data.results) return <MoviesList movies={[]} />

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">{t('home.title')}</h2>
      <MoviesList movies={data.results} />
    </section>
  )
}
