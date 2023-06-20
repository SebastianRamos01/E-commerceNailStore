const path = require("path")
const db = require("../database/models");

const mainController = {
    main: (req,res) => {
        db.Products.findAll()
        .then(data => {
            res.render(path.resolve(__dirname, "../views/home.ejs"), { allProducts: data })
        })
        .catch(error => {
            console.log(error)
        })
    },
    aboutUs: (req, res) => {
        res.render(path.resolve(__dirname, "../views/aboutUs.ejs"))
    }
};

module.exports = {
    mainController
};