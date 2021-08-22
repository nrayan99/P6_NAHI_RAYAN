const express = require('express'); // on importe express
const router = express.Router(); // On utilise la fonction Router d'express afin de configurer les routes
const userCtrl = require('../controllers/user'); // On importe le controller des user afin de l'utiliser dans les routes


// on configure les routes pour les users
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);


module.exports = router; // on exporte le router