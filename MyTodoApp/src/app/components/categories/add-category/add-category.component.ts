import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { Color } from 'src/app/models/color.model';
import { CategoryService } from 'src/app/services/category.service';
import { COLORS } from 'src/color-data';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category = new Category();
  colors: Color[] = COLORS;


  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void{
    const categoryName = form.value['categoryName'];
    const categoryColor = form.value['categoryColor'];
  // this.categoryService.addCategory(categoryName, categoryColor)
    this.categoryService.addCategoryToServer(categoryName, categoryColor);
  //voir pr affichage des messages alerte si catégorie existe ....
  }

}
