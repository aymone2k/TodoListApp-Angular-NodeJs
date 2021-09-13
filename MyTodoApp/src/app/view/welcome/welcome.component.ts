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
  todos:Todo[] = [];
  todoNumber: number =0;
  todoSub !: Subscription;
  kocxyImage: any = "../assets/images/kocxy.png";


  constructor(private userService: UserService,
              private todoService: TodoService) { }

  ngOnInit(): void {
    this.today;
    this.user = this.userService.user
    this.todoSub = this.todoService.todoSubject
    .subscribe((todos: Todo[]) => {
          this.todos = todos

    },
    (error)=> {console.log(error)},
    ()=>{console.log("Observable complété")}
    )
    this.todoService.emitTodos();
this.todoNumber = this.todos.length
// rajouter pour prendre en compte uniquement les taches encours (status)

}


}
