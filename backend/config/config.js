const mysql = require('mysql2');

// Créer une connexion à la base de données
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'password',
  database: 'nom_de_la_base_de_donnees'
});

// Tester la connexion
connection.connect((error) => {
  if (error) {
    console.error('Erreur de connexion à la base de données : ', error);
  } else {
    console.log('Connexion à la base de données réussie !');
  }
});
