import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getPokemons, getPokemonDetails } from '@/api.js';

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemonList = ref([]);
  const selectedPokemon = ref(null);
  const isLoading = ref(false);
  const error = ref(null);

  const fetchPokemons = async (limit = 50) => {
    isLoading.value = true;
    error.value = null;
    try {
      const results = await getPokemons(limit);
      pokemonList.value = results.map((p) => ({
        name: p.name,
        url: p.url,
      }));
    } catch (err) {
      error.value = 'Error al cargar la lista de Pokémon.';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchPokemonDetails = async (name) => {
    isLoading.value = true;
    error.value = null;
    try {
      selectedPokemon.value = await getPokemonDetails(name);
    } catch (err) {
      error.value = `Error al cargar los detalles de ${name}.`;
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
    fetchPokemons,
    fetchPokemonDetails,
  };
});
