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


//get categoryTodoList pour un user spécifique
categoryTodoListAuthor:(req, res, next)=>{
    idAuthor = req.params.author
    CategoryTodo.find({author: idAuthor})
    .then((categories)=>{res.status(200).json(categories)})
    .catch((err)=>{res.status(400).json({message: err.message})})
    },

//create categoryTodo
    addCategoryTodo:(req, res, next)=>{
        const categoryAdd = new CategoryTodo({
            categoryName: req.body.categoryName,
            categoryColor: req.body.categoryColor, 
            author: req.user,
            createdAt: Date.now(),
        });
        categoryAdd.save()
        .then((catg)=>{res.status(201).json({message:`la categorie ${catg.categoryName} a été crée` })})
        .catch((err)=>{res.status(400).json({message: err.message})})
    },

//update categoryTodo

//delete categoryTodo
// penser à rendre impossible la suppression d'une catégorie si elle est ratachée à une tache
    deleteCategoryTodo:(req, res, next)=>{
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`nous n'avont pas trouvé la tache N°: ${id}`);
        CategoryTodo.findByIdAndRemove(id)
        .then((catg)=>{res.status(200).json({message: `la categorie ${catg.categoryName} a été supprimée`})})
        .catch((err)=>{res.status(400).json({message: err.message})})
    }

}