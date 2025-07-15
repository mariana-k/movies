import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SearchResults from './SearchResults'
import * as tmdb from '../api/tmdb'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { vi, describe, it, expect, afterEach } from 'vitest'
import { t } from '../i18n'

vi.mock('../api/tmdb')
afterEach(() => {
  vi.clearAllMocks()
})

function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>)
}

describe('SearchResults', () => {
  it('renders search bar', () => {
    renderWithClient(<SearchResults />)
    expect(screen.getByPlaceholderText(t('home.searchPlaceholder'))).toBeInTheDocument()
  })

  it('shows loading state', async () => {
    ;(tmdb.searchMovies as any).mockReturnValue(new Promise(() => {}))
    renderWithClient(<SearchResults />)
    fireEvent.change(screen.getByPlaceholderText(t('home.searchPlaceholder')), {
      target: { value: 'batman' },
    })
    await waitFor(() => {
      expect(screen.getByText(t('home.loading'))).toBeInTheDocument()
    })
  })

  it('shows error state', async () => {
    ;(tmdb.searchMovies as any).mockRejectedValue(new Error('fail'))
    renderWithClient(<SearchResults />)
    fireEvent.change(screen.getByPlaceholderText(t('home.searchPlaceholder')), {
      target: { value: 'batman' },
    })
    expect(await screen.findByText(t('home.error'))).toBeInTheDocument()
  })

  it('shows search results', async () => {
    ;(tmdb.searchMovies as any).mockResolvedValue({
      results: [
        { id: 1, title: 'Batman' },
        { id: 2, title: 'Superman' },
      ],
    })
    renderWithClient(<SearchResults />)
    fireEvent.change(screen.getByPlaceholderText(t('home.searchPlaceholder')), {
      target: { value: 'batman' },
    })
    expect(await screen.findByText('Batman')).toBeInTheDocument()
    expect(await screen.findByText('Superman')).toBeInTheDocument()
  })

  it('shows empty state for no results', async () => {
    ;(tmdb.searchMovies as any).mockResolvedValue({ results: [] })
    renderWithClient(<SearchResults />)
    fireEvent.change(screen.getByPlaceholderText(t('home.searchPlaceholder')), {
      target: { value: 'batman' },
    })
    expect(await screen.findByText(t('home.noResults'))).toBeInTheDocument()
  })
})
