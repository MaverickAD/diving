let express = require("express");
let router = express.Router();
let bcrypt = require("bcrypt");

module.exports = (db) => {
    // GET /users
    router.get("/", (req, res) => {
        let rank = 0;
        db.query("SELECT diver_qualification FROM diver WHERE id = e4ac9e31-7651-4911-b848-8230348cdbfd", (err, rows) => {
            if (err) throw err;
            let DiverRank = rows[0].diver_qualification;

            db.query("SELECT name FROM diver_qualification WHERE id = " + DiverRank, (err, rows) => {
                if (err) throw err;
                rank = rows[0].name;
                res.json(rows[0].name);
            });
        });
    });

    router.get("/all", (req, res) => {
        db.query("SELECT * FROM diver", (err, rows) => {
            if (err) throw err;
            res.json(rows);
        });
    });

    return router;
};
