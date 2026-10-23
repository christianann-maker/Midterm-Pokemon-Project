import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function PokemonDetails() {
  const { name } = useParams()
  const [pokemonDetails, setPokemonDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function fetchPokemonDetails() {
      setIsLoading(true)
      setErrorMessage('')
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        if (!response.ok) {
          throw new Error(`Could not find Pokémon "${name}"`)
        }
        const data = await response.json()
        setPokemonDetails(data)
      } catch (error) {
        setErrorMessage(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPokemonDetails()
  }, [name])

  if (isLoading) return <p>Loading...</p>
  if (errorMessage) {
    return (
      <div>
        <p>Error: {errorMessage}</p>
        <Link to="/">Back to list</Link>
      </div>
    )
  }

  return (
    <div>
      <Link to="/">← Back to list</Link>
      <h1>{pokemonDetails.name}</h1>
      <img
        src={pokemonDetails.sprites.front_default}
        alt={pokemonDetails.name}
      />
      <p>Height: {pokemonDetails.height}</p>
      <p>Weight: {pokemonDetails.weight}</p>

      <h2>Types</h2>
      <ul>
        {pokemonDetails.types.map((typeEntry) => (
          <li key={typeEntry.type.name}>{typeEntry.type.name}</li>
        ))}
      </ul>

      <h2>Abilities</h2>
      <ul>
        {pokemonDetails.abilities.map((abilityEntry) => (
          <li key={abilityEntry.ability.name}>
            {abilityEntry.ability.name}
            {abilityEntry.is_hidden && ' (hidden)'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PokemonDetails