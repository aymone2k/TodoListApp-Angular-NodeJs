import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
isLoading:boolean=false;

  todos: Todo[] = [];
  userId:string="";
  author: string ="";
 idCatg: string="";
  todoSub !: Subscription;
    constructor(private todoService: TodoService,
                private userService: UserService,
                private categoryService: CategoryService,
                ) { }

    ngOnInit(): void {
this.isLoading=true;
      this.todoSub = this.todoService.todoSubject
                              .subscribe(
                                (todos: Todo[]) => {
                                  this.isLoading=false;
                                    this.todos = todos;

                              },
                              (error)=> {
                                this.isLoading = false;
                                console.log(error)}

                              );

      this.author = this.userService.author;
      //this.idCatg = this.todo.category
      this.todoService.getTodoFromServer(this.author);
     // this.categoryService.getCategoryByIdToServer(this.idCatg);
//revoir pour reccupe la catg
                            }

    ngOnDestroy(): void {
      this.todoSub.unsubscribe();
    }

  }
