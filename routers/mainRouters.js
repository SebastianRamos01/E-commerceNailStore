const express = require("express");

const {mainController} = require("../controllers/mainControllers");

const mainRouter = express.Router(); 

mainRouter.get("/home", mainController.main);

module.exports = mainRouter