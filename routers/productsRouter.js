const express = require("express");

const {productsController} = require("../controllers/productsControllers");

const productsRouter = express.Router();

productsRouter.get("/shop", productsController.shop);
productsRouter.get("/carrito", productsController.cart);

productsRouter.get("/shop/product-creator", productsController.productCreator);
productsRouter.post("/shop/product-creator", productsController.postProductCreator)

productsRouter.get("/shop/product-detail/:id", productsController.productDetail);

productsRouter.get("/product-edit/:id", productsController.productEdit);
productsRouter.put("/product-edit", productsController.putProductEdit)


module.exports = productsRouter