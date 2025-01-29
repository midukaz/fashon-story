<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['page-change']);

const pages = computed(() => {
  const pagesArray = [];
  for (let i = 1; i <= props.totalPages; i++) {
    pagesArray.push(i);
  }
  return pagesArray;
});

const changePage = (page: number) => {
  emit('page-change', page);
};
</script>

<template>
  <div class="flex justify-center items-center space-x-2 my-8">
    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Anterior
    </button>
    
    <button
      v-for="page in pages"
      :key="page"
      @click="changePage(page)"
      :class="[
        'px-4 py-2 rounded-lg',
        currentPage === page
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 hover:bg-gray-300'
      ]"
    >
      {{ page }}
    </button>
    
    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Próximo
    </button>
  </div>
</template> 