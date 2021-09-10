import { NgModule } from '@angular/core';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './view/header/header.component';
import { FooterComponent } from './view/footer/footer.component';
import { HomeComponent } from './view/home/home.component';
import { TodoModalComponent } from './view/todo-modal/todo-modal.component';
import { NotFoundComponent } from './view/not-found/not-found.component';
import { AddCategoryComponent } from './components/categories/add-category/add-category.component';
import { EditCategoryComponent } from './components/categories/edit-category/edit-category.component';
import { ListCategoryComponent } from './components/categories/list-category/list-category.component';
import { AddTodoComponent } from './components/todolist/add-todo/add-todo.component';
import { DetailTodoComponent } from './components/todolist/detail-todo/detail-todo.component';
import { EditTodoComponent } from './components/todolist/edit-todo/edit-todo.component';
import { TodosComponent } from './components/todolist/todos/todos.component';
import { TodolistComponent } from './components/todolist/todolist.component';
import { EditProfilComponent } from './components/users/edit-profil/edit-profil.component';
import { ResetPasswordComponent } from './components/users/reset-password/reset-password.component';
import { SignUpComponent } from './components/users/sign-up/sign-up.component';
import { SignInComponent } from './components/users/sign-in/sign-in.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CategoryService } from './services/category.service';
import { TodoService } from './services/todo.service';
import { HeaderPageComponent } from './view/header-page/header-page.component';
import { WelcomeComponent } from './view/welcome/welcome.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TodoModalComponent,
    NotFoundComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    ListCategoryComponent,
    AddTodoComponent,
    DetailTodoComponent,
    EditTodoComponent,
    TodosComponent,
    TodolistComponent,
    EditProfilComponent,
    ResetPasswordComponent,
    SignUpComponent,
    SignInComponent,
    CategoriesComponent,
    HeaderPageComponent,
    WelcomeComponent,


  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
  ],

  providers: [
    CategoryService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
