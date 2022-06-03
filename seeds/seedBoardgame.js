require('dotenv').config()

// loads db
const mongoose = require("../dbConnector.js")

const Boardgame = require("../models/Boardgame")

let boardgameArray = []

//Boardgames
boardgameArray.push({
    name: "Exploding Kittens",
    info: {
        genre: ["Card Game", "Humor"],
        description: `Exploding Kittens is a highly strategic, kitty-powered version of Russian Roulette. Basically, if you draw an Exploding Kitten, you lose and you are full of loser sad-sauce. All the other cards in the deck help you avoid or mitigate your risk of drawing an Exploding Kitten. If you don't explode, YOU WIN!`,
        noOfPlayersMin: 2,
        noOfPlayersMax: 4,
        durationMin: 1,
        durationMax: 20,
        ageLimit: 7,
        language: "English"
    },
    image: [],
    dimension: {
        heigth:4.41,
        width:6.38,
        length:1.5,
    },
    price: 20000

})
boardgameArray.push({
    name: "Coup",
    info: {
        genre: ["Card Game", "Bluffing"],
        description: `Coup is a bluffing and deduction game`,
        noOfPlayersMin: 2,
        noOfPlayersMax: 6,
        durationMin: 10,
        durationMax: 20,
        ageLimit: 7,
        language: "English"
    },
    image: [],
    dimension: {
        heigth:4.41,
        width:6.38,
        length:1.5,
    },
    price: 18000

})
boardgameArray.push({
    name: "Secret hitler",
    info: {
        genre: ["Card Game", "Bluffing"],
        description: `Mafia type game`,
        noOfPlayersMin: 5,
        noOfPlayersMax: 9,
        durationMin: 20,
        durationMax: 600,
        ageLimit: 7,
        language: "English"
    },
    image: [],
    dimension: {
        heigth:4,
        width:6,
        length:12,
    },
    price: 20000

})

async function saveBoardgames(){
    for(let boardgame of boardgameArray){
        let newBoardgame = new Boardgame(boardgame)
        await newBoardgame.save()
        console.log("seeded boardgame")
    }
}

async function runSeed(){
    try {
        await saveBoardgames()
    } catch(error){
        console.log(error)
    } finally {
        mongoose.disconnect()
    }
} 

runSeed()
