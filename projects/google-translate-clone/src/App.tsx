import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const initialState = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

function App () {
  return (
    <>
      <div className="App">
        <h1>Google Translate</h1>
      </div>
    </>
  )
}

export default App
