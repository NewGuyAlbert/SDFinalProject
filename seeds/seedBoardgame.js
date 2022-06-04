require('dotenv').config()

// loads db
const mongoose = require("../dbConnector.js")

const Boardgame = require("../models/Boardgame")

let boardgameArray = []

//Boardgames
boardgameArray.push({
    name: "Exploding Kittens",
    info: {
        genre: ["Card Game", "Humor", "Party Game"],
        description: `Exploding Kittens is a highly strategic, kitty-powered version of Russian Roulette. Basically, if you draw an Exploding Kitten, you lose and you are full of loser sad-sauce. All the other cards in the deck help you avoid or mitigate your risk of drawing an Exploding Kitten. If you don't explode, YOU WIN!`,
        noOfPlayersMin: 2,
        noOfPlayersMax: 4,
        durationMin: 1,
        durationMax: 20,
        ageLimit: 7,
        language: "English"
    },
    image: ["./images/boardgame-images/exploding_kittens.jpg"],
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
        genre: ["Card Game", "Bluffing", "Party Game"],
        description: `Coup is a bluffing and deduction game`,
        noOfPlayersMin: 2,
        noOfPlayersMax: 6,
        durationMin: 10,
        durationMax: 20,
        ageLimit: 7,
        language: "English"
    },
    image: ["./images/boardgame-images/coup.jpg"],
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
        genre: ["Card Game", "Bluffing", "Party Game", "Deduction"],
        description: `Mafia type game`,
        noOfPlayersMin: 5,
        noOfPlayersMax: 9,
        durationMin: 20,
        durationMax: 600,
        ageLimit: 7,
        language: "English"
    },
    image: ["./images/boardgame-images/secret_hitler.jpg"],
    dimension: {
        heigth:4,
        width:6,
        length:12,
    },
    price: 20000

})
boardgameArray.push({
    name: "Wingspan",
    info: {
        genre: ["Family", "Strategy", "Card Game"],
        description: `Attract a beautiful and diverse collection of birds to your wildlife reserve.`,
        noOfPlayersMin: 1,
        noOfPlayersMax: 5,
        durationMin: 40,
        durationMax: 70,
        ageLimit: 10,
        language: "English"
    },
    image: ["./images/boardgame-images/wingspan.jpg"],
    dimension: {
        heigth:1,
        width:1,
        length:1,
    },
    price: 30000

})
boardgameArray.push({
    name: "Codenames",
    info: {
        genre: ["Party Game", "Card Game", "Deduction", "Word Game"],
        description: `Give your team clever one-word clues to help them spot their agents in the field.`,
        noOfPlayersMin: 2,
        noOfPlayersMax: 8,
        durationMin: 15,
        durationMax: 30,
        ageLimit: 14,
        language: "English"
    },
    image: ["./images/boardgame-images/codenames.jpg"],
    dimension: {
        heigth:1,
        width:1,
        length:1,
    },
    price: 11000

})
boardgameArray.push({
    name: "Rush Hour",
    info: {
        genre: ["Puzzle", "Maze"],
        description: `Two players face off in Rush Hour Shift, with each trying to be the first to get their car to opponent's side of the playing area.`,
        noOfPlayersMin: 2,
        noOfPlayersMax: 2,
        durationMin: 5,
        durationMax: 15,
        ageLimit: 8,
        language: "English"
    },
    image: ["./images/boardgame-images/rush_hour.jpg"],
    dimension: {
        heigth:1,
        width:1,
        length:1,
    },
    price: 12000

})
boardgameArray.push({
    name: "Splendor",
    info: {
        genre: ["Family", "Card Game", "Economic"],
        description: `Renaissance merchants race to grab gems, acquire property, and please nobility.`,
        noOfPlayersMin: 2,
        noOfPlayersMax: 4,
        durationMin: 20,
        durationMax: 30,
        ageLimit: 10,
        language: "English"
    },
    image: ["./images/boardgame-images/splendor.jpg"],
    dimension: {
        heigth:1,
        width:1,
        length:1,
    },
    price: 18000

})
boardgameArray.push({
    name: "Carcassonne",
    info: {
        genre: ["Family", "City Building", "Medieval"],
        description: `Shape the medieval landscape of France, claiming cities, monasteries and farms.`,
        noOfPlayersMin: 2,
        noOfPlayersMax: 5,
        durationMin: 30,
        durationMax: 45,
        ageLimit: 7,
        language: "English"
    },
    image: ["./images/boardgame-images/carcassonne.jpg"],
    dimension: {
        heigth:1,
        width:1,
        length:1,
    },
    price: 16000

})
boardgameArray.push({
    name: "Dune",
    info: {
        genre: ["Strategy", "Bluffing", "Political", "Negotiation"],
        description: `Wildly different factions vie for control of Arrakis through alliance and treachery.`,
        noOfPlayersMin: 2,
        noOfPlayersMax: 6,
        durationMin: 120,
        durationMax: 180,
        ageLimit: 14,
        language: "English"
    },
    image: ["./images/boardgame-images/dune.jpg"],
    dimension: {
        heigth:1,
        width:1,
        length:1,
    },
    price: 35000

})
boardgameArray.push({
    name: "Modern Art",
    info: {
        genre: ["Strategy", "Card Game", "Economic"],
        description: `Four types of auctions challenge players in this classic game of art speculation.`,
        noOfPlayersMin: 3,
        noOfPlayersMax: 5,
        durationMin: 45,
        durationMax: 50,
        ageLimit: 10,
        language: "English"
    },
    image: ["./images/boardgame-images/modern_art.jpg"],
    dimension: {
        heigth:1,
        width:1,
        length:1,
    },
    price: 25000

})
boardgameArray.push({
    name: "Power Grid",
    info: {
        genre: ["Strategy", "Economic", "Industry/Manufacturing"],
        description: `Bid, network, and manage resources in a race to supply the most cities with power.`,
        noOfPlayersMin: 2,
        noOfPlayersMax: 6,
        durationMin: 90,
        durationMax: 120,
        ageLimit: 12,
        language: "English"
    },
    image: ["./images/boardgame-images/power_grid.jpg"],
    dimension: {
        heigth:1,
        width:1,
        length:1,
    },
    price: 25000

})
boardgameArray.push({
    name: "Dixit",
    info: {
        genre: ["Party Game", "Card Game", "Humor"],
        description: `Give the perfect clue so most (not all) players guess the right surreal image card.`,
        noOfPlayersMin: 3,
        noOfPlayersMax: 6,
        durationMin: 20,
        durationMax: 30,
        ageLimit: 8,
        language: "English"
    },
    image: ["./images/boardgame-images/dixit.jpg"],
    dimension: {
        heigth:1,
        width:1,
        length:1,
    },
    price: 20000

})
boardgameArray.push({
    name: "Chess",
    info: {
        genre: ["Strategy", "Abstract Strategy"],
        description: `Orchestrate your powerful royalty, clergy and military to trap your opponent's king.`,
        noOfPlayersMin: 2,
        noOfPlayersMax: 2,
        durationMin: 10,
        durationMax: 60,
        ageLimit: 6,
        language: "English"
    },
    image: ["./images/boardgame-images/chess.jpg"],
    dimension: {
        heigth:1,
        width:1,
        length:1,
    },
    price: 50000

})
boardgameArray.push({
    name: "Catan",
    info: {
        genre: ["Family", "Strategy", "Economic", "Negotiation"],
        description: `Collect and trade resources to build up the island of Catan in this modern classic. `,
        noOfPlayersMin: 3,
        noOfPlayersMax: 4,
        durationMin: 60,
        durationMax: 120,
        ageLimit: 10,
        language: "English"
    },
    image: ["./images/boardgame-images/catan.jpg"],
    dimension: {
        heigth:1,
        width:1,
        length:1,
    },
    price: 20000

})
boardgameArray.push({
    name: "Sushi Go",
    info: {
        genre: ["Family", "Card Game",],
        description: `Pass the sushi around, but keep the best for yourself. Save room for dessert!`,
        noOfPlayersMin: 2,
        noOfPlayersMax: 5,
        durationMin: 15,
        durationMax: 30,
        ageLimit: 8,
        language: "English"
    },
    image: ["./images/boardgame-images/sushi_go.jpg"],
    dimension: {
        heigth:1,
        width:1,
        length:1,
    },
    price: 9000

})
boardgameArray.push({
    name: "Monopoly",
    info: {
        genre: ["Family", "Economic", "Negotiation"],
        description: `In this competitive real estate market, there's only one possible outcome: Monopoly!`,
        noOfPlayersMin: 2,
        noOfPlayersMax: 8,
        durationMin: 60,
        durationMax: 180,
        ageLimit: 8,
        language: "English"
    },
    image: ["./images/boardgame-images/monopoly.jpg"],
    dimension: {
        heigth:1,
        width:1,
        length:1,
    },
    price: 22000

})
boardgameArray.push({
    name: "Copenhagen",
    info: {
        genre: ["Family", "Puzzle"],
        description: `Polyomino your way to the grandest facades in the Danish capital. `,
        noOfPlayersMin: 2,
        noOfPlayersMax: 4,
        durationMin: 20,
        durationMax: 40,
        ageLimit: 8,
        language: "English"
    },
    image: ["./images/boardgame-images/copenhagen.jpg"],
    dimension: {
        heigth:1,
        width:1,
        length:1,
    },
    price: 25000

})
boardgameArray.push({
    name: "Dobble",
    info: {
        genre: ["Party Game", "Card Game", "Real-time", "Children's Game"],
        description: `Quick! Which symbol is on both cards? Race others to gather or dump your cards.`,
        noOfPlayersMin: 2,
        noOfPlayersMax: 8,
        durationMin: 10,
        durationMax: 15,
        ageLimit: 7,
        language: "English"
    },
    image: ["./images/boardgame-images/dobble.jpg"],
    dimension: {
        heigth:1,
        width:1,
        length:1,
    },
    price: 10000

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
