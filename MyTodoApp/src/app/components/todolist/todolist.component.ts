import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit, OnDestroy {
  today!:Date;
  todos: Todo[] = [];
  todoSub !: Subscription;
  constructor(private todoService: TodoService
              ) { }

  ngOnInit(): void {
    this.today = this.todoService.today;
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
