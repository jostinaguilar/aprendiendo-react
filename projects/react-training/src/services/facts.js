const CAT_ENDPOINT_RANDON_FACT = 'https://catfact.ninja/fact'

export function getRandomFact () {
  return fetch(CAT_ENDPOINT_RANDON_FACT)
    .then(res => res.json())
    .then(data => {
      const { fact } = data
      return fact
    })
}
