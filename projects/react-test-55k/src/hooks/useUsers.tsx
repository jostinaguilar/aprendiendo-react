import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchUsers } from '../services/users'
import { type User } from '../types.d'

export function useUsers() {
  const { isLoading, isError, data, fetchNextPage, hasNextPage } =
    useInfiniteQuery<{
      nextCursor: number
      users: User[]
    }>({
      queryKey: ['users'],
      queryFn: async ({ pageParam }) => await fetchUsers({ pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 3,
    })

  return {
    isLoading,
    isError,
    users: data?.pages?.flatMap((page) => page.users) ?? [],
    fetchNextPage,
    hasNextPage,
  }
}
