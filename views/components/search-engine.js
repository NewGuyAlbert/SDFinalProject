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

function addToCart(id, name) {

    $.ajax({
        method: "POST",
        url: "/add-to-cart",
        data: { id: id, name: name }
    }).done( function(response){
        console.log("Added to cart")
        $("#cart-items").append(`<div><p>${name}</p> <a type="button" onclick="removeFromCart('${id}','${name}')">remove</a></div>`)


    }).fail( function(error){
        console.log(error.responseText)
    })
}

function removeFromCart(id, name) {

    $.ajax({
        method: "POST",
        url: "/remove-from-cart",
        data: { id: id, name: name }
    }).done( function(response){
        $("#cart-items").empty()
        response.forEach(boardgame => {
            $("#cart-items").append(`<div><p>${boardgame.name}</p> <a type="button" onclick="removeFromCart('${boardgame.id}','${boardgame.name}')">remove</a></div>`)
        })

    }).fail( function(){
        console.log("error")
    })
}

function getCart(){

    $.ajax({
        method: "GET",
        url: "/get-cart",
    }).done( function(response){
        $("#cart-items").empty()
        response.forEach(boardgame => {
            $("#cart-items").append(`<div><p>${boardgame.name}</p> <a type="button" onclick="removeFromCart('${boardgame.id}','${boardgame.name}')">remove</a></div>`)
        })
        

    }).fail( function(){
        console.log("error")
    })
}

getCart()
