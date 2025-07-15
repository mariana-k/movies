import { createSSRQueryClient, dehydrateState } from '../../../lib/react-query-ssr'
import { HydrationBoundary } from '@tanstack/react-query'
import QueryProvider from '../../QueryProvider'
import MovieDetails from '@/components/MovieDetails'
import { fetchMovieDetails } from '../../../api/tmdb'
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const numberId = Number(id)
  const queryClient = createSSRQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['movie-details', numberId],
    queryFn: () => fetchMovieDetails(numberId),
  })
  const dehydratedState = dehydrateState(queryClient)

  return (
    <QueryProvider>
      <HydrationBoundary state={dehydratedState}>
        <MovieDetails id={numberId} />
      </HydrationBoundary>
    </QueryProvider>
  )
}
