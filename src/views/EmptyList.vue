<template>
    <div
        v-if="!pokemonStore.isLoading" 
        class="empty-list-layout">
        <SearchInput 
            v-model="pokemonStore.search" 
            placeholder="Search"  
            @enter="searchAndRedirect()"
        />

        <div class="empty-content">
            <h1 class="title">Uh-oh!</h1>
            <p class="description">You look lost on your journey!</p>
            <img 
                class="go-back-button"
                src="../assets/buttons/GoBackHome.svg"
                alt="Go Back Button"
                @click="goHome"
            />
        </div>
    </div>
    <div
        v-if="pokemonStore.isLoading"  
        class="loading-layout">
        <img class="loading-image" src="../assets/Loader.svg" alt="Pokeball" />
    </div>
</template>
  
<script setup>
import { useRouter } from 'vue-router';
import SearchInput from '../components/SearchInput.vue';
import { usePokemonStore } from '../stores/pokemonStore.js';

const pokemonStore = usePokemonStore();
const router = useRouter();

const goHome = () => {
    router.push('/list'); 
};

const searchAndRedirect = async () => {
    await pokemonStore.fetchPokemon(true,false);
    if (pokemonStore.pokemonList.length > 0) {
        router.push('/list');
    }
};

</script>
  
<style scoped>

.empty-list-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100vh;
}

.title {
    margin-top: 45px;
    font-size: 36px;
    font-weight: 700;
    line-height: 43.2px;
    color: #353535; 
}

.description {
    font-size: 20px;
    color: #5E5E5E;
    line-height: 30px;
}

.go-back-button {
    width: 155px;
    height: 50px;
    border-radius: 8px;
    cursor: pointer;
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

@media (min-width: 1152px) {
  .search-input {
    width: 570px;
  }
}
</style>
  