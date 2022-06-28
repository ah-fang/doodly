const express = require("express");
const mysql = require("mysql");
const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Players_db",
  port: "3306"
});

connection.connect((err) => {
    if (err) {
         throw err
} else {
        console.log("connected")
    }
})

connection.query("CREATE TABLE tablePlayers(id INT(255) UNSIGNED AUTO_INCREMENT PRIMARY KEY, thing VARCHAR(255) NOT NULL)", (err,rows) => {
    if(err){
        throw err
    } else {
        console.log("DATA SENT BOIS")
        console.log(rows)
    }
})

const port = process.env.PORT || 3000;
app.listen(port);

console.log("App is listening on port" + port)


