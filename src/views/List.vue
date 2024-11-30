<template>
    <div 
        v-if="!pokemonStore.isLoading"
        class="list-layout">
        <SearchInput 
            v-model="search" 
            placeholder="Search"  
        />

        <div class="pokemon-list">
            <PokemonItem
                v-for="(pokemon, index) in pokemonStore.pokemonList"
                :key="index"
                :name="pokemon.name"
                :isFavorite="pokemon.isFavorite"
            />

            <button 
                v-if="!pokemonStore.isLoading" 
                ref="loadMoreButton"
                @click="loadMorePokemons" 
                class="load-more-button"> 
                Load More
            </button>
        </div>

        <BottomNav
            @allClick="handleAllClick"
            @favoritesClick="handleFavoritesClick"
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
const search = ref('');
const loadMoreButton = ref(null);

const loadMorePokemons = async () => {
    pokemonStore.offset += 10;
    await pokemonStore.fetchPokemons();

    await nextTick();

    if (loadMoreButton.value) {
        loadMoreButton.value.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
};

const handleAllClick = () => {
    console.log('Navigating to All Pokemon...');
};

const handleFavoritesClick = () => {
    console.log('Navigating to Favorites...');
};

onMounted(async () => {
    pokemonStore.pokemonList = [];
    pokemonStore.offset = 0;
    await pokemonStore.fetchPokemons()
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
    box-sizing: border-box;
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
    border-radius: 8px;
    background-color: #f22539;
    color: white;
    font-size: 16px;
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
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

.loading-image {
    width: 106px;
    height: 106px;
}
</style>
  