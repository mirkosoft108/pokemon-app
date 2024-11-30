<template>
    <nav :class="['bottom-nav', isMobile ? 'mobile' : 'desktop']">
        <CustomButton
            label="All"
            icon="menu"
            :isActive="activeButton === 'all'"
            @click="setActive('all')"
        />
        <CustomButton
            label="Favorites"
            icon="star"
            :isActive="activeButton === 'favorites'"
            @click="setActive('favorites')"
        />
    </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import CustomButton from './CustomButton.vue';

const isMobile = ref(window.innerWidth < 1152);
const activeButton = ref('all'); 

const updateViewport = () => {
    isMobile.value = window.innerWidth < 1152;
};

const setActive = (button) => {
    activeButton.value = button;
};

onMounted(() => {
    window.addEventListener('resize', updateViewport);
});

onUnmounted(() => {
    window.removeEventListener('resize', updateViewport);
});
</script>

<style scoped>
.bottom-nav {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 16px;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    z-index: 10;
}

.bottom-nav.mobile {
    width: 100%;
    height: 80px;
}

.bottom-nav.desktop {
    width: 100%;
    height: 80px;
}
</style>
