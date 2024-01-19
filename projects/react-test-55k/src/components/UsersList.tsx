import { type Users } from '../types'

interface Props {
  users: Users[]
}

export function UsersList({ users }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Photo</th>
          <th>Name</th>
          <th>Lastname</th>
          <th>Country</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id.name}>
            <td>
              <img
                src={user.picture.thumbnail}
                alt={`Phot of ${user.name.first}`}
              />
            </td>
            <td>{user.name.first}</td>
            <td>{user.name.last}</td>
            <td>{user.location.country}</td>
            <td>
              <button type="button">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
