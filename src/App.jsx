import { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonList from './components/PokemonList';
import SearchBar from './components/SearchBar';
import PokemonDetails from './components/PokemonDetails';
import './App.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [initialPokemonList, setInitialPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [allPokemonLoaded, setAllPokemonLoaded] = useState(false);
  const [totalPokemon, setTotalPokemon] = useState(0);
  const maxPokemonToLoad = 100;

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const results = response.data.results;
        console.log('Pokémon carregados:', results);

        const newPokemon = Array.from(
          new Map([...initialPokemonList, ...results].map((pokemon) => [pokemon.name, pokemon])).values()
        );

        setInitialPokemonList(newPokemon);
        if (!searchTerm) {
          setFilteredPokemonList(newPokemon);
        }

        if (!totalPokemon) {
          const totalResponse = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1');
          setTotalPokemon(totalResponse.data.count);
        }

        if (newPokemon.length >= maxPokemonToLoad) {
          setAllPokemonLoaded(true);
        }
      } catch (error) {
        console.error('Erro ao buscar Pokémon:', error);
      }
    };

    if (!allPokemonLoaded) {
      fetchPokemon();
    }
  }, [limit, offset, allPokemonLoaded, initialPokemonList, searchTerm, totalPokemon]);

  useEffect(() => {
    console.log('searchTerm atualizado:', searchTerm);

    const searchTermLower = searchTerm.toLowerCase().trim();
    if (!searchTermLower) {
      setFilteredPokemonList(initialPokemonList);
      if (initialPokemonList.length >= maxPokemonToLoad) {
        setAllPokemonLoaded(true);
      } else {
        setAllPokemonLoaded(false);
      }
    } else {
      const fetchAllPokemon = async () => {
        try {
          const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
          const results = response.data.results;
          console.log('Todos os Pokémon carregados para busca:', results);

          const uniquePokemon = Array.from(
            new Map(results.map((pokemon) => [pokemon.name, pokemon])).values()
          );

          setPokemonList(uniquePokemon);
          setAllPokemonLoaded(true);

          const filtered = uniquePokemon.filter((pokemon) =>
            pokemon.name.toLowerCase().startsWith(searchTermLower)
          );
          console.log('Pokémon filtrados:', filtered);
          setFilteredPokemonList(filtered);
        } catch (error) {
          console.error('Erro ao buscar todos os Pokémon:', error);
        }
      };

      fetchAllPokemon();
    }
  }, [searchTerm, initialPokemonList]);

  const loadMorePokemon = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  const handleSearch = (term) => {
    console.log('Termo de busca recebido:', term);
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">Pokédex</h1>
      <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />
      {selectedPokemon ? (
        <PokemonDetails pokemon={selectedPokemon} onBack={() => setSelectedPokemon(null)} />
      ) : (
        <>
          <p className="text-lg text-gray-800 mb-6 font-medium">
            {searchTerm
              ? `Exibindo ${filteredPokemonList.length}`
              : `Exibindo ${filteredPokemonList.length} de ${Math.min(maxPokemonToLoad, totalPokemon) || 'muitos'} Pokémon`}
          </p>
          {filteredPokemonList.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">Nenhum Pokémon encontrado...</p>
          ) : (
            <>
              <PokemonList
                key={filteredPokemonList.length}
                pokemonList={filteredPokemonList}
                onSelectPokemon={setSelectedPokemon}
              />
              {!searchTerm && !allPokemonLoaded && (
                <div className="text-center mt-8">
                  <button
                    onClick={loadMorePokemon}
                    className="bg-red-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-600 transition-colors duration-300 shadow-md"
                  >
                    Carregar Mais
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;