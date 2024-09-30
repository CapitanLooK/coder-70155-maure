import { Router } from 'express';
import CartManager from '../services/CartManager.js';
import { io } from '../app.js';

const router = Router();
const cartManager = new CartManager();

router.post('/', async (req, res) => {
    try {
        const newCart = cartManager.createCart();
        io.emit('Carrito Creado', newCart);
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const carts = cartManager.getAllCarts();
        res.json(carts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const cart = cartManager.getCartById(cartId);
        if (!cart) {
            res.status(404).json({ error: 'Carrito no encontrado' });
            return;
        }
        res.json(cart.productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const updatedCart = cartManager.addProductToCart(cartId, productId);
        if (!updatedCart) {
            res.status(404).json({ error: 'Carrito no encontrado' });
            return;
        }
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;