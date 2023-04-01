const express = require('express');
const router = express.Router();
const connection = require('../config/config');


// Route pour créer un nouvel utilisateur
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

// Validation des champs de saisie du formulaire
router.post('/create', [
  check('Nom_Utilisateur').notEmpty(),
  check('Email').isEmail(),
  check('Mot_de_passe').isLength({ min: 8 }),
  check('Date_de_naissance').isISO8601().toDate(),
], async (req, res) => {
  // Vérification des erreurs de validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Hashage du mot de passe de l'utilisateur
  const hash = await bcrypt.hash(req.body.Mot_de_passe, 10);

  // Création de l'objet utilisateur à insérer dans la table
  const utilisateur = {
    Nom_Utilisateur: req.body.Nom_Utilisateur,
    Email: req.body.Email,
    Mot_de_passe: hash,
    Solde: 0,
    Image_de_profil: null,
    Date_de_naissance: req.body.Date_de_naissance,
    Ville: req.body.Ville,
  };

  // Insertion de l'utilisateur dans la table
  try {
    const result = await pool.query('INSERT INTO utilisateurs SET ?', utilisateur);
    res.send('Utilisateur ajouté avec succès');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});


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


// Route pour mettre à jour un utilisateur
router.put('/udt/:id', (req, res) => {
  const id = req.params.id;
  const nouveauUtilisateur = req.body;
  connection.query('UPDATE Utilisateurs SET ? WHERE ID_Utilisateur = ?', [nouveauUtilisateur, id], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Utilisateur mis à jour avec succès');
  });
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