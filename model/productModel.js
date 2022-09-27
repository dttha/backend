import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        slug: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        discount: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        author: { type: String, required: true },
        publisher: { type: String, required: true },
        weight: { type: Number, required: true },
        numberOfPages: { type: Number, required: true },
        size: { type: String, required: true },
        yearPublish: { type: Number, required: true },
        rating: { type: Number, required: true },
        numReviews: { type: Number, required: true },
        description: { type: String, required: true }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema)
export default Product;