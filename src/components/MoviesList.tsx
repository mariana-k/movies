import React from 'react'
import Link from 'next/link'
import { t } from '../i18n'
import { Star, StarOff } from 'lucide-react'
import Image from 'next/image'

export type Movie = {
  id: number
  title?: string
  poster_path?: string
  release_date?: string
  vote_average?: number
}

export default function MoviesList({ movies }: { movies: Movie[] }) {
  if (!movies.length)
    return <div className="text-center text-gray-500 py-8">{t('home.noMoviesToDisplay')}</div>
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <Link
          key={movie.id}
          href={`/movie/${movie.id}`}
          className="flex flex-row bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden group"
        >
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title || t('home.untitled')}
              width={128}
              height={192}
              className="w-32 h-48 object-cover group-hover:scale-105 transition-transform flex-shrink-0"
              priority={false}
            />
          ) : (
            <div className="w-32 h-48 bg-gray-200 flex items-center justify-center text-gray-400 flex-shrink-0">
              {t('home.noImage')}
            </div>
          )}
          <div className="p-4 flex-1 min-w-0">
            <h3 className="text-lg font-semibold mb-1 truncate">
              {movie.title || t('home.untitled')}
            </h3>
            <div className="text-sm text-gray-500 mb-1">
              {movie.release_date || t('home.noReleaseDate')}
            </div>
            <div className="flex items-center gap-1 text-yellow-500 font-bold">
              {typeof movie.vote_average === 'number' ? (
                <>
                  <Star size={16} className="inline-block fill-yellow-500 stroke-yellow-500" />
                  {movie.vote_average.toFixed(1)}
                </>
              ) : (
                <>
                  <StarOff size={16} className="inline-block text-gray-300" />
                  {t('home.noRating')}
                </>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
