module.exports = (sequelize, dataTypes) => {
    const Product = sequelize.define("Products", {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.TEXT
        },
        image: {
            type: dataTypes.STRING
        },
        category: {
            type: dataTypes.TEXT
        },
        price: {
            type: dataTypes.DECIMAL
        }
    },{
        tableName: "products",
        timestamps: false
    })
    
    Product.associate = (models) => {
        Product.belongsToMany(models.Carts, {
            through: 'Cart_products',
            foreignKey: 'product_id'
        });
    };
    return Product
}