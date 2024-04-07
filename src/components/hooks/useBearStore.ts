import { create } from "zustand";
import { fetchProductData } from "../../utils/fetchData";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

type BearStore = {
  products: [];
  fetch: () => Promise<void>;
  cart: Product[];
  addToCart: (product: Product) => void;
  numberOfItemsInCart: number;
  clearCart: () => void;
};

const useBearStore = create<BearStore>((set) => ({
  cart: [],
  products: [],
  numberOfItemsInCart: 0,
  fetch: async () => {
    try {
      const data = await fetchProductData();
      set({ products: data });
    } catch (error) {
      console.error("Error setting global state:", error);
    }
  },
  addToCart: (product: Product) => {
    set((state) => ({ cart: [...state.cart, product] }));
    set((state) => ({ numberOfItemsInCart: state.numberOfItemsInCart + 1 }));
  },
  clearCart: () => {
    set(() => ({ numberOfItemsInCart: 0 }));
    set(() => ({ cart: [] }));
  },
}));

export default useBearStore;
