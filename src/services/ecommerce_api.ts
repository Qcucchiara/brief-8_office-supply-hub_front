"use client";
import {
  CartElement,
  Category,
  CreateOrderElement,
  CreateProduct,
  Signin,
  Signup,
  UpdateOrderElementQuantity,
  UpdateOrderStatus,
  UpdateProduct,
} from "@/utils/types/request";
import axios from "axios";

export const backend = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BACKEND_URL,

  headers: {
    "content-type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    Authorization: `Bearer ${typeof window !== "undefined" && window.localStorage.getItem("token")}`,
  },
});

export const handleAuth = {
  register: async (form: Signup, refFile: any) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const data = new FormData();
    data.append("first_name", form.first_name);
    data.append("last_name", form.last_name);
    data.append("email", form.email);
    data.append("password", form.password);
    data.append("confirmPassword", form.first_name);
    data.append("pseudo", form.pseudo);
    console.log(form.avatar);
    form.avatar && data.append("avatar", await refFile.current.files[0]);

    return backend.post("/auth/signup", data, config);
  },
  login: (data: Signin) => {
    return backend.post("/auth/signin", data);
  },
};

export const handleCategory = {
  create: (data: Category) => {
    return backend.post("/category", data);
  },
  findAll: (skip: number, take: number) => {
    return backend.get(`/category?skip=${skip}&take=${take}`);
  },
  findOne: (id: string) => {
    return backend.get(`/category/${id}`);
  },
  update: (id: string, data: Category) => {
    return backend.patch(`/category/${id}`, data);
  },
  remove: (id: string) => {
    return backend.delete(`/category/${id}`);
  },
};

export const handleOrder = {
  order: {
    createEmpty: () => {
      return backend.post("/order");
    },
    findAll: (skip: number, take: number) => {
      return backend.get(`/order?skip=${skip}&take=${take}`);
    },
    findFromUser: (skip: number, take: number) => {
      console.log("object");
      return backend.get(`/order/user?skip=${skip}&take=${take}`);
    },
    findOne: (id: string) => {
      return backend.get(`/order/${id}`);
    },
    updateStatus: (id: string, data: UpdateOrderStatus) => {
      return backend.patch(`/order/${id}/status`, data);
    },
    remove: (id: string) => {
      return backend.delete(`/order/${id}`);
    },
  },
  orderElement: {
    create: (data: CreateOrderElement) => {
      return backend.post("/order/element", data);
    },
    updateQuantity: (id: string, data: UpdateOrderElementQuantity) => {
      return backend.patch(`/order/${id}/quantity`, data);
    },
    remove: (id: string) => {
      return backend.delete(`/order/element/${id}`);
    },
  },
};

export const handleProduct = {
  create: (data: CreateProduct) => {
    return backend.post("/product", data);
  },
  findAll: (skip: number, take: number) => {
    typeof window !== "undefined" &&
      console.log(window.localStorage.getItem("token"));
    return backend.get(`/product?skip=${skip}&take=${take}`);
  },
  findOne: (param: string) => {
    return backend.get(`/product/${param}`);
  },
  findOneJoinCart: (id: string) => {
    return backend.get(`/product/cart/${id}`);
  },
  update: (id: string, data: UpdateProduct) => {
    return backend.patch(`/product/${id}`, data);
  },
  remove: (id: string) => {
    return backend.delete(`/product/${id}`);
  },
};

export const handleCart = {
  create: (data: CartElement) => {
    return backend.post("/cart", data);
  },
  find: (skip: number, take: number) => {
    return backend.get(`/cart?skip=${skip}&take=${take}`);
  },
  update: (id: string, data: CartElement) => {
    return backend.patch(`/cart/${id}`, data);
  },
  remove: (id: string) => {
    return backend.delete(`/cart/${id}`);
  },
};

export const handleUser = {
  findAll: () => {
    return backend.get("/user");
  },
  findOne: (id: string) => {
    return backend.get(`/user/${id}`);
  },
  changeRole: (idUser: string, idRole: string) => {
    return backend.patch(`/user/${idUser}/${idRole}`);
  },
  remove: (id: string) => {
    return backend.delete(`/user/${id}`);
  },
};
export const handleRole = {
  all: () => {
    return backend.get("/role");
  },
};

// export class review extends apiBackend {
//   constructor() {
//     super();
//   }
// }

// export class user extends apiBackend {
//   constructor() {
//     super();
//   }
// }
