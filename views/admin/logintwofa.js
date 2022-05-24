function validateTwofa() {
    const code = document.forms.twofaform.code.value
    if (!code) {
        alert("Verification code should not be empty.")
        return false
    }

}