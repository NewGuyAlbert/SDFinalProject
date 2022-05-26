$(function () {
    if(window.location.href.includes("error")){
        alert("Username or Email already exist")
    }

    // Keep intent
    let searchParams = new URLSearchParams(window.location.search)
    let intent = searchParams.get('intent')
    if(intent){
        $("#signup-form").attr("action", "/signup?intent=" + intent)
        $("#login-redirect > a").attr("href", "/login?intent=" + intent)
    }

})


function validateUser() {

    const firstName = document.forms.signupform.firstName.value;
    const lastName = document.forms.signupform.lastName.value;
    const email = document.forms.signupform.email.value;
    const password = document.forms.signupform.password.value;
    const passwordRepeat = document.forms.signupform.passwordRepeat.value;

    if (!firstName) {
        alert("First Name is missing.");
        return false;
    }

    if (!lastName) {
        alert("Last Name is missing.");
        return false;
    }

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
        alert("Email is not valid.");
        return false;
    }

    if (password.length < 8) {
        alert("Password should be more than 8 characters.");
        return false;
    }

    if (password !== passwordRepeat) {
        alert("Passwords don't match.");
        return false;
    }

}