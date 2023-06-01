let express = require("express");
let router = express.Router();
let bcrypt = require("bcrypt");

module.exports = (db, jwt, secretKey) => {
    // Middleware pour vérifier le rôle de l'utilisateur
    function checkUserRole(req, res, next) {
        const email = req.body.email; // Supposons que vous ayez l'ID de l'utilisateur dans req.user

        db.query('SELECT Rank FROM Application_User WHERE Email = ?', [email], (error, results) => {
            if (error) {
                console.error(error);
                return res.sendStatus(500);
            }

            if (results.length === 0) {
                return res.sendStatus(404); // Utilisateur non trouvé
            }

            req.user.role = results[0].rank; // Ajoute le rôle à l'objet request
            next();
        });
    }

    // Middleware pour vérifier le token à chaque requête
    function authenticateToken(req, res, next) {
        const token = req.headers['authorization'];

        if (token) {
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    return res.sendStatus(403); // Token invalide
                }
                console.log("Deja connecté");
                req.user = decoded; // Ajoute les informations du rôle à l'objet request
                console.log(req.user);
                next();
            });
        } else {
            console.log("Pas connecté ou pas de droits");
            res.sendStatus(401); // Pas de token fourni
        }
    }

    // GET /users
    router.get("/", (req, res) => {
        db.query("SELECT * FROM Application_User", (err, rows) => {
            if (err) throw err;
            res.json(rows);
        });
    });

    // Route pour l'inscription d'un nouvel utilisateur
    router.post("/signup", (req, res) => {
        const {firstname, lastname, email, password} = req.body;

        // Vérifier si les paramètres nécessaires sont fournis
        if (!firstname || !lastname || !email || !password) {
            return res
                .status(400)
                .json({message: "Nom, prénom, Email et mot de passe requis"});
        }

        // Générer le sel et hacher le mot de passe
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.error("Erreur lors du hachage du mot de passe :", err);
                return res
                    .status(500)
                    .json({message: "Erreur lors de l'inscription"});
            }

            function generate_guid() {
                let dt = new Date().getTime();
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                    /[xy]/g,
                    function (c) {
                        var rnd = Math.random() * 16; //random number in range 0 to 16
                        rnd = (dt + rnd) % 16 | 0;
                        dt = Math.floor(dt / 16);
                        return (c === "x" ? rnd : (rnd & 0x3) | 0x8).toString(16);
                    }
                );
            }

            let GUID = generate_guid();
            // Insérer l'utilisateur dans la base de données
            const query =
                "INSERT INTO Application_User (Id_Application_User, Lastname, Firstname, Email, User_Password, Theme) VALUES (?, ?, ?, ?, ?, ?)";
            db.query(
                query,
                [GUID, lastname, firstname, email, hash, "WHITE"],
                (err, result) => {
                    if (err) {
                        console.error("Erreur lors de l'insertion de l'utilisateur :", err);
                        return res
                            .status(500)
                            .json({message: "Erreur lors de l'inscription"});
                    }
                    res.json({message: "Inscription réussie"});
                }
            );
        });
    });

    // Route pour la connexion d'un utilisateur existant
    router.post("/signin", (req, res) => {
        const {email, password} = req.body;

        // Vérifier si les paramètres nécessaires sont fournis
        if (!email || !password) {
            return res
                .status(400)
                .json({message: "Nom d'utilisateur et mot de passe requis"});
        }

        // Récupérer l'utilisateur depuis la base de données
        const query = "SELECT * FROM Application_User WHERE Email = ?";
        db.query(query, [email], (err, results) => {
            if (err) {
                console.error("Erreur lors de la récupération de l'utilisateur :", err);
                return res.status(500).json({message: "Erreur lors de la connexion"});
            }

            // Vérifier si l'utilisateur existe
            if (results.length === 0) {
                return res.status(401).json({ success: false, message: 'Mauvais identifiants, veuillez réessayer' }); // Envoyer une réponse d'échec avec un message d'erreur
            } else {
                // Comparer le mot de passe fourni avec le mot de passe haché dans la base de données
                const user = results[0];

                bcrypt.compare(password, user.User_Password, (err, result) => {
                    if (err) {
                        console.error(
                            "Erreur lors de la comparaison des mots de passe :",
                            err
                        );
                        return res
                            .status(500)
                            .json({message: "Erreur lors de la connexion"});
                    }

                    if (!result) {
                        return res.status(401).json({success: false, message: "Mot de passe incorrect"});
                    }
                    const query =
                        "SELECT * FROM Application_User WHERE Email = ?;";
                    db.query(query, [email], (err, results) => {
                        if (err) {
                            console.error(
                                "Erreur lors de la récupération de l'utilisateur :",
                                err
                            );
                            return res
                                .status(500)
                                .json({message: "Erreur lors de la connexion"});
                        }

                        let token;
                        switch (results[0].Rank) {
                            case 2:
                                console.log("Superadmin")
                                token = jwt.sign({prenom: results[0].Lastname, rank: 2}, secretKey, {expiresIn: '24h'});
                                break;
                            case 1:
                                console.log("Administrateur");
                                token = jwt.sign({prenom: results[0].Lastname, rank: 1}, secretKey, {expiresIn: '24h'});
                                break;
                            case 0:
                                console.log("Utilisateur normal");
                                token = jwt.sign({prenom: results[0].Lastname, rank: 0}, secretKey, {expiresIn: '24h'});
                                break;
                            default:
                                console.log("Erreur lors de la récupération du rank");
                                break;
                        }
                        res.json({success: true, token});
                    });
                });
            };
        });
    });

    router.get("/admin", authenticateToken, checkUserRole, (req, res) => {
        if (req.user.role === 1 || req.user.role === 2) {
            // Traitez la requête pour les administrateurs
            res.json({message: 'Accès autorisé pour les administrateurs et superadmin'});
        } else {
            console.log("Accès interdit pour les autres rôles");
            res.sendStatus(403); // Accès interdit pour les autres rôles
        }
    });

    return router;
};
