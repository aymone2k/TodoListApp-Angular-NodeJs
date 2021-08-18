const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = mongoose.Schema(
    {
    name: {type: String, required:true},
    email: {type: String, required:true, unique: true, trim: true},
    password:  {type: String, required:true, trim:true},
    createdAt: {type: Date, default: Date.now},
    image: {type: String, default: "http://placehold.it/150x150"},
   //revoir image pour que la valeur par défaut s'affiche coté front lorsque avatar === null
});
 

userSchema.statics.generatePasswordHash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
};

userSchema.statics.validatePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword)
};

module.exports = mongoose.model('User', userSchema); 