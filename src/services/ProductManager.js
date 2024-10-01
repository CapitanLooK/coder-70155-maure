import Product from '../models/Product.js';
import { connectDB } from '../utils/mongoose.js';

class ProductManager {
    async addProduct(data) {
        const newProduct = new Product(data);
        await newProduct.save();
        return newProduct;
    }

    async getProductById(productId) {
        const product = await Product.findById(productId);
        return product;
    }

    async updateProduct(productId, data) {
        const updatedProduct = await Product.findByIdAndUpdate(productId, data, { new: true });
        return updatedProduct;
    }

    async deleteProduct(productId) {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        return deletedProduct;
    }

    async getAllProducts(filter, options) {
        const products = await Product.find(filter)
            .limit(options.limit)
            .skip(options.skip)
            .sort(options.sort);
        return products;
    }

    async countProducts(filter) {
        const count = await Product.countDocuments(filter);
        return count;
    }
}

export default ProductManager;