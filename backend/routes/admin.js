const express = require('express');
const router = express.Router();
const connection = require('../config/config');
const bodyParser = require('body-parser');
const { route } = require('./transaction');

// Configuration de bodyParser pour traiter les données POST
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

const session = require('express-session');





router.post('/adresse', (req, res) => {
  // Récupère l'ID de l'utilisateur à partir de la session
  const userId = req.session.userId;
  const newEmail = req.body['new-email'];

  // Vérifie si l'ID de l'utilisateur est défini
  if (userId) {
    // Effectuez ici la logique pour mettre à jour l'adresse email de l'utilisateur dans la base de données
    // Remplacez les exemples de code ci-dessous par votre propre logique de mise à jour de l'adresse email

    // Exemple de code de mise à jour de l'adresse email dans la base de données
    connection.query(
      'UPDATE Administrateurs SET Email = ? WHERE ID_Admin = ?;',
      [newEmail, userId],
      (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).send('Erreur serveur');
        }else {
            res.redirect('/settings');
          }
      }
    );
    
  } else {
    // Si l'ID de l'utilisateur n'est pas défini, renvoie une réponse avec un code de statut 401
    res.status(401).send('Non autorisé');
  }
});


router.post('/chpass', (req, res) => {
  // Récupère l'ID de l'utilisateur à partir de la session
  const userId = req.session.userId;
  const newEmail = req.body['new-email'];

  // Vérifie si l'ID de l'utilisateur est défini
  if (userId) {
    // Effectuez ici la logique pour mettre à jour l'adresse email de l'utilisateur dans la base de données
    // Remplacez les exemples de code ci-dessous par votre propre logique de mise à jour de l'adresse email

    // Exemple de code de mise à jour de l'adresse email dans la base de données
    connection.query(
      'UPDATE Administrateurs SET Mot_de_passe = ? WHERE ID_Admin = ?;',
      [newEmail, userId],
      (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).send('Erreur serveur');
        }else {
            res.redirect('/settings');
          }
      }
    );
    
  } else {
    // Si l'ID de l'utilisateur n'est pas défini, renvoie une réponse avec un code de statut 401
    res.status(401).send('Non autorisé');
  }
});



// Route pour la connexion
router.post('/login', (req, res) => {
  // Récupère les informations de connexion depuis la requête
  const email = req.body.email;
  const password = req.body.password;

  // Vérifie les informations de connexion dans la base de données
  connection.query(
    'SELECT * FROM administrateurs WHERE Email = ? AND Mot_de_passe = ?',
    [email, password],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Erreur serveur');
      } else if (results.length > 0) {
        // Si la connexion réussit, enregistre l'ID de l'utilisateur en session
        req.session.userId = results[0].ID_Admin;
        console.log(req.session.userId);
        // Redirige vers le tableau de bord de l'administrateur
        res.redirect('/admin/dashboard1.html');
      } else {
        // Si la connexion échoue, renvoie une réponse avec un code de statut 401
        res.status(401)
        // Rediriger vers la page de connexion avec un message d'erreur
        res.redirect('/admin/index?erreur=1');
      }
    }
  );
});


// Route pour récupérer un admin par son ID
router.get('/getid/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM administrateurs WHERE ID_Admin = ?';
    connection.query(query, [id], (err, rows) => {
      if (err) throw err;
      res.send(rows);
    });
  });


module.exports = router;
