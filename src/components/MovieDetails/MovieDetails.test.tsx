import React from 'react'
import { render, screen } from '@testing-library/react'
import * as tmdb from '../../api/tmdb'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { vi, describe, it, expect, afterEach } from 'vitest'
import { t } from '../../i18n'
import MovieDetails from './MovieDetails'

vi.mock('../../api/tmdb')
afterEach(() => {
  vi.clearAllMocks()
})

describe('MovieDetails', () => {
  it('renders loading state', () => {
    ;(
      tmdb.fetchMovieDetails as unknown as { mockReturnValue: (prop: unknown) => null }
    ).mockReturnValue(new Promise(() => {}))
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <MovieDetails id={1} />
      </QueryClientProvider>,
    )
    expect(screen.getByText(t('details.loading'))).toBeInTheDocument()
  })

  it('renders error state', async () => {
    ;(
      tmdb.fetchMovieDetails as unknown as { mockRejectedValue: (prop: unknown) => null }
    ).mockRejectedValue(new Error('fail'))
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    })
    render(
      <QueryClientProvider client={queryClient}>
        <MovieDetails id={1} />
      </QueryClientProvider>,
    )
    expect(await screen.findByText(t('details.notFound'))).toBeInTheDocument()
  })

  it('renders movie details', async () => {
    ;(
      tmdb.fetchMovieDetails as unknown as { mockResolvedValue: (prop: unknown) => null }
    ).mockResolvedValue({
      title: 'Test Movie',
      release_date: '2023-01-01',
      poster_path: '/poster.jpg',
      overview: 'A test movie.',
      genres: [{ id: 1, name: 'Action' }],
      vote_average: 7.5,
      runtime: 120,
      original_language: 'en',
    })
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    render(
      <QueryClientProvider client={queryClient}>
        <MovieDetails id={1} />
      </QueryClientProvider>,
    )
    expect(await screen.findByText('Test Movie')).toBeInTheDocument()
    expect(screen.getByText('2023-01-01')).toBeInTheDocument()
    expect(screen.getByText('A test movie.')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
    expect(screen.getByText('7.5')).toBeInTheDocument()
    expect(screen.getByText('2h 0m')).toBeInTheDocument()
    expect(screen.getByText('en')).toBeInTheDocument()
  })

  it('renders untitled fallback when title is missing', async () => {
    ;(
      tmdb.fetchMovieDetails as unknown as { mockResolvedValue: (prop: unknown) => null }
    ).mockResolvedValue({
      // title is missing
      release_date: '2023-01-01',
      poster_path: '/poster.jpg',
      overview: 'A test movie.',
      genres: [{ id: 1, name: 'Action' }],
      vote_average: 7.5,
      runtime: 120,
      original_language: 'en',
    })
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    render(
      <QueryClientProvider client={queryClient}>
        <MovieDetails id={1} />
      </QueryClientProvider>,
    )
    expect(await screen.findByText(t('details.untitled'))).toBeInTheDocument()
  })

  it('renders untitled fallback when title is empty string', async () => {
    ;(
      tmdb.fetchMovieDetails as unknown as { mockResolvedValue: (prop: unknown) => null }
    ).mockResolvedValue({
      title: '',
      release_date: '2023-01-01',
      poster_path: '/poster.jpg',
      overview: 'A test movie.',
      genres: [{ id: 1, name: 'Action' }],
      vote_average: 7.5,
      runtime: 120,
      original_language: 'en',
    })
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    render(
      <QueryClientProvider client={queryClient}>
        <MovieDetails id={1} />
      </QueryClientProvider>,
    )
    expect(await screen.findByText(t('details.untitled'))).toBeInTheDocument()
  })
})
