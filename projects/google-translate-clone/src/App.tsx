import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import './App.css'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGES } from './constants'
import { ArrowChange, Clipboard, Speak } from './components/Icons'
import { SelectLanguages } from './components/SelectLanguages'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'
import { useEffect } from 'react'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'

function App () {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguage,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  } = useStore()

  const debounceFromText = useDebounce(fromText, 300)

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {})
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGES[toLanguage]
    speechSynthesis.speak(utterance)
  }

  useEffect(() => {
    if (debounceFromText === '') return

    translate({ fromLanguage, toLanguage, text: debounceFromText }).then(result => {
      if (result == null) return
      setResult(result)
    }).catch(() => { setResult('Error') })
  }, [debounceFromText, fromLanguage, toLanguage])

  return (
      <Container fluid>
        <h1>Google Translate</h1>
        <Row>
          <Col>
            <Stack gap={3}>
              <SelectLanguages type={SectionType.From} value={fromLanguage} onChangeLanguage={setFromLanguage} />
              <TextArea
                type={SectionType.From}
                value={fromText}
                onChangeText={setFromText}/>
            </Stack>
          </Col>
          <Col xs='auto'>
            <Button variant="link" disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguage}>
              <ArrowChange/>
            </Button>
          </Col>
          <Col>
            <Stack gap={3}>
              <SelectLanguages type={SectionType.To} value={toLanguage} onChangeLanguage={setToLanguage} />
              <div style={{ position: 'relative' }}>
              <TextArea
                type={SectionType.To}
                value={result}
                loading={loading}
                onChangeText={setResult}/>
                <div style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex' } }>
                  <Button variant='link'
                  onClick={handleClipboard}>
                    <Clipboard/>
                  </Button>
                  <Button variant='link'
                  onClick={handleSpeak}>
                    <Speak/>
                  </Button>
                </div>
              </div>
            </Stack>
          </Col>
        </Row>
      </Container>
  )
}

export default App
