import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { t } from '../../i18n'
import { Rating } from '../Rating/Rating'

export type Movie = {
  id: number
  title?: string
  poster_path?: string
  release_date?: string
  vote_average?: number
}

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => (
  <Link
    href={`/movie/${movie.id}`}
    className="flex flex-row bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden group"
  >
    {movie.poster_path ? (
      <Image
        src={`https://${process.env.NEXT_PUBLIC_TMDB_POSTER_URL}${movie.poster_path}`}
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
      <h3 className="text-lg font-semibold mb-1 truncate">{movie.title || t('home.untitled')}</h3>
      <div className="text-sm text-gray-500 mb-1">
        {movie.release_date || t('home.noReleaseDate')}
      </div>
      <div className="flex items-center gap-1 text-yellow-500 font-bold">
        <Rating
          value={
            typeof movie.vote_average === 'number'
              ? Number(movie.vote_average.toFixed(1))
              : undefined
          }
          fallback={t('home.noRating')}
        />
      </div>
    </div>
  </Link>
)

export default MovieCard
