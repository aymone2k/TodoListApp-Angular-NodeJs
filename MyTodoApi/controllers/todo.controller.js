const Todo = require('../models/todo.model')

module.exports={
//get todoList for one user
//penser a limiter la liste par user
    todoList:(req, res, next)=>{
        Todo.find()
        .then((todos)=>{res.status(200).json(todos)})
        .catch((err)=>{res.status(404).json(err.message)})
    },
//create todo
    addTodo:(req, res, next)=>{
        const todoAdd = new Todo({
            ...req.body,
            //penser a prise en charge imqge
            author: req.user,
            createdAt:Date.now(),
        })
        todoAdd.save()
        .then((todo)=>{res.status(201).json(todo)})
        .catch((err)=>{res.status(409).json(err.message)})
    },
//read todo
    getOneTodo:(req, res, next)=>{
        const idTodo = req.params.id;
        Todo.findOne({_id: idTodo})
        .then((todo)=>{res.status(200).json(todo)})
        .catch((err)=>{res.statut(404).json(err.message)}) 
    },
//update todo
    updateTodo:(req, res, next)=>{
        const idTodo =  req.params.id;
        const statusTodo = req.body.todoStatus;
        if (!mongoose.Types.ObjectId.isValid(idTodo)) return res.status(404).send(`nous n'avont pas trouvé la tache N°: ${idTodo}`);
        //penser a la modif de l'image
        Todo.updateOne({_id: idTodo, author: req.user._id, todoStatus: statusTodo}, (err, todo)=>{
           
            if(err){
                return res.status(500).json({message: err.message})
            }
            return res.status(200).json({message: 'Tache modifiée'})
        })
        // à corriger

    },

//delete todo
    deleteTodo:(req, res, next)=>{
        const idTodo = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(idTodo)) return res.status(404).send(`nous n'avont pas trouvé la tache N°: ${idTodo}`);
        //penser à la suppression de l'image en database
        Todo.findByIdAndRemove(idTodo)
        .then((todo) =>{res.status(200).json({message: `la tache ${todo} a été supprimée!`})} )
        .catch((err) =>{res.status(500).json({message: err.message})})
    },

}