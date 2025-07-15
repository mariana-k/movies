import React from 'react'
import { t } from '../i18n'
import { createSSRQueryClient, dehydrateState } from '../lib/react-query-ssr'
import { HydrationBoundary } from '@tanstack/react-query'
import QueryProvider from './QueryProvider'
import PopularMovies from '@/components/PopularMovies'
import { fetchPopularMovies } from '../api/tmdb'

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
        <PopularMovies />
      </HydrationBoundary>
    </QueryProvider>
  )
}
