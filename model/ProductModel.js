const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../conf/Connection");

class Product extends Model { }

Product.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    avatarURL: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    categoryID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "categories",
            key: "id",
        }
    },
}, {
    sequelize,
    modelName: "product",
    timestamps: true,
    tableName: "products",
    paranoid: true,
});



module.exports = Product;