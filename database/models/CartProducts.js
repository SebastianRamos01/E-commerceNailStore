module.exports = (sequelize, dataTypes) => {
    const Cart_product = sequelize.define("Cart_products", {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cart_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Carts', 
                key: 'id'
            }
        },
        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Products',
                key: 'id'
            }
        }
    },{
        tableName: "cart_products",
        timestamps: false
    })

    Cart_product.associate = function(models) {
        Cart_product.belongsTo(models.Carts, {
          foreignKey: {
            name: 'cart_id',
            allowNull: false
          },
          as: 'cart'
        });
      
        Cart_product.belongsTo(models.Products, {
          foreignKey: {
            name: 'product_id',
            allowNull: false
          },
          as: 'product'
        });
      }
    return Cart_product
}