<template>
    <q-input
        outlined
        dense
        :model-value="modelValue"
        color="red-4"
        @update:model-value="updateValue"
        class="search-input"
        @keyup.enter="onEnter"
    >
        <template v-slot:prepend>
            <q-icon name="search" color="grey-6" />
        </template>
    </q-input>
</template>

<script setup>

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
});

const onEnter = () => {
    emit('enter', props.modelValue);
};

const emit = defineEmits(['update:modelValue', 'enter']);

const updateValue = (newValue) => {
    emit('update:modelValue', newValue);
};

</script>

<style scoped>
.search-input {
    margin-top: 35px;
    min-width: 315px;
    height: auto;
    border-radius: 12px;
}

@media (min-width: 1152px) {
    .search-input {
        width: 570px;
    }
}
</style>
  