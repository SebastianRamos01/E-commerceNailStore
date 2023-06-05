const fs = require("fs")
const path = require("path")

const User = {

    filename: path.join(__dirname, "../data/users.json"),
    
    getAllUsers: () => {
        return JSON.parse(fs.readFileSync(User.filename, "utf-8"))
    },

    newId: () => {
        const allUsers = User.getAllUsers();

        if(allUsers.length){
            return (allUsers[allUsers.length - 1].id) + 1;
        }else{
            return 1;
        }
    },

    create: (data) => {
        const users = User.getAllUsers();

        const obj = {
            id: User.newId(),
            ...data
        }
        users.push(obj);

        fs.writeFile(User.filename,JSON.stringify(users, null, " "), (err) => {
            if(err){
                return false
            }
        })
        return obj
    }
}

module.exports = User