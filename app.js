const express = require('express');

const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv').config();
const sanitize = require('express-mongo-sanitize');
const xssclean = require('xss-clean');
const helmet = require('helmet');


const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
const MONGODB_URI = process.env.MONGODB_URI;



mongoose.connect(MONGODB_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(express.json());
app.use(sanitize());
app.use(xssclean());
app.use('/images', express.static(path.join(__dirname,'images')));

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);
module.exports = app;