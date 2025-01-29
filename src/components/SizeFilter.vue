<script setup lang="ts">
import { ref, computed } from 'vue';
import productsData from '../data/products.json';

interface Size {
  roupas: string[];
  calcados: string[];
  infantil: string[];
  acessorios: string[];
}

const props = defineProps<{
  selectedSize?: string;
}>();

const emit = defineEmits(['change']);

const sizes = ref<Size>(productsData.sizes);

const handleSizeSelect = (size: string) => {
  emit('change', size);
};

const allSizes = computed(() => {
  return [
    ...sizes.value.roupas,
    ...sizes.value.calcados,
    ...sizes.value.infantil,
    ...sizes.value.acessorios
  ];
});
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="size in allSizes"
      :key="size"
      @click="handleSizeSelect(size)"
      class="px-3 py-1 rounded border transition-all duration-200"
      :class="[
        selectedSize === size 
          ? 'border-blue-500 bg-blue-50 text-blue-700' 
          : 'border-gray-200 hover:border-gray-300'
      ]"
    >
      {{ size }}
    </button>
  </div>
</template> 