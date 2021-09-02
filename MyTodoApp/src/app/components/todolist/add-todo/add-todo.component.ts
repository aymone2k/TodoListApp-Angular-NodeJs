import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  todoForm !: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private todoService: TodoService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.todoForm = this.formBuilder.group({
     // date : 'YYYY-MM-DD',
      todoName: ['', Validators.required],
      todoStatus: false,
      todoDescription:['', Validators.required],
      category:['', Validators.required],
      author: ['', Validators.required],
    }
    )
  }

  onSubmitForm() {
    const formValue= this.todoForm.value;
    const newTodo = new Todo(
      formValue['todoName'],
      formValue['todoStatus'],
      formValue['todoDescription'],
      formValue['category'],
      formValue['author'],
    );
    this.todoService.addTodo(newTodo);

  }

 getCategoryTodo(){
    //methode pour reccup les catgories dans la liste
  }
  getUserTodo(){
    // methode pour reccup l'author
  }
}
