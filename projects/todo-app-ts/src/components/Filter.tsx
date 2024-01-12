import { FILTER_BUTTONS } from '../conts'
import { type FilterValue } from '../types'

interface Props {
  filterSelected: FilterValue
  onFilterChange: (filter: FilterValue) => void
}

export const Filter: React.FC<Props> = ({ filterSelected, onFilterChange }) => {
  // const handleClick = () => {}

  return (
    <ul className="filters">
        {
            Object.entries(FILTER_BUTTONS).map(([key, { literal, href }]) => {
              const isSelected = key === filterSelected
              const className = isSelected ? 'selected' : ''
              return (
                    <li key={key}>
                        <a href={href} className={className} onClick={(event) => {
                          event.preventDefault()
                          onFilterChange(key as FilterValue)
                        }}>{literal}</a>
                    </li>
              )
            })
        }
    </ul>
  )
}
