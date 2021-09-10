import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { CategoryService } from 'src/app/services/category.service';
import { TodoService } from 'src/app/services/todo.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit, OnDestroy {
  today!:Date;
  todos: Todo[] = [];
  userId:string="";
  author: string ="";
  todoSub !: Subscription;
    constructor(private todoService: TodoService,
                private userService: UserService,
                private categoryService: CategoryService,
                ) { }

    ngOnInit(): void {
      this.today = this.todoService.today;
      this.todoSub = this.todoService.todoSubject
                              .subscribe(
                                (todos: Todo[]) => {
                                    this.todos = todos;
                              },
                              (error)=> {console.log(error)}
                              );
      //this.todoService.emitTodos();
      this.author = this.userService.author;
      this.todoService.getTodoFromServer(this.author);

                            }

    ngOnDestroy(): void {
      this.todoSub.unsubscribe();
    }

  }
