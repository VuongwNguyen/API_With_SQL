const { Sequelize } = require("sequelize");
require("dotenv").config();

const DATABASE_NAME = process.env.DATABASE_NAME || "node_sql";
const DATABASE_USERNAME = process.env.DATABASE_USERNAME || "root";
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "";
const DATABASE_SERVER = process.env.DATABASE_SERVER || "localhost";

/*
    'mysql://doadmin:AVNS_de9tt18UwWZaa_typDs@db-mysql-sgp1-94733-do-user-16167887-0.c.db.ondigitalocean.com:25060/defaultdb?ssl-mode=REQUIRED';
    server = 'db-mysql-sgp1-94733-do-user-16167887-0.c.db.ondigitalocean.com';
    username = 'doadmin';
    password = 'AVNS_de9tt18UwWZaa_typDs';
    database = 'defaultdb';
    port = 25060;
*/

/*const sequelize = new Sequelize('defaultdb', 'doadmin', 'AVNS_de9tt18UwWZaa_typDs', {
    dialect: 'mysql',
    // logging: false,
    host: 'db-mysql-sgp1-94733-do-user-16167887-0.c.db.ondigitalocean.com',
    port: 25060,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});*/

/**
    'mysql://root:0134@localhost:3306/node_sql';
    server = 'localhost';
    username = 'root';
    password = '0134';
    database = 'node_sql';
    port = 3306;
 */

// const sequelize = new Sequelize(
//   DATABASE_NAME,
//   DATABASE_USERNAME,
//   DATABASE_PASSWORD,
//   {
//     host: DATABASE_SERVER,
//     dialect: "mysql",
//     logging: false,
//   }
// );

class Connection {
  constructor() {
    if (!Connection._instance) {
      this._instance = new Sequelize(
        DATABASE_NAME,
        DATABASE_USERNAME,
        DATABASE_PASSWORD,
        {
          host: DATABASE_SERVER,
          dialect: "mysql",
          logging: false,
        }
      );
      Connection._instance = this;
    }
    return Connection._instance;
  }

  getInstance() {
    return this._instance;
  }

  async start() {
    try {
      const defaultSequelize = new Sequelize(
        "sys",
        DATABASE_USERNAME,
        DATABASE_PASSWORD,
        {
          // logging: false,
          dialect: "mysql",
        }
      );

      await defaultSequelize
        .query(`CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME};`)
        .then(() =>
          console.log(`Database ${DATABASE_NAME} created successfully`)
        )
        .catch((error) => {
          if (
            error.name === "SequelizeDatabaseError" &&
            error.parent &&
            error.parent.code === "ER_DB_CREATE_EXISTS"
          ) {
            console.log(`Database ${DATABASE_NAME} already exists.`);
          } else {
            console.error("Unable to create the database:", error);
          }
        });
      await defaultSequelize.close();
      await this._instance.sync({ alter: true });
      console.log("All models were synchronized successfully.");
      await this._instance.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to synchronize the models:", error);
    }
  }
}

const connection = new Connection();
Object.freeze(connection);

module.exports = connection;
