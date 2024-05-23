const { DataTypes } = require('sequelize');
const { sequelize } = require('../conf/Connection');
const Customer = require('./CustomerModel');
const Product = require('./ProductModel');

const Cart = sequelize.define('cart', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    timestamps: true,
    tableName: 'carts'
});
Customer.hasOne(Cart);
Cart.belongsTo(Customer);
Product.hasOne(Cart);
Cart.belongsTo(Product);



module.exports = Cart;