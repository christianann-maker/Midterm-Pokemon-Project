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

    if (isLoading) return <p className="status-message">Loading...</p>
  if (errorMessage) {
    return (
      <div className="page">
        <p className="status-message">Error: {errorMessage}</p>
        <Link to="/" className="back-link">← Back to list</Link>
      </div>
    )
  }

  return (
    <div className="page">
      <Link to="/" className="back-link">← Back to list</Link>
      <div className="details-card">
        <h1>{pokemonDetails.name}</h1>
        <img
          src={pokemonDetails.sprites.front_default}
          alt={pokemonDetails.name}
        />
        <p>Height: {pokemonDetails.height}</p>
        <p>Weight: {pokemonDetails.weight}</p>

        <h2>Types</h2>
        <ul className="badge-list">
          {pokemonDetails.types.map((typeEntry) => (
            <li key={typeEntry.type.name} className="badge">
              {typeEntry.type.name}
            </li>
          ))}
        </ul>

        <h2>Abilities</h2>
        <ul className="badge-list">
          {pokemonDetails.abilities.map((abilityEntry) => (
            <li
              key={abilityEntry.ability.name}
              className={abilityEntry.is_hidden ? 'badge badge-hidden' : 'badge'}
            >
              {abilityEntry.ability.name}
              {abilityEntry.is_hidden && ' (hidden)'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PokemonDetails