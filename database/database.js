const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const password = process.env.BD_PASSWORD;

const connection = new Sequelize("Mioon", "root", password, {
  host: "localhost",
  dialect: "mysql"
});

module.exports = connection;