let express = require("express");
let router = express.Router();
let bcrypt = require("bcrypt");

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
    let {
      id,
      last_name,
      first_name,
      birth_date,
      email,
      password,
      diver_qualification,
      instructor_qualification,
      nitrox_qualification,
      additional_qualification,
      license_number,
      license_expiration_date,
      medical_expiration_date,
      theme,
    } = req.body;
    if (additional_qualification === undefined) {
      additional_qualification = "";
    }
    let rank = 0;
    // Vérifier si les paramètres nécessaires sont fournis
    if (
      !first_name ||
      !last_name ||
      !email ||
      !password ||
      !birth_date ||
      !diver_qualification ||
      !nitrox_qualification ||
      !license_number ||
      !license_expiration_date ||
      !medical_expiration_date
    ) {
      return res
        .status(400)
        .json({ message: "Nom, prénom, Email et mot de passe requis" });
    }

    // Générer le sel et hacher le mot de passe
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.error("Erreur lors du hachage du mot de passe :", err);
        return res
          .status(500)
          .json({ message: "Erreur lors de l'inscription" });
      }
      // Insérer l'utilisateur dans la base de données
      const query =
        "INSERT INTO diver (id, last_name, first_name, birth_date, email, password, diver_qualification, instructor_qualification, nitrox_qualification, additional_qualification, license_number, license_expiration_date, medical_expiration_date, theme, `rank`) VALUES  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )";
      db.query(
        query,
        [
          id,
          last_name,
          first_name,
          birth_date,
          email,
          hash,
          diver_qualification,
          instructor_qualification,
          nitrox_qualification,
          additional_qualification,
          license_number,
          license_expiration_date,
          medical_expiration_date,
          "light",
          "0",
        ],
        (err, result) => {
          if (err) {
            console.error("Erreur lors de l'insertion de l'utilisateur :", err);
            return res
              .status(500)
              .json({ message: "Erreur lors de l'inscription" });
          }
          // Générer un token d'authentification et envoyer la réponse
          let token = jwt.sign(
            {
              id: results[0].id,
              timestamp: Date.now() + 30000,
              prenom: first_name,
              email: email,
              rank: rank,
            },
            secretKey,
            { expiresIn: "24h" }
          );

          res.json({
            message: "Inscription réussie",
            token: token,
            success: true,
          });
        }
      );
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
