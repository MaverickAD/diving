let express = require("express");
let router = express.Router();
let bcrypt = require("bcrypt");

module.exports = (db) => {
    // GET /users
    router.get("/", (req, res) => {
        let rank = 0;
        db.query("SELECT Diver_Qualifications FROM Diver WHERE Id_Diver = 103", (err, rows) => {
            if (err) throw err;
            let DiverRank = rows[0].Diver_Qualifications;

            db.query("SELECT npg_name FROM Diver_Qualification WHERE npg_ordre = " + DiverRank, (err, rows) => {
                if (err) throw err;
                rank = rows[0].npg_name;
                res.json(rows[0].npg_name);
            });
        });
    });

    return router;
};
