import mongoose from "mongoose";
import { Product } from './product.model.js';
import { User } from "./user.model.js";

const orderSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            enum: ["processing", "shipped", "delivered"],
        },
        total: {
            type: Number,
            min: 0,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export const Order = mongoose.model('Order', orderSchema);