export interface Category {
  id: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductHasCategory {
  id: string;
  product_id: string;
  category_id: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  stock: number;
  promo: number;
  createdAt: string;
  updatedAt: string;
  Product_Has_Category: ProductHasCategory[];
}
