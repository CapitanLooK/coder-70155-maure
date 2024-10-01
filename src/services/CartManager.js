import Cart from '../models/Cart.js';
class CartManager {
    async createCart() {
        const newCart = new Cart({
            products: []
        });
        await newCart.save();
        return newCart;
    }

    async removeProductFromCart(cartId, productId) {
        const cart = await Cart.findById(cartId);
        if (!cart) throw new Error('Carrito no encontrado');

        cart.products = cart.products.filter(product => product.productId.toString() !== productId);
        await cart.save();
        return cart;
    }

    async updateCart(cartId, products) {
        const cart = await Cart.findById(cartId);
        if (!cart) throw new Error('Carrito no encontrado');

        cart.products = products;
        await cart.save();
        return cart;
    }

    async updateProductQuantity(cartId, productId, quantity) {
        const cart = await Cart.findById(cartId);
        if (!cart) throw new Error('Carrito no encontrado');

        const product = cart.products.find(product => product.productId.toString() === productId);
        if (!product) throw new Error('Producto no encontrado en el carrito');

        product.quantity = quantity;
        await cart.save();
        return cart;
    }

    async clearCart(cartId) {
        const cart = await Cart.findById(cartId);
        if (!cart) throw new Error('Carrito no encontrado');

        cart.products = [];
        await cart.save();
        return cart;
    }

    async getCartById(cartId) {
        const cart = await Cart.findById(cartId).populate('products.productId');
        return cart;
    }

    async getAllCarts() {
        const carts = await Cart.find();
        return carts;
    }
}

export default CartManager;