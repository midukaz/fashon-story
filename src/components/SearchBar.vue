<script setup lang="ts">
import { ref } from 'vue';

const searchInput = ref('');
const emit = defineEmits(['search']);

const handleSearch = () => {
  emit('search', searchInput.value);
};
</script>

<template>
  <div class="relative">
    <input
      v-model="searchInput"
      @input="handleSearch"
      type="text"
      placeholder="Buscar produtos..."
      class="w-full p-3 border rounded-lg"
    >
  </div>
</template>