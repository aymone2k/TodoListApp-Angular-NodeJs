import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { Color } from 'src/app/models/color.model';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';
import { COLORS } from 'src/color-data';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category = new Category();
  colors: Color[] = COLORS;
  author: string ="";
  errorMessage: string = "";

  constructor(private categoryService: CategoryService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.author = this.userService.author;
  }

  onSubmit(form: NgForm): void{
    const categoryName = form.value['categoryName'];
    const categoryColor = form.value['categoryColor'];
    const author = this.author;

  // this.categoryService.addCategory(categoryName, categoryColor)
    this.categoryService.addCategoryToServer(categoryName, categoryColor, author);
  //voir pr affichage des messages alerte si catégorie existe ....
  }

}
