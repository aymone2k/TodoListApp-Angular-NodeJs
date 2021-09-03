import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Color } from 'src/app/models/color.model';
import { CategoryService } from 'src/app/services/category.service';
import { COLORS } from 'src/color-data';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit ,OnDestroy{



  colors: Color[] = COLORS;
  categories: Category[] =[];

  categoriesSub!: Subscription;


  constructor(private categoryService: CategoryService , private router: Router) { }

  ngOnInit(): void {

      this.categoriesSub = this.categoryService.categoriesSubject
                            .subscribe(
                              (value:any[])=>{
                                 this.categories = value },
                              (error)=>{
                                console.log("une erreur: "+error)},
                              ()=>{
                                console.log('observable complété!')});
      this.categoryService.emitCategories();
      this.categoryService.getCategoriesToServer();
    }

  ngOnDestroy(){
      this.categoriesSub.unsubscribe();
    }



   onUpdateCatg(id:string){

    this.router.navigate(['edit-category/'+id])
  }

 /*  onUpdateCatgToServer(i:number, category:Category){
    this.categoryService.onUpdateCatgToServer(i,category);
  } */

  onCreateTodo():void{
    this.router.navigate(["todolist"])
  }
}
