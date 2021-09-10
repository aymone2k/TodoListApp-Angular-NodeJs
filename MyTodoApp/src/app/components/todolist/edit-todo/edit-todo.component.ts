import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit, OnDestroy {
todo:any;

todoSub !: Subscription;

  constructor(private todoService: TodoService,
              private router: Router,
              private routeId: ActivatedRoute) { }

  ngOnInit(): void {
    this.todoSub = this.todoService.todoSubject
                    .subscribe(
                      (value: any) => {
                      this.todo = value
                    },
                      (error)=>{
                        console.log("erreur: "+error)
                      },
                      ()=>{
                        console.log("observable complété!")
                      }
                      )
      const idGet = this.routeId.snapshot.params['id']
      this.todoService.getTodoByIdFromServer(idGet);
  }

 ngOnDestroy():void{
   this.todoSub.unsubscribe();
 }
}
