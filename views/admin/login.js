const queryString = window.location.search
if (queryString){
    if(queryString.includes("error1")){
        alert("Key not correct or email does not have admin privilege.")
    } else if(queryString.includes("error2")){
        alert("Verification code not correct")
    }
}

function validateLogin() {
    const key = document.forms.loginform.key.value
    const email = document.forms.loginform.email.value

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!email || !key) {
        alert("Email or Key should not be empty.")
        return false
    } else if (!re.test(String(email).toLowerCase())) {
        alert("Email is not valid.")
        return false
    }
}
