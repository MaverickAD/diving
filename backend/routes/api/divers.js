let express = require("express");
let router = express.Router();
let cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

express().use(cors());

module.exports = (db) => {
  // |||||||||||||||||||||||||||
  // |||||   DO NO TOUCH   |||||
  // |||||||||||||||||||||||||||
  // Good
  router.get("/all", (req, res) => {
    db.query(
      "SELECT\n" +
        "    diver.id,\n" +
        "    last_name,\n" +
        "    first_name,\n" +
        "    diver_qualification.name AS diver_qualification,\n" +
        "    instructor_qualification.name AS instructor_qualification,\n" +
        "    nitrox_qualification.name AS nitrox_qualification,\n" +
        "    license_number,\n" +
        "    license_expiration_date, \n" +
        "    medical_expiration_date\n" +
        "FROM diver\n" +
        "    INNER JOIN diver_qualification\n" +
        "        ON diver.diver_qualification = diver_qualification.id\n" +
        "    INNER JOIN instructor_qualification\n" +
        "        ON diver.instructor_qualification = instructor_qualification.id\n" +
        "    INNER JOIN nitrox_qualification\n" +
        "        ON diver.nitrox_qualification = nitrox_qualification.id\n" +
        "ORDER BY diver.diver_qualification, diver.instructor_qualification, diver.nitrox_qualification",
      (err, rows) => {
        if (err) throw err;
        res.json(rows);
      }
    );
  });

  // Good
  router.put("/update/:id", (req, res) => {
    let id = req.params.id;
    let data = req.body;

    if (data.diver_qualification) {
      switch (data.diver_qualification) {
        case "Aucun":
          data.diver_qualification = 1;
          break;
        case "Etoiles de Mer 1":
          data.diver_qualification = 2;
          break;
        case "Etoiles de Mer 2":
          data.diver_qualification = 3;
          break;
        case "Etoiles de Mer 3":
          data.diver_qualification = 4;
          break;
        case "Bronze":
          data.diver_qualification = 5;
          break;
        case "Argent":
          data.diver_qualification = 6;
          break;
        case "Or":
          data.diver_qualification = 7;
          break;
        case "N1":
          data.diver_qualification = 8;
          break;
        case "N2":
          data.diver_qualification = 9;
          break;
        case "N3":
          data.diver_qualification = 10;
          break;
        case "N4":
          data.diver_qualification = 11;
          break;
        case "N5":
          data.diver_qualification = 12;
          break;
      }
    }

    if (data.instructor_qualification) {
      switch (data.instructor_qualification) {
        case "Aucun":
          data.instructor_qualification = 1;
          break;
        case "E1":
          data.instructor_qualification = 2;
          break;
        case "E2":
          data.instructor_qualification = 3;
          break;
        case "E3":
          data.instructor_qualification = 4;
          break;
        case "E4":
          data.instructor_qualification = 5;
          break;
      }
    }

    if (data.nitrox_qualification) {
      switch (data.nitrox_qualification) {
        case "Aucun":
          data.nitrox_qualification = 1;
          break;
        case "NITROX":
          data.nitrox_qualification = 2;
          break;
        case "NITROX Confirmé":
          data.nitrox_qualification = 3;
          break;
        case "Moniteur NITROX":
          data.nitrox_qualification = 4;
          break;
      }
    }

    if (data.length !== 0) {
      db.query("UPDATE diver SET ? WHERE id = ?", [data, id], (err, rows) => {
        if (err) throw err;
        res.status(200).json(rows);
      });
    }
  });

  // |||||||||||||||||||||||||||
  // |||||||||||||||||||||||||||
  // |||||||||||||||||||||||||||

  // GET /users
  router.get("/", (req, res) => {
    let rank = 0;
    db.query(
      "SELECT diver_qualification FROM diver WHERE id = e4ac9e31-7651-4911-b848-8230348cdbfd",
      (err, rows) => {
        if (err) throw err;
        let DiverRank = rows[0].diver_qualification;

        db.query(
          "SELECT name FROM diver_qualification WHERE id = " + DiverRank,
          (err, rows) => {
            if (err) throw err;
            rank = rows[0].name;
            res.json(rows[0].name);
          }
        );
      }
    );
  });

  router.get("/admin", (req, res) => {
    db.query(
      "SELECT last_name, first_name, diver_qualification.name AS diver_qualification, instructor_qualification.name AS instructor_qualification, nitrox_qualification.name AS nitrox_qualification, license_number, license_expiration_date, medical_expiration_date, `rank` FROM diver INNER JOIN diver_qualification ON diver.diver_qualification = diver_qualification.id INNER JOIN instructor_qualification ON diver.instructor_qualification = instructor_qualification.id INNER JOIN nitrox_qualification ON diver.nitrox_qualification = nitrox_qualification.id WHERE `rank` IN (1,2) ORDER BY diver.diver_qualification, diver.instructor_qualification, diver.nitrox_qualification",
      (err, rows) => {
        if (err) throw err;
        res.json(rows);
      }
    );
  });

  router.put("/admin/update/:id", (req, res) => {
    let id = req.params.id;
    let data = req.body;

    if (data.length !== 0) {
      db.query("UPDATE diver SET ? WHERE id = ?", [data, id], (err, rows) => {
        if (err) throw err;
        res.status(200).json(rows);
      });
    }
  });

  return router;
};
