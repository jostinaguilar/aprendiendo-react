import { type TodoId, type Todo as TodoType } from '../types'

interface Props extends TodoType {
  onCompletedTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
  onRemoveTodo: ({ id }: TodoId) => void
}

export const Todo: React.FC<Props> = ({ id, title, completed, onRemoveTodo, onCompletedTodo }) => {
  const onHandleCompleteTodo = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onCompletedTodo({ id, completed: event.target.checked })
  }

  return (
        <div className="view">
            <input className="toggle" checked={completed} type="checkbox" onChange={onHandleCompleteTodo}/>
            <label htmlFor="">{title}</label>
            <button className="destroy" onClick={() => { onRemoveTodo({ id }) }}></button>
        </div>
  )
}
