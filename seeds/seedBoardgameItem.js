require('dotenv').config()

// loads db
const mongoose = require("../dbConnector.js")

const Boardgame = require("../models/Boardgame")
const BoardgameItem = require("../models/BoardgameItem")

let boardgameItemArray = []
let condition = ["New", "New", "New", "Good", "Good", "Moderate", "Moderate"]

for (let i = 0; i < condition.length; i ++) {
    bg_condition = condition[i]
    
    //Boardgame Items
    boardgameItemArray.push({
        name: "Exploding Kittens",
        condition: bg_condition,
        language: "English",
        isAvailable: true
    })

    boardgameItemArray.push({
        name: "Coup",
        condition: bg_condition,
        language: "English",
        isAvailable: true
    })

    boardgameItemArray.push({
        name: "Secret hitler",
        condition: bg_condition,
        language: "English",
        isAvailable: true
    })

    boardgameItemArray.push({
        name: "Wingspan",
        condition: bg_condition,
        language: "English",
        isAvailable: true
    })

    boardgameItemArray.push({
        name: "Codenames",
        condition: bg_condition,
        language: "English",
        isAvailable: true
    })

    boardgameItemArray.push({
        name: "Rush Hour",
        condition: bg_condition,
        language: "English",
        isAvailable: true
    })

    boardgameItemArray.push({
        name: "Splendor",
        condition: bg_condition,
        language: "English",
        isAvailable: true
    })

    boardgameItemArray.push({
        name: "Carcassonne",
        condition: bg_condition,
        language: "English",
        isAvailable: true
    })

    boardgameItemArray.push({
        name: "Dune",
        condition: bg_condition,
        language: "English",
        isAvailable: true
    })

    boardgameItemArray.push({
        name: "Modern Art",
        condition: bg_condition,
        language: "English",
        isAvailable: true
    })

    boardgameItemArray.push({
        name: "Power Grid",
        condition: bg_condition,
        language: "English",
        isAvailable: true
    })

    boardgameItemArray.push({
        name: "Dixit",
        condition: bg_condition,
        language: "English",
        isAvailable: true
    })

    boardgameItemArray.push({
        name: "Chess",
        condition: bg_condition,
        language: "English",
        isAvailable: true
    })

    boardgameItemArray.push({
        name: "Catan",
        condition: bg_condition,
        language: "English",
        isAvailable: true
    })

    boardgameItemArray.push({
        name: "Sushi Go",
        condition: bg_condition,
        language: "English",
        isAvailable: true
    })

    boardgameItemArray.push({
        name: "Monopoly",
        condition: bg_condition,
        language: "English",
        isAvailable: true
    })

    boardgameItemArray.push({
        name: "Copenhagen",
        condition: bg_condition,
        language: "English",
        isAvailable: true
    })

    boardgameItemArray.push({
        name: "Dobble",
        condition: bg_condition,
        language: "English",
        isAvailable: true
    })

}

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