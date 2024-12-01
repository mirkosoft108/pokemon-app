<template>
    <div 
        v-if="!pokemonStore.isLoading"
        class="list-layout">
        <SearchInput 
            v-model="pokemonStore.search" 
            placeholder="Search"  
            @enter="pokemonStore.fetchPokemon(true,false)"
        />

        <div class="pokemon-list">
            <PokemonItem
                v-for="(pokemon, index) in pokemonStore.pokemonList"
                :key="index"
                :name="pokemon.name"
                :isFavorite="pokemon.isFavorite"
                @name-clicked="logPokemonName"
                @favorite-toggled="logFavoriteToggle"
            />

            <button 
                v-if="!pokemonStore.isLoading && pokemonStore.filterTypeSelected === 'all'"  
                ref="loadMoreButton"
                @click="loadMorePokemons" 
                class="load-more-button"> 
                Load More
            </button>
        </div>

        <BottomNav
            @allClick="pokemonStore.getFilteredPokemons('all')"
            @favoritesClick="pokemonStore.getFilteredPokemons('favorites');"
        />
        
    </div>
    <div
        v-if="pokemonStore.isLoading"  
        class="loading-layout">
        <img class="loading-image" src="../assets/Loader.svg" alt="Pokeball" />
    </div>
    
</template>
  
<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { usePokemonStore } from '../stores/pokemonStore.js';
import SearchInput from '../components/SearchInput.vue';
import PokemonItem from '../components/PokemonItem.vue';
import BottomNav from '../components/BottomNav.vue';

const pokemonStore = usePokemonStore();
const loadMoreButton = ref(null);

const loadMorePokemons = async () => {
    await pokemonStore.fetchMorePokemons();

    await nextTick();

    if (loadMoreButton.value) {
        loadMoreButton.value.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
};

const logPokemonName = (name) => {
    console.log(`Pokemon name clicked: ${name}`);
};

const logFavoriteToggle = ({ name, isFavorite }) => {
    pokemonStore.toggleFavorite(name);

    if (pokemonStore.filterTypeSelected === 'favorites') {
        pokemonStore.getFilteredPokemons('favorites');
    }
};

onMounted(async () => {
    if (pokemonStore.pokemonList.length === 0) {
        await pokemonStore.fetchPokemons()
    } 
});

</script>
  
<style scoped>

.list-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100vh;
    overflow: hidden; 
}

.pokemon-list {
    margin-top: 35px;
    display: flex;
    flex-direction: column;
    gap: 16px; 
    width: 100%;
    align-items: center;
    box-sizing: border-box;
    overflow-y: auto; 
    padding-bottom: 100px; 
    max-height: calc(100vh - 80px); 
    scrollbar-width: none; 
    -ms-overflow-style: none; 
}

.load-more-button {
    margin: 16px 0;
    padding: 8px 16px;
    border: none;
    background-color: #f22539;
    color: white;
    border-radius: 24px;
    margin: 8px;
    cursor: pointer;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.load-more-button:hover {
    background-color: #d01e32;
}

.loading {
    text-align: center;
    margin: 16px 0;
}

.no-more {
    text-align: center;
    color: gray;
    margin: 16px 0;
}

.loading-layout {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white; 
    overflow: hidden; 
}

.loading-image {
    width: 106px;
    height: 106px;
}

</style>
  