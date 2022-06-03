require('dotenv').config()

// loads db
const mongoose = require("../dbConnector.js")

const SubscriptionType = require("../models/SubscriptionType")

let subscriptionTypeArray = []

subscriptionTypeArray.push({
    name: "Common Grey",
    plan: 1,
    description: "You choose two boardgames, we choose an extra one for you",
    price: 6000,
    noOfBoardgames: 2,
    noOfMysteryBoardgames:1
})
subscriptionTypeArray.push({
    name: "Uncommon Green",
    plan: 2,
    description: "You choose three boardgames, we choose an extra one for you",
    price: 8500,
    noOfBoardgames: 3,
    noOfMysteryBoardgames:1
})
subscriptionTypeArray.push({
    name: "Rare Blue",
    plan: 3,
    description: "You choose three boardgames, we choose an extra two for you",
    price: 9500,
    noOfBoardgames: 3,
    noOfMysteryBoardgames:2
})
subscriptionTypeArray.push({
    name: "Epic Purple",
    plan: 4,
    description: "You choose four boardgames, we choose an extra two for you",
    price: 12000,
    noOfBoardgames: 4,
    noOfMysteryBoardgames:2
})

async function saveSubscriptionTypes(){
    for(let subscriptionType of subscriptionTypeArray){
        let newSubscriptionType = new SubscriptionType(subscriptionType)
        await newSubscriptionType.save()
        console.log("seeded subscription type")
    }
}

async function runSeed(){
    try {
        await saveSubscriptionTypes()
    } catch(error){
        console.log(error)
    } finally {
        mongoose.disconnect()
    }
} 

runSeed()