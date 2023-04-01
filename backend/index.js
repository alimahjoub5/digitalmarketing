const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const utilisateurRoutes = require('./routes/utilisateurs');
const entrepriseRoutes = require('./routes/entreprise');

// Création d'une application Express

// Configuration de bodyParser pour traiter les données POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Routes pour les utilisateurs
app.use('/user', utilisateurRoutes);
app.use('/entreprise', entrepriseRoutes);

// Démarrage du serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
