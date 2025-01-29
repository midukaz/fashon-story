<script setup lang="ts">
const props = defineProps({
  startIndex: {
    type: Number,
    default: 0
  },
  itemsPerSlide: {
    type: Number,
    default: 4
  }
});

defineEmits(['clickProduct']);
</script>

<template>
  <div class="px-4">
    <h2 class="text-2xl font-bold mb-6">Novidades</h2>
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
  </div>
</template> 