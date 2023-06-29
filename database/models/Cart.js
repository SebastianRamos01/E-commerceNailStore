module.exports = (sequelize, dataTypes) => {
    const Cart = sequelize.define("Carts", {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    },{
        tableName: "cart",
        timestamps: false
    })

    Cart.associate = (models) => {
        Cart.belongsTo(models.Users, {
            foreignKey: 'user_id'
        });

        Cart.belongsToMany(models.Products, {
            through: 'Cart_products',
            foreignKey: 'cart_id',
            as: "products"
        });
    };
    return Cart
}