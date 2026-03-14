<template>
  <div class="bg-[#181818] min-h-screen lazy-css">
    <h1 class="text-3xl font-bold mb-8">Admin View</h1>
    <div v-if="loading" class="text-center">Loading...</div> <!-- Loading wait screen -->
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div> <!-- Error message -->
    <div v-else class="flex flex-wrap -mx-2"> <!-- add new product section -->
      <div class="my-8 p-2 w-full">
        <h2 class="text-2xl font-semibold mb-4">Add Product</h2>
        <form @submit.prevent="addProductHandler"> <!-- Add product form -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" v-model="newProduct.name" placeholder="Name" class="p-2 border rounded" />
            <!-- Product name -->
            <span class="absolute text-red-500 text-xs ml-2">Can't be empty</span> <!-- Error message & validate -->

            <input type="text" v-model="newProduct.description" placeholder="Description" class="p-2 border rounded" />
            <!-- Product description -->
            <div class="p-2 border rounded">

              <span class="uppercase font-bold">Product Price: </span>
              <input type="number" v-model="newProduct.price" placeholder="Price" class=" pl-2 " />
              <!-- Product price -->
            </div>
            <div class="p-2 border rounded">

              <span class="uppercase font-bold">Product Stock: </span>
              <input type="number" v-model="newProduct.stock" placeholder="Stock" class=" pl-2 " />
              <!-- Product stock -->
            </div>
            <div class="p-2 border rounded flex items-center">

              <input type="checkbox" class="border rounded w-6 h-6 mr-2" v-model="newProduct.discount" /> <span
                class="uppercase font-bold">Discount in %:</span> <!-- Discount in % -->
              <input type="number" v-model="newProduct.discountPct" placeholder="Discount %" class=" ml-2 pl-2 " />
              <!-- Discount % -->
            </div>
            <div class="p-2 border rounded flex items-center ">
              <input type="checkbox" class="p-2 border rounded w-6 h-6 mr-2" v-model="newProduct.isHidden" /> <span
                class="uppercase font-bold">Hidden product</span> <!-- Hidden product -->
            </div>
            <input type="text" v-model="newProduct.imageURL" placeholder="Image URL" class="p-2 border rounded h-10" />
            <!-- Image URL -->

          </div>
          <button type="submit" class="mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Create</button>
        </form>
      </div>

      <!-- Edit existing products -->
      <div class="my-8 p-2 w-full">

        <h2 class="text-2xl font-semibold mb-4">Products</h2>
        <div class="mb-4 p-4 border rounded bg-[#181818]" v-for="product in products" :key="product._id">
          <!-- Loop through the products -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Name" class="p-2 border rounded" v-model="product.name" />
            <!-- Product name -->
            <input type="text" placeholder="Description" class="p-2 border rounded" v-model="product.description" />
            <!-- Product description -->
            <div class="p-2 border rounded">

              <span class="uppercase font-bold">Product Price: </span>
              <input type="number" placeholder="Price" class=" pl-2 " v-model="product.price" /> <!-- Product price -->
            </div>
            <div class="p-2 border rounded">

              <span class="uppercase font-bold">Product Stock: </span>
              <input type="number" placeholder="Stock" class=" pl-2 " v-model="product.stock" /> <!-- Product stock -->
            </div>
            <div class="p-2 border rounded flex items-center">

              <input type="checkbox" class="border rounded w-6 h-6 mr-2" v-model="product.discount" /> <span
                class="uppercase font-bold">Discount in %:</span> <!-- Discount in % -->
              <input type="number" placeholder="Discount %" class=" ml-2 pl-2 " v-model="product.discountPct" />
              <!-- Discount % -->
            </div>
            <div class="p-2 border rounded flex items-center ">
              <input type="checkbox" class="p-2 border rounded w-6 h-6 mr-2" v-model="product.isHidden" /> <span
                class="uppercase font-bold">Hidden product</span> <!-- Hidden product -->
            </div>
            <input type="text" v-model="product.imageURL" placeholder="Image URL" class="p-2 border rounded h-10" />
            <!-- Image URL -->
            <span>
              Thumbnail img: <img :src="product.imageURL" alt="Product Image"
                class="w-full h-24 w-24 object-cover mb-4 rounded-lg"> <!-- fixed :src -->
            </span>
          </div>

          <div class="mt-4 flex space-x-2"> <!-- Update and delete buttons -->
            <p>ID: </p> <!-- Product ID for testing -->
            <button @click="deleteProduct(product._id)"
              class="bg-red-600 text-white p-2 rounded hover:bg-red-700">Delete</button> <!-- Delete button -->
            <button @click="updateProductHandler(product)"
              class="bg-green-600 text-white p-2 rounded hover:bg-green-700">Edit</button> <!-- Edit button -->
          </div>
        </div>
      </div>
    </div>
    <!-- Custom confirmation dialog -->

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue'
import { useProducts } from '../../modules/useProducts'
import type { Product } from '@/intetfaces/interfaces'


const { products, error, loading, fetchProducts, deleteProduct, addProduct, getTokenAndUserId, updateProduct } = useProducts()

onMounted(() => {
  fetchProducts()
})

const newProduct = ref({
  name: '',
  description: '',
  price: 0,
  stock: 0,
  discount: false,
  discountPct: 0,
  isHidden: false,
  imageURL: '',
  _createdBy: ''
})

const addProductHandler = async () => {
  const { userId } = getTokenAndUserId(); // import the userId from the useProducts module
  newProduct.value._createdBy = userId; // Set the _createdBy field to the userId or an empty string if userId is undefined
  await addProduct(newProduct.value)
  newProduct.value = {
    ...newProduct.value,
  }
}

const updateProductHandler = async (product: Product) => {
  const updatedProduct = {
    name: product.name,
    description: product.description,
    imageURL: product.imageURL,
    price: product.price,
    stock: product.stock,
    discount: product.discount,
    discountPct: product.discountPct,
    isHidden: product.isHidden,
  }
  await updateProduct(product._id, updatedProduct)
}

</script>

<style scoped>
input {
  background-color: #2b2b2b;
}

.lazy-css {
  color: #969696;
}

input[type=checkbox] {
  accent-color: var(--input-field-color);
}
</style>
