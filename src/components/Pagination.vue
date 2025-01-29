<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits(['update:currentPage']);

const handlePageChange = (newPage: number) => {
  if (newPage >= 1 && newPage <= props.totalPages) {
    emit('update:currentPage', newPage);
    
    // Mantém a posição atual da página
    const productsSection = document.querySelector('#products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
};

const pages = computed(() => {
  const pagesArray = [];
  for (let i = 1; i <= props.totalPages; i++) {
    pagesArray.push(i);
  }
  return pagesArray;
});
</script>

<template>
  <div class="flex justify-center items-center space-x-2 my-8">
    <button
      @click="handlePageChange(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-4 py-2 rounded-lg border transition-colors duration-200"
      :class="[
        currentPage === 1 
          ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
          : 'border-gray-300 hover:bg-gray-50'
      ]"
    >
      Anterior
    </button>

    <button
      v-for="page in pages"
      :key="page"
      @click="handlePageChange(page)"
      class="px-4 py-2 rounded-lg transition-colors duration-200"
      :class="[
        currentPage === page 
          ? 'bg-blue-500 text-white' 
          : 'hover:bg-gray-50'
      ]"
    >
      {{ page }}
    </button>

    <button
      @click="handlePageChange(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 rounded-lg border transition-colors duration-200"
      :class="[
        currentPage === totalPages 
          ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
          : 'border-gray-300 hover:bg-gray-50'
      ]"
    >
      Próxima
    </button>
  </div>
</template> 