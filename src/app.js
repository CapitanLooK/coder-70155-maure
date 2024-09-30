import express from 'express';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';

const PORT = 8080;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static('public'));

let products = [];

export { io };

// PRODUCTS ROUTE
app.use('/api/products', productsRouter);

// CART ROUTE
app.use('/api/carts', cartsRouter);

// HOME VIEW
app.get('/', (req, res) => {
    res.render('home', { products });
});

// REAL-TIME PRODUCTS VIEW
app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { products });
});


io.on('connection', (socket) => {
    console.log('a user connected');
});

httpServer.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
});