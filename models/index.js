'use strict';

const Sequelize = require('sequelize');
const db = {};

const config = {
  "username": "root",
  "password": null,
  "database": "demo_pos",
  "host": "127.0.0.1",
  "dialect": "mysql",
}

let sequelize;
sequelize = new Sequelize(config.database, config.username, config.password, config);

const configuration = require('./configuration')(sequelize, Sequelize.DataTypes);
db[configuration.name] = configuration;
const product = require('./product')(sequelize, Sequelize.DataTypes);
db[product.name] = product;
const sale_item = require('./sale_item')(sequelize, Sequelize.DataTypes);
db[sale_item.name] = sale_item;
const sale = require('./sale')(sequelize, Sequelize.DataTypes);
db[sale.name] = sale;
const user = require('./user')(sequelize, Sequelize.DataTypes);
db[user.name] = user;


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
