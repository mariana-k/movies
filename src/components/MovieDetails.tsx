'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchMovieDetails } from '../api/tmdb'
import { t } from '../i18n'

function formatRuntime(runtime: number) {
  const h = Math.floor(runtime / 60)
  const m = runtime % 60
  return `${h}h ${m}m`
}

export default function MovieDetails({ id }: { id: number }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['movie-details', id],
    queryFn: () => fetchMovieDetails(id),
  })

  if (isLoading) return <div>{t('details.loading')}</div>
  if (error || !data) return <div>{t('details.notFound')}</div>

  return (
    <div>
      <h1>{data.title}</h1>
      <div>{data.release_date}</div>
      {data.poster_path && (
        <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.title} />
      )}
      <div>{data.overview}</div>
      <div>{data.genres?.map((g: any) => g.name).join(', ')}</div>
      <div>{data.vote_average}</div>
      <div>{formatRuntime(data.runtime)}</div>
      <div>{data.original_language}</div>
    </div>
  )
}
