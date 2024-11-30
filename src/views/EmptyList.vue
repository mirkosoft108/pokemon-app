<template>
    <div class="empty-list-layout">
        <SearchInput 
            v-model="search" 
            placeholder="Search"  
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
</template>
  
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import SearchInput from '../components/SearchInput.vue';
import { usePokemonStore } from '../stores/pokemonStore.js';

const search = ref('');
const pokemonStore = usePokemonStore();
const router = useRouter();

const goHome = () => {
    pokemonStore.pokemonList = [];
    pokemonStore.offset = 0;
    router.push('/list'); 
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
    box-sizing: border-box;
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

@media (min-width: 1152px) {
  .search-input {
    width: 570px;
  }
}
</style>
  