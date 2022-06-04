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

let totalPrice = 0

function addToCart(id, name) {

    $.ajax({
        method: "POST",
        url: "/add-to-cart",
        data: { id: id, name: name }
    }).done( function(response){
        console.log("Added to cart")
        $("#cart-items").append(`<div class="a-cart-item"><p>${name}</p> <a class="remove-btn btn-secondary" type="button" onclick="removeFromCart('${id}','${name}')">remove</a></div>`)
        totalPrice += parseInt($(`#${id}-price > span`).html())
        $("#total-price").html(totalPrice)

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
        totalPrice = 0
        response.forEach(boardgame => {
            $("#cart-items").append(`<div class="a-cart-item"><p>${boardgame.name}</p> <a class="remove-btn btn-secondary" type="button" onclick="removeFromCart('${boardgame.id}','${boardgame.name}')">remove</a></div>`)
            totalPrice += parseInt($(`#${boardgame.id}-price > span`).html())
        })
        $("#total-price").html(totalPrice)
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
            $("#cart-items").append(`<div class="a-cart-item"><p>${boardgame.name}</p> <a class="remove-btn btn-secondary" type="button" onclick="removeFromCart('${boardgame.id}','${boardgame.name}')">remove</a></div>`)
            totalPrice += parseInt($(`#${boardgame.id}-price > span`).html())
        })
        $("#total-price").html(totalPrice)
        
        

    }).fail( function(){
        console.log("error")
    })
}

getCart()
