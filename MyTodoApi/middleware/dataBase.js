const mongoose = require('mongoose')

async function config() {
    await mongoose.connect( 'mongodb://localhost:27017/todoListDB', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
}

module.exports.config = config  