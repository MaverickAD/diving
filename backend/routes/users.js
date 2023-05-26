let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');

module.exports = (db) => {
  // GET /users
  router.get('/', (req, res) => {
    db.query('SELECT * FROM Application_User', (err, rows) => {
      if (err) throw err;
      res.json(rows);
    });
  });

  // Route pour l'inscription d'un nouvel utilisateur
  router.post('/signup', (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    // Vérifier si les paramètres nécessaires sont fournis
    if (!firstname || !lastname || !email ||  !password) {
      return res.status(400).json({ message: 'Nom, prénom, Email et mot de passe requis' });
    }

    // Générer le sel et hacher le mot de passe
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.error('Erreur lors du hachage du mot de passe :', err);
        return res.status(500).json({ message: 'Erreur lors de l\'inscription' });
      }
      function generate_guid() {
        let dt = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
            function( c ) {
              var rnd = Math.random() * 16;//random number in range 0 to 16
              rnd = (dt + rnd)%16 | 0;
              dt = Math.floor(dt/16);
              return (c === 'x' ? rnd : (rnd & 0x3 | 0x8)).toString(16);
            });
      }

      let GUID = generate_guid();
      // Insérer l'utilisateur dans la base de données
      const query = 'INSERT INTO Application_User (Id_Application_User, Lastname, Firstname, Email, User_Password, Theme) VALUES (?, ?, ?, ?, ?, ?)';
      db.query(query, [GUID, lastname, firstname, email,  hash, "WHITE"], (err, result) => {
        if (err) {
          console.error('Erreur lors de l\'insertion de l\'utilisateur :', err);
          return res.status(500).json({ message: 'Erreur lors de l\'inscription' });
        }
        res.json({ message: 'Inscription réussie' });
      });
    });
  });

  // Route pour la connexion d'un utilisateur existant
  router.post('/signin', (req, res) => {
    const { email, password } = req.body;

    // Vérifier si les paramètres nécessaires sont fournis
    if (!email || !password) {
      return res.status(400).json({ message: 'Nom d\'utilisateur et mot de passe requis' });
    }

    // Récupérer l'utilisateur depuis la base de données
    const query = 'SELECT * FROM Application_User WHERE Email = ?';
    db.query(query, [email], (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération de l\'utilisateur :', err);
        return res.status(500).json({ message: 'Erreur lors de la connexion' });
      }

      // Vérifier si l'utilisateur existe
      if (results.length === 0) {
        return res.status(401).json({ message: 'Utilisateur non trouvé' });
      }

      // Comparer le mot de passe fourni avec le mot de passe haché dans la base de données
      const user = results[0];
      console.log(password);
      console.log(user.User_Password);
      bcrypt.compare(password, user.User_Password, (err, result) => {
        if (err) {
          console.error('Erreur lors de la comparaison des mots de passe :', err);
          return res.status(500).json({ message: 'Erreur lors de la connexion' });
        }

        if (!result) {
          return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        res.json({ message: 'Connexion réussie' });
      });
    });
  });

  return router;
};