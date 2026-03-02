import { ref } from "vue";
import type { Product } from "../intetfaces/interfaces";

const apiUrl = import.meta.env.VITE_API_URL;

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

  const addProduct = async (/** */): Promise<void> => {
      try { 
        const token = localStorage.getItem("IsToken");
        const userId = localStorage.getItem("UserIdToken");
        if (!token) {
          throw new Error("No token found");
        }
        if (!userId) {
          throw new Error("No user ID found");
        }

        const response = await fetch(`${apiUrl}/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({
            name: "Diva",
            description: "Description of the new DIVA",
            imageURL: "https://picsum.photos/500/500",
            price: 2,
            stock: 45, 
            discount: false,
            discountPct: 0,
            isHidden: false,
            _createdBy: userId, 
          }),
        })

        if (!response.ok) {
          const errorResponse = await response.json()
          throw new Error(errorResponse.error || 'Failed to add product')
        }

        const newProduct: Product = await response.json()
        products.value.push(newProduct)
        console.log("Product added successfully", newProduct)

        await fetchProducts() // Fetch the updated list of products after adding a new one
    }

      catch (err) {
        error.value = (err as Error).message
      }
  };


  const deleteProduct = async (id: string): Promise<void> => {
    try {
      const token = localStorage.getItem("IsToken");
      if (!token) {
        throw new Error("No token found");
      }
      console.log("id test", id);
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          "auth-token": token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      products.value = products.value.filter((product) => product._id !== id); // _id or id ??
      console.log("Product deleted successfully", id);
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false; // no matter what happens, loading will be set to false
    }
  };


  return {
    error,
    loading,
    products,
    fetchProducts,
    deleteProduct,
    addProduct
  };
};

