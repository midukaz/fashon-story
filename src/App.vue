<script setup lang="ts">
import { ref, computed } from 'vue';
import { products } from './data/products';
import ProductCard from './components/ProductCard.vue';
import CategoryFilter from './components/CategoryFilter.vue';
import HeroCarousel from './components/HeroCarousel.vue';
import SearchBar from './components/SearchBar.vue';
import SizeFilter from './components/SizeFilter.vue';
import ColorFilter from './components/ColorFilter.vue';
import TrendingSection from './components/TrendingSection.vue';
import NewArrivals from './components/NewArrivals.vue';
import StyleGuide from './components/StyleGuide.vue';
import { useRouter, useRoute } from 'vue-router';

const selectedCategory = ref('Todos');
const selectedSize = ref('Todos');
const selectedColor = ref('Todos');
const searchQuery = ref('');
const priceRange = ref({ min: 0, max: 1000 });
const showQuickView = ref(false);
const showCart = ref(false);
const selectedProduct = ref(null);
const cartItems = ref([]);

const router = useRouter();
const route = useRoute();

const filteredProducts = computed(() => {
  let filtered = products;
  
  if (selectedCategory.value !== 'Todos') {
    filtered = filtered.filter(product => product.category === selectedCategory.value);
  }
  
  if (selectedSize.value !== 'Todos') {
    filtered = filtered.filter(product => product.sizes.includes(selectedSize.value));
  }
  
  if (selectedColor.value !== 'Todos') {
    filtered = filtered.filter(product => product.colors.includes(selectedColor.value));
  }
  
  filtered = filtered.filter(product => 
    product.price >= priceRange.value.min && 
    product.price <= priceRange.value.max
  );
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  }
  
  return filtered;
});

const handleFilter = (category: string) => {
  selectedCategory.value = category;
};

const handleSearch = (query: string) => {
  searchQuery.value = query;
};

const addToCart = (product) => {
  const existingItem = cartItems.value.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.value.push({
      ...product,
      quantity: 1
    });
  }
  
  // Mostra o carrinho brevemente
  showCart.value = true;
  setTimeout(() => {
    showCart.value = false;
  }, 3000);
};

const openQuickView = (product) => {
  selectedProduct.value = product;
  showQuickView.value = true;
};

const closeQuickView = () => {
  showQuickView.value = false;
  selectedProduct.value = null;
};

const updateQuantity = (item, change) => {
  const index = cartItems.value.findIndex(i => i.id === item.id);
  if (index > -1) {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      cartItems.value[index].quantity = newQuantity;
    } else {
      cartItems.value.splice(index, 1);
    }
  }
};

