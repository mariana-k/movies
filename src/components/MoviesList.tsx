import React from 'react'
import Link from 'next/link'

export type Movie = {
  id: number
  title: string
  poster_path?: string
  release_date?: string
  vote_average?: number
}

export default function MoviesList({ movies }: { movies: Movie[] }) {
  if (!movies.length) return null
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <Link
          key={movie.id}
          href={`/movie/${movie.id}`}
          className="block bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden group"
        >
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-1 truncate">{movie.title}</h3>
            <div className="text-sm text-gray-500 mb-1">{movie.release_date || '—'}</div>
            <div className="text-sm text-yellow-500 font-bold">
              {movie.vote_average ? `★ ${movie.vote_average.toFixed(1)}` : '—'}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
