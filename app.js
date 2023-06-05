//SERVER
const express = require("express")
const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Ejecutado en el puerto " + port));

const methodOverride = require("method-override");

app.set('view engine','ejs');
app.use(express.static("public"));

const morgan = require("morgan")
app.use(morgan("dev"))
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride("_method"));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

//MAIN
const mainRouter = require("./routers/mainRouters");
app.use(mainRouter);

//USERS
const usersRouter = require("./routers/usersRouter");
app.use(usersRouter);

//PRODUCTS
const productsRouter = require("./routers/productsRouter");
app.use(productsRouter);
