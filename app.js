const express = require('express'); // on importe express
const mongoose = require('mongoose'); // on importe mongoose
const path = require('path'); // permet d'avoir acces aux chemins de notre systeme de fichiers
const dotenv = require('dotenv').config(); // permet d'acceder aux variables d'environnement
const sanitize = require('express-mongo-sanitize'); // permet d'empecher les injections 
const xssclean = require('xss-clean'); // permet d'empecher l'utilisation cross site scripting
const helmet = require('helmet'); // permet de proteger l'application de certaines vulnerabilités bien connues du web en configurant de manière appropriés les entetes HTTP


const userRoutes = require('./routes/user'); // on importe les routes user
const sauceRoutes = require('./routes/sauce'); // on importe les routes sauce
const MONGODB_URI = process.env.MONGODB_URI; // on stock la variable d'environnement contenant l'URI de la base de données MONGODB



mongoose.connect(MONGODB_URI, // permet de se connecter à mongoDB
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
app.use(helmet());
app.use((req, res, next) => { // permet de regler  le problème de CORS (Cross Origin Resource Sharing)
  res.setHeader('Access-Control-Allow-Origin', '*'); // permet à tout le monde d'acceder à l'API
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // on donne l'autorisation d'utiliser certains Headers
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // on donne l'autorisation d'utiliser certaines methodes
  next();
});
app.use(express.json()); // transforme le corps de la requete post en JSON 
app.use(sanitize());
app.use(xssclean());
app.use('/images', express.static(path.join(__dirname,'images'))); // permet que les requetes à /images/ servent le dossier images 

app.use('/api/auth', userRoutes); // configure les routes user sur les requetes à /api/auth
app.use('/api/sauces', sauceRoutes); // configure les routes sauces sur les requêtes à /api/sauces
module.exports = app; // On exporte l'app pour l'utiliser sur les autres fichiers