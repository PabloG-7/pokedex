import { Link } from 'react-router-dom'
import TypeBadge from '../TypeBadge/TypeBadge'
import styles from './PokemonCard.module.css'

export default function PokemonCard({ pokemon }) {
  return (
    <Link to={`/pokemon/${pokemon.id}`} className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.imageContainer}>
          <img 
            src={pokemon.image} 
            alt={pokemon.name} 
            className={styles.image}
            loading="lazy"
          />
        </div>
        <div className={styles.info}>
          <span className={styles.number}>#{pokemon.id.toString().padStart(3, '0')}</span>
          <h3 className={styles.name}>{pokemon.name}</h3>
          <div className={styles.types}>
            {pokemon.types.map(type => (
              <TypeBadge key={type} type={type} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}