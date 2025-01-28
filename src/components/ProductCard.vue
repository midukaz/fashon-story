<script setup lang="ts">
import { Product } from '../types';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['quick-view', 'add-to-cart']);

const handleQuickView = (event: Event) => {
  event.preventDefault();
  emit('quick-view', props.product);
};

const handleAddToCart = (event: Event) => {
  event.preventDefault();
  emit('add-to-cart', props.product);
};
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm overflow-hidden group">
    <div class="relative cursor-pointer" @click="handleQuickView">
      <img 
        :src="product.image" 
        :alt="product.name" 
        class="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
      >
      <div 
        v-if="product.isNew" 
        class="absolute top-2 left-2 bg-black text-white px-3 py-1 rounded-full text-sm"
      >
        Novo
      </div>
      <div 
        v-if="product.trending" 
        class="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm"
      >
        Trending
      </div>
    </div>
    <div class="p-4">
      <h3 class="text-lg font-semibold mb-1">{{ product.name }}</h3>
      <p class="text-gray-600 text-sm mb-2">{{ product.description }}</p>
      <div class="flex justify-between items-center">
        <span class="text-xl font-bold">R$ {{ product.price.toFixed(2) }}</span>
        <button 
          @click="handleAddToCart"
          class="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors"
        >
          Adicionar
        </button>
      </div>
      <div class="mt-3 flex gap-1">
        <div 
          v-for="color in product.colors" 
          :key="color"
          class="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
        >
          {{ color }}
        </div>
      </div>
    </div>
  </div>
</template>