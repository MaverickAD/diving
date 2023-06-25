let express = require("express");
let router = express.Router();
const { v4: uuidv4 } = require("uuid");

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
            "       dive.name,\n" +
            "       date_begin,\n" +
            "       status,\n" +
            "       dive.comment,\n" +
            "       dive_site.name AS location,\n" +
            "       dive_site.url,\n" +
            "       dive_team.max_depth,\n" +
            "       dive_team.dive_type\n" +
            "FROM dive\n" +
            "    INNER JOIN dive_site\n" +
            "        ON dive.dive_site = dive_site.id\n" +
            "    INNER JOIN dive_team\n" +
            "        ON dive.id = dive_team.dive\n" +
            "    INNER JOIN dive_team_member\n" +
            "        ON dive_team.id = dive_team_member.team\n" +
            "WHERE dive.status IN (1,3)\n" +
            "  AND dive_team_member.diver = ?",
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
            "    INNER JOIN dive_site\n" +
            "        ON dive.dive_site = dive_site.id\n" +
            "WHERE dive.id NOT IN (\n" +
            "SELECT dive.id FROM dive\n" +
            "    INNER JOIN dive_team\n" +
            "        ON dive.id = dive_team.dive\n" +
            "    INNER JOIN dive_team_member\n" +
            "        ON dive_team.id = dive_team_member.team\n" +
            "               WHERE diver = ?\n" +
            "               )\n" +
            "  AND dive.status = '1'",
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

                let uuidGen = uuidv4();
                rows.length !== 0
                    ? db.query(
                        "INSERT INTO dive_team_member\n" +
                        "    (team,\n" +
                        "     diver,\n" +
                        "     diver_role,\n" +
                        "     current_diver_qualification,\n" +
                        "     current_instructor_qualification,\n" +
                        "     current_nox_qualification)\n" +
                        "    VALUE\n" +
                        "    (?,\n" +
                        "     ?,\n" +
                        "     'Apprenti',\n" +
                        "     (SELECT diver_qualification FROM diver WHERE id = ?),\n" +
                        "     (SELECT instructor_qualification FROM diver WHERE id = ?),\n" +
                        "     (SELECT nitrox_qualification FROM diver WHERE id = ?))",
                        [rows[0].team, diver, diver, diver, diver],
                        (err, rows) => {
                            if (err) throw err;
                            res.status(200).json(rows);
                        }
                    )
                    : db.query(
                        "INSERT INTO dive_team\n" +
                        "    (id,\n" +
                        "     dive,\n" +
                        "     max_depth,\n" +
                        "     dive_type)\n" +
                        "    VALUE\n" +
                        "    (?,\n" +
                        "     ?,\n" +
                        "     ?,\n" +
                        "     ?)",
                        [uuidGen, diveteam, maxdepth, divetype],
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
                                "    VALUE\n" +
                                "    (?,\n" +
                                "     ?,\n" +
                                "     'Apprenti',\n" +
                                "     (SELECT diver_qualification FROM diver WHERE id = ?),\n" +
                                "     (SELECT instructor_qualification FROM diver WHERE id = ?),\n" +
                                "     (SELECT nitrox_qualification FROM diver WHERE id = ?))",
                                [uuidGen, diver, diver, diver, diver],
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

    // Good
    router.get("/modifier/dive/:dive", (req, res) => {
        let dive = req.params.dive;

        db.query(
            "SELECT dive.name,\n" +
            "       dive_site.name AS dive_site,\n" +
            "       dive.date_begin,\n" +
            "       dive.date_end,\n" +
            "       dive.comment,\n" +
            "       dive.place_number,\n" +
            "       dive.registered_place,\n" +
            "       dive.diver_price,\n" +
            "       dive.instructor_price,\n" +
            "       dive.surface_security,\n" +
            "       dive.max_ppo2,\n" +
            "       diver.first_name AS director_first_name,\n" +
            "       diver.last_name AS director_last_name\n" +
            "FROM dive\n" +
            "    INNER JOIN dive_site\n" +
            "        ON dive.dive_site = dive_site.id\n" +
            "    INNER JOIN diver\n" +
            "        ON dive.director = diver.id\n" +
            "WHERE dive.id = ?",
            [dive],
            (err, rows) => {
                if (err) throw err;
                res.json(rows);
            }
        );
    });
    router.get("/modifier/diveteam/:dive", (req, res) => {
        let dive = req.params.dive;

        db.query(
            "SELECT dive_type,\n" +
            "       max_depth,\n" +
            "       id\n" +
            "FROM dive_team\n" +
            "WHERE dive = ?",
            [dive],
            (err, rows) => {
                if (err) throw err;
                db.query(
                    "SELECT date_begin\n" +
                    "FROM dive\n" +
                    "WHERE id = ?",
                    [dive],
                    (err, rows2) => {
                        if(err) throw err;
                        rows.forEach((row) => {
                            row.date_begin = rows2[0].date_begin;
                        });
                        res.json(rows);
                        console.log(rows)
                    })
            }
        );
    });
    router.get("/modifier/divers/:dive", (req, res) => {
        let dive = req.params.dive;

        db.query(
            "SELECT diver.last_name,\n" +
            "       diver.first_name,\n" +
            "       diver AS id,\n" +
            "       diver_qualification.autonomous AS pa,\n" +
            "       diver_qualification.supervise AS pe,\n" +
            "       team AS palanquee,\n" +
            "       team AS initial\n" +
            "FROM dive_team_member\n" +
            "INNER JOIN diver\n" +
            "ON dive_team_member.diver = diver.id\n" +
            "INNER JOIN diver_qualification\n" +
            "ON diver.diver_qualification = diver_qualification.id\n" +
            "INNER JOIN dive_team\n" +
            "ON dive_team_member.team = dive_team.id\n" +
            "WHERE dive_team.dive = ?",
            [dive],
            (err, rows) => {
                if (err) throw err;
                res.json(rows);
            }
        );
    });

    router.put("/modifier/dive/:dive", (req, res) => {
        let dive = req.params.dive;
        let data = req.body;
        if (Object.keys(data).length !== 0) {
            console.log(data);
            db.query("UPDATE dive SET ? WHERE id = ?", [data, dive], (err, rows) => {
                if (err) throw err;
                res.json(rows);
            });
        } else {
            res.json({ message: "No data to update" });
        }
    });
    router.post("/modifier/diveteam/:dive", (req, res) => {
        let dive = req.params.dive;
        let data = req.body;
        let alpha = false;

        data.map((element) => {
            if (Object.keys(element).includes("new")) {
                alpha = true;
                console.log(element);
                db.query(
                    "INSERT INTO dive_team (id, dive, max_depth, dive_type) VALUES (?, ?, ?, ?)",
                    [element.id, dive, element.max_depth, element.dive_type],
                    (err, rows) => {
                        if (err) throw err;
                    }
                );
            }
        });

        alpha ? res.json({ message: "ok" }) : res.json({ message: "no change" });
    });

    router.delete("/supprimer/diveteam/:team", (req, res) => {
        let team = req.params.team;

        db.query(
            "DELETE FROM dive_team WHERE id = ?" ,
            [team],
            (err, rows) => {
                if (err) throw err;
            }
        );
    });

    router.put("/modifier/divers/:dive", (req, res) => {
        let dive = req.params.dive;
        let data = req.body;
        let alpha = false;

        data.map((element) => {
            if (element.palanquee !== element.initial) {
                alpha = true;
                console.log(element);
                db.query(
                    "UPDATE dive_team_member SET team = ? WHERE diver = ? AND team = ?",
                    [element.palanquee, element.id, element.initial],
                    (err, rows) => {
                        if (err) throw err;
                    }
                );
            }
        });

        alpha ? res.json({ message: "ok" }) : res.json({ message: "no change" });
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
