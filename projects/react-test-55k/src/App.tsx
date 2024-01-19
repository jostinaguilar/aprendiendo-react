import { useEffect, useState } from 'react'
import { type Users } from './types.d'
import './App.css'
import { UsersList } from './components/UsersList'

function App() {
  const [users, setUsers] = useState<Users[]>([])

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async (res) => await res.json())
      .then((data) => {
        setUsers(data.results)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <div>
        <h1>React Test 55k</h1>
        <UsersList users={users} />
      </div>
    </>
  )
}

export default App
