# création d'une application todoList:
=====================================
petite application todoList en Angular et NodeJs, 
# coté front: 
# ------------
[Angular]
- components
        - view:
                - header
                - footer
                - home (Présentation + propose de se connecter ou creer un compte)
                - todoModal(affiche le todo selectionné dans un modal avec un btn modifier)
                - not-found
        - user:
                - signIn
                - signup
                - editProfil(affiche les infos du profil)
                - reset password                 
        - todoList: 
                - todoApp (affiche un input de saisie de tache +la liste des todos )
                - AddTodo
                - todoList
                - EditTodo(update et delete)
                - todoDetail(affiche toutes les infos du todo + les btn CRUD)
        - categoryTodo:
                - categoryTodo
                - AddCategory
                - EditCategory(update et delete) 
                - CategoryList       
- services:
        - Auth.service
        - Todo.service
        - Category.service

- models: 
        - User.model
        - Todo.model
        - Category.model






    
# coté back:
# ---------------
[NodeJs]
Enregistre les taches de chaque user
- user:  - SignUp
         - SignIn
         - UpdateUser
         - ResetPassword(sendEmail avec Nodemailer)

- todo:  - AddTodo
         - GetTodos 
         - GetTodo
         - UpdateTodo
         - DeleteTodo

- categoryTodo:
         - AddCategory
         - GetCaterogies
         - GetCaterogie
         - UpdateCategory
         - DeleteCtagegory
            