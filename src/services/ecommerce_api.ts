import {
  Category,
  CreateEmptyOrder,
  CreateOrderElement,
  CreateProduct,
  Signin,
  Signup,
  UpdateOrderElementQuantity,
  UpdateOrderStatus,
  UpdateProduct,
} from "@/utils/types/request";
import axios from "axios";

export class apiBackend {
  constructor() {}
  backend = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BACKEND_URL,

    headers: {
      "content-type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
  });
}

export class auth extends apiBackend {
  constructor() {
    super();
  }
  register = (data: Signup) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return this.backend.post("/auth/signup", data, config);
  };
  login = (data: Signin) => {
    return this.backend.post("/auth/signin", data);
  };
}

export class category extends apiBackend {
  constructor() {
    super();
  }
  create = (data: Category) => {
    this.backend.post("/category", data);
  };
  findAll = () => {
    this.backend.get("/category");
  };
  findOne = (id: string) => {
    this.backend.get(`/category/${id}`);
  };
  update = (id: string, data: Category) => {
    this.backend.patch(`/category/${id}`, data);
  };
  remove = (id: string) => {
    this.backend.delete(`/category/${id}`);
  };
}

export class order extends apiBackend {
  constructor() {
    super();
  }
  createEmptyOrder = (data: CreateEmptyOrder) => {
    this.backend.post("/order", data);
  };
  createOrderElement = (data: CreateOrderElement) => {
    this.backend.post("/order/element", data);
  };
  findAll = () => {
    this.backend.get("/order");
  };
  findOne = (id: string) => {
    this.backend.get(`/order/${id}`);
  };
  updateOrderStatus = (id: string, data: UpdateOrderStatus) => {
    this.backend.patch(`/order/${id}/status`, data);
  };
  updateElementQuantity = (id: string, data: UpdateOrderElementQuantity) => {
    this.backend.patch(`/order/${id}/quantity`, data);
  };
  removeElement = (id: string) => {
    this.backend.delete(`/order/element/${id}`);
  };
  remove = (id: string) => {
    this.backend.delete(`/order/${id}`);
  };
}

export class product extends apiBackend {
  constructor() {
    super();
  }
  create = (data: CreateProduct) => {
    this.backend.post("/product", data);
  };
  findAll = () => {
    this.backend.get("/product");
  };
  findOne(id: string) {
    return this.backend.get(`/product/${id}`);
  }
  update = (id: string, data: UpdateProduct) => {
    this.backend.patch(`/product/${id}`, data);
  };
  remove = (id: string) => {
    this.backend.delete(`/product/${id}`);
  };
}

export class review extends apiBackend {
  constructor() {
    super();
  }
}

export class user extends apiBackend {
  constructor() {
    super();
  }
}
