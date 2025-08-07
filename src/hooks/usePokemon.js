// hooks/usePokemon.js
import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = 'https://pokeapi.co/api/v2'

export function usePokemon() {
  const [pokemonList, setPokemonList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const itemsPerPage = 20

  const fetchPokemon = async (page = 1) => {
    const offset = (page - 1) * itemsPerPage
    const response = await axios.get(`${API_URL}/pokemon?limit=${itemsPerPage}&offset=${offset}`)
    
    setTotalPages(Math.ceil(response.data.count / itemsPerPage))
    
    const detailedPokemon = await Promise.all(
      response.data.results.map(async (pokemon) => {
        const details = await axios.get(pokemon.url)
        return {
          id: details.data.id,
          name: details.data.name,
          image: details.data.sprites.other['official-artwork'].front_default,
          types: details.data.types.map(type => type.type.name)
        }
      })
    )
    
    if (page === 1) {
      setPokemonList(detailedPokemon)
    } else {
      setPokemonList(prev => [...prev, ...detailedPokemon])
    }
  }

  const loadMore = () => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    fetchPokemon(nextPage)
  }

  useEffect(() => {
    fetchPokemon()
  }, [])

  const getPokemonDetails = async (id) => {
    const response = await axios.get(`${API_URL}/pokemon/${id}`)
    return {
      id: response.data.id,
      name: response.data.name,
      image: response.data.sprites.other['official-artwork'].front_default,
      types: response.data.types.map(type => type.type.name),
      height: response.data.height / 10,
      weight: response.data.weight / 10,
      abilities: response.data.abilities.map(ability => ability.ability.name),
      stats: response.data.stats.map(stat => ({
        name: stat.stat.name,
        value: stat.base_stat
      }))
    }
  }

  return { 
    pokemonList, 
    getPokemonDetails, 
    loadMore, 
    hasMore: currentPage < totalPages 
  }
}