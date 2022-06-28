const express = require("express");
// const mysql = require("mysql2");
const app = express();
const Sequelize = require('sequelize');

let sequelize;

require('dotenv').config();

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
  } else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    });
  }

const port = process.env.PORT || 3001;
app.listen(port);

console.log("App is listening on port " + port)


