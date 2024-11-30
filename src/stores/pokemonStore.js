import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getPokemons, getPokemonDetails } from '@/api.js';

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemonList = ref([]);
  const selectedPokemon = ref(null);
  const isLoading = ref(false);
  const error = ref(null);
  const limit = ref(10);
  const offset = ref(0);

  const fetchPokemons = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const results = await getPokemons(limit.value, offset.value);
      pokemonList.value.push(
        ...results.map((p) => ({
          name: capitalize(p.name),
          url: p.url,
        }))
      );
    } catch (err) {
      error.value = 'Error while fetching pokemons.';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const fetchPokemonDetails = async (name) => {
    isLoading.value = true;
    error.value = null;
    try {
      selectedPokemon.value = await getPokemonDetails(name);
    } catch (err) {
      error.value = `Error while fetching ${name} details.`;
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    pokemonList,
    selectedPokemon,
    isLoading,
    error,
    limit,
    offset,
    fetchPokemons,
    fetchPokemonDetails,
  };
});
