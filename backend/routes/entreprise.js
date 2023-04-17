const express = require('express');
const router = express.Router();
const connection = require('../config/config');
const bodyParser = require('body-parser');
const validator=require('Validator');
const bcrypt = require('bcrypt');

// Configuration de bodyParser pour traiter les données POST
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());






router.post('/create', async (req, res) => {
  try {
    console.log('Requête reçue :', req.body);
    
    const utilisateur = {
      ID_Entreprise: req.body.ID_Entreprise,
      Nom_Entreprise: req.body.Nom_Entreprise,
      Email: req.body.Email,
      Mot_de_passe: req.body.Mot_de_passe,
      Solde: req.body.Solde,
    };
    
    // Vérification des champs obligatoires
    if (!utilisateur.Nom_Entreprise) {
      return res.status(400).send('Le champ Nom_Entreprise est obligatoire');
    }
    
    if (!utilisateur.Email) {
      return res.status(400).send('Le champ Email est obligatoire');
    }
    
    if (!utilisateur.Mot_de_passe) {
      return res.status(400).send('Le champ Mot_de_passe est obligatoire');
    }
    
    
    // Vérification de l'adresse e-mail
    if (!validator.isEmail(utilisateur.Email)) {
      return res.status(400).send('Adresse e-mail invalide');
    }
    
    // Vérification de la complexité du mot de passe
    if (utilisateur.Mot_de_passe.length < 8 || !/\d/.test(utilisateur.Mot_de_passe) || !/[A-Z]/.test(utilisateur.Mot_de_passe) || !/[a-z]/.test(utilisateur.Mot_de_passe)) {
      return res.status(400).send('Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre');
    }
    
    // Hachage du mot de passe
    const saltRounds = 10; // Nombre de tours pour le sel de hachage
    const hash = await bcrypt.hash(utilisateur.Mot_de_passe, saltRounds);

    const query = 'INSERT INTO entreprises (ID_Entreprise, Nom_Entreprise, Email, Mot_de_passe, Solde) VALUES (?, ?, ?, ?, ?)';

    connection.query(query, [
      utilisateur.ID_Entreprise,
      utilisateur.Nom_Entreprise,
      utilisateur.Email,
      hash, // Stocke le hachage dans la base de données au lieu du mot de passe brut
      utilisateur.Solde,
    ]);
    console.log('Entreprise ajoutée avec succès');
    res.send('Entreprise ajoutée avec succès');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});




//------------------------------------------------------------------------------------




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

//--------------------------------------------------------------------------------------------------------

// Route pour mettre à jour une entreprise

router.put('/update/:id', async (req, res) => {
  try {
    console.log('Requête reçue :', req.body);

    const entreprise = {
      ID_Entreprise: req.params.id,
      Nom_Entreprise: req.body.Nom_Entreprise,
      Email: req.body.Email,
      Mot_de_passe: req.body.Mot_de_passe,
      Solde: req.body.Solde
    };

    // Vérification des champs obligatoires
    if (!entreprise.Nom_Entreprise || !entreprise.Email || !entreprise.Mot_de_passe) {
      return res.status(400).send('Les champs Nom_Entreprise, Email et Mot_de_passe sont obligatoires');
    }

    // Vérification de l'adresse e-mail
    if (!validator.isEmail(entreprise.Email)) {
      return res.status(400).send('Adresse e-mail invalide');
    }

    // Vérification de la complexité du mot de passe
    if (entreprise.Mot_de_passe.length < 8 || !/\d/.test(entreprise.Mot_de_passe) || !/[A-Z]/.test(entreprise.Mot_de_passe) || !/[a-z]/.test(entreprise.Mot_de_passe)) {
      return res.status(400).send('Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre');
    }

    // Hashage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(entreprise.Mot_de_passe, salt);
    entreprise.Mot_de_passe = hashedPassword;

    const query = 'UPDATE entreprises SET Nom_Entreprise = ?, Email = ?, Mot_de_passe = ?, Solde = ? WHERE ID_Entreprise = ?';

    connection.query(query, [
      entreprise.Nom_Entreprise,
      entreprise.Email,
      entreprise.Mot_de_passe,
      entreprise.Solde,
      entreprise.ID_Entreprise
    ]);
    console.log('Entreprise mise à jour avec succès');
    res.send('Entreprise mise à jour avec succès');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});




// Route pour supprimer un utilisateur
router.delete('/del/:id', (req, res) => {
    const query = 'DELETE FROM Utilisateurs WHERE ID_Utilisateur = ?';
    connection.query(query, [req.params.id], (err, rows) => {
      if (err) throw err;
      console.log(rows);
      res.send(rows);
    });
  });

module.exports=router;
module.exports=router;