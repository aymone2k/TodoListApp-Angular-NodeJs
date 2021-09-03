import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  api = environment.api;
  today = new Date();
  todos: Todo[] = [];
  todoSubject = new Subject<Todo[]>();

  constructor(private httpClient: HttpClient) { }

  emitTodos(){
    this.todoSubject.next(this.todos)
  }


  getUserTodo(){
    // methode pour reccup l'author sera implémentée après gestion du compte user
  }

  addTodo(todo : Todo){
    this.todos.push(todo);
    this.emitTodos();
  }


  addTodoToServer(todo: Todo){
    this.httpClient
      .put(this.api+'/todo',todo)
      .subscribe(
        ()=>{
          console.log(todo)
        },
        (error)=>{
          console.log(error)
        }
      )

  }

  getTodoFromServer():void{
    this.httpClient
      .get<Todo[]>(this.api+'/todo')
      .subscribe(
        (todosReccup: Todo[])=>{
          this.todos = todosReccup;
          this.emitTodos();
        },
        (error)=>{
          console.log(error)
        },
        ()=>{console.log("todos réccupérées")}
      )

  }

  //voir pour modifier un todo et pour supprimer

  getTodoByIdFromServer(){}

  onUpdateTodoToServer(){}

  onDeleteTodoToServer(){}
}
