let express = require("express");
let router = express.Router();

module.exports = (db) => {
  // |||||||||||||||||||||||||||
  // |||||   DO NO TOUCH   |||||
  // |||||||||||||||||||||||||||
  // Good
  router.get("/history/:diver", (req, res) => {
    let diver = req.params.diver;

    db.query(
      "SELECT dive.name,\n" +
        "       date_begin,\n" +
        "       status,\n" +
        "       dive.comment,\n" +
        "       dive_site.name AS location,\n" +
        "       dive_team.id AS dive_team_id,\n" +
        "       dive_site.url\n" +
        "FROM dive\n" +
        "INNER JOIN dive_site\n" +
        "ON dive.dive_site = dive_site.id\n" +
        "INNER JOIN dive_team\n" +
        "ON dive.id = dive_team.dive\n" +
        "INNER JOIN dive_team_member\n" +
        "ON dive_team.id = dive_team_member.team\n" +
        "WHERE dive.status IN (2)\n" +
        "AND dive_team_member.diver = ?",
      [diver],
      (err, rows) => {
        if (err) throw err;
        res.json(rows);
      }
    );
  });

  // Good
  router.get("/register/:diver", (req, res) => {
    let diver = req.params.diver;
    db.query(
      "SELECT dive.id,\n" +
        "     dive.name,\n" +
        "     date_begin,\n" +
        "     status,\n" +
        "     dive.comment,\n" +
        "     dive_site.name AS location,\n" +
        "     dive_site.url\n" +
        "FROM dive\n" +
        "INNER JOIN dive_site\n" +
        "ON dive.dive_site = dive_site.id\n" +
        "INNER JOIN dive_team\n" +
        "ON dive.id = dive_team.dive\n" +
        "INNER JOIN dive_team_member\n" +
        "ON dive_team.id = dive_team_member.team\n" +
        "WHERE dive.status IN (1,3)\n" +
        "AND dive_team_member.diver = ?",
      [diver],
      (err, rows) => {
        if (err) throw err;
        res.json(rows);
      }
    );
  });

  // Good
  router.delete("/unregister/:diver/:dive", (req, res) => {
    let diver = req.params.diver;
    let dive = req.params.dive;

    db.query(
      "SELECT team,\n" +
        "       COUNT(diver) AS total\n" +
        "FROM dive_team_member\n" +
        "    INNER JOIN dive_team\n" +
        "        ON dive_team_member.team = dive_team.id\n" +
        "WHERE dive_team.dive = ?\n" +
        "  AND dive_team_member.team IN (\n" +
        "  SELECT team FROM dive_team_member\n" +
        "              WHERE diver = ?\n" +
        "              )\n" +
        "GROUP BY team",
      [dive, diver],
      (err, rows) => {
        if (err) throw err;

        const team = rows[0].team;
        const total = rows[0].total;

        total === 1
          ? db.query(
              "DELETE FROM dive_team_member\n" +
                "       WHERE team = ?\n" +
                "         AND diver = ?",
              [team, diver],
              (err, rows) => {
                if (err) throw err;

                db.query(
                  "DELETE FROM dive_team\n" +
                    "       WHERE id = ?\n" +
                    "         AND dive = ?",
                  [team, dive],
                  (err, rows) => {
                    if (err) throw err;
                    res.json(rows);
                  }
                );
              }
            )
          : db.query(
              "DELETE FROM dive_team_member\n" +
                "       WHERE team = ?\n" +
                "         AND diver = ?",
              [team, diver],
              (err, rows) => {
                if (err) throw err;
                res.json(rows);
              }
            );
      }
    );
  });

  // Good
  router.get("/available/:diver", (req, res) => {
    let diver = req.params.diver;
    db.query(
      "SELECT DISTINCT dive.id,\n" +
        "                dive.name AS name,\n" +
        "                date_begin,\n" +
        "                dive.comment,\n" +
        "                diver_price,\n" +
        "                place_number,\n" +
        "                registered_place,\n" +
        "                dive_site.name AS location,\n" +
        "                dive_site.address,\n" +
        "                dive_site.zip_code,\n" +
        "                dive_site.country,\n" +
        "                dive_site.url\n" +
        "FROM dive\n" +
        "INNER JOIN dive_site\n" +
        "ON dive.dive_site = dive_site.id\n" +
        "WHERE dive.id NOT IN (\n" +
        "  SELECT dive.id FROM dive\n" +
        "    INNER JOIN dive_team\n" +
        "    ON dive.id = dive_team.dive\n" +
        "    INNER JOIN dive_team_member\n" +
        "    ON dive_team.id = dive_team_member.team\n" +
        "    WHERE diver = ?\n" +
        ") AND dive.status = '1'",
      [diver],
      (err, rows) => {
        if (err) throw err;
        res.json(rows);
      }
    );
  });

  // Good
  router.post("/register/:diver/:diveteam/:divetype/:maxdepth", (req, res) => {
    let diver = req.params.diver;
    let diveteam = req.params.diveteam;
    let divetype = req.params.divetype;
    let maxdepth = req.params.maxdepth;

    db.query(
      "SELECT dive_team_member.team,\n" +
        "       COUNT(diver) AS total\n" +
        "FROM dive_team\n" +
        "    INNER JOIN dive_team_member\n" +
        "        ON dive_team.id = dive_team_member.team\n" +
        "WHERE dive = ?\n" +
        "AND dive_type = ?\n" +
        "AND max_depth <= ?\n" +
        "GROUP BY team\n" +
        "HAVING COUNT(diver) != 4",
      [diveteam, divetype, maxdepth],
      (err, rows) => {
        if (err) throw err;

        rows.length !== 0
          ? db.query(
              "INSERT INTO dive_team_member\n" +
                "    (team,\n" +
                "     diver,\n" +
                "     diver_role,\n" +
                "     current_diver_qualification,\n" +
                "     current_instructor_qualification,\n" +
                "     current_nox_qualification)\n" +
                "VALUE (\n" +
                "       ?,\n" +
                "       ?,\n" +
                "       'Apprenti',\n" +
                "       (SELECT diver_qualification FROM diver WHERE id = ?),\n" +
                "       (SELECT instructor_qualification FROM diver WHERE id = ?),\n" +
                "       (SELECT nitrox_qualification FROM diver WHERE id = ?)\n" +
                ")",
              [rows[0].team, diver, diver, diver, diver],
              (err, rows) => {
                if (err) throw err;
                res.status(200).json(rows);
              }
            )
          : db.query(
              "INSERT INTO dive_team(dive, max_depth, dive_type) VALUE(?,?,?)",
              [diveteam, maxdepth, divetype],
              (err, rows) => {
                if (err) throw err;
                db.query(
                  "INSERT INTO dive_team_member\n" +
                    "    (team,\n" +
                    "     diver,\n" +
                    "     diver_role,\n" +
                    "     current_diver_qualification,\n" +
                    "     current_instructor_qualification,\n" +
                    "     current_nox_qualification)\n" +
                    "VALUE (\n" +
                    "       ?,\n" +
                    "       ?,\n" +
                    "       'Apprenti',\n" +
                    "       (SELECT diver_qualification FROM diver WHERE id = ?),\n" +
                    "       (SELECT instructor_qualification FROM diver WHERE id = ?),\n" +
                    "       (SELECT nitrox_qualification FROM diver WHERE id = ?)\n" +
                    ")",
                  [rows.insertId, diver, diver, diver, diver],
                  (err, rows) => {
                    if (err) throw err;
                    res.status(200).json(rows);
                  }
                );
              }
            );
      }
    );
  });

  // Good
  router.get("/finished", (req, res) => {
    db.query(
      "SELECT dive.id,\n" +
        "       dive.`name`,\n" +
        "       date_begin,\n" +
        "       date_end,\n" +
        "       Dive_Status.status AS `status`,\n" +
        "       `comment`,\n" +
        "       surface_security,\n" +
        "       diver_price,\n" +
        "       instructor_price,\n" +
        "       place_number,\n" +
        "       registered_place,\n" +
        "       dive_site.name AS dive_site,\n" +
        "       max_ppo2\n" +
        "FROM dive\n" +
        "INNER JOIN Dive_Status\n" +
        "ON dive.status = Dive_Status.id\n" +
        "INNER JOIN dive_site\n" +
        "ON dive.dive_site = dive_site.id\n" +
        "WHERE dive.status = 2",
      (err, rows) => {
        if (err) throw err;
        res.json(rows);
      }
    );
  });

  // Good
  router.get("/open", (req, res) => {
    db.query(
      "SELECT dive.id,\n" +
        "       dive.`name`,\n" +
        "       date_begin,\n" +
        "       date_end,\n" +
        "       Dive_Status.status AS `status`,\n" +
        "       `comment`,\n" +
        "       surface_security,\n" +
        "       diver_price,\n" +
        "       instructor_price,\n" +
        "       place_number,\n" +
        "       registered_place,\n" +
        "       dive_site.name AS dive_site,\n" +
        "       max_ppo2\n" +
        "FROM dive\n" +
        "INNER JOIN Dive_Status\n" +
        "ON dive.status = Dive_Status.id\n" +
        "INNER JOIN dive_site\n" +
        "ON dive.dive_site = dive_site.id\n" +
        "WHERE dive.status IN (1,3)",
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

    if (data.length !== 0) {
      db.query("UPDATE dive SET ? WHERE id = ?", [data, id], (err, rows) => {
        if (err) throw err;
        res.status(200).json(rows);
      });
    }
  });
  // |||||||||||||||||||||||||||
  // |||||||||||||||||||||||||||
  // |||||||||||||||||||||||||||

  // GET /users
  router.get("/", (req, res) => {});

  router.get("/available", (req, res) => {
    db.query(
      "SELECT dive.id,\n" +
        "       dive.name AS name,\n" +
        "       date_begin,\n" +
        "       `comment`,\n" +
        "       diver_price,\n" +
        "       place_number,\n" +
        "       registered_place,\n" +
        "       dive_site.name AS location,\n" +
        "       dive_site.address,\n" +
        "       dive_site.zip_code,\n" +
        "       dive_site.country\n" +
        "FROM dive\n" +
        "INNER JOIN dive_site\n" +
        "ON dive.dive_site = dive_site.id\n" +
        "WHERE dive.status = '1'",
      (err, rows) => {
        if (err) throw err;
        res.json(rows);
      }
    );
  });

  router.post("/add", (req, res) => {
    let dive = req.body;
    console.log(dive);
    db.query(
      `INSERT INTO dive ( name, date_begin, date_end, status, comment, surface_security, diver_price, instructor_price, place_number, registered_place, dive_site, max_ppo2) VALUES ('${dive.name}', '${dive.date_begin}', '${dive.date_end}', '${dive.status}', '${dive.comment}', '${dive.surface_security}', '${dive.diver_price}', '${dive.instructor_price}', '${dive.place_number}','${dive.registered_place}','${dive.dive_site}' ,'${dive.max_ppo2}')`,
      (err, result) => {
        if (err) {
          console.error("Erreur lors de l'insertion de l'utilisateur :", err);
          return res
            .status(500)
            .json({ message: "Erreur lors de l'inscription" });
        }
        return res.json({ message: "Dive added", success: true });
      }
    );
  });

  return router;
};
