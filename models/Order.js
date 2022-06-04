const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    customerStripeId:{
        type: String,
        required: true,
    },
    orderStatus:{
        type: String,
        required: true,
        enum: ["Pending", "Accepted", "Ready for delivery", "In delivery", "Delivered", "Ready to return", "Returned"],
        default: "Pending"
    },
    currency: {
        type: String,
        required: true,
        enum: ["DKK"],
        default: "DKK"
    },
    shippingAddress:{
        country: {
            type: String,
            required: true,
        },
        state: {
            type: String,
        },
        city: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
        },
    },
    orderItems:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "BoardgameItem",
        required:  true,
    }],
    subscriptionId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Subscription",
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: ()=> Date.now(),
    },
    updatedAt: {
        type: Date,
        default: ()=> Date.now(),
    }
})

orderSchema.pre('save', function(next) {
    this.updatedAt = Date.now()
    next()
})

module.exports = mongoose.model("Order", orderSchema)