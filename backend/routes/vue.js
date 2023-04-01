const express = require('express');
const router = express.Router();
const connection = require('../config/config');


  function checkUser(userId, annonceId, connection) {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) AS count FROM vues WHERE ID_Utilisateur = ? AND ID_Annonce = ?',
        [userId, annonceId],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results[0].count > 0);
          }
        }
      );
    });
  }

  
  // Route pour afficher une annonce
router.get('/annonce/:ida/:idu', (req, res) => {
    const annonceId = req.params.ida;
    const userId = req.params.idu;/* obtenir l'ID de l'utilisateur actuel */;
    
    // Vérifier si l'utilisateur a déjà vu cette annonce
    const vueExist =  checkUser(userId,annonceId,connection)/* appeler votre fonction pour vérifier si l'utilisateur a déjà vu cette annonce */;
    
    if (vueExist) {
      // Si l'utilisateur a déjà vu l'annonce, rediriger vers une autre page
      res.redirect('/annonce-deja-vue');
    } else {
      // Sinon, ajouter une vue dans la table vue et mettre à jour le nombre total de vues dans la table annonce
      const dateVue = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const vue = {
        ID_Utilisateur: userId,
        ID_Annonce: annonceId,
        Date_de_vue: dateVue
      };
      
      // Ajouter la vue dans la table vue
      connection.query('INSERT INTO vues SET ?', vue, (err, result) => {
        if (err) throw err;
        console.log(result);
        
        // Mettre à jour le nombre total de vues dans la table annonce
        connection.query('UPDATE annonces SET NB_Vue = NB_Vue + 1 WHERE ID_Annonce = ?', annonceId, (err, result) => {
          if (err) throw err;
          console.log(result);
          
          // Afficher la page de l'annonce
          res.render('annonce', { annonce: /* obtenir les informations de l'annonce */ });
        });
      });
    }
  });
  



  module.exports=router;