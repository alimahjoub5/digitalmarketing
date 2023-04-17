const express = require('express');
const utilisateurRoutes = require('./routes/utilisateurs');
const entrepriseRoutes = require('./routes/entreprise');
const exchangeRoutes=require('./routes/transaction')
// Création d'une application Express
const app = express();
// Middleware pour parser les requêtes JSON
app.use(express.json());

// Routes pour les utilisateurs
app.use('/user', utilisateurRoutes);
app.use('/entreprise', entrepriseRoutes);
app.use('/exchange', exchangeRoutes);


// Démarrage du serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
