let express = require("express");
let router = express.Router();

module.exports = (db) => {
  // |||||||||||||||||||||||||||
  // |||||   DO NO TOUCH   |||||
  // |||||||||||||||||||||||||||
  // Good
  router.get("/all", (req, res) => {
    db.query("SELECT * FROM dive_site", (err, rows) => {
      if (err) throw err;
      res.json(rows);
    });
  });

  // Good
  router.put("/update/:id", (req, res) => {
    let id = req.params.id;
    let data = req.body;

    if (data.length !== 0) {
      db.query(
        "UPDATE dive_site SET ? WHERE id = ?",
        [data, id],
        (err, rows) => {
          if (err) throw err;
          res.status(200).json(rows);
        }
      );
    }
  });

  // Good
  router.post("/add", (req, res) => {
    let data = req.body;

    if (data.length !== 0) {
      db.query("INSERT INTO dive_site SET ?", [data], (err, rows) => {
        if (err) throw err;
        res.status(200).json(rows);
      });
    }
  });

  // Good
  router.delete("/delete/:id", (req, res) => {
    let id = req.params.id;

    db.query("DELETE FROM dive_site WHERE id = ?", [id], (err, rows) => {
      if (err) throw err;
      res.status(200).json(rows);
    });
  });
  // |||||||||||||||||||||||||||
  // |||||||||||||||||||||||||||
  // |||||||||||||||||||||||||||

  // GET /users
  router.get("/", (req, res) => {});

  router.get("/all/:name", (req, res) => {
    db.query(
      "SELECT id FROM dive_site WHERE name = ?",
      [req.params.name],
      (err, rows) => {
        if (err) throw err;
        res.json(rows);
      }
    );
  });

  return router;
};
