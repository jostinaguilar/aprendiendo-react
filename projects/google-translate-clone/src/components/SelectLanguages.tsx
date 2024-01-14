import { Form } from 'react-bootstrap'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import { SectionType, type FromLanguage, type Language } from '../types.d'

type Props =
    | { type: SectionType.From, value: FromLanguage, onChangeLanguage: (language: FromLanguage) => void }
    | { type: SectionType.To, value: Language, onChangeLanguage: (language: Language) => void }

export const SelectLanguages: React.FC<Props> = ({ onChangeLanguage, value, type }) => {
  const handleChangeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeLanguage(event.target.value as Language)
  }

  return (
        <Form.Select aria-label='Select Language' onChange={handleChangeLanguage} value={value}>
            {type === SectionType.From && <option value={AUTO_LANGUAGE}>Detect Language</option>}
            {
                Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
                    <option key={key} value={key}>{literal}</option>
                ))
            }
        </Form.Select>
  )
}
