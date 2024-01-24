import { useEffect, useMemo, useRef, useState } from 'react'
import { SortBy, type Users } from './types.d'
import './App.css'
import { UsersList } from './components/UsersList'

function App() {
  const [users, setUsers] = useState<Users[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const originalUsers = useRef<Users[]>([])
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const toggleColor = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async (res) => await res.json())
      .then((data) => {
        setUsers(data.results)
        originalUsers.current = data.results
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

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

    const compareProperties: Record<string, (user: Users) => any> = {
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

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
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
        <UsersList
          userDelete={handleDelete}
          showColors={showColors}
          users={sortUsers}
          changeSorting={changeSort}
        />
      </div>
    </>
  )
}

export default App
