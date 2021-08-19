import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { EditCategoryComponent } from './components/categories/edit-category/edit-category.component';
import { AddTodoComponent } from './components/todolist/add-todo/add-todo.component';
import { DetailTodoComponent } from './components/todolist/detail-todo/detail-todo.component';
import { EditTodoComponent } from './components/todolist/edit-todo/edit-todo.component';
import { TodolistComponent } from './components/todolist/todolist.component';
import { TodosComponent } from './components/todolist/todos/todos.component';
import { EditProfilComponent } from './components/users/edit-profil/edit-profil.component';
import { ResetPasswordComponent } from './components/users/reset-password/reset-password.component';
import { SignInComponent } from './components/users/sign-in/sign-in.component';
import { SignUpComponent } from './components/users/sign-up/sign-up.component';
import { HomeComponent } from './view/home/home.component';
import { NotFoundComponent } from './view/not-found/not-found.component';
import { TodoModalComponent } from './view/todo-modal/todo-modal.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'signin', component: SignInComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'edit-profil/:id', component: EditProfilComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'todolist', component: TodolistComponent},
  {path: 'todo-modal/:id', component: TodoModalComponent},
  {path: 'edit-todo/:id', component: EditTodoComponent},
  {path: 'detail-todo/:id', component: DetailTodoComponent},
  {path: 'categories', component: CategoriesComponent},
  {path:'edit-category/:id', component: EditCategoryComponent},
  {path: 'not-found', component:NotFoundComponent },
  {path: '**', pathMatch:'full', redirectTo:'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }