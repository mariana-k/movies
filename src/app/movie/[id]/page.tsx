import { createSSRQueryClient, dehydrateState } from '../../../lib/react-query-ssr'
import { HydrationBoundary } from '@tanstack/react-query'
import QueryProvider from '../../QueryProvider'
import MovieDetails from '@/components/MovieDetails'
import { fetchMovieDetails } from '../../../api/tmdb'

export default async function MovieDetailsPage({ params }: { params: { id: string } }) {
  const id = Number(params.id)
  const queryClient = createSSRQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['movie-details', id],
    queryFn: () => fetchMovieDetails(id),
  })
  const dehydratedState = dehydrateState(queryClient)

  return (
    <QueryProvider>
      <HydrationBoundary state={dehydratedState}>
        <MovieDetails id={id} />
      </HydrationBoundary>
    </QueryProvider>
  )
}
