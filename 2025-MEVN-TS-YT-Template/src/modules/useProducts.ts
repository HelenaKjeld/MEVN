import { ref } from "vue";
import type { Product } from "../intetfaces/interfaces";


export const useProducts = () => {
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);
  const products = ref<Product[]>([]);

  const fetchProducts = async (): Promise<void> => {
    loading.value = true;

    try {
      const response = await fetch(
        "https://ments-restapi.onrender.com/api/products",
      );
      if (!response.ok) {
        throw new Error("No data available");
      }

      const data: Product[] = await response.json();

      products.value = data;
      console.log("products fetched:", products.value);
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false; // no matter what happens, loading will be set to false
    }
  };

  const deleteProduct = async (id: string): Promise<void> => {
    try {
        const token = localStorage.getItem("IsToken")
        if (!token) {
            throw new Error("No token found")
        }
        console.log("id test", id)
        const response = await fetch(`https://ments-restapi.onrender.com/api/products/${id}`,
            {
                method: "DELETE",
                headers: {
                    "auth-token": token
                }
            }
        )

        if (!response.ok) {
            throw new Error("Failed to delete product")
        }


        products.value = products.value.filter(product => product._id !== id) // _id or id ??
        console.log("Product deleted successfully", id)

    }
    catch (err) {
      error.value = (err as Error).message;
    }
}
  return {
    error,
    loading,
    products,
    fetchProducts,
    deleteProduct
  };
};
