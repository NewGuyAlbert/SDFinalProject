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
            <tr id="tr-${item._id}">
                <th scope="row">${i}</th>
                <th>${item._id}</th>
                <td>${item.boardgameId.name}</td>
                <td>${item.condition}</td>
                <td>${item.isAvailable === true ? "Available" : "Not available"}</td>
                <td><button class="admin-edit-modal-btn" data-id="${item._id}"><i class="fa-solid fa-pen-to-square" data-id="${item._id}"></i></button></td>
                <td class="delete-bgitem"><button class="fa-solid fa-trash" onclick="deleteBoardgame('${item._id}')"></button></td>
            </tr>
            `)
        })

        $("#boardgame-table-body > tr > td > .admin-edit-modal-btn").on('click', (e) => {
            e.preventDefault()
            let id = $(e.target).data('id')
            $(".edit-save-id").html(id)
            $("#admin-bgmodal-edit").modal('show')
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
        $("#admin-bgmodal").modal('hide')
        $("#boardgame-table-body").append(`
            <tr id="tr-${response.newItem._id}">
                <th scope="row">${i}</th>
                <th>${response.newItem.boardgameId}</th>
                <td>${bgTitle}</td>
                <td>${bgCondition}</td>
                <td>${response.newItem.isAvailable === true ? "Available" : "Not available"}</td>
                <td><button class="admin-edit-modal-btn" data-id="${response.newItem._id}" ><i class="fa-solid fa-pen-to-square" data-id="${response.newItem._id}"></i></button></td>
                <td class="delete-bgitem"><button class="fa-solid fa-trash" onclick="deleteBoardgame('${response.newItem._id}')"></button></td>
            </tr>
            `)
    }).fail( function(){
        console.log("error")
    })


}

function editBoardgame() {
    let bgCondition = $("#bg-condition-edit").val()
    let bgID = $(".edit-save-id").html()

    $.ajax({
        method: "PUT",
        url: "/edit-boardgame-item",
        data: { "id": bgID, "condition": bgCondition }
    }).done( function(response){
        alert(response)
        if (response == "Edit Success!") {
            $("#admin-bgmodal-edit").modal('hide')
            $(`#tr-${bgID} > td:nth-child(4)`).html(bgCondition)
        }
    }).fail( function(error){
        if (error.responseText) {
            alert(error.responseText)
        }
        console.log("error: ", error)
    })

}

function deleteBoardgame(id) {
    $.ajax({
        method: "DELETE",
        url: "/delete-boardgame-item",
        data: { "id" : id }
    }).done( function(response){
        if (response == "Delete succeeded.") {
            $(`#tr-${id}`).remove()
        }
        alert(response)
    }).fail( function(error){
        console.log("error ", error)
    })
}


// JQuery
$(function() {
    getBoardgames()
    
    // $("#boardgame-table-body > tr > td > .admin-edit-modal-btn").on('click', (e) => {
    //     e.preventDefault()
    //     console.log("here")
    //     // console.log($(this))
    //     // let id = $(this).data('id')
    //     // console.log('id', id)
    // })
})
