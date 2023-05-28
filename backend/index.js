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


// Route pour la page de tableau de bord de admin
app.use('/dashboard', express.static(path.join(__dirname, 'public', 'admin'), { index: 'dashboard1.html' }));
app.use('/adduser', express.static(path.join(__dirname, 'public', 'admin'), { index: 'adduser.html' }));
app.use('/userlist', express.static(path.join(__dirname, 'public', 'admin'), { index: 'clientlist.html' }));
app.use('/passchange', express.static(path.join(__dirname, 'public', 'admin'), { index: 'changepass.html' }));
app.use('/profil', express.static(path.join(__dirname, 'public', 'admin'), { index: 'profil.html' }));
app.use('/settings', express.static(path.join(__dirname, 'public', 'admin'), { index: 'Settings.html' }));
app.use('/reports', express.static(path.join(__dirname, 'public', 'admin'), { index: 'reports.html' }));
app.use('/changemdp', express.static(path.join(__dirname, 'public', 'admin'), { index: 'changeemail.html' }));


// Route pour la page de tableau de bord de entreprise
app.use('/login', express.static(path.join(__dirname, 'public', 'entreprise'), { index: 'login.html' }));
app.use('/about0', express.static(path.join(__dirname, 'public', 'entreprise'), { index: 'about0.html' }));
app.use('/about', express.static(path.join(__dirname, 'public', 'entreprise'), { index: 'about.html' }));

app.use('/contact', express.static(path.join(__dirname, 'public', 'entreprise'), { index: 'contact.html' }));
app.use('/contact0', express.static(path.join(__dirname, 'public', 'entreprise'), { index: 'contact0.html' }));
app.use('/crud', express.static(path.join(__dirname, 'public', 'entreprise'), { index: 'crud.html' }));
app.use('/index0', express.static(path.join(__dirname, 'public', 'entreprise'), { index: 'index0.html' }));
app.use('/index', express.static(path.join(__dirname, 'public', 'entreprise'), { index: 'index.html' }));
app.use('/register', express.static(path.join(__dirname, 'public', 'entreprise'), { index: 'register.html' }));
app.use('/addads', express.static(path.join(__dirname, 'public', 'entreprise'), { index: 'addAds.html' }));


app.use(session({
  secret: '81tunisie',
  resave: false,
  saveUninitialized: true
}));


// Routes pour les utilisateurs
app.use('/user', utilisateurRoutes);
app.use('/admin', adminRoutes);
app.use('/entreprise', entrepriseRoutes);
app.use('/exchange', exchangeRoutes);


// Démarrage du serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
