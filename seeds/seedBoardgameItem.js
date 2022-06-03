require('dotenv').config()

// loads db
const mongoose = require("../dbConnector.js")

const Boardgame = require("../models/Boardgame")
const BoardgameItem = require("../models/BoardgameItem")

let boardgameItemArray = []

//Boardgame Items
boardgameItemArray.push({
    name: "Exploding Kittens",
    condition: "Good",
    language: "English",
    isAvailable: true
})

boardgameItemArray.push({
    name: "Exploding Kittens",
    condition: "Good",
    language: "English",
    isAvailable: true
})

boardgameItemArray.push({
    name: "Coup",
    condition: "Moderate",
    language: "English",
    isAvailable: true
})

boardgameItemArray.push({
    name: "Coup",
    condition: "Moderate",
    language: "English",
    isAvailable: true
})
boardgameItemArray.push({
    name: "Secret hitler",
    condition: "Good",
    language: "English",
    isAvailable: true
})
boardgameItemArray.push({
    name: "Secret hitler",
    condition: "Moderate",
    language: "English",
    isAvailable: true
})

async function saveBoardgameItems(){
    for(let boardgameItem of boardgameItemArray){
        let data = await Boardgame.find({name: boardgameItem.name}).select("_id").limit(1)
        boardgameItem.boardgameId = data[0]._id
        boardgameItem.name = undefined
        let newBoardgameItem = new BoardgameItem(boardgameItem)
        await newBoardgameItem.save()
        console.log("seeded boardgameItem")
    }
}
async function runSeed(){
    try{
        await saveBoardgameItems()
    } catch(error){
        console.log(error)
    } finally {
        mongoose.disconnect()
    }
}

runSeed()