function getOrders() {

    $.ajax({
        method: "GET",
        url: "/get-orders",
    }).done( function(response){
        $("#order-table-body").empty()
        let items = response.orders
        items.forEach((item, index) => {
            let itemDetails = item.orderItemDetails
            let itemIDandName = ""
            for (let detail of itemDetails) {
                itemIDandName += detail[0]._id + " - "+ detail[0].boardgameId.name + ", "
            }
            
            $("#order-table-body").append(`
            <tr id="order-tr-${item.order._id}">
                <th scope="row">${item.order._id}</th>
                <td>${item.order.customerStripeId}</td>
                <td>${item.order.createdAt}</td>
                <td>${item.order.updatedAt}</td>
                <td><button class="btn-secondary admin-view-order-btn" data-id="${item.order._id}" data-item="${itemIDandName}"><i class="fa-solid fa-boxes-stacked" data-id="${item.order._id}" data-item="${itemIDandName}"></i></button></td>
                <td>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="${item.order._id}-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        ${item.order.orderStatus}
                        </button>
                        <div class="dropdown-menu" aria-labelledby="${item.order._id}-dropdown">
                        <button class="dropdown-item" type="button" data-id="${item.order._id}" data-status="Pending">Pending</button>
                        <button class="dropdown-item" type="button" data-id="${item.order._id}" data-status="Order Confirmed">Order Confirmed</button>
                        <button class="dropdown-item" type="button" data-id="${item.order._id}" data-status="Processing">Processing</button>
                        <button class="dropdown-item" type="button" data-id="${item.order._id}" data-status="Shipped">Shipped</button>
                        <button class="dropdown-item" type="button" data-id="${item.order._id}" data-status="On the way">On the way</button>
                        <button class="dropdown-item" type="button" data-id="${item.order._id}" data-status="Delivered">Delivered</button>
                        <button class="dropdown-item" type="button" data-id="${item.order._id}" data-status="Returning">Returning</button>
                        <button class="dropdown-item" type="button" data-id="${item.order._id}" data-status="Returned">Returned</button>
                        </div>
                    </div>
                </td>
            </tr>
            `)
        })

        // event listener for view order items 
        $("#order-table-body > tr > td > .admin-view-order-btn").on('click', (e) => {
            e.preventDefault()
            const id = $(e.target).data('id')
            const item = $(e.target).data('item')
            $(".viewod-modal-title").html(id)
            $("#admin-viewod-bgitems").html(item)
            $("#admin-viewod-modal").modal('show')
        })

        // event listener for editing order status
        $("#order-table-body > tr > td > .dropdown > .dropdown-menu").on('click', (e) => {
            e.preventDefault()
            const id = $(e.target).data('id')
            const status = $(e.target).data('status')
            editOrderStatus(id, status)
        })


    }).fail( function(){
        console.log("error")
    })
    
}


function editOrderStatus(id, status) {

    $.ajax({
        method: "PUT",
        url: "/edit-order-status",
        data: { "id": id, "status": status }
    }).done( function(response){
        if (response == "Edit Success!") {
            alert(response)
            $(`#${id}-dropdown`).html(status)
        }
    }).fail( function(error){
        if (error.responseText) {
            alert(error.responseText)
        }
        console.log("error: ", error)
    })

}

// jQuery
$(function () {
    getOrders()
})