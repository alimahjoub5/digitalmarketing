const express = require('express');
const router = express.Router();
const connection = require('../config/config');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Configuration de bodyParser pour traiter les données POST
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Route pour effectuer une transaction entre une entreprise et un administrateur
router.post('/transaction', (req, res) => {
  const transaction = {
    emetteur: req.body.emetteur,
    receveur: req.body.receveur,
    montant: req.body.montant
    };
    
    // Convertir les valeurs en nombres
    const emetteur = Number(transaction.emetteur);
    const receveur = Number(transaction.receveur);
    const montant = parseFloat(transaction.montant);
    
    console.log(transaction);
    
    // Vérifier le solde de l'entreprise émettrice
    connection.query('SELECT Solde FROM entreprises WHERE ID_Entreprise = ?', [emetteur], (err, rows) => {
    if (rows.length==0){
      res.status(500).send("entreprise n'exite pas");
      return;    
    }
      if (err) {
    console.error(err);
    throw new Error("Une erreur s'est produite lors de la vérification du solde de l'entreprise émettrice");
    }

    // Récupérer le solde de l'entreprise émettrice depuis la réponse de la requête
    const result = rows.map(row => row.Solde);
    console.log(result);
    
    // Vérifier si l'entreprise émettrice dispose de suffisamment de fonds pour effectuer la transaction
    if (montant > result) {
      res.status(500).send("L'entreprise n'a pas suffisamment de fonds pour effectuer cette transaction");
      return;
    }
    
    // Mettre à jour le solde de l'entreprise émettrice
    const nouveauSoldeEntreprise = result - montant;
    if (nouveauSoldeEntreprise<0){
      nouveauSoldeEntreprise=0;
    }
    
    const query = `UPDATE entreprises SET solde = ${nouveauSoldeEntreprise} WHERE ID_Entreprise = ?;`;
    connection.query(query, [emetteur], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Une erreur s'est produite lors de la mise à jour du solde de l'entreprise émettrice");
        return;
      }
    
      // Ajouter le montant de la transaction au solde de l'administrateur receveur
      const query1 = 'UPDATE administrateurs SET Solde = Solde + ? WHERE ID_Admin = 1';
      connection.query(query1, [montant, receveur], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("Une erreur s'est produite lors de la mise à jour du solde de l'administrateur receveur");
          return;
        }
    
        // Insérer la transaction dans la table transactions
        const dateTime = new Date().toISOString().slice(0, 19).replace('T', ' '); // Date et heure au format YYYY-MM-DD HH:MM:SS
        const query2 = 'INSERT INTO transactions (ID_Emetteur, ID_Receveur, Montant, Date_de_transaction) VALUES (?, ?, ?, ?)';
        connection.query(query2, [emetteur, receveur, montant, dateTime], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send("Une erreur s'est produite lors de l'insertion de la transaction dans la table transactions");
            return;
          }
    
          res.send("La transaction a été effectuée avec succès");
        });
      });
    });
    });
    });




    
