<script setup lang="ts">
import { ref } from 'vue';
import productsData from '../data/products.json';

interface Color {
  name: string;
  value: string;
}

const props = defineProps<{
  selectedColor?: string;
}>();

const emit = defineEmits(['change']);

const colors = ref<Color[]>(productsData.colors);

const handleColorSelect = (colorName: string) => {
  emit('change', colorName);
};
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="color in colors"
      :key="color.name"
      @click="handleColorSelect(color.name)"
      class="w-8 h-8 rounded-full border-2 transition-all duration-200"
      :class="[
        selectedColor === color.name ? 'border-blue-500 scale-110' : 'border-gray-200',
      ]"
      :style="{ backgroundColor: color.value }"
      :title="color.name"
    >
      <span class="sr-only">{{ color.name }}</span>
    </button>
  </div>
</template> 