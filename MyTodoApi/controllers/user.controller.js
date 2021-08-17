const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

//revoir pour rajouter image avatar
module.exports={
//SignIn 
    signIn:(req, res, next)=>{
        User.findOne({email: req.body.email})
        .then(user=>{
            if(!user){
                return res.status(401).json({message: `email ou mot de passe incorrect!`})
            }
            bcrypt.compare(req.body.password, user.password)
            .then((valid)=>{
                if(!valid){
                    return res.status(401).json({message: `email ou mot de passe incorrect!`})
                }
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign({userId: user._id}, process.env.JWT_TOKEN_SECRET, {expiresIn:'24h'})
                })
             })
            .catch((err)=>res.status(500).json({err}));
        })
        .catch((err)=>res.status(500).json({err}));
    },

//SignUp
    signUp:(req, res, next)=>{
        bcrypt.hash(req.body.password, 10)
        .then((hash)=>{
            const user = new User({
                email:req.body.email,
                password:hash,
                name:req.body.name,
            })
            user.save()
            .then((user)=>res.status(201).json({message: 'Votre compte a été crée!'}))
        })
        .catch((err)=> res.status(500).json({err}));
    },

//UpdateUser
  //penser à la modification  de l'image avatar en database
    updateUser:(req, res, next)=>{
        if(!req.user){
            res.status(400).json({message: "veuillez vous connecter pour modifier votre compte"})
        }
        if(req.user._id != req.body.userId){
            res.status(400).json({message: "veuillez vous connecter pour modifier votre compte"})
        }
        User.findOne({_id: req.body.userId})
        .then((user)=>{
            const oldEmail = user.email
            user.name = req.body.name ? req.body.name : user.name;
            user.email = req.body.email ? req.body.email : user.email;
            
            user.save()
            .then((user)=>{
                if(oldEmail != user.email){
                    res.status(200).json({message:`votre email a été modifié, veuillez vous reconnecter avec l'email: ${user.email}`})
                }
                res.status(200).json({message: 'votre compte a été mis à jour'})
             })
            .catch((err)=> res.status(400).json({err}))
            })
        .catch((err)=> res.status(400).json({err}))
    },

// Reset Password
    resetPassord:(req,res, next)=>{
       
//modification du mdp + renvoi d'un nouveau mdp par mail avec nodemailer
  //penser à la suppression de l'image en database
    }
}