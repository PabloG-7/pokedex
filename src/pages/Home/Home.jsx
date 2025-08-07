// pages/Home/Home.jsx
import { useState } from 'react'
import { usePokemon } from '../../hooks/usePokemon'
import PokemonCard from '../../components/PokemonCard/PokemonCard'
import SearchBar from '../../components/SearchBar/SearchBar'
import styles from './Home.module.css'

export default function Home() {
  const { pokemonList, loadMore, hasMore } = usePokemon()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPokemon = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pokemon.id.toString().includes(searchTerm)
  )

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pokédex</h1>
      <div className={styles.searchWrapper}>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>
      
      <div className={styles.pokemonGrid}>
        {filteredPokemon.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {hasMore && !searchTerm && (
        <button 
          onClick={loadMore} 
          className={styles.loadMoreButton}
        >
          Carregar Mais Pokémon
        </button>
      )}
    </div>
  )
}