const express = require('express');
const app = express();
const utilisateurRoutes = require('./routes/utilisateurs');

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Routes pour les utilisateurs

// Démarrage du serveur
app.listen(3001, () => {
  console.log('Serveur démarré sur le port 3000');
});
