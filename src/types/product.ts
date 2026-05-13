export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  category: 'segar' | 'olahan' | 'ekspor';
  stock: number;
  isFeatured: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
