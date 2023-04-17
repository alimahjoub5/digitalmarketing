const bcrypt = require('bcrypt');

// Middleware d'authentification pour vérifier le mot de passe
const authenticateUser = async (req, res, next) => {
  const { email, password } = req.body;

  // Rechercher l'utilisateur dans la base de données par son email
  const query = 'SELECT * FROM utilisateurs WHERE Email = ?';
  connection.query(query, [email], async (err, result) => {
    if (err) throw err;

    // Si l'utilisateur est trouvé
    if (result.length > 0) {
      const utilisateur = result[0];

      // Vérifier le mot de passe
      const match = await bcrypt.compare(password, utilisateur.Mot_de_passe);

      if (match) {
        // Le mot de passe est correct, on peut continuer
        // Ajouter l'utilisateur dans la requête pour une utilisation ultérieure
        req.utilisateur = utilisateur;
        next();
      } else {
        // Le mot de passe est incorrect
        res.status(401).send('Mot de passe incorrect');
      }
    } else {
      // L'utilisateur n'est pas trouvé dans la base de données
      res.status(401).send("L'utilisateur n'existe pas");
    }
  });
};

module.exports = authenticateUser;
