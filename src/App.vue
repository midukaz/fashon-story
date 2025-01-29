<script setup lang="ts">
import { ref, computed } from 'vue';
import productsData from './data/products.json';
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
import Pagination from './components/Pagination.vue';
import ProductModal from './components/ProductModal.vue';

// Interfaces
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

interface Category {
  id: string;
  name: string;
  image: string;
}

interface Color {
  name: string;
  value: string;
}

interface CartItem extends Product {
  quantity: number;
}

// Dados principais com tipagem correta
const allProducts = ref<Product[]>(productsData.products);
const categories = ref<Category[]>(productsData.categories);
const colors = ref<Color[]>(productsData.colors);
const sizes = ref(productsData.sizes);

// Estados
const selectedCategory = ref('Todos');
const selectedSize = ref('Todos');
const selectedColor = ref('Todos');
const searchQuery = ref('');
const priceRange = ref({ min: 0, max: 1000 });
const showQuickView = ref(false);
const showCart = ref(false);
const selectedProduct = ref<Product | null>(null);
const cartItems = ref<CartItem[]>([]);
const currentSlide = ref(0);
const itemsPerSlide = ref(4);
const showModal = ref(false);

// Configuração da paginação
const itemsPerPage = ref(12);
const currentPage = ref(1);

const router = useRouter();
const route = useRoute();

// Computed properties
const filteredProducts = computed(() => {
  let filtered = allProducts.value;
  
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

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage.value));

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredProducts.value.slice(start, end);
});

const newArrivals = computed(() => allProducts.value.filter(p => p.isNew));
const trendingProducts = computed(() => allProducts.value.filter(p => p.trending));
const onSaleProducts = computed(() => allProducts.value.filter(p => p.onSale));
const maxSlides = computed(() => Math.ceil(newArrivals.value.length / itemsPerSlide.value));

// Métodos
const handleFilter = (category: string) => {
  selectedCategory.value = category;
};

const handleSearch = (query: string) => {
  searchQuery.value = query;
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const openQuickView = (product: Product) => {
  selectedProduct.value = product;
  showQuickView.value = true;
};

const closeQuickView = () => {
  showQuickView.value = false;
  selectedProduct.value = null;
};

const addToCart = (product: Product) => {
  const existingItem = cartItems.value.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.value.push({
      ...product,
      quantity: 1
    });
  }
  
  showCart.value = true;
  setTimeout(() => {
    showCart.value = false;
  }, 3000);
};

const updateQuantity = (item: CartItem, change: number) => {
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

const getCartTotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
});

const nextSlide = () => {
  if (currentSlide.value < maxSlides.value - 1) {
    currentSlide.value++;
  }
};

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  }
};

const handleProductClick = (product) => {
  selectedProduct.value = product;
  showModal.value = true;
};

const handleCloseModal = () => {
  showModal.value = false;
  selectedProduct.value = null;
};

const handleAddToCart = (product) => {
  addToCart(product);
  handleCloseModal();
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
                  { name: 'Feminino', path: '/feminino', icon: '👗' },
                  { name: 'Masculino', path: '/masculino', icon: '👔' },
                  { name: 'Infantil', path: '/infantil', icon: '🧸' },
                  { name: 'Acessórios', path: '/acessorios', icon: '👜' },
                  { name: 'Sale', path: '/sale', icon: '🏷️' }
                ]"
                :key="index"
                :to="item.path"
                class="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                :class="{ 'bg-gray-100 font-semibold': route.path === item.path }"
              >
                <span>{{ item.icon }}</span>
                <span>{{ item.name }}</span>
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

    <!-- Hero Carousel em tela cheia -->
    <div class="w-full mb-12">
      <HeroCarousel class="w-full max-h-[600px] overflow-hidden" />
    </div>

    <main class="max-w-7xl mx-auto px-6 py-8">
      <!-- Novidades -->
      <div class="mb-12 relative">
        <div class="overflow-hidden">
          <div class="flex transition-transform duration-300 ease-in-out" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
            <NewArrivals 
              v-for="(_, index) in Math.ceil(newArrivals.length / itemsPerSlide)" 
              :key="index"
              :start-index="index * itemsPerSlide"
              :items-per-slide="itemsPerSlide"
              @click-product="openQuickView"
              class="flex-shrink-0 w-full"
            />
          </div>
        </div>
        
        <!-- Botões de navegação -->
        <button 
          @click="prevSlide" 
          class="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
          :class="{ 'invisible': currentSlide === 0 }"
        >
          <span class="sr-only">Anterior</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          @click="nextSlide" 
          class="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
          :class="{ 'invisible': currentSlide === maxSlides - 1 }"
        >
          <span class="sr-only">Próximo</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Seção de Filtros e Produtos -->
      <div class="lg:grid lg:grid-cols-12 lg:gap-8">
        <!-- Sidebar de Filtros -->
        <aside class="lg:col-span-3 mb-6 lg:mb-0">
          <div class="bg-white rounded-xl shadow-sm p-6 sticky top-4">
            <h2 class="text-lg font-semibold mb-6">Filtros</h2>
            
            <!-- Busca -->
            <div class="mb-6">
              <SearchBar 
                @search="handleSearch" 
                class="w-full"
              />
            </div>

            <!-- Categorias -->
            <div class="mb-6">
              <h3 class="text-sm font-medium text-gray-700 mb-3">Categoria</h3>
              <div class="space-y-2">
                <button
                  v-for="category in [
                    { name: 'Todos', icon: '🏷️' },
                    { name: 'Feminino', icon: '👗' },
                    { name: 'Masculino', icon: '👔' },
                    { name: 'Infantil', icon: '🧸' },
                    { name: 'Acessórios', icon: '👜' },
                    { name: 'Sale', icon: '💫' }
                  ]"
                  :key="category.name"
                  @click="selectedCategory = category.name"
                  class="w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200"
                  :class="selectedCategory === category.name ? 
                    'bg-gray-100 text-gray-900 font-medium' : 
                    'text-gray-600 hover:bg-gray-50'"
                >
                  <span>{{ category.icon }}</span>
                  <span>{{ category.name }}</span>
                </button>
              </div>
            </div>

            <!-- Tamanhos -->
            <div class="mb-6">
              <h3 class="text-sm font-medium text-gray-700 mb-3">Tamanho</h3>
              <SizeFilter 
                @change="size => selectedSize = size"
                class="w-full" 
              />
            </div>

            <!-- Cores -->
            <div class="mb-6">
              <h3 class="text-sm font-medium text-gray-700 mb-3">Cor</h3>
              <ColorFilter 
                @change="color => selectedColor = color"
                class="w-full" 
              />
            </div>
          </div>
        </aside>

        <!-- Conteúdo Principal -->
        <div class="lg:col-span-9">
          <!-- Produtos em Destaque -->
          <TrendingSection 
            class="mb-12" 
            @click-product="handleProductClick"
          />
          
          <!-- Grid de Produtos -->
          <section id="products-section" class="container mx-auto px-4 py-8">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <ProductCard
                v-for="product in paginatedProducts"
                :key="product.id"
                :product="product"
                @click="handleProductClick(product)"
              />
            </div>
            
            <Pagination
              v-model:currentPage="currentPage"
              :totalPages="totalPages"
            />
          </section>

          <!-- Guia de Estilo -->
          <StyleGuide class="mt-16" />
        </div>
      </div>
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

    <ProductModal
      :product="selectedProduct"
      :show="showModal"
      @close="handleCloseModal"
      @add-to-cart="handleAddToCart"
    />

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