export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export type Category = 'clothing' | 'shoes' | 'bags' | 'accessories';