// Route pour effectuer une transaction entre une entreprise et un administrateur
router.post('/transactionClient', (req, res) => {
  const transaction = {
    emetteur: req.body.emetteur,
    receveur: req.body.receveur,
    montant: req.body.montant
    };
    
    // Convertir les valeurs en nombres
    const emetteur = Number(transaction.emetteur);
    const receveur = Number(transaction.receveur);
    const montant = parseFloat(transaction.montant);
    
    console.log(transaction);
    
    // Vérifier le solde de l'entreprise émettrice
    connection.query('SELECT Solde FROM utilisateurs WHERE ID_Utilisateur = ?', [emetteur], (err, rows) => {
    if (rows.length==0){
      res.status(500).send("utilisateurs n'exite pas");
      return;    
    }
      if (err) {
    console.error(err);
    throw new Error("Une erreur s'est produite lors de la vérification du solde de l'entreprise émettrice");
    }

    // Récupérer le solde de l'entreprise émettrice depuis la réponse de la requête
    const result = rows.map(row => row.Solde);
    console.log(result);
    
    // Vérifier si l'entreprise émettrice dispose de suffisamment de fonds pour effectuer la transaction
    if (montant > result) {
      res.status(500).send("L'entreprise n'a pas suffisamment de fonds pour effectuer cette transaction");
      return;
    }
    
    // Mettre à jour le solde de l'entreprise émettrice
    const nouveauSoldeEntreprise = result - montant;
    if (nouveauSoldeEntreprise<0){
      nouveauSoldeEntreprise=0;
    }
    
    const query = `UPDATE utilisateurs SET Solde = ${nouveauSoldeEntreprise} WHERE ID_Utilisateur = ?;`;
    connection.query(query, [emetteur], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Une erreur s'est produite lors de la mise à jour du solde de l'entreprise émettrice");
        return;
      }
    
      // Ajouter le montant de la transaction au solde de l'administrateur receveur
      const query1 = 'UPDATE utilisateurs SET Solde = Solde + ? WHERE ID_Utilisateur = ?';
      connection.query(query1, [montant, receveur], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("Une erreur s'est produite lors de la mise à jour du solde de l'administrateur receveur");
          return;
        }
    
        // Insérer la transaction dans la table transactions
        const dateTime = new Date().toISOString().slice(0, 19).replace('T', ' '); // Date et heure au format YYYY-MM-DD HH:MM:SS
        const query2 = 'INSERT INTO transactions (ID_Emetteur, ID_Receveur, Montant, Date_de_transaction) VALUES (?, ?, ?, ?)';
        connection.query(query2, [emetteur, receveur, montant, dateTime], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send("Une erreur s'est produite lors de l'insertion de la transaction dans la table transactions");
            return;
          }
    
          res.send("La transaction a été effectuée avec succès");
          res.redirect("/payment")
        });
      });
    });
    });
    });




    //---------------------------------------------------------------------------------------



    // Route pour effectuer une transaction entre un utilisateur et autre
router.post('/transactionAdmin', (req, res) => {
  const transaction = {
    emetteur: req.body.emetteur,
    receveur: req.body.receveur,
    montant: req.body.montant
    };
    
    // Convertir les valeurs en nombres
    const emetteur = Number(transaction.emetteur);
    const montant = parseFloat(transaction.montant);
    
    console.log(transaction);
    
    // Vérifier le solde de l'entreprise émettrice
    connection.query('SELECT Solde FROM entreprises WHERE ID_Entreprise = ?', [emetteur], (err, rows) => {
    if (rows.length==0){
      res.status(500).send("entreprise n'exite pas");
      return;    
    }
      if (err) {
    console.error(err);
    throw new Error("Une erreur s'est produite lors de la vérification du solde de l'entreprise émettrice");
    }

    // Récupérer le solde de l'entreprise émettrice depuis la réponse de la requête
    const result = rows.map(row => row.Solde);
    console.log(result);
    
    // Vérifier si l'entreprise émettrice dispose de suffisamment de fonds pour effectuer la transaction
    if (montant > result) {
      res.status(500).send("L'entreprise n'a pas suffisamment de fonds pour effectuer cette transaction");
      return;
    }
    
    // Mettre à jour le solde de l'entreprise émettrice
    const nouveauSoldeEntreprise = result - montant;
    if (nouveauSoldeEntreprise<0){
      nouveauSoldeEntreprise=0;
    }
    
    const query = `UPDATE entreprises SET solde = ${nouveauSoldeEntreprise} WHERE ID_Entreprise = ?;`;
    connection.query(query, [emetteur], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Une erreur s'est produite lors de la mise à jour du solde de l'entreprise émettrice");
        return;
      }
    
      // Ajouter le montant de la transaction au solde de l'administrateur receveur
      const query1 = 'UPDATE administrateurs SET Solde = Solde + ? WHERE ID_Admin = 1';
      connection.query(query1, [montant], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("Une erreur s'est produite lors de la mise à jour du solde de l'administrateur receveur");
          return;
        }
    
        // Insérer la transaction dans la table transactions
        const dateTime = new Date().toISOString().slice(0, 19).replace('T', ' '); // Date et heure au format YYYY-MM-DD HH:MM:SS
        const query2 = 'INSERT INTO transactions (ID_Emetteur, ID_Receveur, Montant, Date_de_transaction) VALUES (?, 1, ?, ?)';
        connection.query(query2, [emetteur, montant, dateTime], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send("Une erreur s'est produite lors de l'insertion de la transaction dans la table transactions");
            return;
          }
    
          res.send("La transaction a été effectuée avec succès");
        });
      });
    });
    });
    });

module.exports = router;