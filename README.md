 # Création d'une application todoList:
=====================================

Application todoList en Angular et NodeJs, et MongoDB Atlas.
l'utilisateur doit créer un compte s'il n'en a pas.
il pourra se connecter pour afficher, modifier ou supprimer ses taches et la catégorie de ses taches.
chaque tache est est reliée à une catégorie et un user.
chaque catégorie est reliée à un utilisateur et une couleur.
en cas d'oublie du mot de passe, un reset passord permettra se remplir un formulaire afin qu'il reçoive un password provisoire par mail(via nodemailer); 

https://todo-list-2kalm.herokuapp.com/home


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
        - user:(utilisera pour les forms la methode reactive)
                - signIn
                - signup
                - editProfil(affiche les infos du profil de l'utilisateur)
                - reset password                 
        - todoList: (utilisera pour les forms la methode reactive)
                - todoList (affiche un input de saisie de tache +la liste des todos )
                - addTodo
                - todos
                - editTodo(update et delete)
                - todoDetail(affiche toutes les infos du todo + les btn CRUD)
        - categories: (utilisera pour les forms la methode template)
                - categories
                - addCategory
                - editCategory(update ) 
                - categoryList       
- services:
        - auth(pour protéger les routes)
        - todo
        - category
        - user

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
            
