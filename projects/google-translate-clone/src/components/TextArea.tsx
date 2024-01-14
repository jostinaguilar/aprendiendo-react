import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'

interface Props {
  type: SectionType
  loading?: boolean
  value: string
  onChangeText: (value: string) => void
}

const commonStyles = { border: '1 solid #f5f5f5', height: '200px' }

const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (type === SectionType.From) return 'Typing text...'
  if (loading === true) return 'Translation...'
  return 'Translate'
}

export const TextArea: React.FC<Props> = ({ type, loading, value, onChangeText }) => {
  const styles = type === SectionType.From ? commonStyles : { ...commonStyles, backgroundColor: '#f2f2f2' }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeText(event.target.value)
  }

  return (
    <Form.Control
        as='textarea'
        placeholder={getPlaceholder({ type, loading })}
        value={value}
        disabled={type === SectionType.To}
        autoFocus={type === SectionType.From}
        style={styles}
        onChange={handleChange}/>
  )
}
