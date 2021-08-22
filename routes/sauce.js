const express = require('express'); // On importe express
const router = express.Router(); // On utilise la fonction Router d'express afin de configurer les routes
const sauceCtrl = require('../controllers/sauce'); // on importe le controller des sauces afin de les implanter dans les routes
const auth = require('../middleware/auth'); // on importe le middleware d'authentification afin de securiser nos routes
const multer = require('../middleware/multer-config') // on importe le middleware de configuration de multer afin de l'utiliser pour les routes necessitant le multer


// On configurer les routes pour les sauces et on les securise avec l'utilisation de auth 
router.get('/',auth,sauceCtrl.getAllSauces);
router.get('/:id',auth, sauceCtrl.getSauceById);
router.post('/',auth, multer, sauceCtrl.createSauce);
router.put('/:id',auth, multer, sauceCtrl.modifySauce);
router.delete('/:id',auth, multer, sauceCtrl.deleteSauce);
router.post('/:id/like',auth, multer, sauceCtrl.likeSauce);


module.exports = router; // on exporte le router 