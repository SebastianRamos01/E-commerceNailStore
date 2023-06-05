const path = require("path")
const products = require("../data/products.json");
const fs = require("fs")

const productsController = {
    shop: (req,res) => {
        res.render(path.join(__dirname, "../views/products/shop"),{"allProducts":products})
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
        const userSession = req.cookies.userSession;

        if(userSession){
            res.render(path.resolve(__dirname, "../views/products/productCreator"))
        }else{
            res.redirect("/login")
        }
    },
    postProductCreator: (req, res) =>{
        const {
            name,
            description,
            category,
            price,
            image
        } = req.body;
    
        const newId = products[products.length - 1].id + 1;
    
        const obj = {
            id: newId,
            name,
            description,
            category,
            price,
            image
        }
        products.push(obj)
        res.redirect("/shop")
    },

    filename: path.join(__dirname, "../data/products1.json"),
    getAllProducts: () => {
        return JSON.parse(fs.readFileSync(productsController.filename, "utf-8"));
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