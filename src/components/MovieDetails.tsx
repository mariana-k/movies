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

  if (isLoading) return <div className="text-center py-8">{t('details.loading')}</div>
  if (error || !data)
    return <div className="text-center py-8 text-red-500">{t('details.notFound')}</div>

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 flex flex-col md:flex-row gap-8">
      {data.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w400${data.poster_path}`}
          alt={data.title}
          className="w-full md:w-64 rounded-lg object-cover"
        />
      )}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
        <div className="text-gray-500 mb-2">{data.release_date}</div>
        <div className="mb-4 text-gray-700">{data.overview}</div>
        <div className="flex flex-wrap gap-2 mb-2">
          {data.genres?.map((g: any) => (
            <span
              key={g.id}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium"
            >
              {g.name}
            </span>
          ))}
        </div>
        <div className="flex gap-4 text-sm text-gray-600 mb-2">
          <span>⭐ {data.vote_average}</span>
          <span>{formatRuntime(data.runtime)}</span>
          <span>{data.original_language}</span>
        </div>
      </div>
    </div>
  )
}
