import fs from 'fs/promises';
import path from 'path';

const cartsFilePath = path.resolve('data', 'carrito.json');

export default class CartManager {
    constructor() {
        this.carts = [];
        this.init();
    }

    async init() {
        try {
            await fs.mkdir(path.dirname(cartsFilePath), { recursive: true });
        } catch (error) {
            console.log('Error al crear el directorio', error);
        }
        try {
            const data = await fs.readFile(cartsFilePath, 'utf-8');
            this.carts = JSON.parse(data);
        } catch (error) {
            this.carts = [];
        }
    }

    async saveToFile() {
        try {
            await fs.writeFile(cartsFilePath, JSON.stringify(this.carts, null, 2));
        } catch (error) {
            console.log('Error al guardar el carrito', error);
        }
    }

    createCart() {
        const newCart = {
            id: this.carts.length ? this.carts[this.carts.length - 1].id + 1 : 1,
            productos: [],
        };
        this.carts.push(newCart);
        this.saveToFile();
        return newCart;
    }

    getAllCarts() {
        return this.carts;
    }

    getCartById(cartId) {
        return this.carts.find(cart => cart.id === cartId);
    }

    addProductToCart(cartId, productId) {
        const cart = this.getCartById(cartId);
        if (!cart) return null;

        const productIndex = cart.productos.findIndex(prod => prod.product === productId);
        if (productIndex !== -1) {
            cart.productos[productIndex].quantity++;
        } else {
            cart.productos.push({ product: productId, quantity: 1 });
        }
        this.saveToFile();
        return cart;
    }
}