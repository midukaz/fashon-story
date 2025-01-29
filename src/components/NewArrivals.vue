<script setup lang="ts">
import { ref, computed } from 'vue';
import productsData from '../data/products.json';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  colors: string[];
  sizes: string[];
  isNew: boolean;
  trending: boolean;
  onSale: boolean;
  rating: number;
  reviews: number;
}

const props = defineProps<{
  startIndex?: number;
  itemsPerSlide?: number;
}>();

const emit = defineEmits(['clickProduct']);

const products = computed(() => {
  return productsData.products.filter((product: Product) => product.isNew);
});
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    <div 
      v-for="product in products.slice(startIndex, startIndex + itemsPerSlide)"
      :key="product.id"
      class="group relative"
    >
      <div class="aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img 
          :src="product.image" 
          :alt="product.name"
          class="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
        />
      </div>
      <div class="mt-4">
        <h3 class="text-sm font-medium text-gray-900">{{ product.name }}</h3>
        <p class="mt-1 text-sm text-gray-500">{{ product.category }}</p>
        <p class="mt-1 text-sm font-medium text-gray-900">R$ {{ product.price.toFixed(2) }}</p>
      </div>
      <button 
        @click="$emit('clickProduct', product)"
        class="absolute inset-0 focus:outline-none"
      >
        <span class="sr-only">Ver detalhes de {{ product.name }}</span>
      </button>
    </div>
  </div>
</template> 