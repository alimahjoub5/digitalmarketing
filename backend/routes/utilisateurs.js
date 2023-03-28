const express = require('express');
const router = express.Router();
const connection = require('../config/config');


// Route pour créer un nouvel utilisateur
router.post('/create', (req, res) => {
  const utilisateur = req.body;
  connection.query('INSERT INTO Utilisateurs SET ?', utilisateur, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Utilisateur ajouté avec succès');
  });
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