import { Product } from '../types';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  colors: string[];
  sizes: string[];
  isNew?: boolean;
  trending?: boolean;
  onSale?: boolean;
}

export const products: Product[] = [
  // Moda Feminina
  {
    id: 1,
    name: "Vestido Floral Primavera",
    description: "Vestido leve com estampa floral, perfeito para dias ensolarados",
    price: 189.90,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500",
    category: "Feminino",
    colors: ["Rosa", "Azul", "Branco"],
    sizes: ["P", "M", "G"],
    isNew: true
  },
  {
    id: 2,
    name: "Blazer Elegante",
    description: "Blazer estruturado em tecido premium",
    price: 299.90,
    image: "https://images.unsplash.com/photo-1548624313-0396c75e4b63?w=500",
    category: "Feminino",
    colors: ["Preto", "Bege", "Marinho"],
    sizes: ["P", "M", "G", "GG"],
    trending: true
  },
  {
    id: 3,
    name: "Calça Jeans Skinny",
    description: "Calça jeans de alta elasticidade e conforto",
    price: 159.90,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500",
    category: "Feminino",
    colors: ["Azul Claro", "Azul Escuro", "Preto"],
    sizes: ["36", "38", "40", "42", "44"],
    onSale: true
  },

  // Moda Masculina
  {
    id: 4,
    name: "Camisa Social Slim",
    description: "Camisa social com corte moderno e tecido premium",
    price: 159.90,
    image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=500",
    category: "Masculino",
    colors: ["Branco", "Azul Claro", "Rosa Claro"],
    sizes: ["P", "M", "G", "GG"],
    trending: true
  },
  {
    id: 5,
    name: "Jaqueta de Couro",
    description: "Jaqueta em couro sintético com acabamento premium",
    price: 299.90,
    image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=500",
    category: "Masculino",
    colors: ["Preto", "Marrom"],
    sizes: ["M", "G", "GG"],
    isNew: true
  },
  {
    id: 6,
    name: "Calça Chino Casual",
    description: "Calça chino em algodão, ideal para ocasiões casuais",
    price: 139.90,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500",
    category: "Masculino",
    colors: ["Bege", "Azul Marinho", "Verde Militar"],
    sizes: ["38", "40", "42", "44", "46"],
    onSale: true
  },

  // Moda Infantil
  {
    id: 7,
    name: "Conjunto Infantil Verão",
    description: "Conjunto confortável para crianças, ideal para o verão",
    price: 89.90,
    image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=500",
    category: "Infantil",
    colors: ["Azul", "Rosa", "Amarelo"],
    sizes: ["2 anos", "4 anos", "6 anos"],
    isNew: true
  },
  {
    id: 8,
    name: "Jaqueta Infantil Inverno",
    description: "Jaqueta quente e confortável para dias frios",
    price: 149.90,
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500",
    category: "Infantil",
    colors: ["Vermelho", "Azul", "Rosa"],
    sizes: ["4 anos", "6 anos", "8 anos"],
    trending: true
  },
  {
    id: 9,
    name: "Tênis Infantil Casual",
    description: "Tênis confortável e resistente para crianças",
    price: 119.90,
    image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=500",
    category: "Infantil",
    colors: ["Azul", "Rosa", "Preto"],
    sizes: ["25", "26", "27", "28", "29", "30"],
    onSale: true
  },

  // Acessórios
  {
    id: 10,
    name: "Bolsa Tote Elegante",
    description: "Bolsa espaçosa em couro sintético",
    price: 199.90,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
    category: "Acessórios",
    colors: ["Preto", "Marrom", "Bege"],
    sizes: ["Único"],
    isNew: true
  },
  {
    id: 11,
    name: "Cinto em Couro",
    description: "Cinto em couro legítimo com fivela moderna",
    price: 89.90,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    category: "Acessórios",
    colors: ["Preto", "Marrom"],
    sizes: ["85cm", "90cm", "95cm", "100cm"],
    trending: true
  },
  {
    id: 12,
    name: "Óculos de Sol Vintage",
    description: "Óculos de sol com design retrô e proteção UV",
    price: 159.90,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
    category: "Acessórios",
    colors: ["Preto", "Tartaruga", "Dourado"],
    sizes: ["Único"],
    onSale: true
  },

  // Mais itens Femininos
  {
    id: 13,
    name: "Saia Midi Plissada",
    description: "Saia midi com pregas e cintura alta",
    price: 149.90,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500",
    category: "Feminino",
    colors: ["Preto", "Bege", "Verde"],
    sizes: ["P", "M", "G"],
    trending: true
  },
  {
    id: 14,
    name: "Blusa de Seda",
    description: "Blusa em seda com manga longa e gola laço",
    price: 229.90,
    image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=500",
    category: "Feminino",
    colors: ["Branco", "Rosa", "Azul Claro"],
    sizes: ["P", "M", "G"],
    isNew: true
  },

  // Mais itens Masculinos
  {
    id: 15,
    name: "Suéter de Tricô",
    description: "Suéter em tricô macio e confortável",
    price: 179.90,
    image: "https://images.unsplash.com/photo-1586337276000-c04decf73a08?w=500",
    category: "Masculino",
    colors: ["Cinza", "Azul Marinho", "Verde"],
    sizes: ["P", "M", "G", "GG"],
    trending: true
  },
  {
    id: 16,
    name: "Bermuda Cargo",
    description: "Bermuda estilo cargo com bolsos laterais",
    price: 119.90,
    image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=500",
    category: "Masculino",
    colors: ["Bege", "Verde Militar", "Preto"],
    sizes: ["38", "40", "42", "44"],
    onSale: true
  },

  // Mais itens Infantis
  {
    id: 17,
    name: "Vestido Infantil Festa",
    description: "Vestido de festa com tule e aplicações",
    price: 169.90,
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500",
    category: "Infantil",
    colors: ["Rosa", "Azul", "Branco"],
    sizes: ["4 anos", "6 anos", "8 anos"],
    isNew: true
  },
  {
    id: 18,
    name: "Pijama Infantil",
    description: "Pijama confortável com estampa divertida",
    price: 79.90,
    image: "https://images.unsplash.com/photo-1555009393-f20bdb245c4d?w=500",
    category: "Infantil",
    colors: ["Azul", "Rosa", "Verde"],
    sizes: ["2 anos", "4 anos", "6 anos", "8 anos"],
    onSale: true
  },

  // Mais Acessórios
  {
    id: 19,
    name: "Relógio Minimalista",
    description: "Relógio com design clean e pulseira em couro",
    price: 299.90,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500",
    category: "Acessórios",
    colors: ["Preto", "Marrom", "Rosé"],
    sizes: ["Único"],
    trending: true
  },
  {
    id: 20,
    name: "Mochila Moderna",
    description: "Mochila espaçosa com compartimento para notebook",
    price: 249.90,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a45?w=500",
    category: "Acessórios",
    colors: ["Preto", "Cinza", "Azul"],
    sizes: ["Único"],
    isNew: true
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