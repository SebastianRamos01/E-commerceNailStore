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
        const detalle = products.find(i => i.id == id);
        res.render(path.resolve(__dirname, "../views/products/productDetail.ejs"),{detalle});
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
        const { name, description, category, price} = req.body

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
        const userSession = req.cookies.userSession;

        if(userSession){
            const { id } = req.params;
            let allProducts = productsController.getAllProducts();
        
            const findProduct = products.find(i => i.id == id);
        
            res.render(path.resolve(__dirname, "../views/products/productEdit.ejs"),{editarProducto});
        }
    },
    putProductEdit: (req,res) => {
        const productoEditado = products.forEach(i => {
            if (i.id == req.body.id) {
                i.image = req.body.image;
                i.nombre = req.body.name;
                i.categoria = req.body.category;
                i.descripcion = req.body.description;
                i.precio = req.body.price;
            };
        });
        res.redirect("productDetail/" + req.body.id);
    }
}

module.exports = {
    productsController
};