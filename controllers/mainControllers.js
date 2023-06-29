const path = require("path")
const db = require("../database/models");
const { where, Op } = require("sequelize");

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
    },
    contact: (req, res) => {
        res.render(path.resolve(__dirname, "../views/contact.ejs"))
    },
    search: (req, res) => {
        const search = req.query.search

        db.Products.findAll({
            where: { name:{[Op.like] : `%${search}%`} }
            }
        )
        .then(products => {
            res.render(path.resolve(__dirname, "../views/products/shop.ejs"), { allProducts: products })
        })
        .catch(error => {
            console.log(error)
        })
    }
};

module.exports = {
    mainController
};