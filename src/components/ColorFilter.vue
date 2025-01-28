<script setup lang="ts">
import { ref } from 'vue';
import { colors } from '../data/products';

const selectedColor = ref('Todos');
const emit = defineEmits(['change']);

const handleColorChange = (colorName: string) => {
  selectedColor.value = colorName;
  emit('change', colorName);
};
</script>

<template>
  <div class="p-4 bg-white rounded-lg shadow-sm">
    <h3 class="text-sm font-medium mb-3">Cores</h3>
    <div class="flex flex-wrap gap-2">
      <button
        class="w-8 h-8 rounded-full border-2 flex items-center justify-center"
        :class="selectedColor === 'Todos' ? 'border-black' : 'border-gray-200'"
        @click="handleColorChange('Todos')"
      >
        <span class="text-xs">All</span>
      </button>
      <button
        v-for="color in colors"
        :key="color.name"
        @click="handleColorChange(color.name)"
        class="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
        :class="selectedColor === color.name ? 'border-black' : 'border-gray-200'"
        :style="{
          backgroundColor: color.value,
          border: color.name === 'Branco' ? '1px solid #e5e7eb' : ''
        }"
      />
    </div>
  </div>
</template> 