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
      if (!search.value.trim() && !forDetails) {
    
        pokemonList.value = [...allPokemonList.value];
        isLoading.value = false;
        return;
      }
  
      const existingPokemon = allPokemonList.value.find(p =>
        p.name.toLowerCase() === search.value.toLowerCase()
      );
  
      if (existingPokemon && !forDetails) {
      
        if (forList) {
          pokemonList.value = [...allPokemonList.value.filter(p => p.name === existingPokemon.name)];
        }
        
        isLoading.value = false;
        return;
      }
      
      let toSearch = search.value.toLowerCase();
      if (forDetails) {
        toSearch = forDetails.toLowerCase();
      }

      const response = await getPokemonDetails(toSearch);
      const newPokemon = { name: capitalize(response.name), isFavorite: false };
      allPokemonList.value.push(newPokemon);
  
      if (forList) {
        pokemonList.value = [...allPokemonList.value.filter(p => p.name === newPokemon.name)];
      }
      if (forDetails) {

        let isFavorite = allPokemonList.value.find(p => (p.name).toLowerCase() === response.name)?.isFavorite || false;

        const newPokemon = {
          image: response.sprites.front_default, 
          name: capitalize(response.name),
          weight: response.weight, 
          height: response.height, 
          types: response.types.map(typeObj => capitalize(typeObj.type.name)).join(', '),
          isFavorite: isFavorite,
        };

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
