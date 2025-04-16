function PokemonDetails({ pokemon, onBack }) {
    return (
      <div className="bg-white rounded-lg p-6 max-w-md mx-auto shadow-lg">
        <button
          onClick={onBack}
          className="mb-4 text-red-500 hover:text-red-600 font-semibold transition-colors duration-300"
        >
          Voltar
        </button>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-32 h-32 mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-center capitalize text-gray-800 mb-4">{pokemon.name}</h2>
        <div className="space-y-2">
          <p className="text-gray-700"><strong>Tipo:</strong> {pokemon.types.map((type) => type.type.name).join(', ')}</p>
          <p className="text-gray-700"><strong>Altura:</strong> {pokemon.height / 10} m</p>
          <p className="text-gray-700"><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
          <p className="text-gray-700"><strong>Habilidades:</strong> {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}</p>
        </div>
      </div>
    );
  }
  
  export default PokemonDetails;