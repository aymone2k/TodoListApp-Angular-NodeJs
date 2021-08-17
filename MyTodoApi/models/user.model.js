const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')


const userSchema = mongoose.Schema({
    name: {type: String, required:true},
    email: {type: String, required:true, unique: true},
    password:  {type: String, required:true},
    createdAt: {type: Date, default: Date.now},
    avatar:{type: String, default:'image à télécharger'},
    //configuer avatar avec un image par défaut
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);