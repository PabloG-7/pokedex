import PokemonCard from './PokemonCard';

function PokemonList({ pokemonList, onSelectPokemon }) {
  console.log('Lista de Pokémon no PokemonList:', pokemonList);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 w-full max-w-7xl">
      {pokemonList.map((pokemon) => (
        <PokemonCard
          key={pokemon.name}
          pokemon={pokemon}
          onSelectPokemon={onSelectPokemon}
        />
      ))}
    </div>
  );
}

export default PokemonList;