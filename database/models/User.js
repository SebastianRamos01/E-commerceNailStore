module.exports = (sequelize, dataTypes) => {
    const User = sequelize.define("Users", {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        birthdate: {
            type: dataTypes.DATEONLY
        },
        image: {
            type: dataTypes.STRING
        },
        admin: {
            type: dataTypes.BOOLEAN
        }
    },{
        tableName: "users",
        timestamps: false
    })
    // User.associate = (models) => {
    //     User.hasOne(models.Carts, {
    //         foreignKey: 'user_id'
    //     });
    // };
    return User;
}