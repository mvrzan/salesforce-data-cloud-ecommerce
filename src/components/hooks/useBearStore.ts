import { create } from "zustand";
import { fetchProductData } from "../../utils/fetchData";

type BearStore = {
  products: [];
  fetch: () => Promise<void>;
};

const useBearStore = create<BearStore>((set) => ({
  products: [],
  fetch: async () => {
    try {
      const data = await fetchProductData();
      set({ products: data });
    } catch (error) {
      console.error("Error setting global state:", error);
    }
  },
}));

export default useBearStore;
