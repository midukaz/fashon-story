import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Vestido Floral',
    price: 259.90,
    description: 'Vestido longo floral em tecido leve',
    category: 'Feminino',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500',
    sizes: ['P', 'M', 'G'],
    colors: ['Azul', 'Rosa'],
    isNew: true,
    onSale: false
  },
  {
    id: 2,
    name: 'Blazer Clássico',
    price: 399.90,
    description: 'Blazer em alfaiataria premium',
    category: 'Feminino',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Preto', 'Bege'],
    trending: true,
    onSale: true
  },
  {
    id: 3,
    name: 'Camisa Social',
    price: 189.90,
    description: 'Camisa social slim fit',
    category: 'Masculino',
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=500',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Branco', 'Azul Claro'],
    onSale: false
  },
  {
    id: 4,
    name: 'Bolsa Couro',
    price: 459.90,
    description: 'Bolsa em couro legítimo',
    category: 'Acessórios',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500',
    colors: ['Caramelo', 'Preto'],
    trending: true,
    onSale: true
  },
  {
    id: 5,
    name: 'Tênis Casual',
    price: 299.90,
    description: 'Tênis casual em couro',
    category: 'Calçados',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
    sizes: ['37', '38', '39', '40', '41'],
    colors: ['Branco', 'Preto'],
    isNew: true,
    onSale: false
  }
];

export const colors = [
  { name: 'Preto', value: '#000000' },
  { name: 'Branco', value: '#FFFFFF' },
  { name: 'Bege', value: '#F5F5DC' },
  { name: 'Azul', value: '#0000FF' },
  { name: 'Rosa', value: '#FFC0CB' },
  { name: 'Caramelo', value: '#C17817' },
  { name: 'Azul Claro', value: '#ADD8E6' }
];