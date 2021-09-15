import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-detail-todo',
  templateUrl: './detail-todo.component.html',
  styleUrls: ['./detail-todo.component.css']
})
export class DetailTodoComponent implements OnInit {
todo!:Todo ;
  constructor(private todoService: TodoService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.route.params.subscribe(
        (params: Params)=>{
          const idTodo = params.id;
          this.todoService.getTodoByIdFromServer(idTodo)
          .then((todo: any)=>{
            this.todo = todo;
          })
          .catch((err)=>{console.log(err)})
        }
      )
  }

  deleteTodo(){
//configurer la suppression
    console.log("tache supprimée")
  }

}
