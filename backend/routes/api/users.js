let express = require("express");
let router = express.Router();
let bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

module.exports = (db, jwt, secretKey) => {
  // |||||||||||||||||||||||||||
  // |||||   DO NO TOUCH   |||||
  // |||||||||||||||||||||||||||
  // Good
  router.get("/personal/:diver", (req, res) => {
    let diver = req.params.diver;
    db.query(
      "SELECT diver.id, last_name, first_name, birth_date, email, diver_qualification.name AS diver_qualification, instructor_qualification.name AS instructor_qualification, nitrox_qualification.name AS nitrox_qualification, additional_qualification, license_number, license_expiration_date, medical_expiration_date, theme FROM diver INNER JOIN diver_qualification ON diver.diver_qualification = diver_qualification.id INNER JOIN instructor_qualification ON diver.instructor_qualification = instructor_qualification.id INNER JOIN nitrox_qualification ON diver.nitrox_qualification = nitrox_qualification.id WHERE diver.id = ?",
      [diver],
      (err, rows) => {
        if (err) throw err;
        res.json(rows);
      }
    );
  });

  // Good
  router.put("/personal/:diver", (req, res) => {
    let diver = req.params.diver;
    let data = req.body;

    if (data.password) {
      console.log("password changed");
      bcrypt.hash(data.password, 10, (err, hash) => {
        if (err) {
          console.error("Erreur lors du hachage du mot de passe :", err);
          return res
            .status(500)
            .json({ message: "Erreur lors de la modification" });
        }
        data.password = hash;
        db.query(
          "UPDATE diver SET ? WHERE id = ?",
          [data, diver],
          (err, rows) => {
            if (err) throw err;
            res.json(rows);
          }
        );
      });
    } else {
      console.log("password not changed");
      db.query(
        "UPDATE diver SET ? WHERE id = ?",
        [data, diver],
        (err, rows) => {
          if (err) throw err;
          res.json(rows);
        }
      );
    }
  });

  // Good
  router.get("/admin", (req, res) => {
    db.query(
      "SELECT diver.id, last_name, first_name, diver_qualification.name AS diver_qualification, instructor_qualification.name AS instructor_qualification, nitrox_qualification.name AS nitrox_qualification, license_number, license_expiration_date, medical_expiration_date, `rank` FROM diver INNER JOIN diver_qualification ON diver.diver_qualification = diver_qualification.id INNER JOIN instructor_qualification ON diver.instructor_qualification = instructor_qualification.id INNER JOIN nitrox_qualification ON diver.nitrox_qualification = nitrox_qualification.id WHERE `rank` IN (1,2) ORDER BY diver.diver_qualification, diver.instructor_qualification, diver.nitrox_qualification",
      (err, rows) => {
        if (err) throw err;
        res.json(rows);
      }
    );
  });

  // Good
  router.put("/admin/update/:diver", (req, res) => {
    let diver = req.params.diver;
    let data = req.body;

    if (data.length !== 0) {
      db.query(
        "UPDATE diver SET ? WHERE id = ?",
        [data, diver],
        (err, rows) => {
          if (err) throw err;
          res.status(200).json(rows);
        }
      );
    }
  });

  // Good
  router.get("/not_admin", (req, res) => {
    db.query(
      "SELECT diver.id, last_name, first_name FROM diver WHERE `rank` = 0",
      (err, rows) => {
        if (err) throw err;
        res.json(rows);
      }
    );
  });

  // Good
  router.put("/not_admin/:diver", (req, res) => {
    let diver = req.params.diver;

    db.query(
      "UPDATE diver SET `rank` = 1 WHERE id = ?",
      [diver],
      (err, rows) => {
        if (err) throw err;
        res.status(200).json(rows);
      }
    );
  });

  router.get("/dive_director", (req, res) => {
    db.query(
      "SELECT diver.first_name,\n" +
        "       diver.last_name,\n" +
        "       diver.diver_qualification,\n" +
        "       diver.instructor_qualification,\n" +
        "       diver.id\n" +
        "FROM diver\n" +
        "WHERE diver_qualification = '12'\n" +
        "   OR instructor_qualification IN ('4','5')\n" +
        "ORDER BY diver_qualification, instructor_qualification",
      (err, rows) => {
        if (err) throw err;
        res.json(rows);
      }
    );
  });
  // |||||||||||||||||||||||||||
  // |||||||||||||||||||||||||||
  // |||||||||||||||||||||||||||

  // GET /users
  router.get("/", (req, res) => {
    db.query("SELECT * FROM diver", (err, rows) => {
      if (err) throw err;
      res.json(rows);
    });
  });

  // Route pour l'inscription d'un nouvel utilisateur
  router.post("/signup", (req, res) => {
    let data = req.body;

    // Génération d'un UUID pour l'identifiant
    data.id = uuidv4();
    let token = jwt.sign(
      {
        id: data.id,
        timestamp: Date.now() + 1000 * 60 * 60 * 24,
        prenom: data.first_name,
        email: data.email,
        diver_qualification: data.diver_qualification,
        rank: data.rank,
      },
      secretKey,
      { expiresIn: "24h" }
    );
    // Cryptage du mot de passe avec bcrypt
    bcrypt.hash(data.password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Erreur lors du cryptage du mot de passe :", err);
        res
          .status(500)
          .json({ error: "Une erreur est survenue lors de l'inscription." });
      } else {
        data.password = hashedPassword;
        data.rank = 0;
        data.theme = "light";
        delete data.passwordConfirmation;

        db.query("INSERT INTO diver SET ?", data, (err, result) => {
          if (err) {
            console.error("Erreur lors de l'inscription :", err);
            res.status(500).json({
              error: "Une erreur est survenue lors de l'inscription.",
            });
          } else {
            console.log("Inscription réussie !");
            res.status(200).json({
              message: "Inscription réussie",
              token: token,
              success: true,
            });
          }
        });
      }
    });
  });

  // Route pour la connexion d'un utilisateur existant
  router.post("/signin", (req, res) => {
    const { email, password } = req.body;

    // Vérifier si les paramètres nécessaires sont fournis
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Nom d'utilisateur et mot de passe requis" });
    }

    // Récupérer l'utilisateur depuis la base de données
    const query = "SELECT * FROM diver WHERE email = ?";
    db.query(query, [email], (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération de l'utilisateur :", err);
        return res.status(500).json({ message: "Erreur lors de la connexion" });
      }

      // Vérifier si l'utilisateur existe
      if (results.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Mauvais identifiants, veuillez réessayer",
        }); // Envoyer une réponse d'échec avec un message d'erreur
      } else {
        // Comparer le mot de passe fourni avec le mot de passe haché dans la base de données
        const user = results[0];

        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            console.error(
              "Erreur lors de la comparaison des mots de passe :",
              err
            );
            return res
              .status(500)
              .json({ message: "Erreur lors de la connexion" });
          }

          if (!result) {
            return res
              .status(401)
              .json({ success: false, message: "Mot de passe incorrect" });
          }
          const query = "SELECT * FROM diver WHERE email = ?;";
          db.query(query, [email], (err, results) => {
            if (err) {
              console.error(
                "Erreur lors de la récupération de l'utilisateur :",
                err
              );
              return res
                .status(500)
                .json({ message: "Erreur lors de la connexion" });
            }

            let token;
            switch (results[0].rank) {
              case 2:
                token = jwt.sign(
                  {
                    id: results[0].id,
                    timestamp: Date.now() + 30000,
                    prenom: results[0].last_name,
                    email: results[0].email,
                    diver_qualification: results[0].diver_qualification,
                    rank: 2,
                  },
                  secretKey,
                  { expiresIn: "24h" }
                );
                break;
              case 1:
                token = jwt.sign(
                  {
                    id: results[0].id,
                    timestamp: Date.now() + 30000,
                    prenom: results[0].last_name,
                    email: results[0].email,
                    diver_qualification: results[0].diver_qualification,
                    rank: 1,
                  },
                  secretKey,
                  { expiresIn: "24h" }
                );
                break;
              case 0:
                token = jwt.sign(
                  {
                    id: results[0].id,
                    timestamp: Date.now() + 30000,
                    prenom: results[0].last_name,
                    email: results[0].email,
                    diver_qualification: results[0].diver_qualification,
                    rank: 0,
                  },
                  secretKey,
                  { expiresIn: "24h" }
                );
                break;
              default:
                console.log("Erreur lors de la récupération du rank");
                break;
            }
            res.json({ success: true, token });
          });
        });
      }
    });
  });

  router.post("/verify", (req, res) => {
    const { token } = req.body;
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.error("Erreur lors de la vérification du token :", err);
        return res
          .status(500)
          .json({ message: "Erreur lors de la vérification du token" });
      }
      res.json({ success: true, decoded });
    });
  });

  return router;
};
