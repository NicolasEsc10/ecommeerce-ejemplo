import { Product } from "@prisma/client";
import { create } from "zustand";

interface CartProduct extends Product {
  quantity: number;
}

interface ProductStore {
  products: Product[];
  cart: CartProduct[];
  fetchProducts: () => Promise<void>;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  cart: [],
  
  fetchProducts: async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    set({ products: data });
  },

  addToCart: (product) => {
    const { cart } = get();
    const productInCart = cart.find((item) => item.id === product.id);

    if (productInCart) {
      set({
        cart: cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      });
    } else {
      set({ cart: [...cart, { ...product, quantity: 1 }] });
    }
  },

  removeFromCart: (productId) => {
    const { cart } = get();
    set({ cart: cart.filter((item) => item.id !== productId) });
  },

  incrementQuantity: (productId) => {
    const { cart } = get();
    set({
      cart: cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      ),
    });
  },

  decrementQuantity: (productId) => {
    const { cart } = get();
    const productInCart = cart.find((item) => item.id === productId);

    if (productInCart?.quantity === 1) {
      get().removeFromCart(productId); // Eliminar si la cantidad es 1
    } else {
      set({
        cart: cart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        ),
      });
    }
  },
}));
