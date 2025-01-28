<script setup lang="ts">
import { computed } from 'vue';
import { products } from '../data/products';
import ProductCard from './ProductCard.vue';

const newProducts = computed(() => {
  return products.filter(product => product.isNew).slice(0, 4);
});
</script>

<template>
  <section class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-6">
      <h2 class="text-3xl font-bold mb-8 text-center">Novidades</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in newProducts"
          :key="product.id"
          :product="product"
          class="transform hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  </section>
</template> 