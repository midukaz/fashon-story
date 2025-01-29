<script setup lang="ts">
import { ref } from 'vue';
import productsData from '../data/products.json';

interface Color {
  name: string;
  value: string;
}

const colors = ref<Color[]>(productsData.colors);
</script>

<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Guia de Estilo</h2>
    
    <div class="mb-8">
      <h3 class="text-lg font-semibold mb-2">Cores</h3>
      <div class="flex flex-wrap gap-4">
        <div 
          v-for="color in colors" 
          :key="color.name"
          class="flex flex-col items-center"
        >
          <div 
            class="w-16 h-16 rounded-full border"
            :style="{ backgroundColor: color.value }"
          ></div>
          <span class="mt-2 text-sm">{{ color.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template> 