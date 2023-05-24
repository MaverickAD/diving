const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createConnection({
  host: "93.104.215.68",
  user: "databae",
  password: "datadiving",
  database: "sdms",
});

app.use(cors());

db.connect((err) => {
  if (err) throw err;
});

app.get("*", (req, res) => {
  //Select everything from the table 'Diver' and return it as JSON
  db.query("SELECT * FROM Diver", (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result) {
      res.send(result);
    }
  });
});

app.listen(5000, () => {
  console.log("Example app listening on port 5000!");
});
