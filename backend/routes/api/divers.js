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
    db.query(
      "SELECT last_name, first_name, diver_qualification.name AS diver_qualification, instructor_qualification.name AS instructor_qualification, nitrox_qualification.name AS nitrox_qualification, license_number, license_expiration_date, medical_expiration_date FROM diver INNER JOIN diver_qualification ON diver.diver_qualification = diver_qualification.id INNER JOIN instructor_qualification ON diver.instructor_qualification = instructor_qualification.id INNER JOIN nitrox_qualification ON diver.nitrox_qualification = nitrox_qualification.id ORDER BY diver.diver_qualification, diver.instructor_qualification, diver.nitrox_qualification",
      (err, rows) => {
        if (err) throw err;
        res.json(rows);
      }
    );
  });

  return router;
};
