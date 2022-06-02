const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    customerStripeId:String,
    firstName: String,
    lastName: String,
    password: String,
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    address: {
        country: String,
        state: String,
        city: String,
        street: String,
        postalCode: String,
    },
    phone: String,
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

userSchema.pre('save', function(next) {
    this.updatedAt = Date.now()
    next()
})

module.exports = mongoose.model("User", userSchema)