const getCartTotal = () => {
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
    <header class="bg-white shadow-md">
      <nav class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-8">
            <router-link 
              to="/" 
              class="text-3xl font-bold text-gray-900 hover:text-gray-700"
            >
              FASHION STORE
            </router-link>
            <div class="hidden md:flex space-x-6">
              <router-link 
                v-for="(item, index) in [
                  { name: 'Feminino', path: '/feminino' },
                  { name: 'Masculino', path: '/masculino' },
                  { name: 'Acessórios', path: '/acessorios' },
                  { name: 'Sale', path: '/sale' }
                ]"
                :key="index"
                :to="item.path"
                class="text-gray-600 hover:text-black transition-colors duration-200"
                :class="{ 'font-semibold text-black': route.path === item.path }"
              >
                {{ item.name }}
              </router-link>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <button 
              class="p-2 hover:bg-gray-100 rounded-full relative"
              @click="showCart = true"
            >
              <span class="sr-only">Carrinho</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span 
                v-if="cartItems.length" 
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
              >
                {{ cartItems.length }}
              </span>
            </button>
          </div>
        </div>
      </nav>
    </header>



    <HeroCarousel class="mb-8" />
    
    <NewArrivals class="mb-12" />

    <main class="max-w-7xl mx-auto px-6 py-8">
      <!-- Filtros avançados -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <SearchBar @search="handleSearch" class="md:col-span-2" />
        <CategoryFilter @filter="handleFilter" />
        <div class="flex space-x-4">
          <SizeFilter @change="size => selectedSize = size" />
          <ColorFilter @change="color => selectedColor = color" />
        </div>
      </div>

      <!-- Seção de produtos em destaque -->
      <TrendingSection class="mb-12" />
      
      <!-- Grid de produtos -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          class="transform hover:scale-105 transition-transform duration-300"
          @quick-view="openQuickView(product)"
        />
      </div>

      <!-- Guia de estilo e looks -->
      <StyleGuide class="mt-16" />
    </main>

    <footer class="bg-white mt-16 border-t border-gray-200">
      <div class="max-w-7xl mx-auto px-6 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">Sobre nós</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-600 hover:text-black">Nossa História</a></li>
              <li><a href="#" class="text-gray-600 hover:text-black">Sustentabilidade</a></li>
              <li><a href="#" class="text-gray-600 hover:text-black">Trabalhe Conosco</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Ajuda</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-600 hover:text-black">Entregas</a></li>
              <li><a href="#" class="text-gray-600 hover:text-black">Trocas e Devoluções</a></li>
              <li><a href="#" class="text-gray-600 hover:text-black">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Contato</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-600 hover:text-black">WhatsApp</a></li>
              <li><a href="#" class="text-gray-600 hover:text-black">Email</a></li>
              <li><a href="#" class="text-gray-600 hover:text-black">Nossas Lojas</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Newsletter</h3>
            <p class="text-gray-600 mb-4">Receba novidades e promoções exclusivas</p>
            <input type="email" placeholder="Seu e-mail" class="w-full p-2 border rounded">
          </div>
        </div>
      </div>
    </footer>

    <!-- Modal de Quick View -->
    <div 
      v-if="showQuickView" 
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      @click.self="closeQuickView"
    >
      <div class="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
        <div class="flex justify-between mb-4">
          <h3 class="text-2xl font-bold">{{ selectedProduct?.name }}</h3>
          <button @click="closeQuickView" class="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img 
            :src="selectedProduct?.image" 
            :alt="selectedProduct?.name" 
            class="w-full rounded-lg"
          >
          <div>
            <p class="text-gray-600 mb-4">{{ selectedProduct?.description }}</p>
            <p class="text-2xl font-bold mb-4">R$ {{ selectedProduct?.price.toFixed(2) }}</p>
            <div class="mb-4">
              <h4 class="font-medium mb-2">Cores disponíveis:</h4>
              <div class="flex gap-2">
                <div 
                  v-for="color in selectedProduct?.colors" 
                  :key="color"
                  class="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {{ color }}
                </div>
              </div>
            </div>
            <div class="mb-6">
              <h4 class="font-medium mb-2">Tamanhos disponíveis:</h4>
              <div class="flex gap-2">
                <button 
                  v-for="size in selectedProduct?.sizes" 
                  :key="size"
                  class="px-3 py-1 border rounded-lg hover:bg-gray-100"
                >
                  {{ size }}
                </button>
              </div>
            </div>
            <button 
              @click="addToCart(selectedProduct); closeQuickView()"
              class="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Carrinho -->
    <div 
      v-if="showCart" 
      class="fixed right-0 top-0 h-full w-96 bg-white shadow-lg z-50 p-6"
    >
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold">Carrinho</h3>
        <button @click="showCart = false" class="text-gray-500 hover:text-black">
          ✕
        </button>
      </div>
      <div v-if="cartItems.length === 0" class="text-center text-gray-500">
        Carrinho vazio
      </div>
      <div v-else class="space-y-4">
        <div 
          v-for="item in cartItems" 
          :key="item.id"
          class="flex gap-4 border-b pb-4"
        >
          <img :src="item.image" :alt="item.name" class="w-20 h-20 object-cover rounded">
          <div class="flex-1">
            <h4 class="font-medium">{{ item.name }}</h4>
            <p class="text-gray-600">R$ {{ item.price.toFixed(2) }}</p>
            <div class="flex items-center gap-2 mt-2">
              <button 
                @click="updateQuantity(item, -1)"
                class="px-2 border rounded hover:bg-gray-100"
              >
                -
              </button>
              <span>{{ item.quantity }}</span>
              <button 
                @click="updateQuantity(item, 1)"
                class="px-2 border rounded hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div class="border-t pt-4">
          <div class="flex justify-between mb-4">
            <span class="font-medium">Total:</span>
            <span class="font-bold">R$ {{ getCartTotal().toFixed(2) }}</span>
          </div>
          <button class="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800">
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  </div>
</template>