'use client'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchPopularMovies } from '../../api/tmdb'
import { t } from '../../i18n'
import MoviesList from '../MoviesList/MoviesList'
import Button from '../Button/Button'

export default function PopularMovies() {
  const [page, setPage] = useState(1)
  const { data, isLoading, error } = useQuery({
    queryKey: ['popular-movies', page],
    queryFn: () => fetchPopularMovies(page),
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
      <div className="flex justify-center gap-4 mt-6">
        <Button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
          {t('home.prev')}
        </Button>
        <span className="px-2 py-2">{page}</span>
        <Button
          onClick={() => setPage((p) => p + 1)}
          disabled={data.total_pages && page >= data.total_pages}
        >
          {t('home.next')}
        </Button>
      </div>
    </section>
  )
}
