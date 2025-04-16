import { useEffect, useState } from 'react';
import axios from 'axios';

function PokemonCard({ pokemon, onSelectPokemon }) {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(pokemon.url);
        console.log(`Dados do Pokémon ${pokemon.name}:`, response.data);
        setPokemonData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(`Erro ao buscar dados do Pokémon ${pokemon.name}:`, error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchPokemonData();
  }, [pokemon.url, pokemon.name]);

  if (loading) return <div className="text-center text-gray-600">Carregando...</div>;
  if (error) return <div className="text-center text-red-500">Erro: {error}</div>;
  if (!pokemonData) return null;

  return (
    <div
      className="card bg-white rounded-lg p-4 cursor-pointer border border-gray-200 shadow-md hover:shadow-lg"
      onClick={() => onSelectPokemon(pokemonData)}
    >
      <img
        src={pokemonData.sprites?.front_default || ''}
        alt={pokemon.name}
        className="w-24 h-24 mx-auto mb-2"
      />
      <h2 className="text-center text-lg font-semibold text-gray-800 capitalize">{pokemon.name}</h2>
    </div>
  );
}

export default PokemonCard;