const mongoose = require("mongoose")

const boardgameItemSchema = new mongoose.Schema({
    boardgameId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Boardgame",
        required: true,
    },
    condition: {
        type: String,
        required: true,
        enum: ["New", "Good", "Moderate", "Bad"],
        default: "New",
    },
    language: {
        type: String,
        required: true,
        default: "English"
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: true,
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

boardgameItemSchema.pre('save', function(next) {
    this.updatedAt = Date.now()
    next()
})

module.exports = mongoose.model("BoardgameItem", boardgameItemSchema)
