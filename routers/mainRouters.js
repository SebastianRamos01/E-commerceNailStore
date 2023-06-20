const express = require("express");
const {mainController} = require("../controllers/mainControllers");

const mainRouter = express.Router(); 

mainRouter.get("/home", mainController.main);
mainRouter.get("/about-us", mainController.aboutUs)

module.exports = mainRouter