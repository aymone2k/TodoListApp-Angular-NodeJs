const User = require('../models/user.model');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

//revoir pour rajouter image avatar
module.exports={
//SignIn 
    signIn: async (req, res, next)=>{
        try{
            const user = await User.findOne({email: req.body.email})
            if(user === null){
                return res.status(401).json({message: `email ou mot de passe incorrect!`})
            }

            const isValidPassword = User.validatePassword(req.body.password, user.password)
            if(!isValidPassword){
                return res.status(401).json({message: `email ou mot de passe incorrect!`})
            }

            const accessToken = jwt.sign({user_id: user._id,email: user.email}, process.env.JWT_TOKEN_SECRET)
            res.status(200).send({token: accessToken})

        } catch (err){ 
            res.status(500).json({message: err.message})
        }},
        
      
//SignUp
    signUp: async (req, res, next)=>{
     try{
         const userExist = await User.exists({email: req.body.email});
         if(userExist){
             return res.status(400).json({message: 'Cet ulilisateur existe déjà!'})
             }
             
         const user = new User({
            ...req.body ,
            password: User.generatePasswordHash(req.body.password),
          
        })
 
       await user.save();
       res.status(201).json({message: 'Votre compte a été crée!'});
            
        }
        catch(err){res.status(500).json({message: err.message})};
    },

//UpdateUser
  //penser à la modification  de l'image avatar en database
    updateUser : (req, res, next)=>{
        //voir si utile ici car meme fonctionnalité que l'auth
        const userLog = req.params.id
        if(!userLog){
            res.status(400).json({message: "veuillezrr vous connecter pour modifier votre compte"})
        }
        if(userLog != req.body.id){
            res.status(400).json({message: "veuillez vous connecter pour modifier votre compte"})
        }

        User.findOne({_id: req.body.id})
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