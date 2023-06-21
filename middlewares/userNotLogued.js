const path = require("path")

function userNotLoggued(req, res, next) {
    if (req.session.email) {
        return next()
    }else{
        res.render(path.resolve(__dirname, "../views/notLoggued.ejs"))
    }
}