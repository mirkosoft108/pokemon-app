<template>
    <button 
        :class="['custom-button', customClass, { active: isActive, inactive: !isActive }]" 
        :style="{ backgroundColor: isActive ? activeColor : inactiveColor }"
        @click="onClick"
    >
        <template v-if="icon">
            <span class="material-icons button-icon">{{ icon }}</span>
        </template>
        <span class="button-text">{{ label }}</span>
    </button>
</template>

<script setup>
const props = defineProps({
    label: {
        type: String,
        required: true, 
    },
    icon: {
        type: String,
        default: null, 
    },
    isActive: {
        type: Boolean,
        default: false, 
    },
    activeColor: {
        type: String,
        default: '#F22539', 
    },
    inactiveColor: {
        type: String,
        default: '#BFBFBF', 
    },
    customClass: {
        type: String,
        default: '', 
    },
});

const emit = defineEmits(['click']);

const onClick = () => {
    emit('click');
};
</script>

<style scoped>
.custom-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 24px;
    margin: 8px;
    cursor: pointer;
    padding: 8px 16px;
    font-size: 18px;
    font-weight: 700;
    color: white;
    transition: background-color 0.3s ease, transform 0.2s ease;
    width: 150px;
    height: 44px;
    box-sizing: border-box;
}

.custom-button.active {
    transform: scale(1.05);
}

.custom-button.inactive {
    opacity: 0.7;
}

.button-icon {
    margin-right: 8px;
    font-size: 20px;
}

.button-text {
    white-space: nowrap;
}

@media (min-width: 1152px) {
    .custom-button {
        width: 275px;
    }
}
</style>
  