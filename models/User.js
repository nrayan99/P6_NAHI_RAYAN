const mongoose = require('mongoose');
const MongooseErrors = require('mongoose-errors'); // Permet de remonter les erreurs issue de la base de données  
const uniqueValidator = require('mongoose-unique-validator'); // Permet de verifier que l'utilisateur est unique afin de ne pas créer de doubler et de remonter les erreurs

const userSchema = mongoose.Schema({ // On crée le schéma pour l'utilisateur 
    email: {type : String, required: true , unique : true},
    password: {type: String, required: true}
});

userSchema.plugin(uniqueValidator); // On passe le schéma au plugin unique validator
userSchema.plugin(MongooseErrors); // on passe le schéma au plugin mongoose-errors

module.exports = mongoose.model('User',userSchema); // On exporte le model afin de l'utilliser 