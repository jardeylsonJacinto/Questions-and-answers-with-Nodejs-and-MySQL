const Sequelize = require("sequelize");

const connection = new Sequelize("guiaperguntas", "root", "moves@1995", {
  host: "localhost",
  dialect: "mysql"
});

module.exports = connection;