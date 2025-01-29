<script setup lang="ts">
import { ref } from 'vue';
import productsData from '../data/products.json';

interface Category {
  id: string;
  name: string;
  image: string;
}

const props = defineProps<{
  selectedCategory?: string;
}>();

const emit = defineEmits(['change']);

const categories = ref<Category[]>(productsData.categories);

const handleCategorySelect = (categoryName: string) => {
  emit('change', categoryName);
};
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <button
      v-for="category in categories"
      :key="category.id"
      @click="handleCategorySelect(category.name)"
      class="px-4 py-2 rounded-lg transition-colors duration-200"
      :class="[
        selectedCategory === category.name 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
      ]"
    >
      {{ category.name }}
    </button>
  </div>
</template>