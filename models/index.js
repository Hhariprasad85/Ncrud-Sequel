const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const database = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.databaseConf = database;
// // function to drop existing tables and re-sync database
db.databaseConf.sync({ force: true }).then(() => {
  console.log("restTutorial table just dropped and db re-synced.");
});

db.posts = require("./Posts.model")(database, Sequelize);
db.users = require("./Users.model")(database, Sequelize);
module.exports = db;
