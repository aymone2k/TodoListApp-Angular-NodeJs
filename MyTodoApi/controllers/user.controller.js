const User = require('../models/user.model');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const fs = require('fs');
const Reset = require('../models/resetPassword.model');
var randomToken = require('random-token');

//revoir pour rajouter image avatar
module.exports={
//SignIn 
    signIn: async (req, res, next)=>{
        try{
            const user = await User.findOne({email: req.body.email})
            if(user === null){
                return res.status(401).json({status: 401, message: `email ou mot de passe incorrect!`})
            }

            const isValidPassword = User.validatePassword(req.body.password, user.password)
            if(!isValidPassword){
                return res.status(401).json({status: 401, message: `email ou mot de passe incorrect!`})
            }

            const accessToken = jwt.sign({user_id: user._id,email: user.email}, process.env.JWT_TOKEN_SECRET)
            res.status(200).send({token: accessToken ,name: user.name, id: user._id, image: user.image , email: user.email})

        } catch (err){ 
            res.status(500).json({message: err.message})
        }}, 
        
      
//SignUp
    signUp: async (req, res, next)=>{
        //console.log(req.body)
        const userObj = JSON.parse(req.body.user)
        delete userObj._id
     try{
         const userExist = await User.exists({email: userObj.email});
         if(userExist){
             return res.status(400).json({status:400, message: 'Cet ulilisateur existe déjà!'})
             }

    bcrypt.hash(userObj.password, 10)
    .then(hash => {
        
      const user = new User({
        ...userObj,
        //image : `${req.protocol}://${req.get('host')}/images/users/${req.file.filename}`,
        //image par défaut si pas d'image enregistrée
        image : req.file ? `${req.protocol}://${req.get('host')}/images/users/${req.file.filename}` : `${req.protocol}://${req.get('host')}/images/users/profil.jpg`,
        password: hash
      });


      user.save()
        .then(() => res.status(201).json({ status: 201, message: 'Votre compte utilisateur a été créé' }))
        .catch(error => res.status(400).json({ message: 'Impossible de créer votre compte , veuillez essayer ultérieurement'}));
    })
    .catch(error => res.status(500).json({message: error.message }));
         
 
      
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
                    res.status(200).json({status: 200, message:`votre email a été modifié, veuillez vous reconnecter avec l'email: ${user.email}`})
                }
                res.status(200).json({status:200,  message: 'votre compte a été mis à jour'})
             })
            .catch((err)=> res.status(400).json({err:err.message}))
            })
        .catch((err)=> res.status(400).json({err:err.message}))
    },


    //Forgot Password

    resetPassword: async (req,res, next)=>{
            
        //modification du mdp + renvoi d'un nouveau mdp par mail avec nodemailer
        try{
            const user = await User.findOne({email: req.body.email})
            console.log(req.body)
            if(!user){
                return res.status(401).json({status: 401, message: `identifiant inconnu`})
            }
            //créer un token 
            const token = randomToken(32);

            const reset = new Reset({
                email: req.body.email,
                resetPasswordToken: token,
                resetExpires: Date.now() + 3600000
            })
            //ajout du message
            req.body.message = "<h3> Bonjour "+user.name+"</h3><br>Veuillez cliquer sur ce lien pour reinitialiser votre mot de passe:<br>"+req.protocol+"://"+"4200/update-password/"+token;
            console.log(reset)
            reset.save()
            .then(() =>
            res.status(201).json({ status: 201, message: 'Veuillez vous connecter avec le mot de passe temporaire reçu par mail' }))
            .catch(error => res.status(400).json({ message: 'Impossible de reinitialiser votre mot de passe , veuillez essayer ultérieurement'}));
                
            }
            catch(err){res.status(500).json({message: err.message})}
            next(); 
        },
    //ResetPassword
    putResetPassword: async (req, res, next)=>{
        const token = req.params.token;
        const password = req.body.password;
        try{
            const reset = await Reset.findOne({resetPasswordToken: token, resetExpires: {$gt:Date.now()}})
            
            if(!reset){
                return res.status(401).json({status: 401, message: `veuillez redemander un reset Password`})
            }
            //chercher l'user pour change mdp
          const user = await User.findOne({email: reset.email})
               
                if(!user){
                    return res.status(401).json({status: 401, message: `identifiant incorrect!`})
                }
                user.password = password;
                //attention mdp mis à jour mais pas haché!

                    user.save()
                    .then(()=>{
                        res.status(200).json({message:'votre mdp a été mis à jour, vous pouvez vous connecter'})
                    })
                    .catch((err)=>{
                        console.log(err)
                    });
                    Reset.deleteMany({email: user.email}, (err, message)=>{
                        if(err){
                            console.log(err);
                        }
                        console.log(message);
                    }); 
                
            }
            catch (err){ 
                res.status(500).json({message: err.message})
            }},




}

