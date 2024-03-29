const express = require('express');
const router = express.Router();
const connection = require('../config/config');
const bodyParser = require('body-parser');
const validator=require('Validator');


// Configuration de bodyParser pour traiter les données POST
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.use(express.json());


router.post('/create', (req, res) => {
  try{
    const utilisateur = {
      ID_Entreprise: req.body.Nom_Utilisateur,
      Nom_Entreprise: req.body.Email,
      Email: req.body.tel,
      Mot_de_passe: req.body.Mot_de_passe,
      Date_de_naissance: req.body.Date_de_naissance,
      Ville: req.body.Ville,

    };
  const query = `INSERT INTO utilisateurs (Nom_Utilisateur, Email, tel, Mot_de_passe, Date_de_naissance, Ville) VALUES (?, ?, ?, ?, ?, ?)`;
  connection.query(query, [
    utilisateur.Nom_Utilisateur,
    utilisateur.Email,
    utilisateur.tel,
    utilisateur.Mot_de_passe, 
    utilisateur.Date_de_naissance,
    utilisateur.Ville,

  ]); } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }});






//-------------------------------------------------------------------------------------------------------




// Route pour récupérer tous les utilisateurs
router.get('/get', (req, res) => {
  connection.query('SELECT * FROM Utilisateurs', (err, rows) => {
    if (err) throw err;
    console.log(rows);
    res.send(rows);
  });
});

// Route pour récupérer un utilisateur par son ID
router.get('/getid/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM Utilisateurs WHERE ID_Utilisateur = ?';
  connection.query(query, [id], (err, rows) => {
    if (err) throw err;
    console.log(rows);
    res.send(rows);
  });
});



//------------------------------------------------------------------------------------------------



// Route pour mettre à jour un utilisateur
router.put('/update/:id', async (req, res) => {
  try {
    console.log('Requête reçue :', req.body);

    const utilisateur = {
      ID_utilisateur: req.params.id,
      Nom_Utilisateur: req.body.Nom_Utilisateur,
      Email: req.body.Email,
      Mot_de_passe: req.body.Mot_de_passe,
      Solde: req.body.Solde,
      Image_de_profil: req.body.Image_de_profil,
      Date_de_naissance: req.body.Date_de_naissance,
      Ville: req.body.Ville,
    };
/*
    // Vérification des champs obligatoires
    // Vérification des champs obligatoires
    if (!utilisateur.Nom_Utilisateur) {
      return res.status(400).send('Le champ Nom_Utilisateur est obligatoire');
    }

    if (!utilisateur.Email) {
      return res.status(400).send('Le champ Email est obligatoire');
    }

    if (!utilisateur.Ville) {
      return res.status(400).send('Le champ Ville est obligatoire');
    }

    if (!utilisateur.Mot_de_passe) {
      return res.status(400).send('Le champ Mot_de_passe est obligatoire');
    }

    if (!utilisateur.Date_de_naissance) {
      return res.status(400).send('Le champ Date_de_naissance est obligatoire');
    }

    // Vérification de l'adresse e-mail
    if (!validator.isEmail(utilisateur.Email)) {
      return res.status(400).send('Adresse e-mail invalide');
    }

    // Vérification de la complexité du mot de passe
    if (utilisateur.Mot_de_passe.length < 8 || !/\d/.test(utilisateur.Mot_de_passe) || !/[A-Z]/.test(utilisateur.Mot_de_passe) || !/[a-z]/.test(utilisateur.Mot_de_passe)) {
      return res.status(400).send('Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre');
    }
*/

    const query = 'UPDATE utilisateurs SET Nom_Utilisateur = ?, Email = ?, Mot_de_passe = ?, Solde = ?, Image_de_profil = ?, Date_de_naissance = ?, Ville = ? WHERE ID_utilisateur = ?';

    connection.query(query, [
      utilisateur.Nom_Utilisateur,
      utilisateur.Email,
      utilisateur.Mot_de_passe,
      utilisateur.Solde,
      utilisateur.Image_de_profil,
      utilisateur.Date_de_naissance,
      utilisateur.Ville,
      utilisateur.ID_utilisateur
    ]);
    console.log('Utilisateur mis à jour avec succès');
    res.send('Utilisateur mis à jour avec succès');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

// Route pour blocker un utilisateur
router.post('/block/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    console.log('Requête reçue :', req.body);
    const query = 'UPDATE utilisateurs SET Etat = 0 WHERE ID_utilisateur = ?';
    connection.query(query, [userId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Erreur serveur');
      } else {
        console.log('Utilisateur mis à jour avec succès');
        res.send('Utilisateur mis à jour avec succès');
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

// Route pour unblocker un utilisateur
router.post('/unblock/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    console.log('Requête reçue :', req.body);
    const query = 'UPDATE utilisateurs SET Etat = 1 WHERE ID_utilisateur = ?';
    connection.query(query, [userId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Erreur serveur');
      } else {
        console.log('Utilisateur mis à jour avec succès');
        res.send('Utilisateur mis à jour avec succès');
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

//-----------------------------------------------------------------------------------------------------


// Route pour supprimer un utilisateur
router.post('/del/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const query = 'DELETE FROM utilisateurs WHERE ID_Utilisateur = ?';
    connection.query(query, [userId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Erreur serveur');
      } else {
        console.log('Utilisateur supprimé avec succès');
        res.send('Utilisateur supprimé avec succès');
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});



//----------------------------------------------------------------------------------------------------


// Route pour la connexion
router.post('/login', (req, res) => {
  // Récupère les informations de connexion depuis la requête
  const email = req.body.email;
  const password = req.body.password;

  // Vérifie les informations de connexion dans la base de données
  connection.query(
    'SELECT * FROM utilisateurs WHERE Email = ? AND Mot_de_passe = ?',
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
        res.redirect('/index11');
      } else {
        // Si la connexion échoue, renvoie une réponse avec un code de statut 401
        res.status(401)
        // Rediriger vers la page de connexion avec un message d'erreur
        res.redirect('/connexion?erreur=1');
      }
    }
  );
});



module.exports=router;