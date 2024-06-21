import mongoose from 'mongoose';

const { Schema } = mongoose;

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, 
        required: true,
        ref: 'User'
    },
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId, 
                required: true,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const cartModel = mongoose.model('Cart', cartSchema);