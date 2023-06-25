window.addEventListener("load", () => {
    const form = document.getElementById("login-form")
    const sendBtn = document.getElementById("send-botom")
    const emailInput = document.getElementById("email-input")
    const passInput = document.getElementById("password-input")

    sendBtn.addEventListener("click", (e) => {
        e.preventDefault()
        let errors = {}

        if (emailInput.value.length < 1) {
            errors.email = "Debes ingresar un email";
        }else if(emailInput.value.includes("@" && "." && "com") === false){
            errors.email = "Debes ingresar un email valido";
        }
        if (passInput.value.length < 1) {
            errors.password = "Debes ingresar una contraseña";
        }
        if (Object.keys(errors).length >= 1) {
            document.getElementById("email-error").innerText = (errors.email) ? errors.email : ""
            document.getElementById("password-error").innerText = (errors.password) ? errors.password : ""
        }else{
            form.submit()
        }
    })
})