const MongooseErrors = require('mongoose-errors');// Permet de remonter les erreurs issue de la base de données  
const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({ // On crée un schéma pour les sauces
 userId : {type: String, required: true},
 name : {type: String, required: true},
 manufacturer : {type: String, required: true},
 description : {type: String, required: true},
 mainPepper : {type: String, required: true},
 imageUrl : {type: String, required: true },
 heat : {type: Number, required: true},
 likes : {type: Number, required: true},
 dislikes : {type: Number, required: true},
 usersLiked : {type: [String], required: true},
 usersDisliked : {type: [String], required: true},
});

sauceSchema.plugin(MongooseErrors);
module.exports = mongoose.model('Sauce', sauceSchema); /// On exporte le schéma pour pouvoir l'utilliser 