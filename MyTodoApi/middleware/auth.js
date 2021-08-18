const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
// à mettre en place et vérifier lors via l'app
module.exports ={
    userAuthenticated: async (req, res, next)=>{
        const authHeader = req.headers.authorization
        if(!authHeader){
            return res.status(401).json({message:"Veuillez vous connecter"})
        }

        const token = authHeader.split(' ')[1];
        try{
            req.user = jwt.verify(token, process.env.JWT_TOKEN_SECRET)
        }catch(err){
            res.status(401).json({message: 'Invalid user ID'})
        }
        next();
    }
}