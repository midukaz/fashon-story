<script setup lang="ts">
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  colors: string[];
  sizes: string[];
  isNew: boolean;
  trending: boolean;
  onSale: boolean;
  rating: number;
  reviews: number;
}

const props = defineProps<{
  product: Product;
}>();

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
  <div class="bg-white rounded-lg shadow-sm hover:shadow-md transition-duration-300">
    <img :src="product.image" :alt="product.name" class="w-full h-64 object-cover rounded-t-lg">
    <div class="p-4">
      <h3 class="text-lg font-semibold">{{ product.name }}</h3>
      <p class="text-gray-600">{{ product.category }}</p>
      <p class="text-lg font-bold mt-2">R$ {{ product.price.toFixed(2) }}</p>
      <div class="flex items-center mt-2">
        <span class="text-yellow-400">★</span>
        <span class="ml-1">{{ product.rating }}</span>
        <span class="text-gray-500 ml-2">({{ product.reviews }})</span>
      </div>
      <div class="mt-2">
        <span v-if="product.isNew" class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2">
          Novo
        </span>
        <span v-if="product.trending" class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
          Trending
        </span>
        <span v-if="product.onSale" class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
          Promoção
        </span>
      </div>
    </div>
  </div>
</template>