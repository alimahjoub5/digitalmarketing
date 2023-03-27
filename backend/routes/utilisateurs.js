const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');

// Création d'une application Express
const app = express();

// Configuration de bodyParser pour traiter les données POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Route pour créer un nouvel utilisateur
app.post('/utilisateurs', (req, res) => {
  const utilisateur = req.body;
  connection.query('INSERT INTO Utilisateurs SET ?', utilisateur, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Utilisateur ajouté avec succès');
  });
});

// Route pour récupérer tous les utilisateurs
app.get('/utilisateurs', (req, res) => {
  connection.query('SELECT * FROM Utilisateurs', (err, rows) => {
    if (err) throw err;
    console.log(rows);
    res.send(rows);
  });
});

// Route pour récupérer un utilisateur par son ID
app.get('/utilisateurs/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM Utilisateurs WHERE ID_Utilisateur = ?', id, (err, rows) => {
    if (err) throw err;
    console.log(rows);
    res.send(rows);
  });
});

// Route pour mettre à jour un utilisateur
app.put('/utilisateurs/:id', (req, res) => {
  const id = req.params.id;
  const nouveauUtilisateur = req.body;
  connection.query('UPDATE Utilisateurs SET ? WHERE ID_Utilisateur = ?', [nouveauUtilisateur, id], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Utilisateur mis à jour avec succès');
  });
});

// Route pour supprimer un utilisateur
app.delete('/utilisateurs/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM Utilisateurs WHERE ID_Utilisateur = ?', id, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Utilisateur supprimé avec succès');
  });
});

// Démarrage du serveur Express
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
