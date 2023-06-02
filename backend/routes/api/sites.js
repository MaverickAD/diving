let express = require("express");
let router = express.Router();

module.exports = (db) => {
  // GET /users
  router.get("/", (req, res) => {});

  router.get("/all", (req, res) => {
    db.query("SELECT * FROM Dive_Site", (err, rows) => {
      if (err) throw err;
      res.json(rows);
    });
  });

  return router;
};
