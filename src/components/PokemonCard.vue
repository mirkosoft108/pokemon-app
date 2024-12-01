<template>
    <q-dialog :model-value="isOpen" @update:model-value="closeDialog">
        <div :class="['pokemon-details-card', { 'is-mobile': isMobile }]">
 
            <div class="pokemon-image-wrapper">
    
                <img 
                    src="../assets/BackgroundImage.svg" 
                    alt="Background" 
                    class="background-image" 
                />

                <img 
                    :src="image" 
                    alt="Pokemon" 
                    class="pokemon-image" 
                />
    
                <img 
                    src="../assets/CloseIcon.svg" 
                    alt="Close" 
                    class="close-icon" 
                    @click="closeDialog" 
                />
            </div>

            <div class="details-section">
                <div class="detail-row">
                    <span class="detail-label">Name:</span>
                    <span class="detail-value">{{ name }}</span>
                </div>
                <div class="detail-line"></div> 

                <div class="detail-row">
                    <span class="detail-label">Weight:</span>
                    <span class="detail-value">{{ weight }} kg</span>
                </div>
                <div class="detail-line"></div> 

                <div class="detail-row">
                    <span class="detail-label">Height:</span>
                    <span class="detail-value">{{ height }} cm</span>
                </div>
                <div class="detail-line"></div> 

                <div class="detail-row">
                    <span class="detail-label">Types:</span>
                    <span class="detail-value">{{ types }}</span>
                </div>

                <div class="actions">
                    <img
                        src="../assets/buttons/ShareButton.svg"
                        alt="Share"
                        style="cursor: pointer;"
                        @click="share"
                    />
                    <img
                        :src="isFavorite ? starFilled : starEmpty"
                        src= '../assets/StarEmpty.svg'
                        alt="Favorite Icon"
                        class="action-icon"
                        @click="toggleFavorite"
                    />
                </div>
            </div>

            
        </div>
    </q-dialog>
</template>

<script setup>
import { computed } from 'vue';
import { useQuasar } from "quasar";

import starFilled from '../assets/StarFilled.svg';
import starEmpty from '../assets/StarEmpty.svg';

const $q = useQuasar();

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    types: {
        type: String,
        required: true,
    },
    isFavorite: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(['update:isOpen', 'toggle-favorite']);

const isMobile = computed(() => window.innerWidth < 768);

const closeDialog = () => {
    emit('update:isOpen', false); 
};

const toggleFavorite = () => {
    emit('toggle-favorite'); 
};

const share = async () => {
    const textToCopy = `Name: ${props.name}, Weight: ${props.weight} kg, Height: ${props.height} cm, Types: ${props.types}`;
    try {
        await navigator.clipboard.writeText(textToCopy);

        $q.notify({
            message: 'Copied to clipboard!',
            color: 'red-8',
            position: 'bottom',
            timeout: 2000,
        });
    } catch (error) {
        console.error('Failed to copy text:', error);
    }
};

</script>

<style scoped>

.pokemon-details-card {
    width: 315px;
    height: 506px;
    background-color: #fff;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.pokemon-details-card.is-mobile {
    width: 315px;
    height: 506px;
}

.pokemon-details-card:not(.is-mobile) {
    width: 570px;
    height: 506px;
}

.pokemon-image-wrapper {
    position: relative;
    height: 50%;
    background-color: #f8f9fa;
}

.background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; 
}

.pokemon-image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); 
    width: auto;
    height: 70%;
    object-fit: contain;
}

.close-icon {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    z-index: 10;
}

.details-section {
  padding: 16px;
  flex: 1;
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  line-height: 27px;
  margin-bottom: 8px; 
}

.detail-line {
  width: 100%; 
  height: 1px;
  background-color: #e0e0e0;
  margin: 8px auto; 
}

.detail-label {
    font-weight: 600;
    color: #6c757d;
}

.detail-value {
    font-weight: 400;
    color: #212529;
}

.actions {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 16px;
    border-top: 1px solid #e0e0e0;
}

.action-icon {
    width: 40px;
    height: 40px;
    cursor: pointer;
}

</style>
