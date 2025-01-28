<script setup lang="ts">
import { ref } from 'vue';

const slides = [
  {
    id: 1,
    title: 'Nova Coleção',
    subtitle: 'Descubra as últimas tendências',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600',
  },
  {
    id: 2,
    title: 'Sale',
    subtitle: 'Até 50% OFF',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600',
  },
];

const currentSlide = ref(0);

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
};
</script>

<template>
  <div class="relative h-[600px] overflow-hidden">
    <div
      v-for="(slide, index) in slides"
      :key="slide.id"
      class="absolute inset-0 transition-opacity duration-500"
      :class="{ 'opacity-0': currentSlide !== index }"
    >
      <img
        :src="slide.image"
        :alt="slide.title"
        class="w-full h-full object-cover"
      >
      <div class="absolute inset-0 bg-black bg-opacity-30">
        <div class="max-w-7xl mx-auto px-6 h-full flex items-center">
          <div class="text-white">
            <h2 class="text-6xl font-bold mb-4">{{ slide.title }}</h2>
            <p class="text-2xl mb-8">{{ slide.subtitle }}</p>
            <button class="bg-white text-black px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors">
              Comprar Agora
            </button>
          </div>
        </div>
      </div>
    </div>

    <button
      @click="prevSlide"
      class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 p-2 rounded-full"
    >
      ←
    </button>
    <button
      @click="nextSlide"
      class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 p-2 rounded-full"
    >
      →
    </button>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}
</style>