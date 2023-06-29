const userImg = document.getElementById("user-box")
const userInfo = document.getElementById("display-box")
const closeBtn = document.getElementById("close")

userImg.addEventListener("click", () => {
    userInfo.style.display = "block"
})
closeBtn.addEventListener("click", () => {
    userInfo.style.display = "none"
})