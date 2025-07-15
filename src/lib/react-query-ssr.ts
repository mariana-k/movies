import { QueryClient, dehydrate } from '@tanstack/react-query'

export function createSSRQueryClient() {
  return new QueryClient()
}

export function dehydrateState(queryClient: QueryClient) {
  return dehydrate(queryClient)
}
