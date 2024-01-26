const delay = async (ms: number) =>
  await new Promise((resolve) => setTimeout(resolve, ms))

export const fetchUsers = async ({ pageParam }: { pageParam: number }) => {
  await delay(1000)

  return await fetch(
    `https://randomuser.me/api/?results=10&seed=midudev&page=${pageParam}`
  )
    .then(async (res) => {
      if (!res.ok) throw new Error('Error in request')
      return await res.json()
    })
    .then((data) => {
      const currentPage = Number(data.info.page)
      const nextCursor = currentPage > 3 ? undefined : currentPage + 1
      return { users: data.results, nextCursor }
    })
}
