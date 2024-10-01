import pkg from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema, model, models } = pkg;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String
    },
    stock: {
        type: Number,
        required: true
    },
    thumbnails: {
        type: Array
    },
    status: {
        type: Boolean
    },
    id: {
        type: String,
        unique: true
    }
});
productSchema.plugin(mongoosePaginate);

export default models.Product || model('Product', productSchema);