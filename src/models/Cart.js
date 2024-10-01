import pkg from 'mongoose';

const { Schema, model, models } = pkg;

const cartSchema = new Schema({
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ]
});

export default models.Cart || model('Cart', cartSchema);