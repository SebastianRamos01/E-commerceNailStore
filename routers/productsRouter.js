const express = require("express");
const multer = require("multer")

const {productsController} = require("../controllers/productsControllers");

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/images/");
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + "-" + file.originalname);
    },
})

const upload = multer({ storage: storage })
const productsRouter = express.Router();

productsRouter.get("/shop", productsController.shop);
productsRouter.get("/carrito", productsController.cart);

productsRouter.get("/shop/product-creator", productsController.productCreator);
productsRouter.post("/shop/product-creator", upload.single("image"), productsController.postProductCreator)

productsRouter.get("/shop/product-detail/:id", productsController.productDetail);

productsRouter.get("/product-edit/:id", productsController.productEdit);
productsRouter.put("/product-edit", upload.single("image"), productsController.putProductEdit)

productsRouter.delete("/product-delete/:id", productsController.deleteProduct)


module.exports = productsRouter