import React, { AnchorHTMLAttributes, DetailedHTMLProps, ImgHTMLAttributes } from 'react'
import { render, screen } from '@testing-library/react'
import MovieCard, { Movie } from './MovieCard'
import { describe, it, expect, vi } from 'vitest'

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => (
    <img {...props} />
  ),
}))
vi.mock('next/link', () => ({
  __esModule: true,
  default: (
    props: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
  ) => <a {...props} />,
}))

describe('MovieCard', () => {
  const baseMovie: Movie = {
    id: 1,
    title: 'Test Movie',
    poster_path: '/poster.jpg',
    release_date: '2023-01-01',
    vote_average: 7.5,
  }

  it('renders all movie info', () => {
    render(<MovieCard movie={baseMovie} />)
    expect(screen.getByText('Test Movie')).toBeInTheDocument()
    expect(screen.getByText('2023-01-01')).toBeInTheDocument()
    expect(screen.getByText('7.5')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', expect.stringContaining('/poster.jpg'))
  })

  it('renders fallback for missing image', () => {
    render(<MovieCard movie={{ ...baseMovie, poster_path: undefined }} />)
    expect(screen.getByText('No Image')).toBeInTheDocument()
  })

  it('renders fallback for missing title', () => {
    render(<MovieCard movie={{ ...baseMovie, title: undefined }} />)
    expect(screen.getByText('Untitled')).toBeInTheDocument()
  })

  it('renders fallback for missing release date', () => {
    render(<MovieCard movie={{ ...baseMovie, release_date: undefined }} />)
    expect(screen.getByText('No Release date')).toBeInTheDocument()
  })

  it('renders fallback for missing rating', () => {
    render(<MovieCard movie={{ ...baseMovie, vote_average: undefined }} />)
    expect(screen.getByText('No Rating')).toBeInTheDocument()
  })
})
