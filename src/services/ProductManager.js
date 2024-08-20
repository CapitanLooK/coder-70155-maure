import fs from 'fs/promises';
import path from 'path';

const productsFilePath = path.resolve('data', 'productos.json');

export default class ProductManager {
    constructor(){
        this.products = [];
        this.init();
    }

    async init(){

        try{
            await fs.mkdir(path.dirname(productsFilePath), { recursive: true });
        } catch(error){
           console.log('Error al crear el directorio', error);
        }
        try{
            const data = await fs.readFile(productsFilePath, 'utf-8');
            this.products = JSON.parse(data);
        }
        catch (error){
            this.products = [];
        }
    }

    saveToFile(){
        try{
            
            fs.writeFile(productsFilePath, JSON.stringify(this.products, null, 2))
        } catch (error){
            console.log('Error al guardar el producto', error);
        }
    }

    getAllProducts(limit){
        if(limit){
            return this.products.slice(0, limit);
        }
        return this.products;
    }

    getProductById(id){
        return this.products.find(product => product.id === id)
    }

    addProduct(product){

        if (!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category || !product.thumbnails){
            throw new Error('Todos los campos excepto el de imagenes son obligatorios');
        }
        const findCode = this.products.find(prod => prod.code === product.code);
        if (findCode) throw new Error(`El codigo de producto ${product.code} correspondiente al producto ${product.title} ya existe, vuelva a cargar el producto con otro codigo`);
        const newProduct = {
            id: this.products.length ? this.products[this.products.length - 1].id + 1 : 1,
            ...product,
            status: true
        }
        this.products.push(newProduct);
        this.saveToFile();
        return newProduct;
    }

    updateProduct(id, updatedAttributes){
        const productIndex = this.products.findIndex(product => product.id === id)
        if (productIndex === -1){
            return null;
        }
        const updateProduct = {
            ...this.products[productIndex],
            ...updatedAttributes,
            id: this.products[productIndex].id,
        }

        this.products[productIndex] = updateProduct;
        this.saveToFile();
        return updateProduct;
    }

    deleteProduct(id){
        const productIndex = this.products.findIndex(product => product.id === id)
        if (productIndex === -1){
            return null;
        }

        const deletedProduct = this.products.splice(productIndex, 1)
        this.saveToFile();
        return deletedProduct[0];
    }
}