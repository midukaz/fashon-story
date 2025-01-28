<script setup lang="ts">
import { computed } from 'vue';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard.vue';

const saleProducts = computed(() => {
  return products.filter(product => product.onSale);
});
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 py-12">
    <h1 class="text-4xl font-bold mb-8">Promoções</h1>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCard
        v-for="product in saleProducts"
        :key="product.id"
        :product="product"
        class="transform hover:scale-105 transition-transform duration-300"
      />
    </div>
  </div>
</template> 