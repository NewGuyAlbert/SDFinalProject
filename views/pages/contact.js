$(function () {
    $(".contact1-form-btn").on("click", (e) => {
        e.preventDefault()
        const name = $("#contact-name-input").val()
        const email = $("#contact-email-input").val()
        const subject = $("#contact-subject-input").val()
        const message = $("#contact-message-input").val()

        if (name && email && subject && message) {
            alert("Email sent successfully! You'll hear from us soon.")
        } else {
            alert("Please fill out the forms.")
        }
            
    })
})