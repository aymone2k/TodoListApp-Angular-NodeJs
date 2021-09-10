import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { CategoryService } from 'src/app/services/category.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  userId:string="";
  todoSub !: Subscription;
    constructor(private todoService: TodoService,
                private categoryService: CategoryService,
                ) { }

    ngOnInit(): void {
      this.todoSub = this.todoService.todoSubject
                              .subscribe(
                                (todos: Todo[]) => {
                                    this.todos = todos;
                              },
                              (error)=> {console.log(error)}
                              );
      //this.todoService.emitTodos();
      this.todoService.getTodoFromServer();

                            }

    ngOnDestroy(): void {
      this.todoSub.unsubscribe();
    }

  }
