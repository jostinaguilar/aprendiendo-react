import { type FilterValue } from '../types'
import { Filter } from './Filter'

interface Props {
  activeCount: number
  completedCount: number
  filterSelected: FilterValue
  onClearCompleted: () => void
  handleFilterChange: (filter: FilterValue) => void
}

export const Footer: React.FC<Props> = ({ filterSelected, activeCount = 0, completedCount = 0, onClearCompleted, handleFilterChange }) => {
  return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{activeCount}</strong> pending tasks
            </span>
            <Filter
                filterSelected={filterSelected}
                onFilterChange={handleFilterChange}
            />
        </footer>
  )
}
