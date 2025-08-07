import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePokemon } from '../../hooks/usePokemon'
import TypeBadge from '../../components/TypeBadge/TypeBadge'
import styles from './PokemonPage.module.css'

export default function PokemonPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getPokemonDetails } = usePokemon()
  const [pokemon, setPokemon] = useState(null)

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const data = await getPokemonDetails(id)
      setPokemon(data)
    }

    fetchPokemonDetails()
  }, [id, getPokemonDetails])

  const handleGoBack = () => {
    navigate('/')
  }

  if (!pokemon) {
    return (
      <div className={styles.container}>
        <div className={styles.skeletonHeader}></div>
        <div className={styles.skeletonContent}></div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.backButton}>
        ← Voltar para Pokédex
      </button>
      
      <div className={styles.header}>
        <h1 className={styles.name}>{pokemon.name}</h1>
        <span className={styles.number}>#{pokemon.id.toString().padStart(3, '0')}</span>
      </div>
      
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img 
            src={pokemon.image} 
            alt={pokemon.name} 
            className={styles.image}
          />
          <div className={styles.types}>
            {pokemon.types.map(type => (
              <TypeBadge key={type} type={type} />
            ))}
          </div>
        </div>
        
        <div className={styles.details}>
          <div className={styles.detailSection}>
            <h3>About</h3>
            <div className={styles.detailRow}>
              <span>Height</span>
              <span>{pokemon.height} m</span>
            </div>
            <div className={styles.detailRow}>
              <span>Weight</span>
              <span>{pokemon.weight} kg</span>
            </div>
            <div className={styles.detailRow}>
              <span>Abilities</span>
              <div className={styles.abilities}>
                {pokemon.abilities.map(ability => (
                  <span key={ability} className={styles.ability}>
                    {ability}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className={styles.detailSection}>
            <h3>Base Stats</h3>
            {pokemon.stats.map(stat => (
              <div key={stat.name} className={styles.statRow}>
                <span className={styles.statName}>{stat.name}</span>
                <span className={styles.statValue}>{stat.value}</span>
                <div className={styles.statBarContainer}>
                  <div 
                    className={styles.statBar} 
                    style={{ width: `${Math.min(100, stat.value)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}