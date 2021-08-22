const Sauce = require('../models/Sauce'); // On importe le modele des sauces
const fs = require('fs'); // Permet d'intéragir avec les fichiers du système, ici permet de supprimer les images

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))// Permet de recupérer toutes les sauces
    .catch(error => res.status(400).json({ error }))
}
exports.getSauceById = (req, res, next) => { // Permet de récupérer la sauce selon l'ID
    Sauce.findOne({_id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({error}));
}
exports.createSauce = (req, res, next) => { // Permet de créer une sauce 
    const sauceObject = JSON.parse(req.body.sauce)
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes : 0,
        dislikes : 0,
        usersLiked : [],
        usersDisliked : [],
    });
    sauce.save()
        .then(() => res.status(201).json({message:'Sauce enregistrée'}))
        .catch(error => res.status(404));

}
exports.modifySauce = (req, res, next) => { // Permet de modifier une sauce
    if (req.file){ // supprime l'ancienne photo si une nouvelle photo est émise lors de la modification
        Sauce.findOne({_id : req.params.id})
        .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () =>{
    
        });
    })
    .catch(error => res.status(500).json({ error }))
    }
    const sauceObject = req.file ? // modification lorsqu'une image est émise
    {  
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
     : {...req.body} // modification lorsqu'il n'y a pas d'image émise
    Sauce.updateOne( {_id : req.params.id}, {...sauceObject, _id : req.params.id})
    .then(() => res.status(200).json({ message: 'Sauce modifiée'}))
    .catch(error => res.status(400).json({error}));

}

exports.deleteSauce = (req, res, next) => { // Permet de supprimer une sauce
    Sauce.findOne({_id : req.params.id})
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () =>{ // supprime l'image de la sauce
            Sauce.deleteOne({ _id: req.params.id})
            .then(() => res.status(200).json({ message: 'Sauce supprimée'}))
            .catch(error => res.status(400).json({error}));

        });
    })
    .catch(error => res.status(500).json({ error }))
}
exports.likeSauce = (req, res, next) => { // Permet de like ou dislike une sauce
    const like = req.body.like;

    if ( like ===1 )
    {
        Sauce.findOne({_id : req.params.id})
        .then(sauce=> {
            
                Sauce.updateOne({_id : req.params.id},
                    {
                        $inc : {likes : 1},
                        $push : { usersLiked : req.body.userId}
                    })
                    .then(() => res.status(200).json({ message: "Like ajouté"}))
                    .catch(error => res.status(400).json({error}));
            
           
        })
        .catch(error => res.status(400).json({error}))
    }  
    if (like ===0 )
    {
        Sauce.findOne({_id : req.params.id})
        .then(sauce=> {
            if ( sauce.usersLiked.includes(req.body.userId))
            {
                Sauce.updateOne({_id : req.params.id},
                    {
                        $inc : { likes : -1},
                        $pull : { usersLiked : req.body.userId}
                    })
                    .then(() => res.status(200).json({ message: 'Like supprimé'}))
                    .catch(error => res.status(400).json({error}));
            }
            if( sauce.usersDisliked.includes(req.body.userId))
            {
                Sauce.updateOne({_id : req.params.id},
                    {
                        $inc : { dislikes : -1},
                        $pull : { usersDisliked : req.body.userId}
                    })
                    .then(() => res.status(200).json({ message: 'Dislike supprimé'}))
                    .catch(error => res.status(400).json({error}));
            }
        })
        .catch(error => res.status(400).json({error}))
    }
    if (like ===-1)
    {
        Sauce.findOne({_id : req.params.id})
        .then(sauce=> {
                Sauce.updateOne({_id : req.params.id},
                    {
                        
                        $inc : {dislikes : 1},
                        $push : { usersDisliked : req.body.userId}
                    })
                    .then(() => res.status(200).json({ message: "Dislike ajouté"}))
                    .catch(error => res.status(400).json({error}));

        })
        .catch(error => res.status(400).json({error}))
    }
}