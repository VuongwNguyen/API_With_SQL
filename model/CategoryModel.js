const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../conf/Connection");


class Category extends Model { }

Category.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        avatarURL: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        sequelize,
        modelName: "category",
        timestamps: true,
        tableName: "categories",
        paranoid: true,
    }
);



module.exports = Category;