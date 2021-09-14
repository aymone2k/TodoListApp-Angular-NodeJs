import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  today:number = Date.now();
  user: string ="";
  userId: string ="";
  todos:Todo[] = [];
  todoFilter:any[] = [];
  todoNumber: number =0;
  todoNumberTodo: number =0;//nbr de todo à réaliser
  todoNumberDone: number =0;//nbr de todo déjà réaliser

  kocxyImage: any = "../assets/images/kocxy.png";


  constructor(private userService: UserService,
              private todoService: TodoService) { }

  ngOnInit(): void {
    this.today;
    this.user = this.userService.user
    this.userId = this.userService.author

    this.todoService.getTodoByIdFromServer(this.userId)
                      .then((value:any)=>{
                        this.todos = value;
    console.log(this.todos)
    this.todoNumber = this.todos.length

    this.todoNumberTodo = this.todos.filter(todo=>todo.todoStatus==false).length
    this.todoNumberDone = this.todos.filter(todo=>todo.todoStatus==true).length
    console.log(this.todoNumberTodo)
                          })
    this.todoService.emitTodos();

// rajouter pour prendre en compte uniquement les taches encours (status)

}


}
