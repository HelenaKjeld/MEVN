import { ref } from "vue";

import type { CartItem } from "../../intetfaces/interfaces";

export const useCart = () => {

    const cart = ref<CartItem[]>(JSON.parse(localStorage.getItem('cart') || '[]'));

    const addToCart = (product: Omit<CartItem, 'quantity'>) => {
        const existingItem = cart.value.find(item => item._id === product._id);

        if (existingItem) {
            existingItem.quantity += 1;
            console.log('Updated existing item in cart:', existingItem);
        } else {
            cart.value.push({ ...product, quantity: 1 })
            console.log('Product new added to cart:', cart.value);
        }

        localStorage.setItem('cart', JSON.stringify(cart.value));
        console.log('Added to cart:', cart.value);
    }

    const removeFromCart = (productId: string) => {
        const existingItem = cart.value.find(item => item._id === productId);
        if (existingItem) {
            cart.value = cart.value.filter(item => item._id !== productId);
            localStorage.setItem('cart', JSON.stringify(cart.value));
        }
    }

    const updateQuantity = (productId: string, quantity: number) => {
        const item = cart.value.find(item => item._id === productId);
        localStorage.setItem('cart', JSON.stringify(cart.value));
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
               removeFromCart(productId);
            }
            else {
                localStorage.setItem('cart', JSON.stringify(cart.value));
            }
        }
        console.log(`Updated quantity in cart: ${productId}, qty ${quantity}`);
    }

    const cartTotal = (): number => {
        return Number(cart.value.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2));
    }

    const cartTotalIndividualProduct = (productId: string) => {
        const item = cart.value.find(item => item._id === productId);
        return item ? item.price * item.quantity : 0;

    }

    const salesTax = (): number => {
        const taxRate = 0.25;
        return Math.round(cartTotal() * taxRate * 100) / 100;
    }

    const code = ref<string>('');

    const couponCodeDiscount = (code: string) => {
        const couponCodeAccepted = code === 'DISCOUNT';
        return couponCodeAccepted ? 0.9 : 0;
    }

    const grandTotal = (): number => {
        return Number(((cartTotal() + salesTax()) * (1 - couponCodeDiscount(code.value))).toFixed(2));
    }
    

    return {
        cart,
        addToCart,
        cartTotal,
        removeFromCart,
        updateQuantity,
        salesTax,
        code,
        grandTotal,
        cartTotalIndividualProduct

    }
}
