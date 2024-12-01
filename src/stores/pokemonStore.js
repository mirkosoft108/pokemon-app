import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getPokemons, getPokemonDetails } from '@/api.js';
import router from '../router/index.js';

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemonList = ref([]); 
  const allPokemonList = ref([]); 
  const selectedPokemon = ref(null);
  const isLoading = ref(false);
  const search = ref(''); 
  const limit = ref(20);
  const offset = ref(0);
  const filterTypeSelected = ref('all');

  const fetchPokemons = async () => {
    isLoading.value = true;
    try {
      const results = await getPokemons(limit.value, offset.value);
      const newPokemons = results.map((p) => ({
        name: capitalize(p.name),
        isFavorite: false,
      }));
      allPokemonList.value.push(...newPokemons);
      pokemonList.value = [...allPokemonList.value]; 
    } catch (err) {
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchMorePokemons = async () => {
    offset.value += 20;
    await fetchPokemons();
  };

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const fetchPokemon = async (forList, forDetails) => {
    isLoading.value = true;
  
    try {
      if (!search.value.trim()) {
    
        pokemonList.value = [...allPokemonList.value];
        isLoading.value = false;
        return;
      }
  
      const existingPokemon = allPokemonList.value.find(p =>
        p.name.toLowerCase() === search.value.toLowerCase()
      );
  
      if (existingPokemon) {
      
        if (forList) {
          pokemonList.value = [...allPokemonList.value.filter(p => p.name === existingPokemon.name)];
        }
        if (forDetails) {
          selectedPokemon.value = existingPokemon;
        }
        isLoading.value = false;
        return;
      }
 
      const response = await getPokemonDetails(search.value.toLowerCase());
      const newPokemon = { name: capitalize(response.name), isFavorite: false };
      allPokemonList.value.push(newPokemon);
  
      if (forList) {
        pokemonList.value = [...allPokemonList.value.filter(p => p.name === newPokemon.name)];
      }
      if (forDetails) {
        selectedPokemon.value = newPokemon;
      }
  
    } catch (err) {
      if (forDetails) return;
      router.push('/empty-list');
    } finally {
      isLoading.value = false;
    }
  };

  const toggleFavorite = (pokemonName) => {
    const pokemon = allPokemonList.value.find(p => p.name === pokemonName);
    if (pokemon) {
      pokemon.isFavorite = !pokemon.isFavorite;

      if (filterTypeSelected.value === 'favorites') {
        pokemonList.value = allPokemonList.value.filter(p => p.isFavorite);
      }
    }
  };

  const favoritePokemons = computed(() =>
    allPokemonList.value.filter(pokemon => pokemon.isFavorite)
  );

  const getFilteredPokemons = (filterType) => {
    filterTypeSelected.value = filterType;
    if (filterType === 'all') {
      pokemonList.value = [...allPokemonList.value];
    } else if (filterType === 'favorites') {
      pokemonList.value = allPokemonList.value.filter(p => p.isFavorite);
    }
  };  

  return {
    pokemonList, 
    allPokemonList, 
    selectedPokemon,
    isLoading,
    limit,
    offset,
    search,
    favoritePokemons,
    filterTypeSelected,
    fetchPokemons,
    fetchMorePokemons,
    fetchPokemon,
    toggleFavorite,
    getFilteredPokemons,
  };
});
