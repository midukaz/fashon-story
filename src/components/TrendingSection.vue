<script setup lang="ts">
import { computed } from 'vue';
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

const emit = defineEmits(['clickProduct']);

const trendingProducts = computed(() => {
  return productsData.products
    .filter((product: Product) => product.trending)
    .slice(0, 4); // Limita para mostrar apenas 4 produtos
});

const handleProductClick = (product: Product) => {
  emit('clickProduct', product);
};
</script>

<template>
  <section class="py-12 bg-gray-50">
    <div class="max-w-7xl mx-auto px-6">
      <h2 class="text-3xl font-bold mb-8 text-center">Tendências</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div 
          v-for="product in trendingProducts"
          :key="product.id"
          class="group relative cursor-pointer"
          @click="handleProductClick(product)"
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
        </div>
      </div>
    </div>
  </section>
</template> 