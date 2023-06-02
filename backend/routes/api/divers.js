let express = require("express");
let router = express.Router();
let bcrypt = require("bcrypt");

module.exports = (db) => {
  // GET /users
  router.get("/", (req, res) => {
    let rank = 0;
    db.query(
      "SELECT Diver_Qualifications FROM Diver WHERE Id_Diver = 103",
      (err, rows) => {
        if (err) throw err;
        let DiverRank = rows[0].Diver_Qualifications;

        db.query(
          "SELECT npg_name FROM Diver_Qualification WHERE npg_ordre = " +
            DiverRank,
          (err, rows) => {
            if (err) throw err;
            rank = rows[0].npg_name;
            res.json(rows[0].npg_name);
          }
        );
      }
    );
  });

  router.get("/all", (req, res) => {
    db.query(
      "SELECT Id_Diver, Lastname, Firstname, Diver_Qualification.npg_name AS Diver_Qualifications, Instructor_Qualification.epg_name AS Instructor_Qualification, Nitrox_Qualification.qnx_name AS Nox_Level, License_Number, License_Expiration_Date, Medical_Certificate_Expiration_Date FROM Diver INNER JOIN Diver_Qualification ON Diver.Diver_Qualifications = Diver_Qualification.Id INNER JOIN Instructor_Qualification ON Diver.Instructor_Qualification = Instructor_Qualification.epg_Id INNER JOIN Nitrox_Qualification ON Diver.Nox_Level = Nitrox_Qualification.qnx_Id ORDER BY Id_Diver",
      (err, rows) => {
        if (err) throw err;
        res.json(rows);
      }
    );
  });

  return router;
};
