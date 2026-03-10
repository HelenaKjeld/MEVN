import { ref } from "vue";
import type { Product, NewProduct } from "../intetfaces/interfaces";

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

  const getTokenAndUserId = (): { token: string; userId: string } => {
     const token = localStorage.getItem("IsToken");
        const userId = localStorage.getItem("UserIdToken");
        if (!token) {
          throw new Error("No token found");
        }
        if (!userId) {
          throw new Error("No user ID found");
        }
        return { token, userId };
  }

  const validateProduct = (product: NewProduct):void => {
    if (!product.name) {
      throw new Error("Product name is required");
    }
  }

  const setDefaultValues = (product: NewProduct, userId: string) => {
    return {
      name: product.name,
      description: product.description  || 'Diva, omg this is the best product ever',
      imageURL: product.imageURL || 'https://picsum.photos/500/500',
      price: product.price || 2,
      stock: product.stock || 45,
      discount: product.discount || false,
      discountPct: product.discountPct || 0,
      isHidden: product.isHidden || false,
      _createdBy: userId
    }
  }


  const addProduct = async (product: NewProduct): Promise<void> => {
      try { 
        const { token, userId } = getTokenAndUserId();
        validateProduct(product)
        const productWithDefaults = setDefaultValues(product, userId)

        const response = await fetch(`${apiUrl}/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify(productWithDefaults)
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


  const deleteProductFromServer = async (id: string, token: string): Promise<void> => {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          "auth-token": token,
        },
      });

      if (!response.ok) {
        console.log("Failed to delete product", id)
        throw new Error("Failed to delete product")
      }
  }

  const removeProductFromState = (id: string): void => {
    products.value = products.value.filter((product) => product._id !== id); // _id or id ??
      console.log("Product deleted successfully", id);
  }

  const deleteProduct = async (id: string): Promise<void> => {
    try {
      
      const { token } = getTokenAndUserId()

      console.log("id test", id)
      await deleteProductFromServer(id, token)
      removeProductFromState(id)

      console.log("id test", id)

    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false; // no matter what happens, loading will be set to false
    }
  };

  const updateProductOnServer = async (id: string, updateProduct: Partial<Product> token: string): Promise<Product> => {
    const response = await fetch(`${apiUrl}/products/${id}`, {
      method: 'Put',
      header: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
      body: JSON.stringify(updateProduct)
    })

    if (!response.ok) {
      throw new Error('Failed to update product')
    }

    const responseTest = await response.text()
    try {
      return JSON.parse(responseTest) 
    }
    catch {
      return { messeage: responseTest } as unknown as Product
    }
      
  };

  const updateProductInState = (id: string, updatedProduct: Product): void => {
    const index = products.value.findIndex((product) => product._id === id);
    if (index !== -1) {
      products.value[index] = updatedProduct;
    }
  }

  const updateProduct = async (id: string, updateProduct: Partial<Product>): Promise<void> => {
    try {
      const { token } = getTokenAndUserId()
      const updatedProductResponse = await updateProductOnServer(id, updateProduct, token)
      updateProductInState(id, updatedProductResponse)
      await fetchProducts()
    }
  }


  return {
    error,
    loading,
    products,
    fetchProducts,
    deleteProduct,
    addProduct,
    updateProduct,
    setDefaultValues,
    validateProduct,

    getTokenAndUserId
  };
};

