const multer = require('multer'); // on importe multer

const MIME_TYPES = { // on definit les mime types des fichiers images
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpg',
    'image/png' : 'png',
}

const storage = multer.diskStorage({ //configuration de la destination d'enregistrements des images et du nom des images par rapport à la date
    destination: (req, file, callback) =>{
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
})

module.exports = multer({ storage }).single('image'); // on exporte notre storage avec la fonction multer à laquelle on fait passer la fonction single('image') pour dire que ce sont des fichiers images uniques