let express = require("express");
let router = express.Router();
let bcrypt = require("bcrypt");

module.exports = (db) => {
    // GET /users
    router.get("/", (req, res) => {
    });

    router.get("/all", (req, res) => {
        db.query(
            "SELECT * FROM dive",
            (err, rows) => {
                if (err) throw err;
                res.json(rows);
            }
        );
    });

    router.post("/add", (req, res) => {
        let dive = req.body;
        console.log(dive);
        db.query("INSERT INTO dive (id, name, date_begin, date_end, status, comment, surface_security, diver_price, instructor_price, place_number, registered_place, dive_site, max_ppo2) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [dive.id, dive.name, dive.date_begin, dive.date_end, dive.status, dive.comment, dive.surface_security, dive.diver_price, dive.instructor_price, dive.place_number, dive.registered_place, dive.dive_site, dive.max_ppo2],
            (err, result) => {
                if (err) {
                    console.error("Erreur lors de l'insertion de l'utilisateur :", err);
                    return res
                        .status(500)
                        .json({message: "Erreur lors de l'inscription"});
                }
                return res.json({message: "Dive added", success: true});
            });
    });

    return router;
};