import './index.css'
import { useCatImage } from './hooks/useCatImage'
import { useCatFact } from './hooks/useCatFact'

export function App () {
  const { fact, refreshFact } = useCatFact()
  const { imageUrl } = useCatImage({ fact })

  const handleNewFact = () => refreshFact()

  return (
    <main>
      <h1>App de Gatitos</h1>
      <button onClick={handleNewFact}>Get new fact</button>
      {fact && <p>{fact}</p>}
      {imageUrl && <img width={200} src={imageUrl} alt='image' />}
    </main>
  )
}
