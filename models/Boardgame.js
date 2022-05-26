const mongoose = require("mongoose")

const boardgameSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    info: {
        genre:[{
            type: String,
            enum: ["Strategy", "Adventure", "Bluffing", "Card Game", "Dice",
                "Exploration", "Fantasy", "Mafia", "Science Fiction", "Misc",
                "Trivia", "Humor", "Children's Game", "Expansion", "Medieval", "Puzzle"],
            required: true,
            default: "Misc",
        }],
        description:{
            type: String,
            required: true,
        },
        noOfPlayersMin:{
            type: Number,
            required: true,
            min: 1,
            max: 99,
        },
        noOfPlayersMax:{
            type: Number,
            required: true,
            min: 1,
            max: 99,
        },
        durationMin:{
            type: Number,
            min: 1,
        },
        durationMax:{
            type: Number,
            min: 1,
        },
        ageLimit:{
            type: Number,
            min: 1,
            max: 99,
        }
    },
    image: {
        type: Array,
        required: true
    },
    dimension:{
        heigth:{
            type: Number,
            min: 1,
        },
        width:{
            type: Number,
            min: 1,
        },
        length:{
            type: Number,
            min: 1,
        }
    },
    price: {
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

boardgameSchema.pre('save', function(next) {
    this.updatedAt = Date.now()
    next()
})

module.exports = mongoose.model("Boardgame", boardgameSchema)