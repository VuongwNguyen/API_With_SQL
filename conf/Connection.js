const { Sequelize } = require('sequelize');

/*
    'mysql://doadmin:AVNS_de9tt18UwWZaa_typDs@db-mysql-sgp1-94733-do-user-16167887-0.c.db.ondigitalocean.com:25060/defaultdb?ssl-mode=REQUIRED';
    server = 'db-mysql-sgp1-94733-do-user-16167887-0.c.db.ondigitalocean.com';
    username = 'doadmin';
    password = 'AVNS_de9tt18UwWZaa_typDs';
    database = 'defaultdb';
    port = 25060;
*/

// const sequelize = new Sequelize('defaultdb', 'doadmin', 'AVNS_de9tt18UwWZaa_typDs', {
//     dialect: 'mysql',
//     // logging: false,
//     host: 'db-mysql-sgp1-94733-do-user-16167887-0.c.db.ondigitalocean.com',
//     port: 25060,
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false
//         }
//     }
// });

/**
    'mysql://root:0134@localhost:3306/node_sql';
    server = 'localhost';
    username = 'root';
    password = '0134';
    database = 'node_sql';
    port = 3306;
 */


const sequelize = new Sequelize('node_sql', 'root', '0134', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

async function start() {
    try {
        await sequelize.sync({ alter: true });
        await sequelize.authenticate(); // Test the connection
        console.log('All models were synchronized successfully.');
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to synchronize the models:', error);

    }
}



module.exports = { sequelize, start };

