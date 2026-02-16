<template>
  <div class="p-4 flex">
    <div class="w-2/3">
      <h2 class="text-2xl font-bold mb-4">Order History</h2>
      <p   class="text-center">No orders found</p> <!-- If there are no orders -->
      <div > <!-- If there are orders -->
        <div  class="mb-8 border-b pb-4"> <!-- Loop through the orders -->
          <div class="flex justify-between items-center mb-4">
            <div>
              <p class="font-semibold">Order ID: </p> <!-- Order ID -->
              <p class="text-gray-500">Order Date:  </p> <!-- Order Date -->
            </div>
            <div>
              <p class="font-semibold">Order Total: $</p> <!-- Order Total with .toFixed() -->
              <select   class="border p-1 text-[#181818] rounded"> <!-- Order Status -->
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
              <button   class="bg-red-500 text-white px-2 py-1 rounded ml-2 hover:bg-red-600">Archive</button> <!-- Archive button -->
            </div>
          </div>
          <div>
            <div  class="flex items-center mb-4"> <!-- Loop through the order items -->
              <!-- First Column: Image -->
              <div class="w-1/6">
                <img  alt="Product Image" class="w-full h-24 object-cover rounded-lg"> <!-- Product image -->
              </div>
              <!-- Second Column: Title and Description -->
              <div class="w-2/6 px-4">
                <p class="font-semibold"> </p> <!-- Product name -->
              </div>
              <!-- Third Column: Quantity -->
              <div class="w-1/6 text-center">
                <p   class="mx-2"></p> <!-- Quantity with v-html -->
              </div>
              <!-- Fourth Column: Price -->
              <div class="w-1/6 text-right">
                <p class="font-semibold">$ </p> <!-- Price with .toFixed() -->
              </div>
              <!-- Fifth Column: Total Price -->
              <div class="w-1/6 text-right">
                <p class="font-semibold">$ </p> <!-- Total price with .toFixed() -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-1/3 pl-4">
      <h2 class="text-2xl font-bold mb-4">Revenue</h2>
      <p class="text-xl font-semibold">Total Revenue: $ </p> <!-- Total Revenue with .toFixed() -->
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
/* Add your styles here */
</style>
