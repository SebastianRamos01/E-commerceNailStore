const path = require("path")
const products = require("../data/products.json");
const fs = require("fs")
const db = require("../database/models");
const { error } = require("console");

const productsController = {
    shop: (req,res) => {
        db.Products.findAll()
        .then(data => {
            return res.render(path.join(__dirname, "../views/products/shop"), { "allProducts": data });
        })
    },
    cart: (req,res) => {
        const userSession = req.cookies.userSession;

        if(userSession){
            res.render(path.resolve(__dirname, "../views/products/cart.ejs"));
        }else{
            res.redirect("/login")
        }
    },
    productDetail: (req,res) => {
        const {id} = req.params;
        
        db.Products.findByPk(id)
        .then(product => {
            res.render(path.resolve(__dirname, "../views/products/productDetail.ejs"),{ product });
        })
    },
    productCreator: (req,res) => {
        // const userSession = req.cookies.userSession;

        // if(userSession){
        // }else{
        //     res.redirect("/login")
        // }
        res.render(path.resolve(__dirname, "../views/products/productCreator"))
    },
    postProductCreator: (req, res) => {
        const { name, description, category, price } = req.body

        let image = req.file ? req.file.filename : "ProductImg.jpg"

        db.Products.create({
            name,
            description,
            category,
            price,
            image
        })
        .then(newProduct => {
            return res.redirect("/shop");
        })
        .catch(error => {
            console.log(error)
        })
    },

    productEdit: (req,res) => {
        // const userSession = req.cookies.userSession;
        // if(userSession){
        const { id } = req.params;
        //     let allProducts = productsController.getAllProducts();
        //     const findProduct = products.find(i => i.id == id);
        // }
        db.Products.findByPk(id)
        .then(data => {
            res.render(path.resolve(__dirname, "../views/products/productEdit.ejs"),{ data });
        })
        .catch(error => {
            console.log(error)
        })
    },
    putProductEdit: (req,res) => {
        const { name, price, category, description} = req.body
        let image = req.file ? req.file.filename : "productIMG.jpg";

        db.Products.update({
            name: name,
            price: price,
            description: description,
            category: category,
            image
        },{
            where: { id: req.body.id }
        })
        .then(updatedProduct => {
            res.redirect("/shop")
        })
        .catch(error => {
            console.log(error)
        })
    },
    deleteProduct: (req, res) => {
        const { id } = req.params
        
        db.Products.destroy({
            where: { id }
        })
        .then(() => {
            res.redirect("/shop")
        })
        .catch(error => {
            console.log(error)
        })
    }
}

module.exports = {
    productsController
};