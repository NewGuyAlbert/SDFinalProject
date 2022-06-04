$(function () {
    // the following .replace() cuts everything that is not a number from a string
    let totalGames = $("#total-games").text().replace(/\D/g, "")
    let currentGames = 0
})

function displayInfoModal(id, name) {
    $("#bg-info-modal-title").html(name)
    $("#modal-description > span").html($(`#${id}-description`).html())
    $("#modal-genre > span").html($(`#${id}-genre`).html())
    $("#modal-noOfPlayers > span").html($(`#${id}-noOfPlayers`).html())
    $("#modal-duration > span").html($(`#${id}-duration`).html())
    $("#modal-ageLimit > span").html($(`#${id}-ageLimit`).html())
    $("#modal-language > span").html($(`#${id}-language`).html())
    $("#bg-info-modal").modal("show")

}

function addToSelection(id, name) {

    $.ajax({
        method: "POST",
        url: "/add-to-selection",
        data: { id: id, name: name }
    }).done( function(response){
        console.log("Added to selection")
        $("#selection-items").append(`<div class="a-cart-item"><p>${name}</p> <a class="remove-btn btn-secondary" type="button" onclick="removeFromSelection('${id}','${name}')">remove</a></div>`)


    }).fail( function(error){
        console.log(error.responseText)
    })
}

function removeFromSelection(id, name) {

    $.ajax({
        method: "POST",
        url: "/remove-from-selection",
        data: { id: id, name: name }
    }).done( function(response){
        $("#selection-items").empty()
        response.forEach(boardgame => {
            $("#selection-items").append(`<div class="a-cart-item"><p>${boardgame.name}</p> <a class="remove-btn btn-secondary" type="button" onclick="removeFromSelection('${boardgame.id}','${boardgame.name}')">remove</a></div>`)
        })

    }).fail( function(){
        console.log("error")
    })
}

function getSelection(){

    $.ajax({
        method: "GET",
        url: "/get-selection",
    }).done( function(response){
        $("#selection-items").empty()
        response.forEach(boardgame => {
            $("#selection-items").append(`<div class="a-cart-item"><p>${boardgame.name}</p> <a class="remove-btn btn-secondary" type="button" onclick="removeFromSelection('${boardgame.id}','${boardgame.name}')">remove</a></div>`)
        })
        

    }).fail( function(){
        console.log("error")
    })
}

getSelection()