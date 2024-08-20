import express from 'express';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';


const PORT = 8080
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PRODUCTS ROUTE
app.use('/api/products', productsRouter);

// CART ROUTE
app.use('/api/carts', cartsRouter);

app.listen(PORT, ()=>{
    console.log(`Server listen on port ${PORT}`);
})