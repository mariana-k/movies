import React from 'react'
import { render, screen } from '@testing-library/react'
import PopularMovies from './PopularMovies'
import * as tmdb from '../api/tmdb'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { vi, describe, it, expect, afterEach } from 'vitest'
import { t } from '../i18n'

vi.mock('../api/tmdb')

afterEach(() => {
  vi.clearAllMocks()
})

describe('PopularMovies', () => {
  it('renders loading state', () => {
    ;(tmdb.fetchPopularMovies as any).mockReturnValue(new Promise(() => {}))
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <PopularMovies />
      </QueryClientProvider>,
    )
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('renders movie list', async () => {
    ;(tmdb.fetchPopularMovies as any).mockResolvedValue({
      results: [
        { id: 1, title: 'Movie 1' },
        { id: 2, title: 'Movie 2' },
      ],
    })
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <PopularMovies />
      </QueryClientProvider>,
    )
    expect(await screen.findByText('Movie 1')).toBeInTheDocument()
    expect(await screen.findByText('Movie 2')).toBeInTheDocument()
  })

  it('renders no movies found', async () => {
    ;(tmdb.fetchPopularMovies as any).mockResolvedValue({ results: [] })
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <PopularMovies />
      </QueryClientProvider>,
    )
    expect(await screen.findByText(t('home.noResults'))).toBeInTheDocument()
  })
})
