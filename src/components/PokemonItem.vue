<template>
    <div :class="['pokemon-card', { favorite: isFavorite }]">
        <span 
            class="pokemon-name" 
            @click="emit('name-clicked', name)">
            {{ name }}
        </span>
        <img
            :src="isFavorite ? starFilled : starEmpty"
            alt="Favorite Icon"
            class="favorite-icon"
            @click="toggleFavorite"
        />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import starFilled from '../assets/StarFilled.svg';
import starEmpty from '../assets/StarEmpty.svg';

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    isFavorite: {
        type: Boolean,
        default: false,
    },
});

const toggleFavorite = () => {
    emit('favorite-toggled', { name: props.name, isFavorite: !props.isFavorite });
};

const emit = defineEmits(['name-clicked', 'favorite-toggled']);

const favorite = ref(props.isFavorite);

</script>

<style scoped>
.pokemon-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 8px;
    padding: 0 12px;
    box-sizing: border-box;
    min-height: 60px;
}

.pokemon-name {
    font-size: 22px;
    line-height: 26.4px;
    color: #353535;
    cursor: pointer;
    font-weight: 500;
}

.favorite-icon {
    width: 44px;
    height: 44px;
    cursor: pointer;
}

@media (min-width: 1152px) {
    .pokemon-card {
        width: 570px;
    }
}

@media (max-width: 1152px) {
    .pokemon-card {
        width: 315px;
    }
}
</style>
  