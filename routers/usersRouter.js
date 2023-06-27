const express = require("express");
const { usersController} = require("../controllers/usersControllers");
const usersRouter = express.Router();

const path = require("path")
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/images/users"))
    },
    filename: (req, file, cb) => {
        const newName = `user-${Date.now()}-img${path.extname(file.originalname)}`
        cb(null, newName)
    }
});

const upload = multer({storage}) 

usersRouter.get("/login", usersController.login);
usersRouter.post("/login", usersController.postLogin)

usersRouter.get("/reset-password", usersController.resetPassword)

usersRouter.get("/register", usersController.register);
usersRouter.post("/register", upload.single("img"), usersController.postRegister)

usersRouter.get("/user-detail/:id", usersController.userDetail)

usersRouter.get("/user-edit/:id", usersController.userEdit)
usersRouter.put("/user-edit", upload.single("image"),usersController.postUserEdit)

usersRouter.delete("/user-delete/:id", usersController.userDelete)

usersRouter.post("/logout", usersController.logout)

module.exports = usersRouter;