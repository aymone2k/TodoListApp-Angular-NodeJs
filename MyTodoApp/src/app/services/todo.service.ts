import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[] = [];
  todoSubject = new Subject<Todo[]>();

  constructor() { }

  emitTodos(){
    this.todoSubject.next(this.todos)
  }

  addTodo(todo : Todo){
    this.todos.push(todo);
    this.emitTodos();
  }

}
