const express = require('express');
const router = express.Router();
const connection = require('../config/config');
const bodyParser = require('body-parser');
const validator=require('Validator');

// Configuration de bodyParser pour traiter les données POST
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());
const multer = require('multer');






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
    
   

    const query = 'INSERT INTO entreprises (ID_Entreprise, Nom_Entreprise, Email, Mot_de_passe, Solde) VALUES (?, ?, ?, ?, ?)';

    connection.query(query, [
      utilisateur.ID_Entreprise,
      utilisateur.Nom_Entreprise,
      utilisateur.Email,
      utilisateur.Mot_de_passe, // Stocke le hachage dans la base de données au lieu du mot de passe brut
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



//add ads


// Route pour récupérer les catégories
router.get('/categories', (req, res) => {
  connection.query('SELECT ID_Categorie, Nom_Categorie FROM categories', (err, results) => {
    if (err) {
      console.error('Error retrieving categories: ' + err.stack);
      return;
    }

    const categories = results.map(category => `${category.ID_Categorie},${category.Nom_Categorie}`).join('\n');
    res.send(categories);
  });
});




// Configuration de Multer pour gérer l'upload de fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

// Route pour gérer l'upload de fichiers
router.post('/upload', upload.single('photo'), function (req, res, next) {
  // Récupération du nom du fichier uploadé
  const fileName = req.file.filename;

  // Insertion des données dans la table Annonce
  const annonce = {
    Titre: req.body.name,
    Description: req.body.email,
    Image: fileName,
    Cout_par_vue: req.body.phone,
    ID_Categorie: req.body.category
  };
  const query = 'INSERT INTO annonces (ID_Entreprise, Titre, Description, Image, Cout_par_vue, ID_Categorie) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [ req.session.userId, annonce.Titre, annonce.Description, annonce.Image, annonce.Cout_par_vue, annonce.ID_Categorie];
  connection.query(query, values, function (error, results, fields) {
    if (error) throw error;
    console.log('Annonce insérée avec succès');
  });

  res.send('File uploaded successfully');
});



// Route pour récupérer tous les utilisateurs
router.get('/getads', (req, res) => {
  connection.query('SELECT * FROM `annonces`', (err, rows) => {
    if (err) throw err;
    console.log(rows);
    res.send(rows);
  });
});




// Route pour la connexion
router.post('/login', (req, res) => {
  // Récupère les informations de connexion depuis la requête
  const email = req.body.Email;
  const password = req.body.Mot_de_passe;

  // Vérifie les informations de connexion dans la base de données
  connection.query(
    'SELECT * FROM entreprises WHERE Email = ?',
    [email, password],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Erreur serveur');
      } else if (results.length > 0) {
        // Redirige vers le tableau de bord de l'administrateur
        res.redirect('/index');
      } else {
        // Si la connexion échoue, renvoie une réponse avec un code de statut 401
        console.log(results);
        // Rediriger vers la page de connexion avec un message d'erreur
        res.redirect('/login1?erreur=1');
      }
    }
  );
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
