const path = require("path");
const modelUser = require("../models/User")
const bcrypt = require("bcrypt")
const fs = require("fs")
const users = JSON.parse(fs.readFileSync("./data/users.json"), "utf-8");

const usersController = {
    login: (req,res) => {
        res.render(path.resolve(__dirname, "../views/users/login.ejs"));
    },
    postLogin: (req, res) => {
        const {
            email, 
            password
        } = req.body;
        
        const user = users.find((i) => i.email === email && bcrypt.compareSync(password,i.password)) //i.password === password);

        if (user) {
            res.cookie('userSession', email, { maxAge: 90000, httpOnly: true });
            res.redirect("/home");
        } else {
            res.send("Credenciales incorrectas.");
        }
    },
    register: (req,res) => {
        res.render(path.resolve(__dirname, "../views/users/register.ejs"));
    },
    postRegister: (req, res) => {
        const {
            name,
            email,
            password,
            birth,
        } = req.body
        
        const image = req.file ? req.file.filename: " ";
        let newImage;
        if(image.length > 0){
            newImage = `images/users/${image}`
        }; 
        const obj = {
            ...req.body,
            password: bcrypt.hashSync(password, 10),
            img: newImage
        }
        modelUser.create(obj);
        res.render("home")
    },
}

module.exports = {
    usersController
};