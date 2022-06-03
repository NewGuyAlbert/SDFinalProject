const mongoose = require("mongoose")

const subscriptionSchema = new mongoose.Schema({
    customerStripeId:{
        type: String,
        required: true,
    },
    isActive:{
        type: Boolean,
        required: true,
    },
    subscriptiontype:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "SubscriptionType",
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

subscriptionSchema.pre('save', function(next) {
    this.updatedAt = Date.now()
    next()
})

module.exports = mongoose.model("Subscription", subscriptionSchema)