declare module "*.json" {
  const value: {
    products: Array<{
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
      discount: number | null;
    }>;
    categories: Array<{
      id: string;
      name: string;
      image: string;
    }>;
    colors: Array<{
      name: string;
      value: string;
    }>;
    sizes: {
      roupas: string[];
      calcados: string[];
      infantil: string[];
      acessorios: string[];
    };
  };
  export default value;
} 