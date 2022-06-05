let i = 0

function getBoardgames() {

    $.ajax({
        method: "GET",
        url: "/get-boardgames",
    }).done( function(response){
        $("#boardgame-table-body").empty()
        let items = response.boardgameItems
        items.forEach((item, index) => {
            i = index + 1
            $("#boardgame-table-body").append(`
            <tr>
                <th scope="row">${i}</th>
                <th>${item._id}</th>
                <td>${item.boardgameId.name}</td>
                <td>${item.isAvailable === true ? "Available" : "Not available"}</td>
                <td><button class="admin-edit-modal-btn" data-toggle="modal" data-target="#admin-bgmodal"><i class="fa-solid fa-pen-to-square"></i></button></td>
                <td><i class="fa-solid fa-trash"></i></td>
            </tr>
            `)
        })
    }).fail( function(){
        console.log("error")
    })
    
}

function addBoardgame() {
    let bgTitle = $("#bg-title-input").val()
    let bgCondition = $("#bg-condition-input").val()

    let newBoardgameItem = {
        name: bgTitle,
        condition: bgCondition
    }

    $.ajax({
        method: "POST",
        url: "/add-boardgame-item",
        data: newBoardgameItem
    }).done( function(response){
        console.log(response)
        $("#admin-bgmodal").modal('hide')
        $("#boardgame-table-body").append(`
            <tr>
                <th scope="row">${i}</th>
                <th>${response.newItem.boardgameId}</th>
                <td>${bgTitle}</td>
                <td>${response.newItem.isAvailable === true ? "Available" : "Not available"}</td>
                <td><button class="admin-edit-modal-btn" data-toggle="modal" data-target="#admin-bgmodal"><i class="fa-solid fa-pen-to-square"></i></button></td>
                <td><i class="fa-solid fa-trash"></i></td>
            </tr>
            `)
    }).fail( function(){
        console.log("error")
    })


}

function editBoardgame() {

}

getBoardgames()
