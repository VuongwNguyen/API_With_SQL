const { DataTypes, Model } = require("sequelize");
const Database = require("../conf/Connection");

const sequelize = Database.getInstance();
class Account extends Model {
  getFullname() {
    return `${this.firstname} ${this.lastname}`;
  }
}
Account.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    fisrtname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    role: {
      type: DataTypes.STRING,
      defaultValue: "customer",
      validate: {
        isIn: [["customer", "admin"]],
      },
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    refreshToken: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "account",
    timestamps: true,
    tableName: "accounts",
    paranoid: true,
  }
);


module.exports = Account;
