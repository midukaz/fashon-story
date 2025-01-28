<script setup lang="ts">
const categories = ['Todos', 'Feminino', 'Masculino', 'Acessórios', 'Sale'];
const emit = defineEmits(['filter']);
</script>

<template>
  <div class="flex gap-2">
    <button
      v-for="category in categories"
      :key="category"
      @click="emit('filter', category)"
      class="px-4 py-2 rounded-lg border hover:bg-gray-100"
    >
      {{ category }}
    </button>
  </div>
</template>