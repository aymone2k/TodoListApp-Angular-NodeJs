création d'une application todoList:
=====================================
coté front: 
------------
Angular
    -home (Présentation + propose de se connecter ou creer un compte)
    -login
    -signup
    -todoList(affiche un input de saisie de tache +la liste des todos (name,+ image + btn consulter + btn modifier))
    -todoModal(affiche le todo selectionné dans un modal avec un btn modifier)
    -todoDetail(affiche toutes les infos du todo + les btn CRUD)
    
coté back:
---------------
NodeJs
enregistre les taches pour chaque user
    -user:  -login
            -logout
            -sinup
    -todo: -create
            -read 
            -update
            -delete
    -categorie(catégorie de todo)
            -create
            -read 
            -update
            -delete