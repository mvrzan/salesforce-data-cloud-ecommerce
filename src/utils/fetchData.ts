export const fetchProductData = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");

    if (!res.ok) {
      throw new Error("Failed to retrieve data");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
