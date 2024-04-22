/**
 * Fetches product data from an external API.
 * See https://fakestoreapi.com/docs for more information.
 *
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of product objects.
 * @throws {Error} If the request to the API fails.
 */

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
