import React from 'react'
import { render, screen } from '@testing-library/react'
import MoviesList, { Movie } from './MoviesList'
import { t } from '../../i18n'
import { describe, it, expect } from 'vitest'

describe('MoviesList', () => {
  it('renders a list of movies', () => {
    const movies: Movie[] = [
      {
        id: 1,
        title: 'Movie 1',
        poster_path: '/poster1.jpg',
        release_date: '2023-01-01',
        vote_average: 7.5,
      },
      {
        id: 2,
        title: 'Movie 2',
        poster_path: '/poster2.jpg',
        release_date: '2022-01-01',
        vote_average: 8.1,
      },
    ]
    render(<MoviesList movies={movies} />)
    expect(screen.getByText('Movie 1')).toBeInTheDocument()
    expect(screen.getByText('Movie 2')).toBeInTheDocument()
    expect(screen.getByText('2023-01-01')).toBeInTheDocument()
    expect(screen.getByText('2022-01-01')).toBeInTheDocument()
    expect(screen.getByText('7.5')).toBeInTheDocument()
    expect(screen.getByText('8.1')).toBeInTheDocument()
  })

  it('shows fallback for empty list', () => {
    render(<MoviesList movies={[]} />)
    expect(screen.getByText(t('home.noMoviesToDisplay'))).toBeInTheDocument()
  })

  it('shows fallbacks for missing data', () => {
    const movies: Movie[] = [{ id: 1 }]
    render(<MoviesList movies={movies} />)
    expect(screen.getByText(t('home.untitled'))).toBeInTheDocument()
    expect(screen.getByText(t('home.noReleaseDate'))).toBeInTheDocument()
    expect(screen.getByText(t('home.noRating'))).toBeInTheDocument()
    expect(screen.getByText(t('home.noImage'))).toBeInTheDocument()
  })
})
