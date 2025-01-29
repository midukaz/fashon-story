<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

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
  discount?: number | null;
}

const props = defineProps<{
  product: Product | null;
  show: boolean;
}>();

const emit = defineEmits(['close', 'addToCart']);

const selectedSize = ref('');
const selectedColor = ref('');
const quantity = ref(1);

const handleAddToCart = () => {
  if (props.product && selectedSize.value && selectedColor.value) {
    emit('addToCart', {
      ...props.product,
      selectedSize: selectedSize.value,
      selectedColor: selectedColor.value,
      quantity: quantity.value
    });
    emit('close');
  }
};

const decreaseQuantity = () => {
  if (quantity.value > 1) quantity.value--;
};

const increaseQuantity = () => {
  quantity.value++;
};
</script>

<template>
  <div v-if="show && product" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" @click="$emit('close')"></div>
      
      <div class="relative bg-white rounded-xl max-w-7xl w-full mx-auto shadow-2xl">
        <button 
          @click="$emit('close')"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-500 z-10"
        >
          <span class="sr-only">Fechar</span>
          <Icon icon="mdi:close" class="h-5 w-5" />
        </button>

        <div class="grid grid-cols-1 md:grid-cols-2">
          <!-- Imagem do Produto -->
          <div class="relative aspect-[4/3] md:aspect-auto">
            <img 
              :src="product.image" 
              :alt="product.name"
              class="absolute inset-0 w-full h-full object-cover object-center rounded-l-xl"
            />
            <div v-if="product.discount" class="absolute top-4 left-4 bg-red-500 text-white px-2.5 py-0.5 rounded-full text-xs font-medium">
              {{ product.discount }}% OFF
            </div>
          </div>

          <!-- Detalhes do Produto -->
          <div class="p-6 md:p-8 lg:p-10">
            <div class="mb-4">
              <div class="flex items-center justify-between">
                <h2 class="text-xl font-bold text-gray-900">{{ product.name }}</h2>
                <span class="text-xs font-medium text-gray-500">{{ product.category }}</span>
              </div>
              
              <div class="mt-2 flex items-center space-x-2">
                <div class="flex items-center">
                  <Icon 
                    v-for="i in Math.floor(product.rating)"
                    :key="i"
                    icon="mdi:star"
                    class="h-4 w-4 text-yellow-400"
                  />
                  <Icon 
                    v-if="product.rating % 1 !== 0"
                    icon="mdi:star-half"
                    class="h-4 w-4 text-yellow-400"
                  />
                </div>
                <span class="text-xs text-gray-500">({{ product.reviews }} avaliações)</span>
              </div>
            </div>

            <p class="text-sm text-gray-600 mb-4">{{ product.description }}</p>
            
            <div class="mb-4">
              <div class="flex items-baseline space-x-2">
                <span class="text-xl font-bold text-gray-900">
                  R$ {{ product.price.toFixed(2) }}
                </span>
                <span v-if="product.discount" class="text-xs text-red-500 font-medium">
                  Economia de R$ {{ ((product.price * product.discount) / 100).toFixed(2) }}
                </span>
              </div>
            </div>

            <!-- Seleção de Cor -->
            <div class="mb-4">
              <h3 class="text-xs font-medium text-gray-900 mb-2">Cor</h3>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="color in product.colors"
                  :key="color"
                  @click="selectedColor = color"
                  class="px-3 py-1.5 rounded-lg border text-sm transition-all duration-200"
                  :class="[
                    selectedColor === color 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-200 hover:border-gray-300'
                  ]"
                >
                  {{ color }}
                </button>
              </div>
            </div>

            <!-- Seleção de Tamanho -->
            <div class="mb-4">
              <h3 class="text-xs font-medium text-gray-900 mb-2">Tamanho</h3>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="size in product.sizes"
                  :key="size"
                  @click="selectedSize = size"
                  class="px-3 py-1.5 rounded-lg border text-sm transition-all duration-200"
                  :class="[
                    selectedSize === size 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-200 hover:border-gray-300'
                  ]"
                >
                  {{ size }}
                </button>
              </div>
            </div>

            <!-- Quantidade -->
            <div class="mb-6">
              <h3 class="text-xs font-medium text-gray-900 mb-2">Quantidade</h3>
              <div class="flex items-center space-x-2">
                <button 
                  @click="decreaseQuantity"
                  class="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                >
                  <Icon icon="mdi:minus" class="h-4 w-4" />
                </button>
                <span class="w-12 text-center text-sm">{{ quantity }}</span>
                <button 
                  @click="increaseQuantity"
                  class="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                >
                  <Icon icon="mdi:plus" class="h-4 w-4" />
                </button>
              </div>
            </div>

            <!-- Botão Adicionar ao Carrinho -->
            <button
              @click="handleAddToCart"
              :disabled="!selectedSize || !selectedColor"
              class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
            >
              <Icon icon="mdi:cart" class="h-4 w-4" v-if="selectedSize && selectedColor" />
              {{ !selectedSize || !selectedColor ? 'Selecione cor e tamanho' : 'Adicionar ao Carrinho' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 