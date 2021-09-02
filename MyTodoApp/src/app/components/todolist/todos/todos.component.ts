import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  todoSub !: Subscription;
    constructor(private todoService: TodoService
                ) { }

    ngOnInit(): void {
      this.todoSub = this.todoService.todoSubject
                              .subscribe((todos: Todo[]) => {
                                    this.todos = todos
                              },
                              (error)=> {console.log(error)},
                              ()=>{console.log("Observable complété")}
                              )
                              this.todoService.emitTodos();
               }

    ngOnDestroy(): void {
      this.todoSub.unsubscribe();
    }

  }
