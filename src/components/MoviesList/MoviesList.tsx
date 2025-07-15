import React from 'react'
import { t } from '../../i18n'
import MovieCard, { Movie } from '../MovieCard/MovieCard'

export default function MoviesList({ movies }: { movies: Movie[] }) {
  if (!movies.length)
    return <div className="text-center text-gray-500 py-8">{t('home.noMoviesToDisplay')}</div>
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}
