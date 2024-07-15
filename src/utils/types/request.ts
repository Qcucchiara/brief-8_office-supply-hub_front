// AUTH
export interface Signup {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  pseudo: string;
  avatar?: any;
}

export interface Signin {
  credential: string;
  password: string;
}

export interface changePassword {
  password: string;
  confirmPassword: string;
}

// CATEGORY
export interface Category {
  name: string;
  image: any;
}

// ORDER
export interface CreateEmptyOrder {
  user_id: string;
  status?: string;
}

export interface UpdateOrderStatus {
  status: string;
}

export interface CreateOrderElement {
  product_id: string;
  order_id: string;
  quantity: number;
}

export interface UpdateOrderElementQuantity {
  quantity: number;
}

// PRODUCT
export interface CreateProduct {
  name: string;
  image: any;
  description: string;
  price: number;
  stock: number;
  promo?: number;
  categories_ids: string[];
}

export interface UpdateProduct {
  name?: string;
  image?: any;
  description?: string;
  price?: number;
  stock?: number;
  promo?: number;
  categories_ids?: string[];
}

// REVIEW

// USER
export enum Role {
  GUEST = "guest",
  CUSTOMER = "customer",
  SELLER = "seller",
  ADMIN = "admin",
}