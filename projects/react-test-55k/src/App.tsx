import { useEffect, useState } from 'react'
import { type Users } from './types.d'
import './App.css'

function App () {
  const [users, setUsers] = useState<Users[]>([])

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async res => await res.json())
      .then(data => { setUsers(data.results) })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <div>
        <h1>React Test 55k</h1>
      </div>
{JSON.stringify(users)}
    </>
  )
}

export default App
