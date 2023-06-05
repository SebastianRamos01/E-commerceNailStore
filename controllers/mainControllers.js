const path = require("path")

const mainController = {
    main: (req,res) => {
        res.render(path.resolve(__dirname, "../views/home.ejs"));
    }
};

module.exports = {
    mainController
};