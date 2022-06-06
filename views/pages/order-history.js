
function getSubscription() {
    $.ajax({
        method: "GET",
        url: "/get-current-subscription",
    }).done(function(response){
        let subscription = response.subscriptions
        if (subscription.length > 0) {
            subscription = subscription[0]

            const updatedDate = new Date(subscription.subscriptiontype.updatedAt)
            const upateDateOnly = updatedDate.getFullYear() + "/" + (updatedDate.getMonth() + 1) + "/" + updatedDate.getDate()
            const nextBillingDate = new Date(updatedDate.setMonth(updatedDate.getMonth() + 1))
            const nextBillingDateOnly = nextBillingDate.getFullYear() + "/" + (nextBillingDate.getMonth() + 1) + "/" + nextBillingDate.getDate()

            $("#current-subscription-name").html(subscription.subscriptiontype.name)
            $("#current-subscription-type").html(subscription.subscriptiontype.type)
            $("#current-subscription-noOfBg").html(subscription.subscriptiontype.noOfBoardgames)
            $("#current-subscription-noOfMg").html(subscription.subscriptiontype.noOfMysteryBoardgames)
            $("#current-subscription-updatedAt").html(upateDateOnly)
            $("#current-subscription-next-billing-date").html(nextBillingDateOnly)

        }
    }).fail(function(){
        console.log("error")
    })
}

function getOrders() {

    $.ajax({
        method: "GET",
        url: "/get-order-history",
    }).done(function(response){
        if (response.orders.length > 0) {
            const orders = response.orders
            orders.forEach((order, index) => {
                let orderDetails = order.orderItemDetails
                let orderNames = ""
                for (let detail of orderDetails) {
                    orderNames += detail[0].boardgameId.name + ", "
                }
                
                $("#user-order-table-body").append(`
                <tr id="user-order-tr-${order.order._id}">
                    <th scope="row">${order.order._id}</th>
                    <td>${order.order.createdAt}</td>
                    <td>${order.order.orderStatus}</td>
                    <td>${orderNames}</td>
                </tr>
                `)
            })
        }
    }).fail(function(){
        console.log("error")
    })

}

getSubscription()
getOrders()