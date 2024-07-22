export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  Product_Has_Category?: ProductHasCategory[];
}

export interface ProductHasCategory {
  id: string;
  product_id: string;
  category_id: string;
  createdAt: string;
  updatedAt: string;
  category?: Category;
  product?: Product | ProductJoinCategory | ProductJoinUser | any;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  price: number;
  stock: number;
  promo: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductJoinCategory extends Product {
  Product_Has_Category: ProductHasCategory[];
}
export interface ProductJoinUser extends Product {
  User_Has_Product: CartElement[];
}

export interface CartElement {
  createdAt: string;
  id: string;
  product_id: string;
  quantity: number;
  updatedAt: string;
  user_id: string;
}

export interface OrderHasProduct {
  id: string;
  quantity: number;
  product_id: string;
  order_id: string;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

export interface Order {
  id: string;
  user_id: string;
  user: User;
  status: string;
  createdAt: string;
  updatedAt: string;
  Order_has_Product: OrderHasProduct[];
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  pseudo: string;
  pseudo_id: number;
  role_id: string;
  role: RoleResult;
  avatar: string;
  activate_token: string;
  createdAt: string;
  updatedAt: string;
}

export interface RoleResult {
  id: string;
  role: string;
}
