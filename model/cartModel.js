import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
    {
        cartItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: { type: Number, required: true },
            },
        ],
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    },
    {
        timestamps: true
    }
)

cartSchema.pre('findOne', function () {
    this
        .populate("user")
        .populate("cartItems.product")
})

cartSchema.pre('find', function () {
    this
        .populate("user")
        .populate("cartItems.product")
})

const Cart = mongoose.model('Cart', cartSchema)
export default Cart;