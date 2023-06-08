let express = require("express");
let router = express.Router();
let bcrypt = require("bcrypt");

module.exports = (db) => {
    // GET /users
    router.get("/", (req, res) => {
        // Placeholder endpoint, you can add specific logic for retrieving users if needed
        res.send("Users endpoint");
    });

    router.get("/all", (req, res) => {
        db.query("SELECT * FROM dive", (err, rows) => {
            if (err) {
                console.error("Error getting dives:", err);
                return res.status(500).json({ message: "Error getting dives" });
            }
            res.json(rows);
        });
    });

    router.post("/add", (req, res) => {
        let dive = req.body;
        console.log(dive);
        const query = `
            INSERT INTO dive (
                name,
                date_begin,
                date_end,
                status,
                comment,
                surface_security,
                diver_price,
                instructor_price,
                place_number,
                registered_place,
                dive_site,
                max_ppo2
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            dive.name,
            dive.date_begin,
            dive.date_end,
            dive.status,
            dive.comment,
            dive.surface_security,
            dive.diver_price,
            dive.instructor_price,
            dive.place_number,
            dive.registered_place,
            dive.dive_site,
            dive.max_ppo2
        ];

        db.query(query, values, (err, result) => {
            if (err) {
                console.error("Error adding dive:", err);
                return res.status(500).json({ message: "Error adding dive" });
            }
            return res.json({ message: "Dive added", success: true });
        });
    });

    return router;
};
