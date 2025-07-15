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
    <ul>
      {movies.map((movie) => (
        <li key={movie.id} className="mb-2">
          <Link href={`/movie/${movie.id}`}>{movie.title}</Link>
        </li>
      ))}
    </ul>
  )
}
