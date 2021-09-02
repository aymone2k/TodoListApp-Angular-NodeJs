const CategoryTodo =  require('../models/categoryTodo.model');
const mongoose = require('mongoose');

module.exports={
//get categoryTodoList
    categoryTodoList:(req, res, next)=>{
        //revoir pour que seule les ctg créées par le user puissent s'afficher
        CategoryTodo.find()
        .then((categories)=>{res.status(200).json(categories)})
        .catch((err)=>{res.status(400).json({message: err.message})})
    },

//get categoryTodo
//retourne une categorie afin qu'on puisse la modifier ou la supprimer
    getCategoryTodo:(req, res, next)=>{
        const idCatg = req.params.id;
        CategoryTodo.findOne({_id: idCatg})
        .then((category)=>{res.status(200).send(category)})
        .catch((err)=>{res.status(400).json({message: err.message})})
    },

//create categoryTodo
    addCategoryTodo: async(req, res, next)=>{
        try{
            const categoryExist = await CategoryTodo.exists({categoryName: req.body.categoryName})
        if(categoryExist){
            return res.status(400).json({message: 'Impossible de créer une categorie qui existe déjà!'})
        }
        const categoryAdd = new CategoryTodo({
            ...req.body, 
            author: req.user,
            });
        categoryAdd.save()
        .then((catg)=>{res.status(201).json({message:`la categorie a été crée` })})
        .catch((err)=>{res.status(400).json({message: err.message})})
    }
    catch(err){res.status(500).json({message: err.message})};
},

//update categoryTodo
//ps on ne pourra pas supprimer les catégories car rattachées à une tache, cependant on peut modifier une categorie vu que l'id de la ctg est conservé
    updateCategoryTodo:(req, res, next)=>{
        const idCatg = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(idCatg)) return res.status(404).send(`nous n'avont pas trouvé la tache N°: ${idCatg}`);
        
        CategoryTodo.updateOne({_id: idCatg},{...req.body, _id: idCatg}, (err, catg)=>{
           
            if(err){
                return res.status(500).json({message: err.message})
            }
            return res.status(200).json({message: `la tache ${catg.categoryName} a été modifiée!`})
        })

    },



}