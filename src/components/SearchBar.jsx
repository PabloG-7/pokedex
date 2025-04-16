function SearchBar({ onSearch, searchTerm }) {
    const handleChange = (e) => {
      const value = e.target.value;
      console.log('Valor do input:', value);
      onSearch(value);
    };
  
    return (
      <div className="w-full max-w-md mb-8">
        <input
          type="text"
          placeholder="Buscar Pokémon por nome ou ID"
          className="w-full p-4 text-gray-800 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
          value={searchTerm}
          onChange={handleChange}
          onInput={handleChange}
        />
      </div>
    );
  }
  
  export default SearchBar;