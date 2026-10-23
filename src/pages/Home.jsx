import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function getPokemonId(url) {
  const urlParts = url.split('/')
  return urlParts[urlParts.length - 2]
}

function Home() {
  const [pokemonList, setPokemonList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function fetchPokemonList() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon')
        }
        const data = await response.json()
        setPokemonList(data.results)
      } catch (error) {
        setErrorMessage(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPokemonList()
  }, [])

   if (isLoading) return <p className="status-message">Loading...</p>
  if (errorMessage) return <p className="status-message">Error: {errorMessage}</p>

  return (
    <div className="page">
      <h1 className="page-title">Pokémon</h1>
      <ul className="pokemon-grid">
        {pokemonList.map((pokemon) => {
          const pokemonId = getPokemonId(pokemon.url)
          return (
            <li key={pokemon.name}>
              <Link to={`/pokemon/${pokemon.name}`} className="pokemon-card">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                  alt={pokemon.name}
                />
                <p>{pokemon.name}</p>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Home