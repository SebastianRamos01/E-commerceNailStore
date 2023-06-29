window.addEventListener("load", () => {
    const form = document.getElementById("product-creator-form")
    const sndBtn = document.getElementById("send-buton")
    const nameInput = document.getElementById("name-input")
    const descInput = document.getElementById("description-input")
    // const categoryInput = document.getElementById("category-input:checked")
    const prizeInput = document.getElementById("price-input")
    const imgInput = document.getElementById("img-input")

    sndBtn.addEventListener("click", (e) => {
        e.preventDefault()
        let errors = {}

        if (nameInput.value.length < 1) {
            errors.name = "Debes ingresar un nombre al producto"
        }
        if (descInput.value.length < 1) {
            errors.description = "Debes ingresar una descripcion al producto"
        }else if(descInput.value.length < 18) {
            errors.description = "Debes ingresar una descricion al producto(min: 18 caracteres)"
        }
        if (!document.querySelector("#category-input:checked")) {
            errors.category = "Debes asignar una categoria al producto"
        }
        if (prizeInput.value.length < 1) {
            errors.prize = "Debes asiganr un precio al producto"
        }
        if (imgInput.value.length < 1) {
            imgInput.value.toUpperCase().includes(".JPG" || ".JEPG" || ".PNG" || ".GIF")
            errors.image = "Debes asiganar una imagen al producto(.jpg - .jepg - .png - .gif)"
        }
        if (Object.keys(errors).length >= 1) {
            document.getElementById("name-error").innerText = (errors.name) ? errors.name : ""
            document.getElementById("description-error").innerText = (errors.description) ? errors.description : ""
            document.getElementById("category-error").innerText = (errors.category) ? errors.category : ""
            document.getElementById("price-error").innerText = (errors.prize) ? errors.prize : ""
            document.getElementById("img-error").innerText = (errors.image) ? errors.image : ""
        }else{
            form.submit()
        }
    })
})