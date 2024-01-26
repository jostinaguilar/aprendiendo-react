import { useMemo, useState } from 'react'
import { SortBy, type User } from './types.d'
import './App.css'
import { UsersList } from './components/UsersList'
import { useUsers } from './hooks/useUsers'
import { Results } from './components/Results'

function App() {
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  // const originalUsers = useRef<User[]>([])
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const { users, fetchNextPage, hasNextPage, isError, isLoading } = useUsers()

  // console.log(data)

  const toggleColor = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const filteredUsers = useMemo(() => {
    return typeof filterCountry === 'string' && filterCountry.length > 0
      ? users.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase())
        })
      : users
  }, [users, filterCountry])

  const sortUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.NAME]: (user) => user.name.first,
      [SortBy.LAST]: (user) => user.name.last,
      [SortBy.COUNTRY]: (users) => users.location.country,
    }

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      const compareA = extractProperty(a)
      const compareB = extractProperty(b)

      return compareA.localeCompare(compareB)
    })
  }, [filteredUsers, sorting])

  /*  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  } */

  const handleReset = () => {
    // setUsers(originalUsers.current)
  }

  const changeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  return (
    <>
      <div>
        <h1>React Test 55k</h1>
        <header>
          <button onClick={toggleColor} type="button">
            color rows
          </button>
          <button onClick={toggleSortByCountry} type="button">
            Sort by country
          </button>
          <button onClick={handleReset} type="button">
            Reset
          </button>
          <input
            type="text"
            placeholder="country..."
            onChange={(e) => {
              setFilterCountry(e.target.value)
            }}
          />
        </header>
        <Results />
        {users.length > 0 && (
          <UsersList
            userDelete={() => {}}
            showColors={showColors}
            users={sortUsers}
            changeSorting={changeSort}
          />
        )}
        {isLoading && <p>Loading...</p>}
        {!isLoading && isError && <p>Oops! Have a problem...</p>}
        {!isLoading && !isError && users.length === 0 && <p>No results</p>}
        {!isLoading && !isError && hasNextPage && (
          <button
            type="button"
            onClick={() => {
              void fetchNextPage()
            }}
          >
            Load more results
          </button>
        )}
        {!isLoading && !isError && !hasNextPage && <p>No more results</p>}
      </div>
    </>
  )
}

export default App
