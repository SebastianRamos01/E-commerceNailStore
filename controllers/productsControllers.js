const path = require("path")
const fs = require("fs")
const db = require("../database/models");
const { Op } = require("sequelize");

const productsController = {
    shop: (req,res) => {
        db.Products.findAll()
        .then(data => {
            return res.render(path.join(__dirname, "../views/products/shop"), { "allProducts": data });
        })
    },
    cart: (req,res) => {
        db.Carts.findAll({
            where: { user_id: res.locals.user.id },
            include: [{ model: db.Products, as: "products", required: true }],
            raw: true
        })
            .then(cart => {
                console.log(cart)
                if (!cart) {
                    res.render(path.join(__dirname, "../views/products/cart.ejs"), {
                        message: "Tu carrito está vacío."
                    });
                } else {
                    const products = cart.map(cart => {
                        return {
                            image: cart["products.image"],
                            name: cart["products.name"],
                            price: cart["products.price"],
                            id: cart["products.id"]
                        }
                    })
                    console.log(products)
                    res.render(path.join(__dirname, "../views/products/cart.ejs"), {
                        allProducts: products
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    },
    addCart: (req, res) => {
        const { id } = req.params;
        let user_id = res.locals.user.id;

        db.Carts.create({ user_id })
            .then(data => {

                let product_id = id;
                let cart_id = data.id;

                db.Cart_products.create({
                    cart_id,
                    product_id,
                })
                    .then(() => {
                        res.redirect("/cart")
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(500).json({ message: `Error al agregar el producto: ${error.message}` });
                    });
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ message: `Error al agregar el producto: ${error.message}` });
            });
    },
    deleteCart: (req, res) => {
        const { id } = req.params;
        const userEmail = req.session.email;

        db.Users.findOne({ where: { email: userEmail } })
            .then(user => {
                const userId = user.id;

                db.Carts.findAll({ where: { user_id: userId } })
                    .then(carts => {
                        const cartIds = carts.map(cart => cart.id);

                        return db.Cart_products.destroy({
                            where: {
                                product_id: id,
                                cart_id: { [Op.in]: cartIds }
                            }
                        });
                    })
                    .then(() => {
                        res.redirect("/cart");
                    })
                })
           .catch((error) => {
             res.send("Error al eliminar registro: " + error);
           });
    },
    productDetail: (req,res) => {
        const {id} = req.params;
        
        db.Products.findByPk(id)
        .then(product => {
            res.render(path.resolve(__dirname, "../views/products/productDetail.ejs"),{ product });
        })
    },
    productCreator: (req,res) => {
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
        
        const { id } = req.params;
        
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
        let image = req.file ? req.file.filename : req.file;

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