import React from 'react'
import { createSSRQueryClient, dehydrateState } from '../lib/react-query-ssr'
import { HydrationBoundary } from '@tanstack/react-query'
import QueryProvider from './QueryProvider'
import PopularMovies from '@/components/PopularMovies'
import { fetchPopularMovies } from '../api/tmdb'
import SearchResults from '@/components/SearchResults'

export default async function Home() {
  const queryClient = createSSRQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['popular-movies'],
    queryFn: () => fetchPopularMovies(),
  })
  const dehydratedState = dehydrateState(queryClient)

  return (
    <QueryProvider>
      <HydrationBoundary state={dehydratedState}>
        <div className="container mx-auto py-8">
          <SearchResults />
          <PopularMovies />
        </div>
      </HydrationBoundary>
    </QueryProvider>
  )
}
