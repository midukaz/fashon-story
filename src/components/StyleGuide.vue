<script setup lang="ts">
const looks = [
  {
    id: 1,
    title: 'Look Casual',
    description: 'Perfeito para o dia a dia',
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=800'
  },
  {
    id: 2,
    title: 'Look Elegante',
    description: 'Ideal para ocasiões especiais',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800'
  }
];
</script>

<template>
  <section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-6">
      <h2 class="text-3xl font-bold mb-8 text-center">Guia de Estilo</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="look in looks"
          :key="look.id"
          class="relative group overflow-hidden rounded-xl"
        >
          <img
            :src="look.image"
            :alt="look.title"
            class="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
          >
          <div class="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6">
            <div class="text-white">
              <h3 class="text-2xl font-bold mb-2">{{ look.title }}</h3>
              <p>{{ look.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template> 