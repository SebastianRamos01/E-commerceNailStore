const path = require("path");
const bcrypt = require("bcrypt")
const fs = require("fs");
const db = require("../database/models");
const { error } = require("console");
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
        
        db.Users.findOne({
            where: {
                email: email
            }
        })
        .then(data => {
            let readPassword = bcrypt.compareSync(password, data.password)

            if(readPassword){
                req.session.email = email
                res.redirect("/home")
            }else{
                res.send("Creedenciales Incorrectas")
            }
        })
        .catch(error => {
            console.log(error)
        })
        // if (user) {
        //     res.cookie('userSession', email, { maxAge: 90000, httpOnly: true });
        //     res.redirect("/home");
        // } else {
        //     res.send("Credenciales incorrectas.");
        // }
    },
    register: (req,res) => {
        res.render(path.resolve(__dirname, "../views/users/register.ejs"));
    },
    postRegister: (req, res) => {
        const {
            name,
            email,
            birthdate,
        } = req.body
        
        let image = req.file ? req.file.filename : "RandomUser.jpg";
        // let newImage;
        // if(image.length > 0){
        //     newImage = `images/users/${image}`
        // }; 
        db.Users.create({
            name,
            email,
            birthdate,
            password: bcrypt.hashSync(req.body.password, 10),
            image
        })
        .then(newUser => {
            res.redirect("/login")
        })
        .catch(error => {
            console.log(error)
        })
    },
    userDetail: (req, res) => {
        const { id } = req.params

        db.Users.findByPk(id)
        .then(user => 
            res.render(path.resolve(__dirname, "../views/users/userDetail.ejs"),{ user }))
    },

    userEdit: (req, res) => {
        const { id } = req.params;

        db.Users.findByPk(id)
        .then(user => {
            res.render(path.resolve(__dirname, "../views/users/userEdit.ejs"),{ user });
        })
        .catch(error => {
            console.log(error)
        })
    },

    postUserEdit: (req, res) => {

        const { name, email, birthdate, id } = req.body
        let newImage = req.file ? req.file.filename : req.file;

        db.Users.update({
            name: name,
            email: email,
            birthdate: birthdate,
            image: newImage
        },{
            where: { id: id }
        })
        .then(putUser => {
            res.redirect("/home")
        })
        .catch(error => {
            console.log(error)
        })
    },
    userDelete: (req, res) => {
        const { id } = req.params

        db.Users.destroy({
            where: { id: id }
        })
        .then(userDeleted => {
            res.redirect("/home")
        })
    },
    logout: (req, res) => {
        req.session.destroy(error => {
            error ? console.log(error) : res.redirect("/home")
        })
    }
}

module.exports = {
    usersController
};