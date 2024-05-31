import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
   
    username: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    items: [{
        name: {
            type: String,
            required: true
        },
        count: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    totalBillAmount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    Status: {
        type: String,
        default: "Pending"
    }
});

const OrderModel = mongoose.model('Orders', orderSchema);

export default OrderModel;

