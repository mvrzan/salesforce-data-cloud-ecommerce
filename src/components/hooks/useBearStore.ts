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
  quantity?: number;
}

interface FetchedProduct {
  id: number;
  category: string;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity?: number;
}

type BearStore = {
  cart: Product[];
  products: FetchedProduct[];
  numberOfItemsInCart: number;
  fetch: () => Promise<void>;
  addToCart: (product: Product) => void;
  clearCart: () => void;
  removeItemFromCart: (product: Product) => void;
  electronicsProducts: object[];
  jewelryProducts: object[];
  menProducts: object[];
  womenProducts: object[];
};

const useBearStore = create<BearStore>((set) => ({
  cart: [],
  products: [],
  numberOfItemsInCart: 0,
  electronicsProducts: [],
  jewelryProducts: [],
  menProducts: [],
  womenProducts: [],
  fetch: async () => {
    try {
      const data = (await fetchProductData()) as FetchedProduct[];

      set({
        products: data,
        electronicsProducts: data.filter(
          (product) => product.category === "electronics"
        ),
        jewelryProducts: data.filter(
          (product) => product.category === "jewelery"
        ),
        menProducts: data.filter(
          (product) => product.category === "men's clothing"
        ),
        womenProducts: data.filter(
          (product) => product.category === "women's clothing"
        ),
      });
    } catch (error) {
      console.error("Error setting global state:", error);
    }
  },

  addToCart: (product: Product) => {
    set((state) => ({ numberOfItemsInCart: state.numberOfItemsInCart + 1 }));

    set((state) => {
      // if the cart is empty, add the product with a quantity of 1
      if (state.cart.length === 0) {
        return { cart: [{ ...product, quantity: 1 }] };
      }

      // if the cart is not empty and the product is not in the cart, add the product with a quantity of 1
      if (!state.cart.some((item) => item.id === product.id)) {
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }

      // if the cart is not empty, check if the product is already in the cart
      const updatedState = state.cart.map((cartItem) => {
        if (cartItem.id === product.id) {
          const itemQuantity =
            cartItem.quantity === undefined ? 0 : cartItem.quantity;

          return {
            ...cartItem,
            quantity: itemQuantity + 1,
          };
        }

        return {
          ...cartItem,
        };
      });

      return { cart: [...updatedState] };
    });
  },

  clearCart: () => {
    set(() => ({ numberOfItemsInCart: 0 }));
    set(() => ({ cart: [] }));
  },

  removeItemFromCart: (product: Product) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== product.id),
    }));

    set((state) => ({
      numberOfItemsInCart: state.numberOfItemsInCart - product.quantity!,
    }));
  },
}));

export default useBearStore;
