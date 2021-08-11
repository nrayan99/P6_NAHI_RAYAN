const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

router.get('/',auth,sauceCtrl.getAllSauces);
router.get('/:id',auth, sauceCtrl.getSauceById);
router.post('/',auth, multer, sauceCtrl.createSauce);
router.put('/:id',auth, multer, sauceCtrl.modifySauce);
router.delete('/:id',auth, multer, sauceCtrl.deleteSauce);
router.post('/:id/like',auth, multer, sauceCtrl.likeSauce);


module.exports = router;