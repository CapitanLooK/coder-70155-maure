import { Router } from 'express';
import { io } from '../app.js';

const router = Router();
let products = [];
// ADD PRODUCT
router.post('/addProduct', (req, res) => {
    const product = req.body;
    products.push(product);
    io.emit('productAdded', product);
    res.redirect('/realtimeproducts');
});

// DELETE PRODUCT
router.post('/deleteProduct', (req, res) => {
    const { name } = req.body;
    products = products.filter(product => product.name !== name);
    io.emit('productDeleted', name);
    res.redirect('/realtimeproducts');
});

export default router;