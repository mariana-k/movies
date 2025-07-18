'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchMovieDetails } from '../../api/tmdb'
import { t } from '../../i18n'
import { Star, StarOff } from 'lucide-react'
import Image from 'next/image'
import { Rating } from '../Rating/Rating'
import Badge from '../Badge/Badge'

function formatRuntime(runtime: number) {
  if (!runtime && runtime !== 0) return t('details.noReleaseDate')
  const h = Math.floor(runtime / 60)
  const m = runtime % 60
  return `${h}h ${m}m`
}

type Genre = { id: number; name: string }

export default function MovieDetails({ id }: { id: number }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['movie-details', id],
    queryFn: () => fetchMovieDetails(id),
  })

  if (isLoading) return <div className="text-center py-8">{t('details.loading')}</div>
  if (error) return <div className="text-red-500 text-center py-8">{t('details.notFound')}</div>
  if (!data) return <div className="text-center py-8 text-red-500">{t('details.notFound')}</div>

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 flex flex-col md:flex-row gap-8">
      {data.poster_path ? (
        <Image
          src={`https://${process.env.NEXT_PUBLIC_TMDB_POSTER_URL}${data.poster_path}`}
          alt={data.title || t('details.untitled')}
          width={400}
          height={576}
          className="w-full md:w-64 rounded-lg object-cover"
          priority={false}
        />
      ) : (
        <div className="w-full md:w-64 h-96 bg-gray-200 flex items-center justify-center text-gray-400 rounded-lg">
          {t('details.noImage')}
        </div>
      )}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">{data.title || t('details.untitled')}</h1>
        <div className="text-gray-500 mb-2">{data.release_date || t('details.noReleaseDate')}</div>
        <div className="mb-4 text-gray-700">{data.overview || t('details.noOverview')}</div>
        <div className="flex flex-wrap gap-2 mb-2">
          {Array.isArray(data.genres) && data.genres.length ? (
            data.genres.map((g: Genre) => <Badge key={g.id}>{g.name}</Badge>)
          ) : (
            <span className="text-gray-400">{t('details.noGenres')}</span>
          )}
        </div>
        <div className="flex gap-4 text-sm text-gray-600 mb-2 items-center">
          <span className="flex items-center gap-1">
            <Rating
              value={
                typeof data.vote_average === 'number'
                  ? Number(data.vote_average.toFixed(1))
                  : undefined
              }
              fallback={t('home.noRating')}
            />
          </span>
          <span>{formatRuntime(data.runtime)}</span>
          <span>{data.original_language || t('details.noLanguage')}</span>
        </div>
      </div>
    </div>
  )
}
