const User = require('../models/user.model');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const fs = require('fs');

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
            res.status(200).send({token: accessToken ,name: user.name, id: user._id })

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
             image : `${req.protocol}://${req.get('host')}/images/users/${req.file.filename}`
         }) 
 
       await user.save();
        res.status(201).json({message: 'Votre compte a été crée!'}); 
            
        }
        catch(err){res.status(500).json({message: err.message})};
    },

//UpdateUser
     updateUser : (req, res, next)=>{
        const idUser= req.body.id
        User.findOne({_id: req.params.id})
        .then((user)=>{
           
            if(req.file){//modif de l'ancienne image si nouveau fichier image
                const filename = user.image.split('/users/')[1];
                fs.unlink(`images/users/${filename}`, ()=>{
                  console.log('image supprimée:' +filename);
                })
              }

            const oldEmail = user.email;

            user.name = req.body.name ? req.body.name : user.name;
            user.email = req.body.email ? req.body.email : user.email;
            user.image = req.file ? `${req.protocol}://${req.get('host')}/images/users/${req.file.filename}` : user.image;

            user.save()
            .then((user)=>{
                if(oldEmail != user.email){
                    res.status(200).json({message:`votre email a été modifié, veuillez vous reconnecter avec l'email: ${user.email}`})
                }
                res.status(200).json({message: 'votre compte a été mis à jour'})
             })
            .catch((err)=> res.status(400).json({err:err.message}))
            })
        .catch((err)=> res.status(400).json({err:err.message}))
    },

// Reset Password
    resetPassord:(req,res, next)=>{
       
//modification du mdp + renvoi d'un nouveau mdp par mail avec nodemailer
 
    }
}