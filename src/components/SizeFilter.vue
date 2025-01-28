<script setup lang="ts">
import { ref } from 'vue';

const sizes = ['PP', 'P', 'M', 'G', 'GG', 'XG'];
const selectedSize = ref('Todos');

const emit = defineEmits(['change']);

const handleSizeChange = (size: string) => {
  selectedSize.value = size;
  emit('change', size);
};
</script>

<template>
  <div class="relative">
    <select
      v-model="selectedSize"
      @change="handleSizeChange(selectedSize)"
      class="w-full p-2 border rounded-lg bg-white appearance-none cursor-pointer"
    >
      <option value="Todos">Tamanho</option>
      <option v-for="size in sizes" :key="size" :value="size">
        {{ size }}
      </option>
    </select>
  </div>
</template> 