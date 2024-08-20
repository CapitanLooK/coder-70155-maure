import { Router } from 'express';
import ProductManager from '../services/ProductManager.js';

const router = Router();
const productManager = new ProductManager();

router.get('/', async(req, res)=>{
    try {
        const limit = req.query.limit ? parseInt(req.query.limit): undefined;
        const products = await productManager.getAllProducts(limit);
        res.json(products);
    } catch (error){
        res.status(500).json({error: error.message});
    }
})

router.get('/:pid', async (req, res)=>{
    try {
        const productId = parseInt(req.params.pid);
        const product = await productManager.getProductById(productId);
        if (!product){
            res.status(404).json({error: 'Producto no encontrado'});
            return;
        }
        res.json(product);
    } catch (error){
        res.status(500).json({error: error.message});
    }
})

router.post('/', async(req, res)=>{
    try {
        const { title, description, code, price, stock, category, thumbnails } = req.body;
        if (!title || !description || !code || !price || !stock || !category){
            res.status(400).json({error: 'Faltan datos'});
            return;
        }
        const productData = { title, description, code, price, stock, category, thumbnails }
        const newProduct = await productManager.addProduct(productData);
        res.status(201).json(newProduct);
    } catch (error){
        res.status(500).json({error: error.message});
    }
})

router.put('/:pid', async(req, res)=>{
    try {
        const productId = parseInt(req.params.pid);
        const updatedAttributes = req.body;
        const updateProduct = await productManager.updateProduct(productId, updatedAttributes);

        updateProduct ? res.status(200).json(updateProduct) : res.status(404).json({error: 'Producto no encontrado'});

    } catch (error){
        res.status(500).json({error: error.message});
    }
})

router.delete('/:pid', async(req, res)=>{
    try {
        const productId = parseInt(req.params.pid);
        const deleteProduct = await productManager.deleteProduct(productId);

        deleteProduct ? res.status(200).json(deleteProduct) : res.status(404).json({error: 'Producto no encontrado'});

    } catch (error){
        res.status(500).json({error: error.message});
    }
})




export default router;