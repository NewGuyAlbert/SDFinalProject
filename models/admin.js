const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
    },
    emails: [{
        email: {
            type: String,
            required: true,
        },
        addedAt: {
            type: Date,
            immutable: true,
            default: ()=> Date.now(),
        }
    }],
})

module.exports = mongoose.model("Admin", adminSchema)