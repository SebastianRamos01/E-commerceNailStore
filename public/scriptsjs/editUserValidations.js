window.addEventListener("load", () => {
    const form = document.getElementById("user-edit-form")
    const sendBtn = document.getElementById("edit-buton")
    const imgInput = document.getElementById("img-input")
    const nameInput = document.getElementById("name-input")
    const emailInput = document.getElementById("email-input")
    const birthInput = document.getElementById("birth-input")

    sendBtn.addEventListener("click", (e) => {
        e.preventDefault()
        let errors = {}

        if (nameInput.value.length < 1) {
            errors.name = "Debe ingresar un nombre"
        }
        if (emailInput.value.length < 1) {
            errors.email = "Debe ingresar un email"
        }else if(emailInput.value.includes("@" && "." && "com") === false) {
            errors.email = "Debe ingresar un email valido"
        }
        if (birthInput.value.length === 0) {
            errors.birthday = "Debes ingresar un fecha de nacimiento"
        }
        // if (imgInput.value.length < 1) {
        //     imgInput.value.toUpperCase().includes(".JPG" || ".JEPG" || ".PNG" || ".GIF")
        //     errors.image = "Debes ingresar una imagen (.jpg - .jepg - .png - .gif)"
        // }
        if (Object.keys(errors).length >= 1) {
            document.getElementById("name-error").innerText = (errors.name) ? errors.name : ""
            document.getElementById("email-error").innerText = (errors.email) ? errors.email : ""
            document.getElementById("birth-error").innerText = (errors.birthday) ? errors.birthday : ""
            // document.getElementById("image-error").innerText = (errors.image) ? errors.image : ""
        }else{
            form.submit()
        }
    })
})