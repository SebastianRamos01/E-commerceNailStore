const express = require("express");
const {mainController} = require("../controllers/mainControllers");

const mainRouter = express.Router(); 

mainRouter.get("/home", mainController.main);
mainRouter.get("/about-us", mainController.aboutUs)
mainRouter.get("/contact", mainController.contact)

mainRouter.get("/search", mainController.search)

module.exports = mainRouter