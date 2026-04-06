<template>
  <div class="p-4 flex">
    <div class="w-2/3">
      <h2 class="text-2xl font-bold mb-4">Order History</h2>
      <p v-if="orders.length === 0" class="text-center">No orders found</p> <!-- If there are no orders -->
      <div v-else> <!-- If there are orders -->
        <div v-for="order in orders" :key="order._id" class="mb-8 border-b pb-4"> <!-- Loop through the orders -->
          <div class="flex justify-between items-center mb-4">
            <div>
              <p class="font-semibold">Order ID: {{ order._id }}</p> <!-- Order ID -->
              <p class="text-gray-500">Order Date: {{ order.orderDate }}</p> <!-- Order Date -->
            </div>
            <div>
              <p class="font-semibold">Order Total: ${{ order.total.toFixed(2) }}</p>
              <!-- Order Total with .toFixed() -->
              <select v-model="order.orderStatus" class="border p-1 text-[#181818] rounded"> <!-- Order Status -->
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
              <button @click="archiveOrder(order._id)"
                class="bg-red-500 text-white px-2 py-1 rounded ml-2 hover:bg-red-600">Archive</button>
              <!-- Archive button -->
            </div>
          </div>
          <div>
            <div v-for="item in order.orderLines" :key="item.product._id" class="flex items-center mb-4">
              <!-- Loop through the order items -->
              <!-- First Column: Image -->
              <div class="w-1/6">
                <img :src="item.product.imageURL" alt="Product Image" class="w-full h-24 object-cover rounded-lg">
                <!-- Product image -->
              </div>
              <!-- Second Column: Title and Description -->
              <div class="w-2/6 px-4">
                <p class="font-semibold"> {{ item.product.name }} </p> <!-- Product name -->
              </div>
              <!-- Third Column: Quantity -->
              <div class="w-1/6 text-center">
                <p v-html="item.quantity" class="mx-2"></p> <!-- Quantity with v-html -->
              </div>
              <!-- Fourth Column: Price -->
              <div class="w-1/6 text-right">
                <p class="font-semibold">$ {{ calculateDiscontedPrice(item.product).toFixed(2) }}</p>
                <!-- Price with .toFixed() -->
              </div>
              <!-- Fifth Column: Total Price -->
              <div class="w-1/6 text-right">
                <p class="font-semibold">$ {{ (calculateDiscontedPrice(item.product) * item.quantity).toFixed(2) }}</p>
                <!-- Total price with .toFixed() -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-1/3 pl-4">
      <h2 class="text-2xl font-bold mb-4">Revenue</h2>
      <p class="text-xl font-semibold">Total Revenue: $ {{ totalRevenue.toFixed(2) }}</p>
      <!-- Total Revenue with .toFixed() -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCart } from '@/modules/cart/useCart';
import type { Product } from '@/intetfaces/interfaces';

const { orders } = useCart();

const archiveOrder = (orderId: string): void => {
  orders.value = orders.value.filter(order => order._id !== orderId); // Remove the order from the list
};

const calculateDiscontedPrice = (product: Product): number => {
  if (product.discount) {
    return product.price * (1 - product.discountPct / 100); // Calculate discounted price
  }
  return product.price; // Return original price if no discount

};

const totalRevenue = computed(() => {
  return orders.value
    .filter(order => order.orderStatus !== 'Processing') // Only include delivered orders
    .reduce((acc, order) => {
      const orderTotal = order.orderLines.reduce((lineAcc, item) => {
        return lineAcc + calculateDiscontedPrice(item.product) * item.quantity; // Calculate total for each order line
      }, 0);

      return acc + orderTotal;
    }, 0)
});


</script>

<style scoped>
/* Add your styles here */
</style>
