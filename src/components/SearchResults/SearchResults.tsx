'use client'
import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { searchMovies } from '../../api/tmdb'
import { t } from '../../i18n'
import MoviesList from '../MoviesList/MoviesList'
import SearchBar from '../SearchBar/SearchBar'

function useDebounce(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])
  return debounced
}

export default function SearchResults() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 400)

  const { data, isLoading, error } = useQuery({
    queryKey: ['search-movies', debouncedSearch],
    queryFn: () =>
      debouncedSearch ? searchMovies(debouncedSearch) : Promise.resolve({ results: [] }),
    enabled: !!debouncedSearch,
  })

  return (
    <div className="mb-6">
      <SearchBar value={search} onChange={setSearch} />
      {isLoading && <div>{t('home.loading')}</div>}
      {error && <div className="text-red-500 text-center py-8">{t('home.error')}</div>}
      {data && data.results && data.results.length > 0 && <MoviesList movies={data.results} />}
      {data &&
        (!data.results || data.results.length === 0) &&
        !isLoading &&
        !error &&
        debouncedSearch && (
          <div className="text-center text-gray-500 py-8">{t('home.noResults')}</div>
        )}
    </div>
  )
}
