const express = require('express');
const utilisateurRoutes = require('./routes/utilisateurs');
const entrepriseRoutes = require('./routes/entreprise');
const exchangeRoutes=require('./routes/transaction');
const adminRoutes=require('./routes/admin')
// Création d'une application Express
const app = express();
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const path = require('path');

// Middleware pour parser les requêtes JSON
app.use(express.json());
// Chemin vers les fichiers statiques


// Définir le dossier public pour les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Route pour la page de connexion
app.use('/login', express.static(path.join(__dirname, 'public', 'admin'), { index: 'index.html' }));


// Route pour la page de tableau de bord
app.use('/dashboard', express.static(path.join(__dirname, 'public', 'admin'), { index: 'dashboard1.html' }));
app.use('/profil', express.static(path.join(__dirname, 'public', 'admin'), { index: 'profil.html' }));
app.use('/userlist', express.static(path.join(__dirname, 'public', 'admin'), { index: 'clientlist.html' }));

// Routes pour les utilisateurs
app.use('/user', utilisateurRoutes);
app.use('/admin', adminRoutes);
app.use('/entreprise', entrepriseRoutes);
app.use('/exchange', exchangeRoutes);


// Démarrage du serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
