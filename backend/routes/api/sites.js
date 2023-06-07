let express = require("express");
let router = express.Router();

module.exports = (db) => {
    // GET /users
    router.get("/", (req, res) => {

    });

    router.get("/all", (req, res) => {
        db.query("SELECT * FROM dive_site", (err, rows) => {
            if (err) throw err;
            res.json(rows);
        });
    });

    router.post("/all/:name", (req, res) => {
        db.query("SELECT id FROM dive_site WHERE name = ?", [req.params.name], (err, rows) => {
            if (err) throw err;
            console.log(rows[0].id);
            res.json(rows);
        });
    });

    return router;
};
