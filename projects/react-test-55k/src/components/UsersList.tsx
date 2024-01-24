import { SortBy, type Users } from '../types.d'

interface Props {
  users: Users[]
  showColors: boolean
  userDelete: (email: string) => void
  changeSorting: (sort: SortBy) => void
}

export function UsersList({
  users,
  showColors,
  userDelete,
  changeSorting,
}: Props) {
  return (
    <table width="100%">
      <thead>
        <tr>
          <th>Photo</th>
          <th
            className="pointer"
            onClick={() => {
              changeSorting(SortBy.NAME)
            }}
          >
            Name
          </th>
          <th
            className="pointer"
            onClick={() => {
              changeSorting(SortBy.LAST)
            }}
          >
            Lastname
          </th>
          <th
            className="pointer"
            onClick={() => {
              changeSorting(SortBy.COUNTRY)
            }}
          >
            Country
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          const backgroundColor = index % 2 === 0 ? '#333' : '#555'
          const color = showColors ? backgroundColor : 'transparent'

          return (
            <tr key={user.email} style={{ backgroundColor: color }}>
              <td>
                <img
                  src={user.picture.thumbnail}
                  alt={`Phot of ${user.name.first}`}
                  style={{ borderRadius: '50%' }}
                />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button
                  onClick={() => {
                    userDelete(user.email)
                  }}
                  type="button"
                >
                  Delete
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
