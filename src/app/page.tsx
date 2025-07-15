import React from 'react'
import { createSSRQueryClient, dehydrateState } from '../lib/react-query-ssr'
import { HydrationBoundary } from '@tanstack/react-query'
import QueryProvider from './QueryProvider'
import { fetchPopularMovies } from '../api/tmdb'
import SearchResults from '@/components/SearchResults/SearchResults'
import PopularMovies from '@/components/PopularMovies/PopularMovies'

export default async function Home() {
  const queryClient = createSSRQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['popular-movies'],
    queryFn: () => fetchPopularMovies(),
  })
  const dehydratedState = dehydrateState(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="container mx-auto py-8">
        <SearchResults />
        <PopularMovies />
      </div>
    </HydrationBoundary>
  )
}
