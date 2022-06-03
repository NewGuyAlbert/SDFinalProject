$(function () {
    if(window.location.href.includes("error")){
        alert("Username or password is incorrect.")
    }

    // Keep intent
    let searchParams = new URLSearchParams(window.location.search)
    let intent = searchParams.get('intent')
    let plan = searchParams.get('plan')

    if(intent){
        if(plan){
            $("#login-form").attr("action", "/login?intent=" + intent + "&plan=" + plan)
            $("#signup-redirect > a").attr("href", "/signup?intent=" + intent + "&plan=" + plan)
        } else{
            $("#login-form").attr("action", "/login?intent=" + intent)
            $("#signup-redirect > a").attr("href", "/signup?intent=" + intent)
        }

    }
})

function validateLogin() {

    const email = document.forms.loginform.email.value
    const password = document.forms.loginform.password.value;

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!email || !password) {
        alert("Username or password should not be empty.")
        return false
    } else if (!re.test(String(email).toLowerCase())) {
        alert("Email is not valid.")
        return false
    } else if (password.length < 8) {
        alert("Password should be more than 8 characters.")
        return false
    } else {
        return true
    }

}