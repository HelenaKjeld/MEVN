<template>
    <transition name="fade-slide">
      <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-end" > <!-- Overlay + toggleCart -->
        <div class="cart-content bg-[#181818] w-96 h-full p-4 overflow-y-auto" > <!-- Cart content & .stop -->
          <!-- top close X -->
          <button class="absolute top-3 right-4 text-4xl text-red-400 hover:text-red-700">&times;</button> <!-- Close button -->

          <h2 class="text-2xl font-bold mb-4">Cart</h2>
          <div class="mb-4"> <!-- Loop through the cart items -->

            <div class="flex pb-2">
              <img  alt="Product Image" class="h-24 w-28 object-cover rounded-lg"> <!-- Product image -->
              <div class="flex ml-2 flex-col justify-between">
                <div>
                  <p class="font-semibold">  </p> <!-- Product name -->
                  <p>Price:  </p> <!-- Product price -->
                  <p>Total:  </p> <!-- Total price of the product -->
                </div>
                <div class="flex items-center">
                  <button  class="bg-orange-600 px-2">-</button>  <!-- Decrease quantity -->
                  <span  ></span>
                  <button  class="bg-teal-600 px-2">+</button>   <!-- Increase quantity -->
                </div>

              </div>

            </div>
          </div>

          <p class="text-center">Cart is empty</p> <!-- If cart is empty -->

          <div class="pt-4 border-t ">
            <p class="text-right font-semibold">Subtotal: $ </p> <!-- Total in the cart -->
            <p class="text-right font-semibold">Sales tax: $ </p> <!-- Salestax in the cart -->
            <p class="font-semibold">Coupon Code:</p>
            <input type="text" class="border p-1 pr-2 bg-[#181818] text-right w-28" placeholder="Enter code"> <!-- Coupon code -->
            <p class="text-right font-semibold">Grand Total: $ </p> <!-- Grand total in the cart -->
            <div class="flex justify-end">
              <button class="bg-green-600 text-white p-2 mt-4 rounded hover:bg-green-700">Checkout</button> <!-- Checkout button on click -->
            </div>
          </div>
        </div>
      </div>
    </transition>
</template>

<script setup lang="ts">



</script>

<style scoped>
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
}

.cart-content {
  transition: transform 0.3s ease-in-out;
}

.fade-slide-enter-from .cart-content, .fade-slide-leave-to .cart-content {
  transform: translateX(100%);
}
</style>
