import { ref, watch } from "vue";

import type { CartItem, OrderItems } from "../../intetfaces/interfaces";
// import { watch } from "fs";

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
    
    const orders = ref<OrderItems[]>(JSON.parse(localStorage.getItem('orders') || '[]'));

    watch(orders, (newOrders) => {
        localStorage.setItem('orders', JSON.stringify(newOrders));
    }, { deep: true });

    const checkOutBuy = () => {
        const newOrder: OrderItems = {
            _id: `order${orders.value.length + 1}`,
            orderDate: new Date().toISOString(),
            total: cartTotal(),
            orderStatus: 'Processing',
            orderNumber: orders.value.length + 1,
            userName: 'John Doe',
            orderLines: cart.value.map(item => ({
                product: {
                    _id: item._id,
                    name: item.name,
                    description: '',
                    price: item.price,
                    imageURL: item.imageURL,
                    stock: 0,
                    discount: false,
                    discountPct: 0,
                    isHidden: false,
                    _createdBy: ''
                },
                quantity: item.quantity
            }
            ))
        }
        orders.value.push(newOrder);
        cart.value = [];
        localStorage.setItem('cart', JSON.stringify(cart.value));
        console.log('Order placed:', orders.value);
        localStorage.setItem('orders', JSON.stringify(orders.value));
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
        cartTotalIndividualProduct,
        orders,
        checkOutBuy
    }
}
