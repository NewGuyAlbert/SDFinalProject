const mongoose = require("mongoose")

const subscriptionTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    plan: {
        type: Number,
        required: true,
        unique: true,
        min: 0,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["Monthly", "Yearly"],
        default: "Monthly"
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    noOfBoardgames: {
        type: Number,
        min: 0,
        required: true,
    },
    noOfMysteryBoardgames:{
        type: Number,
        min: 0,
        required: true,
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

subscriptionTypeSchema.pre('save', function(next) {
    this.updatedAt = Date.now()
    next()
})

module.exports = mongoose.model("SubscriptionType", subscriptionTypeSchema)