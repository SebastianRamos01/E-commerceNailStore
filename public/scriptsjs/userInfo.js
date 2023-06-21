const userImg = document.getElementById("user-box")
const userInfo = document.getElementById("display-box")

userImg.addEventListener("click", () => {
    if("click"){
        userInfo.style.display = "block"
    }else{
        window.addEventListener("click", () => {
            userInfo.style.display = "none"
        })
    }
})
userImg.addEventListener("blur", () => {
})